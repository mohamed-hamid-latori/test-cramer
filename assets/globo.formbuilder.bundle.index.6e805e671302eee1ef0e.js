(window.webpackJsonpgloboFormbuilder=window.webpackJsonpgloboFormbuilder||[]).push([[2],{40:function(t,r,o){"use strict";o.r(r);var a=o(3);var s={Wizard:class{constructor(e){this.wizard=e,this.panels=new Globo.FormBuilder.Panels(this.wizard),this.steps=new Globo.FormBuilder.Steps(this.wizard),this.stepsQuantity=this.steps.getStepsQuantity(),this.currentStep=this.steps.currentStep,this.nextText=e.querySelector(".action.next").getAttribute("data-next-text"),this.submitText=e.querySelector(".action.next").getAttribute("data-submit-text"),this.submittingText=e.querySelector(".action.next").getAttribute("data-submitting-text"),this.concludeControlMoveStepMethod=this.steps.handleConcludeStep.bind(this.steps),this.wizardConclusionMethod=this.handleWizardConclusion.bind(this)}updateButtonsStatus(){0===this.currentStep?this.previousControl.classList.add("disabled"):this.previousControl.classList.remove("disabled")}updtadeCurrentStep(e){this.currentStep+=e,this.steps.setCurrentStep(this.currentStep),this.panels.setCurrentStep(this.currentStep),this.handleNextStepButton(),this.updateButtonsStatus()}setStep(e){this.currentStep=e,this.steps.setCurrentStep(this.currentStep),this.panels.setCurrentStep(this.currentStep),this.handleNextStepButton(),this.updateButtonsStatus()}handleNextStepButton(){this.nextControl.type="button",this.nextControl.addEventListener("click",this.nextControlMoveStepMethod),this.currentStep===this.stepsQuantity-1?(this.nextControl.innerHTML=this.submitText,this.nextControl.addEventListener("click",this.wizardConclusionMethod)):(this.nextControl.innerHTML=this.nextText,this.nextControl.removeEventListener("click",this.wizardConclusionMethod))}handleWizardConclusion(){this.wizard.classList.add("completed"),this.nextControl.type="submit"}addControls(e,t){this.previousControl=e,this.nextControl=t,this.previousControlMoveStepMethod=this.moveStep.bind(this,-1),this.nextControlMoveStepMethod=this.moveStep.bind(this,1),e.addEventListener("click",this.previousControlMoveStepMethod),t.addEventListener("click",this.nextControlMoveStepMethod),this.updateButtonsStatus()}getCoords(e){var t=e.getBoundingClientRect(),r=document.body,o=document.documentElement,a=window.pageYOffset||o.scrollTop||r.scrollTop,s=window.pageXOffset||o.scrollLeft||r.scrollLeft,i=o.clientTop||r.clientTop||0,l=o.clientLeft||r.clientLeft||0,n=t.top+a-i,c=t.left+s-l;return{top:Math.round(n),left:Math.round(c)}}scrollTop(){var e=Object(a.a)(this.wizard,".globo-formbuilder");if(e.querySelector(".float-layout"));else{let t={behavior:"smooth",left:0},r=!1;void 0!==Globo.FormBuilder.shop.setings?(void 0===Globo.FormBuilder.shop.setings.scrollTop||void 0!==Globo.FormBuilder.shop.setings.scrollTop&&Globo.FormBuilder.shop.setings.scrollTop)&&(r=!0):void 0!==Globo.FormBuilder.shop.settings&&(void 0===Globo.FormBuilder.shop.settings.scrollTop||void 0!==Globo.FormBuilder.shop.settings.scrollTop&&Globo.FormBuilder.shop.settings.scrollTop)&&(r=!0),r&&(t.top=this.getCoords(e).top),window.scrollTo(t)}}moveStep(e){Globo.FormBuilder.handleValidate(this.wizard),1==e&&this.wizard.querySelector(".block-container.errors")?this.panels.updatePanelsContainerHeight():(this.scrollTop(),1==e&&this.concludeControlMoveStepMethod(),this.validateMovement(e)&&(this.updtadeCurrentStep(e),this.steps.handleStepsClasses(e)))}validateMovement(e){const t=e>0&&this.currentStep<this.stepsQuantity-1,r=e<0&&this.currentStep>0;return t||r}reset(){var e=this.wizard.querySelector(".next"),t=this.wizard.querySelector(".previous");this.addControls(t,e),this.steps.handleRemoveAllConcludeStep(),this.setStep(0)}},Steps:class{constructor(e){this.wizard=e,this.steps=this.getSteps(),this.stepsQuantity=this.getStepsQuantity(),this.currentStep=0}setCurrentStep(e){this.currentStep=e}getSteps(){return this.wizard.getElementsByClassName("step")}getStepsQuantity(){return this.getSteps().length}handleConcludeStep(){this.steps[this.currentStep].classList.add("-completed")}handleRemoveAllConcludeStep(){for(var e=0;e<this.stepsQuantity;e++)this.steps[e].classList.remove("-completed")}handleStepsClasses(e){e>0?this.steps[this.currentStep-1].classList.add("-completed"):e<0&&this.steps[this.currentStep].classList.remove("-completed"),this.steps[this.stepsQuantity-1].classList.remove("-completed")}},Panels:class{constructor(e){this.wizard=e,this.panelWidth=this.wizard.offsetWidth,this.panelsContainer=this.getPanelsContainer(),this.panels=this.getPanels(),this.currentStep=0,this.updatePanelsPosition(this.currentStep),this.updatePanelsContainerHeight()}getCurrentPanelHeight(){return`${this.getPanels()[this.currentStep].offsetHeight}px`}getPanelsContainer(){return this.wizard.querySelector(".panels")}getPanels(){return this.wizard.getElementsByClassName("panel")}updatePanelsContainerHeight(){this.panelsContainer.style.height=this.getCurrentPanelHeight()}updatePanelsPosition(e){const t=this.panels;this.panelWidth;for(let r=0;r<t.length;r++)t[r].classList.remove("movingIn"),t[r].classList.remove("movingOutBackward"),t[r].classList.remove("movingOutFoward"),t[r].classList.remove("block-container"),r!==e?r<e?t[r].classList.add("movingOutBackward"):r>e&&t[r].classList.add("movingOutFoward"):(t[r].classList.add("movingIn"),t[r].classList.add("block-container"));this.updatePanelsContainerHeight()}setCurrentStep(e){this.currentStep=e,this.updatePanelsPosition(e)}}};var i={BulkOrder:class{showVariants(e){e.forEach(e=>{e.addEventListener("click",(function(e){const t=this.closest(".product-item__action-group"),r=(e,t)=>e.classList.toggle(t);r(t.querySelector(".product-item__action-up"),"product-item__hide"),r(t.querySelector(".product-item__action-down"),"product-item__hide"),r(t.closest(".table-product__body").querySelector(".variant--"+this.getAttribute("data-product-id")),"product-item__hide")}),!1)})}selectVariants(e){e.forEach((function(e){const t=e.closest(".table-product__body"),r=e.getAttribute("data-product-id"),o=t.querySelector(".variant--"+r);if(e.addEventListener("click",(function(e){if(o){const e=o.querySelectorAll(".variant__table-item:not(.variant__table-item-soldout) .variant-item__checkbox"),a=o.querySelectorAll(".variant__table-item:not(.variant__table-item-soldout) .variant-item__checkbox:checked");if(this.getAttribute("data-variant-id")){const o=t.querySelector(".product--"+r+" .product-item__checkbox");0==a.length?(o.checked=!1,o.classList.remove("checkbox-indeterminate")):(o.checked=!0,a.length<e.length?o.classList.add("checkbox-indeterminate"):o.classList.remove("checkbox-indeterminate"))}else a.length>0&&a.length==e.length?(this.checked=!1,e.forEach((function(e){e.checked=!1}))):(this.checked=!0,this.classList.remove("checkbox-indeterminate"),e.forEach((function(e){e.checked=!0})))}}),!1),!e.getAttribute("data-variant-id")){const a=o.querySelectorAll(".variant__table-item"),s=o.querySelectorAll(".variant__table-item.variant__table-item-soldout");a.length==s.length&&(e.setAttribute("disabled",!0),t.querySelector(".product--"+r).classList.add("variant__table-item-soldout"))}}))}hideUnavailableVariant(e){e.forEach((function(e){0==e.querySelectorAll("table tbody tr").length&&(e.parentNode.querySelector(".product--"+e.getAttribute("data-id")).remove(),e.remove())}))}validateQuantity(e){e.forEach((function(e){const t=e.closest(".block-container");e.addEventListener("blur",(function(e){null!==this.getAttribute("max")&&Number(this.value)>Number(this.getAttribute("max"))&&(alert(Globo.FormBuilder.forms[t.getAttribute("data-id")].errorMessage.limitQuantity),this.value=this.getAttribute("max"))}),!1),e.addEventListener("change",(function(e){const t=e.target.closest(".product-grid__item");if(t.querySelector(".table-product__header-total")){const t=e.target.closest(".variant__table-item"),r=Object(a.e)(t.querySelector(".variant-item__price").getAttribute("data-price"),e.target.value,null);t.querySelector(".variant-item__total").innerHTML=r}if(t.querySelector(".table-product__footer")){let e=0;t.querySelectorAll(".variant__table-item").forEach((function(t){let r=t.querySelector(".variant-item__price").getAttribute("data-price");"string"==typeof r&&(r=r.replace(".","")),e+=r*parseInt(t.querySelector(".item__quantity").value)})),e=Object(a.e)(e,1,null),t.querySelector(".table-product__footer-price").innerHTML=e}}),!1)}))}getProducts(e){let t=e.map(e=>'id:"'+e+'"').join(" OR ");return new Promise((e,r)=>{e(fetch("/search?view=formbuilder&q="+t).then(e=>e.json()).then(e=>e))})}sortProducts(e,t){let r=[];e.map((e,t)=>{r=r.concat(e)});let o=[];return t.map(e=>{const t=r[r.findIndex(t=>t.id===e)];return void 0!==t&&o.push(t),o}),o}getCarts(){return new Promise((e,t)=>{e(fetch("/cart.js",{method:"GET",headers:{"Content-Type":"application/json"}}).then(e=>e.json()).then(e=>e))})}updateQuantity(e,t){let r=[];return e.map((e,t)=>{r=r.concat(e.items)}),r.length&&r.map(e=>{let r=t.find(t=>t.id===e.product_id);if(r){let t=r.variants.find(t=>t.id===e.id);t.inventory_quantity=Number(t.inventory_quantity)-Number(e.quantity)}return t}),t}addItems(e,t){return t.closest(".globo-form-control").querySelectorAll(".variant-item__checkbox").forEach(t=>{t.checked&&e.push({id:Number(t.getAttribute("data-variant-id")),quantity:Number(t.closest(".variant__table-item").querySelector(".variant-item__table-quantity input").value)})}),e}addProducts(e,t){return new Promise((t,r)=>{t(fetch("/cart/add.js",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({items:e})}).then(e=>e.json()).then(e=>e).catch(e=>{console.error("Add to cart error",e)}))})}reShowMessage(e,t){return e=e.replace(new RegExp("[\r\n]","g"),""),t.map(t=>{e=t.success?e.replace(new RegExp('</div>(\\s+)<div class="message success">((?:(?:(?!<div[^>]*>|</div>).)+|<div[^>]*>.*?</div>)*)</div>',"g"),"</div>"+t.success):e.replace(new RegExp('<div class="message error">((?:(?:(?!<div[^>]*>|</div>).)+|<div[^>]*>.*?</div>)*)</div>',"g"),t.error)}),e}}};var l={Cart:class{constructor(e){this.form=e}setAttributeType(){this.form.setAttribute("type","cart")}updateCartNote(){const e=this;let t={};t["Cart form"]=Object(a.d)(e.form.getAttribute("data-id").toString()),e.form.querySelectorAll("input, textarea, select").forEach((function(r){if("hidden"==r.type){if("_keyLabel"!=r.name){const o=e.getAtrributeName(r.name);t[e.capitalizeFirstLetter(o[0])+" "+o[1]]=r.value?r.value:""}}else e.setAtrributeValue(t,r,!0)})),this.updateAttributes(t)}setAtrributeValue(e,t,r){const o=this,a=o.closestParent(t.parentNode,"globo-form-control").querySelector(".label-content").innerText;if(null!==t.getAttribute("presence")&&(t.classList.add("required"),t.setAttribute("required","")),"checkbox"==t.type)"acceptTerms[]"==t.name?e[a]=t.checked?t.value:"":(e[a]=e[a]||"",t.checked?(e[a]=this.removeCheckboxOption(e[a],""),e[a]+=e[a]?", "+t.value:t.value):(e[a]=this.removeCheckboxOption(e[a],t.value),e[a]=e[a]?e[a]:""));else if("file"==t.type){const r=o.closestParent(t,"globo-form-control"),i=t.files;let l=[];if(Object.values(i).map(e=>{l.push(e.name)}),e[a]=l.length?l.join(", "):"",i.length){const l=Globo.FormBuilder.forms[o.form.getAttribute("data-id")].elements.find(e=>e.id==o.getAtrributeName(t.name)[0]);r.querySelector(".messages").innerHTML='<p class="help-block loading">'+l.uploadPending+"</p>";let n=new FormData;for(var s=0;s<i.length;s++)n.append(o.getAtrributeName(t.name)[0]+"[]",i[s]);n.append("form_id",o.form.getAttribute("data-id")),n.append("name",o.getAtrributeName(t.name)[0]),void 0!==Globo.FormBuilder.url&&fetch(Globo.FormBuilder.url+"/api/front/uploadFiles",{method:"POST",body:n}).then(e=>e.json()).then(s=>{if(s.success){r.classList.remove("has-error"),r.querySelector(".messages").innerHTML='<p class="help-block success">'+l.uploadSuccess+"</p>";for(var n=1;n<=i.length;n++){let r=a+(t.multiple?" download no."+n:" download");e[r]="",!1!==s.fileNames?e[r]=s.fileNames[Number(n)-1]:!1!==s.isUploadable?e[r]=s.isUploadable:!1!==s.isStorageable&&(e[r]=s.isStorageable)}if(t.multiple){const t=Object.keys(e).filter(e=>e.indexOf("download no.")>-1);t.length>i.length&&t.map((t,r)=>{r+1>i.length&&(e[t]="")})}this.updateAttributes(e)}else{const e=Globo.FormBuilder.forms[o.form.getAttribute("data-id")].errorMessage;r.classList.add("has-error"),r.querySelector(".messages").innerHTML="<p class='help-block error'>"+("File not allowed"==s.error?e.fileNotAllowed:"File size limit"==s.error?e.fileNotAllowed:s.error)+"</p>"}}).catch(e=>{console.error(e)})}else{Object.keys(e).filter(e=>e.indexOf("download")>-1).map(t=>e[t]=""),this.updateAttributes(e),r.classList.remove("has-error"),r.querySelector(".messages").innerHTML=""}}else"radio"==t.type?e[a]=t.checked?t.value:"":e[a]=t.value?t.value:"";r&&this.onActionSetAttribute(e,"change",t)}onActionSetAttribute(e,t,r){const o=this;r.addEventListener(t,(function(t){o.setAtrributeValue(e,t.target,!1),o.updateAttributes(e)}))}getAtrributeName(e){return e.split(/[\[\]]/)}removeCheckboxOption(e,t){return e.indexOf(", "+t)>-1?e.replace(", "+t,""):e.indexOf(t+", ")>-1?e.replace(t+", ",""):e.indexOf(t)>-1?e.replace(t,""):e}capitalizeFirstLetter(e){return e.charAt(0).toUpperCase()+e.slice(1)}closestParent(e,t){return e&&e!=document?e.classList.contains(t)?e:this.closestParent(e.parentNode,t):null}updateAttributes(e){fetch("/cart/update.js",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({attributes:e})}).then(e=>e.json()).then(e=>{console.log("Update cart attributes success",e)}).catch(e=>{console.error("Update cart attributes error",e)})}}};const n=o(43),c=o(44),d={...s,...i,...l,renderForm:async function(e,t,r){let s,i,l,n=this,d=!1;document.querySelector("#globo-formbuilder-dynamicCSS")&&(s=document.querySelector("#globo-formbuilder-dynamicCSS").innerHTML,d=!0),document.querySelector("#globo-formbuilder-template")&&(i=document.querySelector("#globo-formbuilder-template").innerHTML,d=!0),document.querySelector("#globo-formbuilder-element")&&(l=document.querySelector("#globo-formbuilder-element").innerHTML,d=!0);let u=this.forms[e].html;const m=async(e,s,i,l,c,d)=>{if(e||!n.forms[d].html){const{default:e}=await Promise.all([o.e(4),o.e(0)]).then(o.bind(null,53)),t=s||e.templates.dynamicCSS,r=i||e.templates.template,a=l||e.templates.element;c=e.parseAndRenderSync(r,{configs:{...this.forms[d],formId:d},partialElement:a,dynamicCSS:t,formId:d,Globo:Globo})}let u=void 0!==n.page&&void 0!==n.page.type?n.page.type:"page",m=!0;(m="cart"==u?!(void 0!==n.forms[d].appearance.formType&&"cartForm"===n.forms[d].appearance.formType&&!n.shop.pricing.features.cartForm):!(void 0!==n.forms[d].appearance.formType&&"bulkOrderForm"===n.forms[d].appearance.formType&&!n.shop.pricing.features.bulkOrderForm))&&t.forEach(e=>{if(r){const e=new Globo.FormBuilder.BulkOrder;c=e.reShowMessage(c,r)}if(e.classList.contains("globo-formbuilder"))e.innerHTML=c,e.setAttribute("data-id",d);else{const t=Object(a.d)(d);e.innerHTML=e.innerHTML.replace(new RegExp(`{formbuilder:${t}}|{formbuilder:${this.forms[d].v1_id}}`,"gi"),'<div class="globo-formbuilder" id="globo-formbuilder-'+d+'" data-id="'+d+'" type>'+c+"</div>")}const t=e.closest(".globo-form-publish-modal");t&&(e.querySelector(".header.dismiss").classList.remove("hidden"),t.classList.contains("lightbox")&&"false"!==this.Cookies.get("globo-form-lightbox-"+t.getAttribute("data-id"))&&t.classList.remove("hidden")),(e=e.querySelector(".globo-formbuilder")?e.querySelector(".globo-formbuilder"):e).querySelectorAll("[data-id]").forEach(e=>e.setAttribute("data-id",d)),"cart"==u&&void 0!==n.forms[d].appearance.formType&&"cartForm"==n.forms[d].appearance.formType||e.querySelector(`form[data-id="${d}"]`).setAttribute("action",`${this.url}/api/front/form/${d}/send`),e.querySelector('[name="page[title]"]').value=this.page.title,e.querySelector('[name="page[href]"]').value=this.page.href,this.customer&&(e.querySelector('[name="customer[id]"]')&&(e.querySelector('[name="customer[id]"]').value=this.customer.id),e.querySelector('[name="customer[email]"]')&&(e.querySelector('[name="customer[email]"]').value=this.customer.email),e.querySelector('[name="customer[name]"]')&&(e.querySelector('[name="customer[name]"]').value=this.customer.name)),this.init(e,d)})};let p=this.forms[e].elements.filter(e=>e.id.indexOf("products")>-1);if(p.length){let t=[];p.map(e=>{Object.values(e.products).map(e=>t.push(e.id))}),t=c.uniq(t);let r=[];const o=new Globo.FormBuilder.BulkOrder;r.push(o.getProducts(t)),await Promise.all(r).then(r=>{let a=o.sortProducts(r,t),n=[];n.push(o.getCarts()),Promise.all(n).then(t=>{a=o.updateQuantity(t,a),p.map(e=>{let t=[];return Object.values(e.products).map(e=>t.push(e.id)),e.products=a.filter(e=>t.includes(e.id)),e}),m(d=!0,s,i,l,u,e)})})}else m(d=!0,s,i,l,u,e)},init:function(e,t){if(!document.body.contains(e))return;e.querySelector(".globo-form").classList.contains("float-form")&&document.body.appendChild(e),e&&e.addEventListener?e.addEventListener("submit",this.handleSubmit,!1):e&&e.attachEvent&&e.attachEvent("onsubmit",this.handleSubmit);const r=e.querySelector(".globo-formbuilder-wizard");if(r){const t=new this.Wizard(r),o=e.querySelector(".next"),a=e.querySelector(".previous");t.addControls(a,o),t.setStep(0)}const o=document.querySelectorAll('.globo-form-app [data-type="datetime"]');o.length&&this.handleDateTimePicker(o);const a=document.querySelectorAll(".globo-form-app .conditional-field");a.length&&this.handleConditionalField(a);const s=document.querySelectorAll(".globo-form-app [name]:not([type='file']):not([type='hidden'])");this.handleHiddenField(this.forms[t],e,s),globoFormbuilderRecaptchaInit=this.handleReCaptcha,this.handleReCaptcha(e);const i=e.querySelectorAll(".globo-form-control");let l={};i.forEach(e=>{var t=e.querySelector("label,legend");if(null!==t&&t){var r=e.querySelector("[name]");if(null!==r&&r){var o=r.getAttribute("name").replace("[]","");l[o]=t.querySelector(".label-content").innerHTML}}}),e.querySelector('[name="_keyLabel"]').value=JSON.stringify(l);let n=void 0!==this.forms[t].appearance.formType?this.forms[t].appearance.formType:"normalForm",c=void 0!==this.page&&void 0!==this.page.type?this.page.type:"page";if("bulkOrderForm"==n){const t=new this.BulkOrder,r=e.querySelectorAll(".globo-form-app .product-item__action-group");r.length&&t.showVariants(r);const o=e.querySelectorAll(".globo-form-app .products-item__checkbox");o.length&&t.selectVariants(o);const a=e.querySelectorAll(".globo-form-app .item__quantity");a.length&&t.validateQuantity(a);const s=e.querySelectorAll(".globo-form-app .variant__hide-unavailable");s.length&&t.hideUnavailableVariant(s)}if("cart"===c&&"cartForm"===n){const t=new this.Cart(e);t.setAttributeType(),t.updateCartNote()}var d=new CustomEvent("globo.formbuilder.form.loaded",{detail:{form:e}});document.dispatchEvent(d)},handleReCaptcha:function(e){const t=e?e.querySelectorAll(".globo-g-recaptcha"):document.querySelectorAll(".globo-g-recaptcha");if("undefined"!=typeof grecaptcha&&t)try{t.forEach(e=>{const t=e.getAttribute("data-globo-sitekey")||e.getAttribute("data-sitekey"),r=grecaptcha.render(e,{sitekey:t});console.log("widgetId:",r),e.nextElementSibling.setAttribute("reCaptcha-widget-id",r)})}catch(e){}},showFloatingForm:function(e){e.parentNode.querySelector(".globo-form-app").classList.add("active")},hideFloatingForm:function(e){const t=e.parentNode;t.classList.contains("globo-form-app")?t.classList.remove("active"):t.querySelector(".globo-form-app").classList.remove("active")},openModalForm:function(e){e.closest(".globo-form-publish").querySelector(".globo-form-publish-modal.feedbackButton").style.display="block"},closeModalForm:function(e){const t=e.closest(".globo-form-publish-modal");if(t.style.display="none",t.classList.contains("lightbox")){const e=this.forms[t.getAttribute("data-id")].publish,r="days"==e.selectTime?e.setCookie:365;this.Cookies.set("globo-form-lightbox-"+t.getAttribute("data-id"),!1,{expires:r})}},showMessage:function(e){if(e){var t=e.querySelector(".content");null!==t&&""!=t.innerHTML&&(e.style.display="block")}},scrollIntoErrorGroup:function(e){e.scrollIntoView({behavior:"smooth",block:"nearest"})},handleValidate:function(e){const t=e.querySelector(".block-container");let r={};t.querySelectorAll("input, textarea, select").forEach(o=>{const a=null!==o.getAttribute("presence"),s=null!==o.getAttribute("disabled"),i=null!==o.getAttribute("data-type")&&o.getAttribute("data-type");if(r[o.name]={},s?r[o.name].ignore={}:a&&("products[]"==o.name?r[o.name].presence={message:this.forms[t.getAttribute("data-id")].errorMessage.requiredProducts}:r[o.name].presence={message:this.forms[t.getAttribute("data-id")].errorMessage.required}),"email"==i&&(r[o.name][i]={message:this.forms[t.getAttribute("data-id")].errorMessage.invalidEmail}),"name"==i&&(r[o.name].format={pattern:"^[ -.A-ￜ]+",flags:"s",message:this.forms[t.getAttribute("data-id")].errorMessage.invalidName}),"url"==i&&(r[o.name][i]={message:this.forms[t.getAttribute("data-id")].errorMessage.invalidURL}),"phone"==i&&(r[o.name].format={pattern:"^[+]*[(]{0,1}[0-9+]{1,9}[)]{0,1}[-s.0-9 ]*$",flags:"i",message:this.forms[t.getAttribute("data-id")].errorMessage.invalidPhone}),"file"==i){const e=!1!==this.shop.pricing.features.fileUpload?1024*this.shop.pricing.features.fileUpload:2048;r[o.name][i]={notAllowedExtension:this.forms[t.getAttribute("data-id")].errorMessage.fileNotAllowed,sizeLimitMessage:this.forms[t.getAttribute("data-id")].errorMessage.fileSizeLimit,allowedExtension:o.getAttribute("data-allowed-extensions").split(","),maxFileSize:e}}if("checkbox"==i&&(r[o.name][i]={requiredMessage:this.forms[e.getAttribute("data-id")].errorMessage.required},r[o.name][i].isRequired=void 0!==r[o.name].presence),"password"==i){const e=null!==o.getAttribute("data-additional-type")&&o.getAttribute("data-additional-type"),a=null!==o.getAttribute("data-connected-element")&&o.getAttribute("data-connected-element");"confirm-password"===e&&a&&(r[o.name].equality={attribute:a,message:this.forms[t.getAttribute("data-id")].errorMessage.confirmPasswordNotMatch});let s=!(!o.getAttribute("data-validate-rule")||"false"==o.getAttribute("data-validate-rule"))&&o.getAttribute("data-validate-rule");s&&("advancedValidateRule"===s&&(s=null!==o.getAttribute("data-validate-rule")?o.getAttribute("data-advanced-validate-rule"):""),r[o.name].format={pattern:s,flags:"g",message:this.forms[t.getAttribute("data-id")].errorMessage.invalidPassword})}}),null!=e.querySelector(".block-container .globo-g-recaptcha")&&(r.reCaptcha={reCaptcha:{isRequired:!0,requiredMessage:this.forms[t.getAttribute("data-id")].errorMessage.requiredCaptcha}}),n.validators.file=function(t,r,o){const a=e.querySelector('[name="'+o+'"]');let s=0,i=!0;return Array.from(a.files).forEach(e=>{s+=e.size,-1===r.allowedExtension.indexOf(function(e){const t=e.split("\\").pop().split("/").pop(),r=t.lastIndexOf(".");return r<1?"":t.substr(r+1)}(e.name).toLowerCase())&&(i=!1)}),s/1e3>r.maxFileSize?r.sizeLimitMessage:i?null:r.notAllowedExtension},n.validators.checkbox=function(t,r,o,a){if(!r.isRequired)return null;const s=e.querySelectorAll("[name='"+o+"']");let i=!1;return s.forEach(e=>{e.checked&&(i=!0)}),i?null:r.requiredMessage},n.validators.reCaptcha=function(t,r,o,a){const s=e.querySelector("[name='"+o+"']");if(s){const e=grecaptcha.getResponse(s.getAttribute("reCaptcha-widget-id"));return s.value=e,""!=s.value?null:r.requiredMessage}return null},n.validators.ignore=function(){return null};const o=n(t,r,{fullMessages:!1});!function(e,t){let r=!1;e.querySelectorAll("input[name], select[name], textarea[name]").forEach(e=>{if(i(e,t&&t[e.name]),!r&&t[e.name]){const t=l(e,"globo-form-control");t&&(Globo.FormBuilder.scrollIntoErrorGroup(t),r=!0)}})}(t,o||{}),o&&Object.keys(o).length?t.classList.add("errors"):t.classList.remove("errors");const a=t.querySelectorAll("input:not(.item__quantity):not(.action--add-to-cart), textarea, select");for(var s=0;s<a.length;++s)a.item(s).addEventListener("change",(function(e){const o=n(t,r,{fullMessages:!1})||{};Object.keys(o).length?t.classList.add("errors"):t.classList.remove("errors"),i(this,o[this.name])}));function i(e,t){const r=l(e.parentNode,"globo-form-control"),o=r.querySelector(".messages");!function(e){e.classList.remove("has-error"),e.classList.remove("has-success"),e.querySelectorAll(".help-block.error").forEach(e=>{e.parentNode.removeChild(e)})}(r),t?(r.classList.add("has-error"),t.forEach(e=>{!function(e,t){const r=document.createElement("p");r.classList.add("help-block"),r.classList.add("error"),r.innerText=t,e.appendChild(r)}(o,e)})):r.classList.add("has-success")}function l(e,t){return e&&e!=document?e.classList.contains(t)?e:l(e.parentNode,t):null}},handleLoadDateTimePickerVendor:function(){return Promise.all([o.e(5),o.e(1)]).then(o.bind(null,52))},handleDateTimePicker:function(e){const t=async r=>{const{default:o}=await this.handleLoadDateTimePickerVendor(),{flatpickr:a,locales:s}=o;e.forEach(e=>{let t,o,i,l,n={enableTime:!0,dateFormat:"Y-m-d H:i",time_24hr:!0},c="H:i";t=e.getAttribute("data-format"),o=e.getAttribute("data-locale"),i=e.getAttribute("dataDateFormat"),l=e.getAttribute("dataTimeFormat");let d=e.getAttribute("limitDateType"),u=e.getAttribute("limitDateSpecificDates"),m=e.getAttribute("limitDateRangeDates"),p=e.getAttribute("limitDateDOWDates");"12h"==l&&(n.time_24hr=!1,c="h:i K"),"date-and-time"==t?n.dateFormat=i+" "+c:"date"==t?(n.enableTime=!1,n.dateFormat=i):"time"==t&&(n.noCalendar=!0,n.dateFormat=c),o&&(n.locale=s[o]);let h=[];if(d){if(""!=u&&null!=u&&(h=h.concat(u.split(",").map(e=>new Date(e)))),""!=m&&null!=m){const e=m.split(",");h.push({from:new Date(e[0]),to:new Date(e[1])})}if(""!=p&&null!=p){let e=p.split(",").map(e=>{let t=0;switch(e){case"sunday":t=0;break;case"monday":t=1;break;case"tuesday":t=2;break;case"wednesday":t=3;break;case"thursday":t=4;break;case"friday":t=5;break;case"saturday":t=6;break;default:t=0}return t});h.push((function(t){return e.indexOf(t.getDay())>-1}))}"disablingDates"==d?n.disable=h:n.enable=h}const g=a(e,n);e.isSameNode(r.target)&&g.open()}),e.forEach(e=>{e.removeEventListener("focus",t)})};e.forEach(e=>{e.addEventListener("focus",t)})},handleConditionalField:function(e){const t=this;e.forEach(e=>{const r=e.getAttribute("data-connected-id"),o=e.getAttribute("data-connected-value"),s=Object(a.a)(e,"form");let i=s.querySelectorAll('[name="'+r+'"]');i.length||(i=s.querySelectorAll('[name="'+r+'[]"]')),i.length&&i.forEach(r=>{r.checked&&t.handleSetConditionalField(r,e,o),r.addEventListener("change",(function(){t.handleSetConditionalField(r,e,o)}))})})},handleSetConditionalField:function(e,t,r){const o=this;"checkbox"==e.type?e.value===r&&(e.checked?(t.style.display="block",t.querySelectorAll("[name]").forEach(e=>{e.removeAttribute("disabled","disabled");const t=e.parentNode.querySelector(".flatpickr-mobile");t&&t.removeAttribute("disabled","disabled"),o.handleSetDefaultValue(e)})):(t.style.display="",t.querySelectorAll("[name]").forEach(e=>{e.setAttribute("disabled","disabled")}))):"radio"==e.type?e.value===r&&e.checked?(t.style.display="block",t.querySelectorAll("[name]").forEach(e=>{e.removeAttribute("disabled","disabled");const t=e.parentNode.querySelector(".flatpickr-mobile");t&&t.removeAttribute("disabled","disabled"),o.handleSetDefaultValue(e)})):(t.style.display="",t.querySelectorAll("[name]").forEach(e=>{e.setAttribute("disabled","disabled")})):e.value===r?(t.style.display="block",t.querySelectorAll("[name]").forEach(e=>{e.removeAttribute("disabled","disabled");const t=e.parentNode.querySelector(".flatpickr-mobile");t&&t.removeAttribute("disabled","disabled"),o.handleSetDefaultValue(e)})):(t.style.display="",t.querySelectorAll("[name]").forEach(e=>{e.setAttribute("disabled","disabled")}));const s=Object(a.a)(t,".panels"),i=Object(a.a)(t,".panel.movingIn");if(i&&(s.style.height=i.offsetHeight+"px"),"checkbox"==e.type&&!e.checked&&e.value==r||"radio"==e.type||"select-one"==e.type){const e=t.querySelectorAll("input[name],select"),r=document.createEvent("HTMLEvents");r.initEvent("change",!1,!0),e.forEach(e=>{"checkbox"==e.type||"radio"==e.type?e.checked=!1:e.value="",e.disabled?(e.disabled=!1,e.dispatchEvent(r),e.disabled=!0):e.dispatchEvent(r)})}},handleSetDefaultValue:function(e){setTimeout((function(){const t=e.closest(".globo-form-control").getAttribute("data-default-value");if(t&&"false"!==t){const r=document.createEvent("HTMLEvents");if(r.initEvent("change",!0,!0),"select-one"===e.type)e.value=t;else if("radio"===e.type)e.value===t&&(e.checked=!0);else if(-1!==e.name.indexOf("acceptTerms"))e.checked=!0;else{t.split(",").includes(e.value)&&(e.checked=!0)}e.dispatchEvent(r)}}),10)},handleHiddenField:function(e,t,r){let o=[];if(void 0===e)return!1;e.elements.forEach(e=>{"group"==e.type&&e.elements.forEach(e=>{"hidden"==e.type&&"dynamic"==e.dataType&&e.dynamicValue.length&&e.dynamicValue.forEach(t=>{t.target=e.id,o.includes(t)||o.push(t)})}),"hidden"==e.type&&"dynamic"==e.dataType&&e.dynamicValue.length&&e.dynamicValue.forEach(t=>{t.target=e.id,o.includes(t)||o.push(t)})}),r.forEach(e=>{if(void 0!==o.find(t=>t.when==e.name||t.when+"[]"==e.name)){const r=o.find(t=>t.when===e.name&&""==t.is);if(void 0!==r){const e=t.querySelector('[name="'+r.target+'"]');e&&(e.value=r.value)}e.addEventListener("change",(function(r){const a=r.target.value,s=o.find(t=>{if(t.is==a){if(t.when==e.name)return!0;if(t.when+"[]"==e.name&&e.checked)return!0}return!1});if(void 0!==s){const e=t.querySelector('[name="'+s.target+'"]');e&&(e.value=s.value)}else{const r=o.find(t=>t.when==e.name||t.when+"[]"==e.name);if(void 0!==r){const e=t.querySelector('[name="'+r.target+'"]');e&&(e.value=e.getAttribute("data-default-value"))}}}))}})},handleSubmit:function(e){if(e.preventDefault(),e.stopPropagation(),Globo.FormBuilder.handleValidate(e.target),e.target.querySelector(".block-container.errors"))return;const t=new CustomEvent("globo.formbuilder.form.submitting",{detail:{form:e.target}});document.dispatchEvent(t);var r=e.target.querySelector(".action.submit");r.classList.add("loading"),r.setAttribute("disabled","disabled");let o=e.target.querySelector(".message.success").innerHTML;var a=e.target.querySelectorAll("input, textarea, select"),s={"{{customer.name}}":Globo.FormBuilder.customer?Globo.FormBuilder.customer.name:"","{{customer.email}}":Globo.FormBuilder.customer?Globo.FormBuilder.customer.email:"","{{page.title}}":Globo.FormBuilder.page?Globo.FormBuilder.page.title:"","{{page.href}}":Globo.FormBuilder.page?Globo.FormBuilder.page.href:""};o=Globo.FormBuilder.addVariables(o,s,a),e.target.querySelector(".message.success").innerHTML=o;let i=[];const l=e.target.querySelectorAll(".action--add-to-cart"),n=new Globo.FormBuilder.BulkOrder;let c=[];l.length&&l.forEach(e=>{e.checked&&(c=n.addItems(c,e))}),c.length&&void 0!==Globo.FormBuilder.page&&i.push(n.addProducts(c,e.target)),i.push(Globo.FormBuilder.xhr(e.target)),Promise.all(i).then(t=>{r.classList.remove("loading"),r.removeAttribute("disabled"),e.target.querySelectorAll(".message").forEach((function(e){e.style.display="none"}));let o="",i="";if(t.map(e=>{void 0!==e.items||"Cart Error"==e.message?o=e:i=e}),"true"==i.success){const t=new CustomEvent("globo.formbuilder.form.submitted",{detail:{form:e.target}});if(document.dispatchEvent(t),void 0!==o.items){const t=Globo.FormBuilder.forms[e.target.getAttribute("data-id")].elements.find(e=>e.id="products");t.successMessage&&e.target.querySelectorAll(".message.success").forEach((function(e){e.querySelector(".content").insertAdjacentHTML("beforebegin","<h4>"+t.successMessage+"</h4></br>")}));var l=new CustomEvent("globo.formbuilder.bulkorder.added",{detail:{cartItem:o.items}});document.dispatchEvent(l)}else if("Cart Error"==o.message){e.target.querySelector(".message.warning .content").innerHTML=o.description}const r=Globo.FormBuilder.forms[e.target.getAttribute("data-id")].afterSubmit;if("undefined"!=typeof ga&&r.enableGa){const e=Globo.FormBuilder.addVariables(r.gaEventCategory,s,a)||"",t=Globo.FormBuilder.addVariables(r.gaEventAction,s,a)||"",o=Globo.FormBuilder.addVariables(r.gaEventLabel,s,a)||"";ga("send",{hitType:"event",eventCategory:e,eventAction:t,eventLabel:o})}if("function"==typeof fbq&&r.enableFpx){const t=Globo.FormBuilder.addVariables(r.fpxTrackerName,s,a)||"GloboFormBuilder-Submit";fbq("trackCustom",t,{pageTitle:Globo.FormBuilder.page.title,pageHref:Globo.FormBuilder.page.href,formTitle:Globo.FormBuilder.forms[e.target.getAttribute("data-id")].header.title})}if("redirectToPage"==r.action&&window.setTimeout((function(){window.location.href=r.redirectUrl}),"undefined"!=typeof ga&&r.enableGa?1500:100),"clearForm"==r.action){e.target.reset(),Globo.FormBuilder.showMessage(e.target.querySelector(".message.success")),Globo.FormBuilder.showMessage(e.target.querySelector(".message.warning")),void 0!==o.items&&Globo.FormBuilder.renderForm(e.target.getAttribute("data-id"),document.querySelectorAll(".globo-formbuilder"),[{success:e.target.querySelector(".message.success").outerHTML}]);const t=e.target.querySelector(".globo-g-recaptcha");t&&grecaptcha.reset(t.nextElementSibling.getAttribute("reCaptcha-widget-id"));const r=e.target.querySelector(".globo-formbuilder-wizard");if(r){new Globo.FormBuilder.Wizard(r).reset()}}if("hideForm"==r.action){e.target.style.display="none";const t=e.target.parentNode.querySelectorAll(".message.success");t&&Globo.FormBuilder.showMessage(t[t.length-1]),Globo.FormBuilder.showMessage(e.target.querySelector(".message.warning"))}}else{const t=e.target.querySelector(".message.error .content"),r=void 0!==i.errors&&i.errors;if(r){let a="";for(var n=0;n<Object.keys(r).length;n++)if("string"==typeof r[n])a+='<div class="err-item"><span class="label"></span><span class="err">'+r[n]+"</span></div>";else{let t=e.target.querySelector('[name="_keyLabel"]');t&&(t=JSON.parse(t.value)),void 0!==t[Object.keys(r)[n]]?a+='<div class="err-item"><span class="label">'+t[Object.keys(r)[n]]+'</span> : <span class="err">'+r[Object.keys(r)[n]]+"</span></div>":a+='<div class="err-item"><span class="label"></span><span class="err">'+r[Object.keys(r)[n]]+"</span></div>"}if(void 0!==o.items){const t=Globo.FormBuilder.forms[e.target.getAttribute("data-id")].elements.find(e=>e.id="products");e.target.querySelectorAll(".message.success").forEach((function(e){e.querySelector(".content").innerHTML="<h4>"+t.successMessage+"</h4></br>"})),Globo.FormBuilder.showMessage(e.target.querySelector(".message.success"));l=new CustomEvent("globo.formbuilder.bulkorder.added",{detail:{cartItem:o.items}});document.dispatchEvent(l)}else if("Cart Error"==o.message){e.target.querySelector(".message.warning .content").innerHTML=o.description,Globo.FormBuilder.showMessage(e.target.querySelector(".message.warning"))}t.innerHTML=a;const s=e.target.querySelector(".globo-g-recaptcha");s&&grecaptcha.reset(s.nextElementSibling.getAttribute("reCaptcha-widget-id"))}Globo.FormBuilder.showMessage(e.target.querySelector(".message.error"));const a=[{success:e.target.querySelector(".message.success").outerHTML},{error:e.target.querySelector(".message.error").outerHTML}];void 0!==o.items&&void 0!==Globo.FormBuilder.page&&Globo.FormBuilder.renderForm(e.target.getAttribute("data-id"),document.querySelectorAll(".globo-formbuilder"),a)}})},xhr:function(e){const t=e.getAttribute("action"),r=e.getAttribute("method");let o=new FormData(e);const a=new FormData;let s,i=0;void 0!==o.fd&&(o=o.fd);for(const t of o)if(t[0].includes("select_product")){t[0]!==s&&(s=t[0],i=0);const r=JSON.parse(e.querySelector(`[name="${t[0]}"][value="${t[1]}"]`).nextElementSibling.innerHTML);a.append(t[0]+`[${i}][url]`,`https://${this.shop.url}/admin/products/${r.id}`),a.append(t[0]+`[${i}][name]`,r.title),i++}else{if(t[0].indexOf("products")>-1){const r=e.querySelector('.item__quantity[data-variant-id="'+t[1]+'"]');if(r){const e=t[0].split("-").length>1?`quantities-${t[0].split("-")[1]}`:"quantities[]";a.append(e,t[1]+" / "+r.value)}}a.append(t[0],t[1])}return new Promise((o,s)=>{o(fetch(t,{method:r,body:a}).then((function(e){if(e.ok)return e.json();{const t=new Error(e.statusText);throw t.response=e,t}})).then(e=>e).catch(t=>{e.querySelector(".action.submit").classList.remove("loading");const r=e.querySelector(".message.error"),o=r.getAttribute("data-other-error"),a=e.querySelector(".message.error");a&&(a.innerHTML='<div class="err-item"><span class="label"></span><span class="err">'+(o||"Too many request, please try again later")+"</span></div>"),r&&this.showMessage(r)}))})},dismiss:function(e){e.parentNode.style.display="none";var t=e.closest(".message");if(t.classList.contains("success")){var r=e.closest(".g-container");t.innerHTML=Globo.FormBuilder.forms[r.getAttribute("data-id")].afterSubmit.message}},idealTextColor:function(e){const t=0===e.indexOf("#")?this.getRGBComponents(e):e.substring(5,e.length-1).replace(/ /g,"").split(",");return 255-(.299*t[0]+.587*t[1]+.114*t[2])<105?"#000000":"#ffffff"},getRGBComponents:function(e){const t=e.substring(1,3),r=e.substring(3,5),o=e.substring(5,7);return{R:parseInt(t,16),G:parseInt(r,16),B:parseInt(o,16)}},addVariables:function(t,r,o){var a=[];return t=t.replace(/{{customer.name}}|{{customer.email}}|{{page.title}}|{{page.href}}/g,(function(e){return r[e]})),o.length&&o.forEach(r=>{const o="checkbox"===r.type||"file"===r.type&&r.multiple?r.name.split("[")[0]:r.name;t.indexOf("{{"+o+"}}")>-1&&("radio"===r.type?t=t.replace("{{"+r.name+"}}",e.target.querySelector("[name="+r.name+"]:checked")?e.target.querySelector("[name="+r.name+"]:checked").value:""):"checkbox"===r.type?(a[o]=void 0!==a[o]?a[o]:[],r.checked&&a[o].push(r.value)):"file"===r.type?r.multiple?(a[o]=void 0!==a[o]?a[o]:[],r.files.length&&Object.values(r.files).map(e=>{a[o].push(e.name)})):t=t.replace("{{"+r.name+"}}",r.value?r.value.split("fakepath\\")[1]:""):t=t.replace("{{"+r.name+"}}",r.value))}),Object.keys(a).length>0&&Object.entries(a).map(e=>{t.indexOf("{{"+e[0]+"}}")>-1&&(t=t.replace("{{"+e[0]+"}}",e[1]))}),t}};r.default=d}}]);