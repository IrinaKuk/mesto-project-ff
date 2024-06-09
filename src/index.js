import './styles/index.css';
import { createCard, handleLikeClick, deleteCard } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { 
  updateAvatar, 
  getCards, 
  getUserInfo, 
  updateUserInfo, 
  addCard 
} from './components/api.js';

// DOM узлы
const list = document.querySelector('.places__list');
const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const popupAvatar = document.querySelector('.popup_change-avatar');

// Кнопки открытия попапов
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editAvatar = document.querySelector('.profile__image');

// Кнопки закрытия попапов крестик
const closeButtons = document.querySelectorAll('.popup__close');

// Форма в DOM
const profileForm = document.querySelector('.popup__form[name="edit-profile"]');
const newPlaceForm = document.querySelector('.popup__form[name="new-place"]');
const editProfileAvatarForm = document.querySelector('.popup__form[name="new-avatar"]');

// Переменные для заполнения формы редактирования профиля и изображения профиля
const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const avatarInput = document.querySelector('.popup__input_avatar');

// Валидация формы
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

enableValidation(validationConfig);

// Очистка ошибок при открытии попапов
profileForm.addEventListener('reset', () => clearValidation(profileForm, validationConfig));
newPlaceForm.addEventListener('reset', () => clearValidation(newPlaceForm, validationConfig));
editProfileAvatarForm.addEventListener('reset', () => clearValidation(editProfileAvatarForm, validationConfig));

// Функция открытия попапа с картинкой
function openImagePopup(link, alt) {
  const popupImage = imagePopup.querySelector('.popup__image');
  const popupCaption = imagePopup.querySelector('.popup__caption');

  popupImage.src = link;
  popupImage.alt = alt;
  popupCaption.textContent = alt;
  openPopup(imagePopup);
}

// Обработчики кликов для открытия попапов
editButton.addEventListener('click', () => {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  openPopup(editPopup);
});

editAvatar.addEventListener('click', () => {
  openPopup(popupAvatar);
});

addButton.addEventListener('click', () => {
  openPopup(newCardPopup);
});

// Обработчики кликов для закрытия попапов
closeButtons.forEach(button => {
  button.addEventListener('click', () => {
    closePopup(button.closest('.popup'));
  });
});

// Обработчик «отправки» формы
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  const button = profileForm.querySelector('.popup__button');

  nameProfile.textContent = nameValue;
  jobProfile.textContent = jobValue;

  closePopup(editPopup);
  updateUserInfo(nameValue, jobValue, button);
}

// Обработчик «отправки» формы добавления карточки
function handleNewPlaceFormSubmit(evt) {
  evt.preventDefault();
  const cardData = {
    name: placeNameInput.value,
    link: linkInput.value,
    owner: { _id: userId },
    likes: " "
  };
  const button = newPlaceForm.querySelector('.popup__button');

  button.textContent = 'Сохранение...';
  addCard(cardData.name, cardData.link, button)
    .then(newCardData => {
      const newCard = createCard(newCardData, openImagePopup, deleteCard, handleLikeClick);
      list.prepend(newCard);
      closePopup(newCardPopup);
      newPlaceForm.reset();
    })
    .finally(() => {
      button.textContent = 'Сохранить';
    });
}

// Обработчик «отправки» формы изменения аватара
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const avatarUrl = avatarInput.value;
  const button = editProfileAvatarForm.querySelector('.popup__button');

  editAvatar.style['background-image'] = `url('${avatarUrl}')`;
  updateAvatar(avatarUrl, button)
    .then(() => closePopup(popupAvatar));
}

// Выполняем оба запроса одновременно
let userId;
Promise.all([getCards(), getUserInfo()])
  .then(([cardsData, userData]) => {
    // Отображаем информацию о пользователе
    document.getElementById('user-name').textContent = userData.name;
    document.getElementById('user-about').textContent = userData.about;
    document.getElementById('user-avatar').style['background-image'] = `url('${userData.avatar}')`;
    userId = userData._id;
    // Отображаем карточки, передавая _id пользователя в функцию createCard
    cardsData.forEach(cardInfo => {
      const newCard = createCard(cardInfo, userData, openImagePopup, deleteCard, handleLikeClick);
      list.append(newCard);
    });
  })
  .catch(err => console.error(err)); // Обработка общей ошибки

// Прикрепляем обработчики к формам
profileForm.addEventListener('submit', handleProfileFormSubmit);
newPlaceForm.addEventListener('submit', handleNewPlaceFormSubmit);
editProfileAvatarForm.addEventListener('submit', handleAvatarFormSubmit);

// Прикрепляем обработчик к DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
});