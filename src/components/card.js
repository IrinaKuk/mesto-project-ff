import { deleteUserCard, onLike, offLike } from "./api";

// @todo: Темплейт карточки
// @todo: Функция создания карточки
export function createCard(cardData, userID, openImagePopup, deleteCard, handleLikeClick) {
  const template = document.querySelector('#card-template').content;
  const cardElement = template.querySelector('.card').cloneNode(true);

  // Получаем элементы карточки
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likesCount = cardElement.querySelector('.card__like-count');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  // Заполняем данные карточки
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  
  // Обработка кнопки удаления
  if (userID !== cardData.owner._id) {
    deleteButton.disabled = true;
    deleteButton.classList.add('visually-hidden');
  } else {
    deleteButton.addEventListener('click', () => deleteCard(cardData._id, cardElement));
  }

  // Обработка клика по изображению
  cardImage.addEventListener('click', () => openImagePopup(cardData.link, cardData.name));

  // Обработка клика по кнопке лайка
  likeButton.addEventListener('click', () => {
    handleLikeClick(likeButton, cardData._id, likesCount);
  });  
  
  // Обработка лайка
  if (Array.isArray(cardData.likes) && cardData.likes.some(user => user._id === userID)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  // Установка количества лайков
  likesCount.textContent = cardData.likes.length;

  return cardElement;
}

// @todo: Функция лайка
export function handleLikeClick(likeButton, cardId, likesCount) {
const likeMethod = likeButton.classList.contains('card__like-button_is-active') ? offLike : onLike;
    likeMethod(cardId)
      .then(res => {
        likeButton.classList.toggle('card__like-button_is-active');
        likesCount.textContent = res.likes.length;
      })
      .catch(err => console.log(err));
};

// @todo: Функция удаления карточки
export function deleteCard(id, cardElement) {
  deleteUserCard(id)
    .then(() => {
      cardElement.remove();
    })
    .catch(err => console.log(err));
}
