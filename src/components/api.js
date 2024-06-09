const cohortId = 'wff-cohort-14';
const token = 'f10d4701-ff74-4e36-8d61-3060e89bd3ee';

const config = {
  baseUrl: `https://nomoreparties.co/v1/${cohortId}`,
  headers: {
    authorization: token,
    'Content-Type': 'application/json'
  }
};

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

// Функция для обработки ошибок
const handleError = (err) => {
  console.log(err); 
};

// Загрузка карточек с сервера
export const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers,
  })
  .then(handleResponse)
  .catch(handleError);
};

// Загрузка информации о пользователе с сервера
export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers,
  })
  .then(handleResponse)
  .catch(handleError);
};

// Обновление информации о пользователе на сервере
export const updateUserInfo = (name, about, button) => {
  button.textContent = 'Сохранение...';
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
  .then(handleResponse)
  .catch(handleError)
  .finally(() => {
    button.textContent = 'Сохранить';
  });
};

// Добавление новой карточки
export const addCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  .then(handleResponse)
  .catch(handleError);
};

// Оновление изображения аватара
export const updateAvatar = (url, button) => {
  button.textContent = 'Сохранение...';
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: url
    })
  })
  .then(handleResponse)
  .catch(handleError)
  .finally(() => {
    button.textContent = 'Сохранить';
  });
};

// Удаление карточки
export const deleteUserCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(handleResponse)
  .catch(handleError);
};

// Выставление лайка
export const onLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })
  .then(handleResponse)
  .catch(handleError);
};

// Удаление лайка
export const offLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(handleResponse)
  .catch(handleError);
};