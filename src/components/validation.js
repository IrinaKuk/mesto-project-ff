function checkInputValidity(input, error, validationConfig) {
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
  } else {
    input.setCustomValidity('');
  }
  if (!input.validity.valid) {
    showError(input, input.validationMessage, error, validationConfig);
  } else {
    hideError(input, error, validationConfig);
  }
}

// Функция для установки сообщения об ошибке
function setErrorMessage(input, message, validationConfig) {
  input.classList.add(validationConfig.inputErrorClass);
  const errorElement = input.nextElementSibling;
  errorElement.textContent = message;
  errorElement.classList.add(validationConfig.errorClass);
}

// Функция для очистки сообщения об ошибке
function clearErrorMessage(input, validationConfig) {
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
    errorClass
  } = settings;

  const disableSubmitButton = (button, config) => {
    button.disabled = true;
    button.classList.add(inactiveButtonClass);
  }


// Функция для управления состоянием кнопки "Сохранить"
function toggleButtonState(form, button, inactiveButtonClass, validationConfig) {
  if (hasInvalidInput(form, inputSelector)) {
    disableSubmitButton(button, validationConfig);
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
        checkInputValidity(input, input.nextElementSibling, settings);
        toggleButtonState(form, buttonElement, inactiveButtonClass, settings);
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

  const inputElements = form.querySelectorAll(settings.inputSelector);
  const buttonElement = form.querySelector(settings.inactiveButtonClass);

  // Очищаем сообщения об ошибках для каждого поля
  inputElements.forEach(input => {
    clearErrorMessage(input, settings);
  });

  // Делаем кнопку неактивной
  buttonElement.disabled = true;
  buttonElement.classList.add(inactiveButtonClass);
}

function showError(input, errorMessage, error, validationConfig) {
  input.classList.add(validationConfig.inputErrorClass);
  if (error) {
    error.textContent = errorMessage;
    error.classList.add(validationConfig.errorClass);
  }
}

function hideError(input, error, validationConfig) {
  input.classList.remove(validationConfig.inputErrorClass);
  if (error) {
    error.classList.remove(validationConfig.errorClass);
    error.textContent = '';
  }
}

function validateInput(input, error, regex, message, validationConfig) {
  if (regex.test(input.value)) {
    hideError(input, error, validationConfig);
  } else {
    showError(input, message, error, validationConfig);
  }
}