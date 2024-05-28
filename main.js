(()=>{"use strict";var e=document.querySelector("#card-template").content;function t(t,n,o,r,c){var p=e.querySelector(".card").cloneNode(!0);return p.querySelector(".card__title").textContent=t,p.querySelector(".card__image").src=n,p.querySelector(".card__image").alt=t,p.querySelector(".card__image").addEventListener("click",(function(){return c(n,t)})),p.querySelector(".card__delete-button").addEventListener("click",(function(){return o(p)})),p.querySelector(".card__like-button").addEventListener("click",r),p}function n(e){e.target.classList.toggle("card__like-button_is-active")}function o(e){e.closest(".card").remove()}function r(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",u),document.addEventListener("mousedown",p)}function c(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",u),document.removeEventListener("mousedown",p)}function p(e){e.target.classList.contains("popup")&&c(e.target)}function u(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&c(t)}}var d=document.querySelector(".places__list");document.addEventListener("DOMContentLoaded",(function(){}));var a=document.querySelector(".popup_type_edit"),i=document.querySelector(".popup_type_new-card"),s=document.querySelector(".popup_type_image"),l=s.querySelector(".popup__image"),_=s.querySelector(".popup__caption"),m=document.querySelector(".profile__edit-button"),y=document.querySelector(".profile__add-button"),v=document.querySelectorAll(".popup__close");function f(e,t){l.src=e,l.alt=t,_.textContent=t,r(s)}m.addEventListener("click",(function(){L.value=S.textContent,g.value=k.textContent,r(a)})),y.addEventListener("click",(function(){r(i)})),v.forEach((function(e){e.addEventListener("click",(function(){c(e.closest(".popup"))}))}));var q=document.querySelector('.popup__form[name="edit-profile"]'),S=document.querySelector(".profile__title"),k=document.querySelector(".profile__description"),L=document.querySelector(".popup__input_type_name"),g=document.querySelector(".popup__input_type_description");q.addEventListener("submit",(function(e){e.preventDefault();var t=L.value,n=g.value;S.textContent=t,k.textContent=n,c(a)}));var E=document.querySelector('.popup__form[name="new-place"]'),h=E.querySelector(".popup__input_type_card-name"),x=E.querySelector(".popup__input_type_url");E.addEventListener("submit",(function(e){e.preventDefault();var r=t(h.value,x.value,o,n,f);d.prepend(r),c(i),E.reset()})),[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(e){var r=t(e.name,e.link,o,n,f);d.append(r)}))})();