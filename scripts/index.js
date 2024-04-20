// @todo: Темплейт карточки
const template = document.querySelector('#card-template').content;
// @todo: DOM узлы
const place = document.querySelector('.places__item card');
const list = document.querySelector('.places__list');
// @todo: Функция создания карточки
function createCard(name, link, deleteCard) {
	const cardElement = template.querySelector('.card').cloneNode(true);
	cardElement.querySelector('.card__title').textContent = name;
	cardElement.querySelector('.card__image').src = link;
	cardElement.querySelector('.card__image').alt = name;
	const deleteButton = cardElement.querySelector('.card__delete-button');
	deleteButton.addEventListener('click', () => deleteCard(deleteButton));
  return cardElement;
}
// @todo: Функция удаления карточки
function deleteCard(deleteButton) {
	const placeDelete = deleteButton.closest('.card');
	placeDelete.remove();
}
// @todo: Вывести карточки на страницу
initialCards.forEach(function(item) {
	list.append(createCard(item.name, item.link, deleteCard));
});

