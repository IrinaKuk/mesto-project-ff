// @todo: Темплейт карточки
const template = document.querySelector('#card-template').content;

// @todo: Функция создания карточки
export function createCard(name, link, deleteCard, handleLikeClick, openImagePopup) {
  const cardElement = template.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__image').alt = name;

  //обработчик добавления картинки в попап
  cardElement.querySelector('.card__image').addEventListener('click', () => openImagePopup(link, name))

  // @todo: Добавить обработчик удаления карточки
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => deleteCard(cardElement));

  // @todo: Добавить обработчик лайка
  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', handleLikeClick);

  return cardElement;
}

// @todo: Функция лайка
export function handleLikeClick(evt) {
  const likeButton = evt.target;
  likeButton.classList.toggle('card__like-button_is-active');
}

// @todo: Функция удаления карточки
export function deleteCard(cardElement) {
  const placeDelete = cardElement.closest('.card');
  placeDelete.remove();
}
