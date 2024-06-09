import { validateInput, hideError, checkInputValidity, clearValidation, validationConfig } from './validation.js';

// @todo: Функция открытия попапа
export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscClose);
  document.addEventListener('mousedown', handleOverlayClose);
}

// @todo: Функция закрытия попапа
export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscClose);
  document.removeEventListener('mousedown', handleOverlayClose);
  const form = popup.querySelector('.popup__form');
  if (form) {
    clearValidation(form, validationConfig);
    form.querySelectorAll('.popup__input').forEach(input => {
      input.classList.remove('form__input_type_error');
      input.value = '';
    });
  }
}

// @todo: Обработчик события нажатия на оверлей
function handleOverlayClose(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
}

// @todo: Обработчик события нажатия на кнопку Escape
function handleEscClose(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

// Валидация формы «Редактировать профиль»

const editProfileForm = document.querySelector('.popup__form[name="edit-profile"]');
const nameInput = document.getElementById('name-input');
const descriptionInput = document.getElementById('description-input');
const nameError = document.getElementById('name-input-error');
const descriptionError = document.getElementById('description-input-error');

const nameRegex = /^[а-яА-ЯёЁa-zA-Z\- ]+$/;
const descriptionRegex = /^[а-яА-ЯёЁa-zA-Z\- ]+$/;

// Валидация формы «Новое место»

const newCardForm = document.querySelector('.popup__form[name="new-place"]');
const placeNameInput = document.getElementById('place-name-input');
const linkInput = document.getElementById('link-input');
const placeNameError = document.getElementById('place-name-input-error');
const linkError = document.getElementById('link-input-error');

const placeNameRegex = /^[а-яА-ЯёЁa-zA-Z\- ]{2,30}$/;

// Обработчики событий для форм

// Редактировать профиль
editProfileForm.addEventListener('submit', (evt) => evt.preventDefault());
nameInput.addEventListener('input', () => {
  validateInput(nameInput, nameError, nameRegex, 'Допустимы только буквы, пробелы и дефисы');
  checkInputValidity(nameInput, nameError);
});
descriptionInput.addEventListener('input', () => {
  validateInput(descriptionInput, descriptionError, descriptionRegex, 'Допустимы только буквы, пробелы и дефисы');
  checkInputValidity(descriptionInput, descriptionError);
});

// Новое место
newCardForm.addEventListener('submit', (evt) => evt.preventDefault());
placeNameInput.addEventListener('input', () => {
  validateInput(placeNameInput, placeNameError, placeNameRegex, 'Допустимы только буквы, пробелы и дефисы, от 2 до 30 символов');
  checkInputValidity(placeNameInput, placeNameError);
});
linkInput.addEventListener('input', () => checkInputValidity(linkInput, linkError)); // Проверка ссылки

// Очистка ошибок валидации формы
newCardForm.addEventListener('reset', () => {
  hideError(placeNameInput, placeNameError);
  hideError(linkInput, linkError);
  newCardForm.querySelector('.popup__button').disabled = true;
});