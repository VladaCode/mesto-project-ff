(()=>{"use strict";function e(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",n)}function t(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",n)}function n(e){if("Escape"===e.key){var n=document.querySelector(".popup_is-opened");n&&t(n)}}var o=document.querySelector("#card-template").content;function r(e,t,n,r){var c=o.querySelector(".card").cloneNode(!0),p=c.querySelector(".card__title"),u=c.querySelector(".card__delete-button"),a=c.querySelector(".card__like-button"),i=c.querySelector(".card__image");return i.src=e.link,i.alt=e.name,p.textContent=e.name,a.addEventListener("click",(function(){n(a)})),u.addEventListener("click",(function(){t(c)})),i.addEventListener("click",(function(){r(e)})),c}function c(e){e.remove()}var p,u,a,i=document.querySelector(".places__list"),d=document.querySelector(".popup_type_edit"),l=document.querySelector(".popup_type_new-card"),s=document.querySelector(".popup_type_image"),_=s.querySelector(".popup__image"),m=s.querySelector(".popup__caption"),y=document.querySelector(".profile__edit-button"),v=document.querySelector(".profile__add-button"),f=document.querySelectorAll(".popup__close"),k=document.querySelector(".profile__title"),q=document.querySelector(".profile__description"),S=d.querySelector(".popup__form"),L=d.querySelector(".popup__input_type_name"),g=d.querySelector(".popup__input_type_description"),E=l.querySelector(".popup__form"),h=l.querySelector(".popup__input_type_card-name"),x=l.querySelector(".popup__input_type_url");p=c,u=function(e){e.classList.toggle("card__like-button_is-active")},a=function(t){_.src=t.link,_.alt=t.name,m.textContent=t.name,e(s)},[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(e){var t=r(e,p,u,a);i.append(t)})),y.addEventListener("click",(function(){L.value=k.textContent,g.value=q.textContent,e(d)})),v.addEventListener("click",(function(){e(l)})),f.forEach((function(e){e.addEventListener("click",(function(){t(e.closest(".popup"))}))})),document.addEventListener("click",(function(e){e.target.classList.contains("popup")&&t(e.target)})),S.addEventListener("submit",(function(e){e.preventDefault();var n=L.value,o=g.value;k.textContent=n,q.textContent=o,t(d)})),E.addEventListener("submit",(function(e){e.preventDefault();var n=r({name:h.value,link:x.value},c);i.prepend(n),t(l),E.reset()}))})();