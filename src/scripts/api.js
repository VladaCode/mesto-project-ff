// Конфигурация API, содержащая базовый URL и заголовки для запросов
const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-29', // Базовый URL для API
  headers: {
    authorization: '94c11d00-6720-42bc-ab9d-b06acc1f216c', // Токен авторизации для доступа к API
    'Content-Type': 'application/json' // Указываем, что данные будут в формате JSON
  }
};

// Функция для получения информации о текущем пользователе
export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, { // Выполняем GET-запрос к API
    method: 'GET', // Метод запроса
    headers: config.headers // Заголовки запроса
  })
  .then(res => {
    if (res.ok) { // Проверяем, успешен ли ответ
      return res.json(); // Если да, возвращаем данные в формате JSON
    }
    return Promise.reject(`Ошибка: ${res.status}`); // В случае ошибки, возвращаем сообщение об ошибке
  });
};

// Функция для получения начального списка карточек
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, { // Выполняем GET-запрос к API для получения карточек
    method: 'GET', // Метод запроса
    headers: config.headers // Заголовки запроса
  })
  .then(res => {
    if (res.ok) { // Проверяем, успешен ли ответ
      return res.json(); // Если да, возвращаем данные в формате JSON
    }
    return Promise.reject(`Ошибка: ${res.status}`); // В случае ошибки, возвращаем сообщение об ошибке
  });
};

// Функция для обновления информации о пользователе
export const updateUserInfo = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, { // Выполняем PATCH-запрос для обновления данных пользователя
    method: 'PATCH', // Метод запроса
    headers: config.headers, // Заголовки запроса
    body: JSON.stringify({ name, about }) // Передаем обновленные данные в формате JSON
  })
  .then(res => {
    if (res.ok) { // Проверяем, успешен ли ответ
      return res.json(); // Если да, возвращаем данные в формате JSON
    }
    return Promise.reject(`Ошибка: ${res.status}`); // В случае ошибки, возвращаем сообщение об ошибке
  });
};

// Функция для обновления аватара пользователя
export const updateAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, { // Выполняем PATCH-запрос для обновления аватара
    method: 'PATCH', // Метод запроса
    headers: config.headers, // Заголовки запроса
    body: JSON.stringify({ avatar }) // Передаем новый аватар в формате JSON
  })
  .then(res => {
    if (res.ok) { // Проверяем, успешен ли ответ
      return res.json(); // Если да, возвращаем данные в формате JSON
    }
    return Promise.reject(`Ошибка: ${res.status}`); // В случае ошибки, возвращаем сообщение об ошибке
  });
};

// Функция для добавления новой карточки
export const addCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, { // Выполняем POST-запрос для создания новой карточки
    method: 'POST', // Метод запроса
    headers: config.headers, // Заголовки запроса
    body: JSON.stringify({ name, link }) // Передаем данные карточки в формате JSON
  })
  .then(res => {
    if (res.ok) { // Проверяем, успешен ли ответ
      return res.json(); // Если да, возвращаем данные в формате JSON
    }
    return Promise.reject(`Ошибка: ${res.status}`); // В случае ошибки, возвращаем сообщение об ошибке
  });
};

// Функция для удаления карточки
export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, { // Выполняем DELETE-запрос для удаления карточки по ID
    method: 'DELETE', // Метод запроса
    headers: config.headers // Заголовки запроса
  })
  .then(res => {
    if (res.ok) { // Проверяем, успешен ли ответ
      return res.json(); // Если да, возвращаем данные в формате JSON
    }
    return Promise.reject(`Ошибка: ${res.status}`); // В случае ошибки, возвращаем сообщение об ошибке
  });
};

// Функция для изменения статуса лайка карточки
export const changeLikeCardStatus = (cardId, isLiked) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, { // Выполняем запрос для изменения статуса лайка
    method: isLiked ? 'DELETE' : 'PUT', // Если карточка уже лайкнута, используем DELETE, иначе PUT
    headers: config.headers // Заголовки запроса
  })
  .then(res => {
    if (res.ok) { // Проверяем, успешен ли ответ
      return res.json(); // Если да, возвращаем данные в формате JSON
    }
    return Promise.reject(`Ошибка: ${res.status}`); // В случае ошибки, возвращаем сообщение об ошибке
  });
};

