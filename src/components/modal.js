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
