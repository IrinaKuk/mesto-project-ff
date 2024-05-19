import './styles/index.css';
import { initialCards } from './components/cards.js';
import { createCard, handleLikeClick, deleteCard } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';

// @todo: DOM узлы
const list = document.querySelector('.places__list');

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

// @todo: Обработчики кликов для открытия попапов
editButton.addEventListener('click', () => {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  openPopup(editPopup);
});

addButton.addEventListener('click', () => {
  openPopup(newCardPopup);
});

// @todo: Функция открытия попапа с картинкой
function openImagePopup(link, alt) {
  popupImage.src = link;
  popupImage.alt = alt;
  popupCaption.textContent = alt;
  openPopup(imagePopup);
}

// @todo: Обработчики кликов для закрытия попапов
closeButtons.forEach(button => {
  button.addEventListener('click', () => {
    closePopup(button.closest('.popup'));
  });
});

// @todo: Форма в DOM
const editProfileForm = document.querySelector('.popup__form[name="edit-profile"]');

// @todo: Переменые для заполнения формы редактирования профиля
const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

// @todo: Обработчик «отправки» формы
function handleEditProfileFormSubmit(evt) {
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
editProfileForm.addEventListener('submit', handleEditProfileFormSubmit);

// @todo: добавление новой карточки
const newPlaceForm = document.querySelector('.popup__form[name="new-place"]');
const placeNameInput = newPlaceForm.querySelector('.popup__input_type_card-name');
const linkInput = newPlaceForm.querySelector('.popup__input_type_url');

//метод вывода и заполнения попапа карточки
function addImageClickHandler(cardElement) {
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.addEventListener('click', () => {
    openImagePopup(cardImage.src, cardImage.alt);
  });
}

function handleNewPlaceFormSubmit(evt) {
  evt.preventDefault();

  const name = placeNameInput.value;
  const link = linkInput.value;

  const newCard = createCard(name, link, deleteCard, handleLikeClick, openImagePopup);
  list.prepend(newCard);

  closePopup(newCardPopup);

  newPlaceForm.reset();
  addImageClickHandler(newCard); 
}

newPlaceForm.addEventListener('submit', handleNewPlaceFormSubmit);

// @todo: Выводим карточки на страницу
initialCards.forEach(function(item) {
  const newCard = createCard(item.name, item.link, deleteCard, handleLikeClick, openImagePopup);
  list.append(newCard);
  addImageClickHandler(newCard);
});
