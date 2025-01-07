(()=>{"use strict";function e(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",n)}function t(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",n)}function n(e){if("Escape"===e.key){var n=document.querySelector(".popup_is-opened");n&&t(n)}}var r={baseUrl:"https://nomoreparties.co/v1/wff-cohort-29",headers:{authorization:"94c11d00-6720-42bc-ab9d-b06acc1f216c","Content-Type":"application/json"}},o=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))},c=document.querySelector("#card-template").content;function a(e,t,n,r,o){var a=c.querySelector(".card").cloneNode(!0);a.dataset.id=e._id;var u=a.querySelector(".card__title"),i=a.querySelector(".card__delete-button"),l=a.querySelector(".card__like-button"),s=a.querySelector(".card__image"),d=a.querySelector(".card__like-count");return s.src=e.link,s.alt=e.name,u.textContent=e.name,d.textContent=e.likes.length,e.likes.some((function(e){return e._id===r}))&&l.classList.add("card__like-button_is-active"),e.owner._id===r?(i.classList.add("card__delete-button_visible"),i.addEventListener("click",(function(){o(e._id)}))):i.classList.remove("card__delete-button_visible"),l.addEventListener("click",(function(){t(l,e._id,d)})),s.addEventListener("click",(function(){n(e.link,e.name)})),a}function u(e,t,n){(function(e,t){return fetch("".concat(r.baseUrl,"/cards/likes/").concat(e),{method:t?"DELETE":"PUT",headers:r.headers}).then(o)})(t,e.classList.contains("card__like-button_is-active")).then((function(t){e.classList.toggle("card__like-button_is-active"),n.textContent=t.likes.length})).catch((function(e){console.error("Ошибка при изменении лайка:",e)}))}var i=function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""},l=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))},s=function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(n){i(e,n,t)})),l(n,r,t)};function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var p=document.querySelector(".places__list"),f=document.querySelector(".popup_type_edit"),_=document.querySelector(".popup_type_new-card"),y=document.querySelector(".popup_type_image"),m=document.querySelector(".popup_type_edit-avatar"),v=document.querySelector(".popup_type_delete"),h=y.querySelector(".popup__image"),S=y.querySelector(".popup__caption"),b=document.querySelector(".profile__edit-button"),q=document.querySelector(".profile__add-button"),C=document.querySelector(".profile__edit-avatar-button"),E=document.querySelectorAll(".popup__close"),L=document.querySelector(".profile__title"),k=document.querySelector(".profile__description"),g=document.querySelector(".profile__image"),x=f.querySelector(".popup__form"),A=f.querySelector(".popup__input_type_name"),T=f.querySelector(".popup__input_type_description"),U=m.querySelector(".popup__form"),w=m.querySelector(".popup__input_type_avatar"),j=_.querySelector(".popup__form"),B=_.querySelector(".popup__input_type_card-name"),O=_.querySelector(".popup__input_type_url"),I="",P=null,D={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"form__submit_inactive",inputErrorClass:"form__input_type_error",errorClass:"form__input-error_active"};function M(t,n){h.src=t,h.alt=n,S.textContent=n,e(y)}function N(t){P=t,e(v)}Promise.all([fetch("".concat(r.baseUrl,"/users/me"),{method:"GET",headers:r.headers}).then(o),fetch("".concat(r.baseUrl,"/cards"),{method:"GET",headers:r.headers}).then(o)]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,u=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(u.push(r.value),u.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return u}}(t,n)||function(e,t){if(e){if("string"==typeof e)return d(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?d(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],c=r[1];I=o._id,L.textContent=o.name,k.textContent=o.about,g.style.backgroundImage="url(".concat(o.avatar,")"),function(e,t,n,r,o){e.forEach((function(e){var c=a(e,t,n,r,o);p.append(c)}))}(c,u,M,I,N)})).catch((function(e){console.error("Ошибка при загрузке данных:",e)})),b.addEventListener("click",(function(){A.value=L.textContent,T.value=k.textContent,s(x,D),e(f)})),q.addEventListener("click",(function(){s(j,D),e(_)})),C.addEventListener("click",(function(){s(U,D),e(m)})),E.forEach((function(e){e.addEventListener("click",(function(){t(e.closest(".popup"))}))})),document.addEventListener("click",(function(e){e.target.classList.contains("popup")&&t(e.target)})),x.addEventListener("submit",(function(e){e.preventDefault();var n,c,a=x.querySelector(".popup__button");a.textContent="Сохранение...",(n=A.value,c=T.value,fetch("".concat(r.baseUrl,"/users/me"),{method:"PATCH",headers:r.headers,body:JSON.stringify({name:n,about:c})}).then(o)).then((function(e){L.textContent=e.name,k.textContent=e.about,g.style.backgroundImage="url(".concat(e.avatar,")"),t(f)})).catch((function(e){console.error("Ошибка при обновлении данных:",e)})).finally((function(){a.textContent="Сохранить"}))})),U.addEventListener("submit",(function(e){e.preventDefault();var n,c=U.querySelector(".popup__button");c.textContent="Сохранение...",(n=w.value,fetch("".concat(r.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:r.headers,body:JSON.stringify({avatar:n})}).then(o)).then((function(e){g.style.backgroundImage="url(".concat(e.avatar,")"),t(m)})).catch((function(e){console.error("Ошибка при обновлении аватара:",e)})).finally((function(){c.textContent="Сохранить"}))})),j.addEventListener("submit",(function(e){e.preventDefault();var n,c,i=j.querySelector(".popup__button");i.textContent="Сохранение...",(n=B.value,c=O.value,fetch("".concat(r.baseUrl,"/cards"),{method:"POST",headers:r.headers,body:JSON.stringify({name:n,link:c})}).then(o)).then((function(e){var n=a(e,u,M,I,N);p.prepend(n),t(_),j.reset()})).catch((function(e){console.error("Ошибка при добавлении карточки:",e)})).finally((function(){i.textContent="Сохранить"}))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);l(n,r,t.inactiveButtonClass),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?i(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(e,t,t.validationMessage,n)}(e,o,t),l(n,r,t)}))}))}(t,e)}))}(D),function(e){document.querySelector(".popup__button_confirm").addEventListener("click",(function(){var t=document.querySelector('.card[data-id="'.concat(P,'"]'));t&&function(e,t,n){(function(e){return fetch("".concat(r.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:r.headers}).then(o)})(n).then((function(){e.remove(),t(v)})).catch((function(e){console.error("Ошибка при удалении карточки:",e)}))}(t,e,P)}))}(t)})();