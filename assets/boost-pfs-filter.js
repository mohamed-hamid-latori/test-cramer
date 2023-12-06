// Fix the confict suggestion search in Debut theme
if (typeof theme !== 'undefined' && theme.hasOwnProperty('settings')) theme.settings.predictiveSearchEnabled = false;

// Override Settings
const boostPFSFilterConfig = {
	general: {
		limit: window.innerWidth > 991 ? (boostPFSConfig?.custom?.products_per_page ? boostPFSConfig?.custom?.products_per_page : 60) : (boostPFSConfig?.custom?.products_per_page_mobile ? boostPFSConfig?.custom?.products_per_page_mobile : 30),
		loadProductFirst: false,
		numberFilterTree: 2,
		filterTreeMobileStyle: 'style3',
		separateRefineByFromFilter: true,
		breakpointMobile: 991,
		colorOptionFilterName: 'farbe'
	},
	selector: {
		otpTopCartLink: 'none'
	}
};

(function () {
	let onSale = false,
		soldOut = false,
		hasOnlyDefaultVariant = true,
		priceVaries = false,
		images = [],
		firstVariant = null,
		boostPFSRangeWidths = [165, 360, 533, 720, 940, 1066],
		productsJson = [];

	const isTouchDevice = window.matchMedia("(-moz-touch-enabled: 1), (hover: none)").matches;

	BoostPFS.inject(this);
	boostPFSFilterConfig.general.separateRefineByFromFilter = jQ('.boost-pfs-filter-refine-by-wrapper-h').length > 0;

	let productGridItemIndex = 1;
	const banners = boostPFSConfig.collectionBanners;

	const metafieldKeys = {
		variant: {
			sale: 'issale',
			new: 'neuheit',
			sustainability: 'nachhaltigkeit'
		}
	};

	const metafieldValues = {
		variant: {
			sale: 'Sale',
			new: 'Neuheit'
		}
	};

	const globalCustomSizeOrdersJson = document.querySelector('[data-custom-size-orders]');
	const defaultCustomSizeOrderJson = document.querySelector('[data-default-custom-size-order]');

	let globalCustomSizeOrders = null;
	let defaultCustomSizeOrder = null;

	if (globalCustomSizeOrdersJson) {
		try {
			globalCustomSizeOrders = JSON.parse(globalCustomSizeOrdersJson.innerHTML);
		} catch (error) {
			console.error(error);
		}
	}

	if (defaultCustomSizeOrderJson) {
		try {
			defaultCustomSizeOrder = JSON.parse(defaultCustomSizeOrderJson.innerHTML);
		} catch (error) {
			console.error(error);
		}
	}

	/************************** CUSTOMIZE DATA BEFORE BUILDING PRODUCT ITEM **************************/
	function prepareShopifyData(data) {
		hasOnlyDefaultVariant = data.variants.length === 1;

		// Displaying price base on the policy of Shopify, have to multiple by 100
		soldOut = !data.available; // Check a product is out of stock
		priceVaries = data.price_min !== data.price_max; // Check a product has many prices

		// Convert images to array
		images = data.images_info;

		// Get First Variant (selected_or_first_available_variant)
		firstVariant = data['variants'][0];

		if (Utils.getParam('variant') !== null && Utils.getParam('variant') != '') {
			let paramVariant = data.variants.filter(function (e) {
				return e.id == Utils.getParam('variant');
			});

			if (typeof paramVariant[0] !== 'undefined') {
				firstVariant = paramVariant[0];
			}
		} else {
			for (let i = 0; i < data['variants'].length; i++) {
				if (data['variants'][i].available) {
					firstVariant = data['variants'][i];
					break;
				}
			}
		}

		onSale = firstVariant.compare_at_price > firstVariant.price; // Check if current variant is on sale

		return data;
	}
	/************************** END CUSTOMIZE DATA BEFORE BUILDING PRODUCT ITEM **************************/

	function updatePriceUnit(handle) {
		let product = productsJson.find(productJson => productJson.handle === handle);
		let variant = product.variants.find(variantJson => variantJson.unit_price !== null);

		if (product && variant) {
			jQ('[data-collection-products]').find(`[data-collection-product="${product.id}"] price-unit`).html(`
					(${Utils.formatMoney(variant.unit_price/100)}/l)
				`).addClass('product-card__price-unit-value');
		} else if (product) {
			jQ('[data-collection-products]').find(`[data-collection-product="${product.id}"] price-unit`).remove();
		}
	}

	function productJson(handle) {
		jQ.ajax({
			type: "GET", url: `/products/${handle}?view=object-json`, success: function (response) {
				const html = document.createElement("div");
				html.innerHTML = response;

				let productJson = JSON.parse(html.querySelector("[data-json-response]").innerHTML);

				productsJson.push(productJson);

				updatePriceUnit(handle);
			}
		});
	}

	/************************** BUILD PRODUCT LIST **************************/
	// Build Product Grid Item
	ProductGridItem.prototype.compileTemplate = function (data) {
		if (!data) {
			data = this.data;
		}

		productJson(data.handle);

		// Customize API data to get the Shopify data
		data = prepareShopifyData(data);
		// Get Template
		let template = this.buildTemplate(data);
		return template;
	};

	ProductGridItem.prototype.buildTemplate = function (product) {
		let variants = product.variants;

		let variantMetafieldsOptionId = {
			pf_t_sale: 'issale:',
			pf_t_farbe: 'colorgroup:',
			pf_t_neuheit: 'neuheit:'
		};

		let variantsIds = product.variants.map(variant => variant.id);

		let variantsFilteredByMetafields = [];
		let filteredByVariantMetafield = false;

		for (const optionId in variantMetafieldsOptionId) {
			const prefix = variantMetafieldsOptionId[optionId];

			if (Globals.queryParams.hasOwnProperty(optionId)) {
				filteredByVariantMetafield = true;

				let tagsFiltered = Globals.queryParams[optionId];
				let tagsActive = tagsFiltered.map((tagActive) => tagActive.replace(prefix, ""));

				if (tagsActive.length > -1) {
					let variantMetafieldKey = prefix.replace(":", "");

					let metafieldsWithVariantsId = product.metafields.filter(function (metafield) {
						const metafieldId = metafield.id ?? metafield.namespace;

						return metafield.key === variantMetafieldKey && tagsActive.indexOf(metafield.value) > -1 && variantsIds.indexOf(metafieldId) > -1;
					});

					if (metafieldsWithVariantsId.length !== 0) {
						let metafieldVariantsIds = metafieldsWithVariantsId.map((metafield) =>
							metafield.id ?? metafield.namespace
						);

						let filteredVariantsByMetafield = product.variants.filter((variant) => metafieldVariantsIds.indexOf(variant.id) > -1);

						filteredVariantsByMetafield.forEach(variant =>{
							variantsFilteredByMetafields.push(variant);
						});
					}
				}
			}
		}

		if (filteredByVariantMetafield) {
			variants = variantsFilteredByMetafields;
		}

		let selectedColorOptions = [];

		const colorFilterName = `pf_opt_${boostPFSFilterConfig.general.colorOptionFilterName}`;

		if (Globals.queryParams.hasOwnProperty(colorFilterName)) {
			Globals.queryParams[colorFilterName].forEach(color => {
				selectedColorOptions.push(color.toLowerCase());
			});
		}

		/**
		 * Collection pages use custom logic with displaying product
		 * cards for each color option, available on the product, instead of
		 * displaying product cards for each product as usual.
		 *
		 * The usage of term "product grid item" refers to a collection grid item, which
		 * is a product card for a color option.
		 *
		 * Each product can have multiple product grid items, depending on the
		 * quantity of color option values available for the product.
		 */

		let colorOptions = this.getColorOptions(product?.options_with_values);

		/**
		 * If collection is already filtered by color options, need to filter
		 * the product color option values to display only product grid items
		 * with currently selected colors in the filter.
		 */
		if (selectedColorOptions.length) {
			colorOptions = colorOptions.filter(colorOption => {
				return selectedColorOptions.includes(colorOption.title.toLowerCase());
			}, []);
		}

		/**
		 * If a product does not have color options available,
		 * build and return a regular product card.
		 */
		if (!colorOptions.length) {
			return this.getTemplate(product);
		}

		/**
		 * If a product has multiple color options available,
		 * build a product card for the first variant with a given color option value.
		 *
		 * Each color option value has its own product card.
		 */
		let template = "";

		colorOptions.forEach((colorOption) => {
			const colorVariant = variants.find(variant => {
				return variant.options.includes(colorOption.title) && variant.available && variant.image;
			});

			if (!colorVariant || !colorVariant.available) {
				return null;
			}

			// GET INDEX COLOR // NEED MERGE WTIH
			const colorOptionLabels = 'color,colour,couleur,colore,farbe,색,色,fxärg,farve'.split(',');
			const colorOptionIndex = product.options.findIndex(
				option => colorOptionLabels.some(
					label => option === label
				)
			);

			let currentColorVariant = colorVariant;

			const arrayOneTypeVariantByColor = product.variants.filter(variant => {
				return variant.options[colorOptionIndex] === currentColorVariant.options[colorOptionIndex];
			});

			if (arrayOneTypeVariantByColor.length > 0 ) {
				product.variants_connected = arrayOneTypeVariantByColor;
				colorVariant.variants_connected = arrayOneTypeVariantByColor;
			}

			/**
			 * Build and return a product card for a the first available variant
			 * with selected color option value.
			 */
			template += this.getTemplate(product, colorVariant);

			let currentBanner = banners.find(banner => {
				return +banner.product_banner_position === productGridItemIndex;
			});

			if (currentBanner) {
				template += this.buildCollectionBanner(currentBanner);
			}

			/**
			 * If no cards were built for color option values of a product,
			 * build and return a regular product card.
			 */
			if (!template) {
				template = this.getTemplate(product);
			}
		});

		return template;
	};

	ProductGridItem.prototype.getTemplate = function (product, variant) {
		let template = boostPFSTemplate.productGridItemHtml.replace(/{{productId}}/g, product.id);
		let currentProductGridItemIndex = productGridItemIndex++;

		let imagesHtml 	= this.buildImages(product, variant);
		let bagdesHtml 	= this.buildBadges(product, variant);
		let optionsHtml = this.buildOptions(product);
		let metaHtml 	= this.buildMeta(product, variant);

		template = template.replace(/{{productImages}}/g, imagesHtml);
		template = template.replace(/{{productBadges}}/g, bagdesHtml);
		template = template.replace(/{{productOptions}}/g, optionsHtml);
		template = template.replace(/{{productMeta}}/g, metaHtml);

		// Add main attribute (Always put at the end of this function)
		template = template.replace(/{{itemId}}/g, product.id);
		template = template.replace(/{{itemTitle}}/g, product.title);
		template = template.replace(/{{itemHandle}}/g, product.handle);
		template = template.replace(/{{itemVendorLabel}}/g, product.vendor);
		template = template.replace(/{{itemUrl}}/g, Utils.buildProductItemUrl(product));
		template = template.replace(/{{itemIndex}}/g, currentProductGridItemIndex);

		return template;
	};

	ProductGridItem.prototype.getColorOptions = function (optionsWithValues) {
		if (!optionsWithValues.length) {
			return [];
		}

		const colorOptionLabels = 'color,colour,couleur,colore,farbe,색,色,fxärg,farve'.split(',');

		return optionsWithValues.find((option) => {
			return colorOptionLabels.includes(option.name);
		})?.values ?? [];
	};

	ProductGridItem.prototype.buildImages = function (product, variant) {
		const separator = '%%%';
		let url = Utils.buildProductItemUrl(product);

		if (variant) {
			url += `?variant=${variant.id}`;
		}

		let currentImage = variant ? variant.image : Utils.getFeaturedImage(images).replace('_large.jpg', '.jpg');

		let currentColor 			= images.find(image => image.src === currentImage)?.alt?.split(separator).shift() ?? '';
		let currentColorLowercased 	= currentColor.toLowerCase();

		const secondaryImage = () => {
			if (isTouchDevice) {
				return '';
			}

			if (!currentColor) {
				return '';
			}

			let imagesByColor = images.filter(image => {
				let alt 			= image.alt ?? '';
				let altLowercased 	= alt.toLowerCase() ?? '';

				let order = altLowercased?.split(separator).pop();

				if (order === altLowercased) {
					order = '';
				}

				let searchValue = `${separator}${order}`;

				let customAlt 			= alt.replace(searchValue, '') ?? '';
				let customAltLowercased = customAlt.toLowerCase();
				image.order 			= order ?? null;
				image.custom_alt 		= customAlt ?? '';

				return alt && (image.src !== currentImage) && (customAltLowercased === currentColorLowercased);
			}, []);

			/**
			 * If images have different orders, sort the images array in alphabetical order.
			 */
			if (!imagesByColor.every(image => image.order === imagesByColor[0].order)) {
				imagesByColor.sort((a, b) => {
					if (!a.order || !b.order) {
						return -1;
					}

					return a.order !== b.order ? a.order < b.order ? -1 : 1 : 0;
				});
			}

			let image = imagesByColor.shift();

			if (!image) {
				return '';
			}

			let src = image.src;
			let alt = image.custom_alt ?? product.title;
      
			return `<picture>
				<source srcset="${src.replace('.jpg', '_270x.jpg')} 1x, ${src.replace('.jpg', '_540x.jpg')} 2x" media="(max-width: 400px)">
				<source srcset="${src.replace('.jpg', '_402x.jpg')} 1x, ${src.replace('.jpg', '_804x.jpg')} 2x" media="(max-width: 576px)">
				<source srcset="${src.replace('.jpg', '_530x.jpg')} 1x, ${src.replace('.jpg', '_1060x.jpg')} 2x" media="(max-width: 768px)">
				<source srcset="${src.replace('.jpg', '_700x.jpg')} 1x, ${src.replace('.jpg', '_1395x.jpg')} 2x" media="(max-width: 992px)">
				<source srcset="${src.replace('.jpg', '_210x.jpg')} 1x, ${src.replace('.jpg', '_487x.jpg')} 2x" media="(max-width: 1200px)">
				<source srcset="${src.replace('.jpg', '_285x.jpg')} 1x, ${src.replace('.jpg', '_570x.jpg')} 2x" media="(max-width: 1440px)">
				<source srcset="${src.replace('.jpg', '_300x.jpg')} 1x, ${src.replace('.jpg', '_600x.jpg')} 2x" media="(max-width: 1920px)">

				<img
					srcset="${src.replace('.jpg', '_300x.jpg')} 1x, ${src.replace('.jpg', '_600x.jpg')} 2x"
					src="${src.replace('.jpg', '_300x.jpg')}"
					alt="${alt}"
					class="product-card__image product-card__image--secondary"
					loading="lazy"
				/>
			</picture>`;
		};

		const featuredImage = () => {
			let image = variant ? variant.image : Utils.getFeaturedImage(images).replace('_large.jpg', '.jpg');

			if (!image) {
				image = boostPFSAppConfig.general.no_image_url;
			}

			let src = image;
			let alt = product.title;

			return `<picture>
				<source srcset="${src.replace('.jpg', '_270x.jpg')} 1x, ${src.replace('.jpg', '_540x.jpg')} 2x" media="(max-width: 400px)">
				<source srcset="${src.replace('.jpg', '_402x.jpg')} 1x, ${src.replace('.jpg', '_804x.jpg')} 2x" media="(max-width: 576px)">
				<source srcset="${src.replace('.jpg', '_530x.jpg')} 1x, ${src.replace('.jpg', '_1060x.jpg')} 2x" media="(max-width: 768px)">
				<source srcset="${src.replace('.jpg', '_700x.jpg')} 1x, ${src.replace('.jpg', '_1395x.jpg')} 2x" media="(max-width: 992px)">
				<source srcset="${src.replace('.jpg', '_210x.jpg')} 1x, ${src.replace('.jpg', '_487x.jpg')} 2x" media="(max-width: 1200px)">
				<source srcset="${src.replace('.jpg', '_285x.jpg')} 1x, ${src.replace('.jpg', '_570x.jpg')} 2x" media="(max-width: 1440px)">
				<source srcset="${src.replace('.jpg', '_300x.jpg')} 1x, ${src.replace('.jpg', '_600x.jpg')} 2x" media="(max-width: 1920px)">

				<img
					srcset="${src.replace('.jpg', '_300x.jpg')} 1x, ${src.replace('.jpg', '_600x.jpg')} 2x"
					src="${src.replace('.jpg', '_300x.jpg')}"
					alt="${alt}"
					class="product-card__image"
					${this.index > 3 ? 'loading="lazy"' : ''}
				/>
			</picture>`;
		};

		return `<a href="${url}" class="product-card__image-wrapper" data-product-link>
			${secondaryImage()}
			${featuredImage()}
		</a>`;
	};

	ProductGridItem.prototype.buildBadges = function (product, variant) {
		let tags = product.tags.join(', ').toLowerCase();

		const productMetafields = product?.metafields;

		let hasVariantSaleMetafield = false;
		let hasVariantNewMetafield = false;
		let hasVariantSustainabilityMetafield = false;

		if (variant && productMetafields.length) {
			const variantMetafields = productMetafields.filter((metafield) => {
				const metafieldId = metafield.id ?? metafield.namespace;

				return metafieldId === variant.id;
			});

			const variantSaleMetafield = variantMetafields.find((metafield) => metafield.key === metafieldKeys.variant.sale);
			const variantNewMetafield = variantMetafields.find((metafield) => metafield.key === metafieldKeys.variant.new);
			const variantSustainabilityMetafield = variantMetafields.find((metafield) => metafield.key === metafieldKeys.variant.sustainability);

			if (variantSaleMetafield) {
				hasVariantSaleMetafield = variantSaleMetafield?.value === metafieldValues.variant.sale;
			}

			if (variantNewMetafield) {
				hasVariantNewMetafield = variantNewMetafield?.value === metafieldValues.variant.new;
			}

			if (variantSustainabilityMetafield) {
				hasVariantSustainabilityMetafield = variantSustainabilityMetafield?.value != "null";
			}
		}

		let badgeOfflineOnly = '';
		let badgeSale = '';
		let badgeNew = '';
		let badgeBestseller = '';
		let badgeBioCotton = '';
		let badgeEcoFriendly = '';
		let badgeVegan = '';
		let badgeSustainability = '';

		if (tags.includes('offline only')) {
			badgeOfflineOnly = boostPFSTemplate.badgeOfflineOnlyHtml;
		}

		if (hasVariantSaleMetafield) {
			badgeSale = boostPFSTemplate.badgeSaleHtml;
		}

		if (hasVariantNewMetafield){
			badgeNew = boostPFSTemplate.badgeNewHtml;
		}

		if (hasVariantSustainabilityMetafield){
			badgeSustainability = boostPFSTemplate.badgeSustainabilityHtml;
		}

		if (tags.includes('bestseller')) {
			badgeBestseller = boostPFSTemplate.badgeBestsellerHtml;
		}

		if (tags.includes('100% bio-baumwolle')) {
			badgeBioCotton = boostPFSTemplate.badgeBioCottonHtml;
		}

		if (tags.includes('eco-friendly')) {
			badgeEcoFriendly = boostPFSTemplate.badgeEcoFriendlyHtml;
		}

		if (tags.includes('vegan')) {
			badgeVegan = boostPFSTemplate.badgeVeganHtml;
		}

		if (badgeOfflineOnly) {
			badgeSale = '';
			badgeNew = '';
			badgeBestseller = '';
		}

		if (badgeSale) {
			badgeNew = '';
			badgeBestseller = '';
		}

		if (badgeNew) {
			badgeBestseller = '';
		}
		return `${badgeOfflineOnly}${badgeSale}${badgeNew}${badgeBestseller}${badgeBioCotton}${badgeEcoFriendly}${badgeVegan}${badgeSustainability}`;
	};

	ProductGridItem.prototype.buildOptions = function (product) {
		if (hasOnlyDefaultVariant) {
			return '';
		}

		const sizeLabel = 'size,taille,größe,tamanho,tamaño,koko,サイズ';

		let optionsWithValues = product.options_with_values;

		let items = optionsWithValues.map((option, index) => {
			let downcasedOptionName = option.label.toLowerCase();

			if (sizeLabel.includes(downcasedOptionName)) {
				return this.buildSizeOptions(product, option, index);
			}
		}).join('');

		return `<div class="product-card__options">
			${items}
		</div>`;
	};

	ProductGridItem.prototype.buildSizeOptions = function (product, option, index) {
		const getValues = () => {
			let optionValues = option.values;

			const customSizeOrderMetafield =
				window.Shopify.shop === 'cc-newseum.myshopify.com'
					? Utils.getProductMetafield(product, 'product', 'custom_size_order')
					: Utils.getProductMetafield(product, 'options', 'custom_size_order');

			let customSizeOrderType = JSON.parse(customSizeOrderMetafield)?.references ?? null;

			customSizeOrderType = customSizeOrderType ? customSizeOrderType[0] : null;

			let customSizeOrder = defaultCustomSizeOrder;

			if (customSizeOrderType) {
				customSizeOrder = globalCustomSizeOrders[customSizeOrderType.index];
			}

			if (!customSizeOrder) {
				return optionValues;
			}

			const separator = '%%%';

			customSizeOrder = customSizeOrder.split(separator);

			optionValues.sort(function (a, b) {
				return customSizeOrder.indexOf(a.title) - customSizeOrder.indexOf(b.title);
			});

			return optionValues;
		};

		const getVariantByValue = (value) => {
			const variants = product?.variants_connected ?? product?.variants;

			return variants?.find(variant => {
				return variant.options[index] === value;
			});
		};

		let values = getValues();

		let productUrl = Utils.buildProductItemUrl(product);

		let items = values.map(value => value.title).map(value => {
			let variantByOption = getVariantByValue(value);
			let url = variantByOption ? productUrl + `?variant=${variantByOption.id}` : productUrl;

			if (!variantByOption?.available) {
				return;
			}

			return `<li class="product-card-options__item">
				<a href="${url}" class="product-card-options__item-link" data-product-link>
					${value}
				</a>
			</li>`;
		}).join('');

		return `<div class="product-card-options">
			<p class="product-card-options__title">
				${boostPFSConfig.label.select_size}
			</p>

			<ul class="product-card-options__list">
				${items}
			</ul>
		</div>`;
	};

	ProductGridItem.prototype.initWishlist = function (product, variant) {
		["SwymViewProducts", "SwymWatchProducts", "SwymProductVariants"].forEach(
			function (key) {
				if (!window[key]) {
					window[key] = {};
				}
			}
		);

		let products = {};

		if (!variant) {
			variant = product.variants[0];
		}

		product.variants.forEach((variant) => {
			let variantData = {
				empi: product.id,
				epi: variant.id,
				du: `https://${window.Shopify.shop}${product.url}`,
				dt: product.title,
				ct: product.type,
				iu: ``,
				stk: variant.inventory_quantity,
				pr: variant.price / 100,
				variants: [
					{
						[variant.title]: variant.id
					}
				]
			};

			if (variant.compare_at_price) {
				variantData = {
					...variantData,
					op: variant.compare_at_price / 100
				};
			}

			window.SwymProductVariants[variant.id] = variantData;

			window.SwymWatchProducts[variant.id] = products[variant.id] = {
				id: variant.id,
				available: variant.available,
				inventory_management: variant.inventory_management,
				inventory_quantity: variant.inventory_quantity,
				title: variant.title,
				inventory_policy: variant.inventory_policy
			};
		});

		let productData = {
			empi: product.id,
			epi: variant.id,
			dt: product.title,
			du: `https://${window.Shopify.shop}${product.url}`,
			ct: product.type,
			pr: variant.price / 100,
			stk: variant.inventory_quantity,
			iu: ``,
			variants: [
				{
					[variant.title]: variant.id
				}
			]
		};

		if (variant.compare_at_price) {
			productData = {
				...productData,
				op: variant.compare_at_price / 100
			};
		}

		window.SwymViewProducts[product.handle]
			= window.SwymViewProducts[product.id]
			= productData;

		window.SwymWatchProducts[product.handle]
			= window.SwymWatchProducts[product.id]
			= products;
	};

	ProductGridItem.prototype.buildWishlist = function (product, variant) {
		let productWishlist = '';

		if (!product) {
			return productWishlist;
		}

		if (!variant) {
			variant = product.variants[0];
		}

		productWishlist = boostPFSTemplate.wishlistHtml;

		this.initWishlist(product, variant);

		productWishlist = productWishlist.replace(/{{productId}}/g , product.id);
		productWishlist = productWishlist.replace(/{{productHandle}}/g, product.handle);
		productWishlist = productWishlist.replace(/{{variantId}}/g, variant.id);

		return productWishlist;
	};

	ProductGridItem.prototype.buildPrice = function (product, variant) {
		let productPrice = '';

		if (priceVaries && !variant) {
			let minPrice = product.price_min;

			productPrice = `<div class="product-card__price">
				<div class="product-card__price-value">
					${boostPFSConfig.label.from_price_html.replace(/{{ price }}/, Utils.formatMoney(minPrice))}
				</div>
			</div>`;
		} else {
			let currentVariant = variant ?? firstVariant;

			let compareAtPrice = currentVariant.compare_at_price;
			let price = currentVariant.price;

			let compareAtPriceClass = 'product-card__price-value product-card__price-value--compare-price';
			let priceClass = 'product-card__price-value';

			let hasSale = currentVariant.compare_at_price > currentVariant.price;

			if (!hasSale) {
				compareAtPriceClass += ' hidden';
			}

			if (hasSale) {
				priceClass += ' product-card__price-value--sale';
			}

			productPrice = `<div class="product-card__price">
				<span class="${compareAtPriceClass}" data-compare-price>
					${Utils.formatMoney(compareAtPrice)}
				</span>

				<span class="${priceClass}" data-product-price>
					${Utils.formatMoney(price)}*
					<price-unit></price-unit>
				</span>
			</div>`;
		}

		return productPrice;
	};

	ProductGridItem.prototype.buildMeta = function (product, variant) {
		let { title, vendor } = product;

		let url = Utils.buildProductItemUrl(product);

		if (variant) {
			url += `?variant=${variant.id}`;
		}

		let enableWishlist = boostPFSConfig.custom.enable_wishlist;

		let productWishlist = '';
		let productVendor = '';
		let productTitle = '';
		let productPrice = '';

		if (enableWishlist) {
			productWishlist = this.buildWishlist(product, variant);
		}

		if (vendor) {
			productVendor = boostPFSTemplate.vendorHtml.replace(/{{productVendor}}/g, vendor);
		}

		productTitle = `<a href="${url}" class="product-card__title" data-product-link>
			${title}
		</a>`;

		productPrice = this.buildPrice(product, variant);

		return `${productWishlist}${productVendor}${productTitle}${productPrice}`;
	};

	ProductGridItem.prototype.buildCollectionBanner = function (banner) {
		let template = boostPFSTemplate.collectionBannerHtml;

		let {
			product_banner_position,
			product_banner_size,
			product_banner_title,
			product_banner_image,
			product_banner_text,
			banner_title_color,
			banner_text_color,
			banner_link,
			product_banner_video,
			banner_content_position
		} = banner;

		if (!product_banner_image && !product_banner_video){
			return '';
		}

		template = template.replace(/{{index}}/g, product_banner_position - 1);
		template = template.replace(/{{size}}/g, product_banner_size);
		template = template.replace(/{{bannerTitle}}/g, product_banner_title);
		template = template.replace(/{{bannerImage}}/g, product_banner_image);
		template = template.replace(/{{bannerText}}/g, product_banner_text);
		template = template.replace(/{{bannerTitleColor}}/g, banner_title_color);
		template = template.replace(/{{bannerTextColor}}/g, banner_text_color);
		template = template.replace(/{{bannerLink}}/g, banner_link);
		template = template.replace(/{{bannerVideo}}/g, product_banner_video);
		template = template.replace(/{{bannerContentPosition}}/g, banner_content_position);

		return template;
	};
	/************************** END BUILD PRODUCT ITEM ELEMENTS **************************/

	/************************** BUILD TOOLBAR **************************/
	// Build Pagination
	ProductPaginationDefault.prototype.compileTemplate = function (totalProduct) {
		if (!totalProduct) totalProduct = this.totalProduct;
		// Get page info
		var currentPage = parseInt(Globals.queryParams.page);
		var totalPage = Math.ceil(totalProduct / Globals.queryParams.limit);
		// If it has only one page, clear Pagination
		if (totalPage <= 1) {
			return '';
		}

		var paginationHtml = boostPFSTemplate.paginateHtml;
		// Build Previous
		var previousHtml = (currentPage > 1) ? boostPFSTemplate.previousActiveHtml : '';
		previousHtml = previousHtml.replace(/{{itemUrl}}/g, Utils.buildToolbarLink('page', currentPage, currentPage - 1));
		paginationHtml = paginationHtml.replace(/{{previous}}/g, previousHtml);
		// Build Next
		var nextHtml = (currentPage < totalPage) ? boostPFSTemplate.nextActiveHtml : '';
		nextHtml = nextHtml.replace(/{{itemUrl}}/g, Utils.buildToolbarLink('page', currentPage, currentPage + 1));
		paginationHtml = paginationHtml.replace(/{{next}}/g, nextHtml);
		// Create page items array
		var beforeCurrentPageArr = [];
		for (var iBefore = currentPage - 1; iBefore > currentPage - 3 && iBefore > 0; iBefore--) {
			beforeCurrentPageArr.unshift(iBefore);
		}
		if (currentPage - 4 > 0) {
			beforeCurrentPageArr.unshift('...');
		}
		if (currentPage - 4 >= 0) {
			beforeCurrentPageArr.unshift(1);
		}
		beforeCurrentPageArr.push(currentPage);
		var afterCurrentPageArr = [];
		for (var iAfter = currentPage + 1; iAfter < currentPage + 3 && iAfter <= totalPage; iAfter++) {
			afterCurrentPageArr.push(iAfter);
		}
		if (currentPage + 3 < totalPage) {
			afterCurrentPageArr.push('...');
		}
		if (currentPage + 3 <= totalPage) {
			afterCurrentPageArr.push(totalPage);
		}
		// Build page items
		var pageItemsHtml = '';
		var pageArr = beforeCurrentPageArr.concat(afterCurrentPageArr);
		for (var iPage = 0; iPage < pageArr.length; iPage++) {
			if (pageArr[iPage] == '...') {
				pageItemsHtml += boostPFSTemplate.pageItemRemainHtml;
			} else {
				pageItemsHtml += (pageArr[iPage] == currentPage) ? boostPFSTemplate.pageItemSelectedHtml : boostPFSTemplate.pageItemHtml;
			}
			pageItemsHtml = pageItemsHtml.replace(/{{itemTitle}}/g, pageArr[iPage]);
			pageItemsHtml = pageItemsHtml.replace(/{{itemUrl}}/g, Utils.buildToolbarLink('page', currentPage, pageArr[iPage]));
		}
		paginationHtml = paginationHtml.replace(/{{pageItems}}/g, pageItemsHtml);
		return paginationHtml;
	};

	// Build Sorting
	ProductSorting.prototype.compileTemplate = function () {
		let html = '';

		if (!boostPFSTemplate.hasOwnProperty('sortingHtml')) {
			return false;
		}

		const sortingArr = Utils.getSortingList();

		if (!sortingArr) {
			return false;
		}

		let paramSort = Globals.queryParams.sort || '';

		// Build content
		let sortingItemsHtml = '';

		for (let k in sortingArr) {
			let activeClass = '';

			if (paramSort == k) {
				activeClass = ' active';
			}

			sortingItemsHtml += `<li class="collection-sort__dropdown-item${activeClass}">
									<button type="button" class="boost-pfs-filter-top-sorting-dropdown-option collection-sort__value" data-sort="${k}">
										${sortingArr[k]}
									</button>
								</li>`;
		}

		html = boostPFSTemplate.sortingHtml.replace(/{{sortingItems}}/g, sortingItemsHtml);

		return html;
	};

	ProductSorting.prototype.render = function () {
		const selectors = {
			container: '.boost-pfs-filter-custom-sorting',
			button: '.boost-pfs-filter-top-sorting-dropdown-button'
		};

		const container = jQ(selectors.container);

		if (!container.length) {
			return false;
		}

		const html = this.compileTemplate();

		container.html(html);

		let labelSort = '';

		const paramSort = Globals.queryParams.sort || '';
		const sortingList = Utils.getSortingList();

		if (paramSort.length > 0 && sortingList && sortingList[paramSort]) {
			labelSort = sortingList[paramSort];
		} else {
			labelSort = Labels.sorting_heading;
		}

		const button = jQ(selectors.button);
		button.text(labelSort);
	};

	// Build Sorting event
	ProductSorting.prototype.bindEvents = function () {
		const selectors = {
			dropdownTrigger: '.boost-pfs-filter-top-sorting-dropdown-trigger',
			dropdownTriggerButton: '.boost-pfs-filter-top-sorting-dropdown-button',
			option: '.boost-pfs-filter-top-sorting-dropdown-option'
		};

		const dropdownTrigger = jQ(selectors.dropdownTrigger);
		const dropdownTriggerButton = jQ(selectors.dropdownTriggerButton);
		const option = jQ(selectors.option);

		option.click(function (e) {
			e.preventDefault();

			FilterApi.setParam('sort', jQ(this).data('sort'));
			FilterApi.setParam('page', 1);
			FilterApi.applyFilter('sort');
		});

		dropdownTrigger.click(function () {
			dropdownTrigger.toggleClass('active');
		});

		jQ(document).on("click", function (e) {
			if (jQ(e.target).is(dropdownTrigger) === false && jQ(e.target).is(dropdownTriggerButton) === false) {
				jQ(dropdownTrigger).removeClass("active");
			}
		});
	};
	/************************** END BUILD TOOLBAR **************************/

	/************************** BUILD ADDITIONAL ELEMENTS **************************/
	Filter.prototype.afterRender = function (data) {
		if (!data) {
			data = this.data;
		}

		const selectors = {
			productsCount: '.boost-pfs-filter-total-product',
			progress: {
				indicator: '.boost-pfs-filter-progress-bar-indicator',
				viewed: '.boost-pfs-filter-progress-viewed',
				button: '.boost-pfs-filter-load-more-button',
				loadedMessage: '.boost-pfs-filter-pagination-loaded-message'
			},
			banner: {
				content: '[data-banner-content]',
				container: '.js-collection-banner',
				contentUnderMedia: 'collection__banner--with-under-content',
				video: '.js-banner-video',
				image: '[data-banner-image]',
				attributes: {
					position: 'position'
				}
			},
			productCard: {
				container: "[data-collection-product]",
				wishlistButton: "[data-add-to-wishlist]"
			}
		};

		const modifiers = {
			hidden: "hidden"
		};

		const bannerContentPosition = {
			underLeft: 'under-left',
			underCenter: 'under-center',
			underRight: 'under-right'
		};

		setProductsCount();
		updatePagination();
		getBannerContentPosition();
		setBannerMediaContent();
		updateFiltersInMobile();

		// initWishlist();

		function setProductsCount() {
			const container = document.querySelector(selectors.productsCount);

			if (!container) {
				return false;
			}

			let productCount = +data.total_product;

			productCount = `${productCount} ${productCount === 1 ? boostPFSConfig.label.products_count_single : boostPFSConfig.label.products_count_plural}`;

			container.innerHTML = productCount;
		}

		function updatePagination() {
			const progressBarIndicator = document.querySelector(selectors.progress.indicator);
			const progressViewed = document.querySelector(selectors.progress.viewed);

			if (!progressBarIndicator || !progressViewed) {
				return false;
			}

			let totalCount = +data.total_product;
			let productsPerPage = boostPFSFilterConfig.general.limit;

			let currentPage = parseInt(Globals.queryParams.page);

			let viewedCount = currentPage * productsPerPage;

			if (viewedCount >= totalCount) {
				viewedCount = totalCount;
			}

			const progressValue = viewedCount / totalCount * 100;

			progressBarIndicator.style.width = `${progressValue}%`;

			const progressBarMessage = document.querySelector(selectors.progress.loadedMessage);

			if (!progressBarMessage) {
				return false;
			}

			if (progressValue === 100) {
				progressBarMessage.classList.remove(modifiers.hidden);
			} else {
				progressBarMessage.classList.add(modifiers.hidden);
			}

			if (!boostPFSConfig.label.viewed_progress) {
				return false;
			}

			const viewedText = boostPFSConfig.label.viewed_progress.replace('{{ viewed_count }}', viewedCount).replace('{{ total_count }}', totalCount);

			progressViewed.innerHTML = viewedText;
		}

		function getBannerContentPosition() {
			let $bannerContent = jQ(selectors.banner.content);

			if (!$bannerContent.length) {
				return null;
			}

			$bannerContent.each((i, content) => {
				let $content = jQ(content);
				let contentPosition = $content.data(selectors.banner.attributes.position);

				if (contentPosition === bannerContentPosition.underLeft || contentPosition === bannerContentPosition.underCenter || contentPosition === bannerContentPosition.underRight) {
					$content.parents(selectors.banner.container).addClass(selectors.banner.contentUnderMedia);
				}
			});
		}

		function setBannerMediaContent() {
			let $bannerVideo = jQ(selectors.banner.video);

			if (!$bannerVideo.length) {
				return null;
			}

			$bannerVideo.each((i, video) => {
				let $video = jQ(video);

				$video.parent().find(selectors.banner.image).hide();
				if ($video.find('source').attr('src') === 'null') {
					$video.hide();
					$video.parent().find(selectors.banner.image).show();
				}
			});
		}

		function updateFiltersInMobile() {
			if (window.innerWidth >= 992) return false;

			let $boxs = jQ('.boost-pfs-filter-option.boost-pfs-filter-option-list.boost-pfs-filter-has-scrollbar.boost-pfs-filter-option-column-1');
			$boxs.each((keyBox, box) => {
				let $box = jQ(box);

				$box.click(() => {
					let $container = $box.find('.boost-pfs-filter-option-content-inner');

					$container.attr('style', 'max-height: 50px !important');
					$container.scrollTop($container.prop('scrollHeight'));
					$container.attr('style', '');
				});
			});
		}
	};

	FilterResult.prototype.afterRender = function () {
		const selectors = {
			products: '[data-collection-products]'
		};

		const modifiers = {
			loading: 'boost-loading'
		};

		jQ(selectors.products).removeClass(modifiers.loading);
	};

	ProductList.prototype.beforeRender = function () {
		const currentPage = Globals.queryParams.page ?? null;

		if (!currentPage) {
			productGridItemIndex = 1;

			return null;
		}

		productGridItemIndex = currentPage <= 1 ? 1 : productGridItemIndex;
	};

	ProductList.prototype.afterRender = function (data) {
		if (!data) {
			data = this.data;
		}

		const selectors = {
			productCard: {
				container: "[data-collection-product]",
				wishlistButton: "[data-add-to-wishlist]"
			}
		};

		/** Start Swym integration **/
		window.SwymCallbacks = window.SwymCallbacks || [];

		window.SwymCallbacks.push(function (swat) {
			let products = [];

			data.forEach(function (product) {
				let image_src = Utils.getFeaturedImage(product.images_info);
				let productCopy = product;
				productCopy.featured_image = image_src;
				productCopy.price = product.price_min;
				productCopy.compare_at_price = product.compare_at_price_min;
				products.push(productCopy);
			});

			swat.mapShopifyProducts(products);
			swat.initializeActionButtons('.boost-pfs-filter-products');
		});

		let customWishlistButtons = document.querySelectorAll(selectors.productCard.wishlistButton);

		if (!customWishlistButtons) {
			return null;
		}

		const triggerWishlistCountUpdate = () => {
			window.SwymCallbacks = window.SwymCallbacks || [];

			window.SwymCallbacks.push(function (swat) {
				swat.wishlistCount(response => {
					if (!response) response = 0;

					document.dispatchEvent(
						new CustomEvent("wishlist:item_count", {
							detail: {
								item_count: response
							}
						})
					);
				});
			});
		};

		const updateWishlistCount = () => {
			const timeout = 500;

			setTimeout(() => {
				triggerWishlistCountUpdate();
			}, timeout);
		};

		customWishlistButtons.forEach(customWishlistButton => {
			customWishlistButton.addEventListener("click", updateWishlistCount);
		});
		/** End Swym integration **/
	};
	/************************** END BUILD ADDITIONAL ELEMENTS **************************/
})();
