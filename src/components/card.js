import { deleteUserCard, onLike, offLike } from "./api";

// @todo: Темплейт карточки
// @todo: Функция создания карточки
export function createCard(cardData, userData, openImagePopup, deleteCard, handleLikeClick) {
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
  if (userData._id !== cardData.owner._id) {
    deleteButton.disabled = true;
    deleteButton.classList.add('visually-hidden');
  } else {
    deleteButton.addEventListener('click', () => deleteCard(cardData._id, cardElement));
  }

  // Обработка клика по изображению
  cardImage.addEventListener('click', () => openImagePopup(cardData.link, cardData.name));

  // Обработка лайка
  if (Array.isArray(cardData.likes) && cardData.likes.find(user => user._id === userData._id)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  // Обработка клика по кнопке лайка
  likeButton.addEventListener('click', () => {
    const likeMethod = likeButton.classList.contains('card__like-button_is-active') ? offLike : onLike;
    likeMethod(cardData._id)
      .then(res => {
        handleLikeClick(likeButton);
        likesCount.textContent = res.likes.length;
      })
      .catch(err => console.log(err));
  });

  // Установка количества лайков
  likesCount.textContent = cardData.likes.length;

  return cardElement;
}

// @todo: Функция лайка
export function handleLikeClick(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}

// @todo: Функция удаления карточки
export function deleteCard(id, cardElement) {
  deleteUserCard(id)
    .then(() => {
      cardElement.remove();
    })
    .catch(err => console.log(err));
}
