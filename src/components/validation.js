// Функция для проверки ввода данных в поля «Имя» и «Название»

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

export function checkInputValidity(input, error) {
  if (!input.validity.valid) {
    showError(input, input.validationMessage, error);
  } else {
    hideError(input, error);
  }
}

// Функция для установки сообщения об ошибке
function setErrorMessage(input, message) {
  input.classList.add(validationConfig.inputErrorClass);
  const errorElement = input.nextElementSibling;
  errorElement.textContent = message;
  errorElement.classList.add(validationConfig.errorClass);
}

// Функция для очистки сообщения об ошибке
function clearErrorMessage(input) {
  input.classList.remove(validationConfig.inputErrorClass);
  const errorElement = input.nextElementSibling;
  errorElement.textContent = '';
  errorElement.classList.remove(validationConfig.errorClass);
}
// Функция для проверки валидности всех полей формы
function hasInvalidInput(form, inputSelector) {
  const inputList = Array.from(form.querySelectorAll(inputSelector));
  return inputList.some(input => !input.validity.valid);
}


// Функция для включения валидации форм
export function enableValidation(settings) {
  const {
    formSelector,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
  } = settings;

// Функция для управления состоянием кнопки "Сохранить"
function toggleButtonState(form, button, inactiveButtonClass) {
  if (hasInvalidInput(form, inputSelector)) {
    button.disabled = true;
    button.classList.add(inactiveButtonClass);
  } else {
    button.disabled = false;
    button.classList.remove(inactiveButtonClass);
  }
}

  const formList = Array.from(document.querySelectorAll(formSelector));

  // Инициализация валидации для каждой формы
  formList.forEach(form => {
    const buttonElement = form.querySelector(submitButtonSelector);
    const inputElements = form.querySelectorAll(inputSelector);

    // Обработчики событий для полей ввода
    inputElements.forEach(input => {
      input.addEventListener('input', () => {
        checkInputValidity(input, input.nextElementSibling);
        toggleButtonState(form, buttonElement, inactiveButtonClass);
      });
    });

    // Обработчик события для отправки формы
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
  });
}

// Функция для очистки ошибок валидации формы
export function clearValidation(form, settings) {
  const {
    inputSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass
  } = settings;

  const inputElements = form.querySelectorAll(inputSelector);
  const buttonElement = form.querySelector('.popup__button');

  // Очищаем сообщения об ошибках для каждого поля
  inputElements.forEach(input => {
    clearErrorMessage(input);
  });

  // Делаем кнопку неактивной
  buttonElement.disabled = true;
  buttonElement.classList.add(inactiveButtonClass);
}

export function showError(input, errorMessage, error) {
  input.classList.add('form__input_type_error');
  if (error) {
    error.textContent = errorMessage;
    error.classList.add('form__input-error_active');
  }
}

export function hideError(input, error) {
  input.classList.remove('form__input_type_error');
  if (error) {
    error.classList.remove('form__input-error_active');
    error.textContent = '';
  }
}

export function validateInput(input, error, regex, message) {
  if (regex.test(input.value)) {
    hideError(input, error);
  } else {
    showError(input, message, error);
  }
}


