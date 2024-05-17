import './styles/index.css';
import { createCard, handleLikeClick, deleteCard } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';

// @todo: DOM узлы
const place = document.querySelector('.places__item.card');
const list = document.querySelector('.places__list');

// @todo: Начальные данные
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  }
];

// @todo: Выводим карточки на страницу
initialCards.forEach(function(item) {
  list.append(createCard(item.name, item.link, deleteCard, handleLikeClick));
});


document.addEventListener('DOMContentLoaded', function() {
});

// @todo: Попапы
const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');

// @todo: Кнопки открытия попапов
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

// @todo: Кнопки закрытия попапов крестик
const closeButtons = document.querySelectorAll('.popup__close');

// @todo: Оверлей
const overlay = document.querySelectorAll('.popup');

// @todo: Обработчики кликов для открытия попапов
editButton.addEventListener('click', () => {
  openPopup(editPopup);
});

addButton.addEventListener('click', () => {
  openPopup(newCardPopup);
});

// @todo: Находим все картинки на странице
const images = document.querySelectorAll('.card__image');

// @todo: Добавляем обработчик клика к каждой картинке
images.forEach(image => {
  image.addEventListener('click', () => {
    // @todo: Заполняем попап данными из картинки
    popupImage.src = image.src;
    popupImage.alt = image.alt;
    popupCaption.textContent = image.alt;

    // @todo: Открываем попап
    openPopup(imagePopup);
  });
});

// @todo: Обработчики кликов для закрытия попапов
closeButtons.forEach(button => {
  button.addEventListener('click', () => {
    closePopup(button.closest('.popup'));
  });
});

// @todo: Форма в DOM
const formElement = document.querySelector('.popup__form[name="edit-profile"]');

// @todo: Переменые для заполнения формы редактирования профиля
const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

// @todo: Обработчик «отправки» формы
function handleFormSubmit(evt) {
  evt.preventDefault();

  // @todo: Получаем значение полей jobInput и nameInput из свойства value
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  // @todo: Вставляем новые значения с помощью textContent
  nameProfile.textContent = nameValue;
  jobProfile.textContent = jobValue;

  closePopup(editPopup);
}

// @todo: Прикрепляем обработчик к форме
formElement.addEventListener('submit', handleFormSubmit);

// @todo: добавление новой карточки
const newPlaceForm = document.querySelector('.popup__form[name="new-place"]');
const placeNameInput = newPlaceForm.querySelector('.popup__input_type_card-name');
const linkInput = newPlaceForm.querySelector('.popup__input_type_url');

function handleNewPlaceFormSubmit(evt) {
  evt.preventDefault();

  const name = placeNameInput.value;
  const link = linkInput.value;

  const newCard = createCard(name, link, deleteCard, handleLikeClick);
  list.prepend(newCard);

  closePopup(newCardPopup);

  placeNameInput.value = '';
  linkInput.value = '';
}

newPlaceForm.addEventListener('submit', handleNewPlaceFormSubmit);


































