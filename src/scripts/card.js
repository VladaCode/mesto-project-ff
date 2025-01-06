import { deleteCard as apiDeleteCard, changeLikeCardStatus } from './api.js';

// Глобальная переменная для хранения ID карточки, которую нужно удалить
let idCardForDelete = null;

// Получаем шаблон карточки из HTML
const cardTemplate = document.querySelector("#card-template").content;

// Функция для создания карточки. Принимает данные карточки и функции для обработки лайков и открытия изображений
export function createCard(dataCard, likeCard, openImagePopup, userId, openPopup) {
  // Клонируем шаблон карточки для создания нового элемента
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.setAttribute("data-id", dataCard._id); // Устанавливаем атрибут data-id для идентификации карточки

  // Получаем элементы карточки
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button"); // Находим кнопку лайка
  const cardImage = cardElement.querySelector(".card__image"); // Находим изображение карточки
  const likesCount = cardElement.querySelector(".card__like-count"); // Находим элемент для отображения количества лайков

  // Устанавливаем значения для элементов карточки
  cardImage.src = dataCard.link; // Устанавливаем ссылку на изображение
  cardImage.alt = dataCard.name; // Устанавливаем альтернативный текст для изображения
  cardTitle.textContent = dataCard.name; // Устанавливаем название карточки
  likesCount.textContent = dataCard.likes.length; // Устанавливаем количество лайков

  // Проверяем, лайкнута ли карточка текущим пользователем и обновляем состояние кнопки лайка
  if (dataCard.likes.some((like) => like._id === userId)) {
    likeButton.classList.add("card__like-button_is-active"); // Активируем кнопку лайка
  }

  // Проверяем, является ли текущий пользователь владельцем карточки
  if (dataCard.owner._id === userId) {
    // Если карточка создана пользователем, показываем кнопку удаления
    deleteButton.style.display = "block";

    // Добавляем обработчик события для кнопки удаления карточки
    deleteButton.addEventListener("click", () => {
      idCardForDelete = dataCard._id; // Устанавливаем ID карточки для удаления
      openPopup(document.querySelector(".popup_type_delete")); // Открываем попап подтверждения удаления
    });
  } else {
    // Если карточка не создана пользователем, скрываем кнопку удаления
    deleteButton.style.display = "none";
  }

  // Добавляем обработчик события для кнопки лайка
  likeButton.addEventListener("click", () => {
    likeCard(likeButton, dataCard._id, likesCount); // Вызов функции для обработки лайка
  });

  // Добавляем обработчик события для клика на изображение карточки
  cardImage.addEventListener("click", () => {
    openImagePopup(dataCard); // Открываем попап с изображением карточки
  });

  return cardElement; // Возвращаем созданный элемент карточки
}

// Функция для удаления карточек
export function deleteCard(cardElement, closePopup) {
  apiDeleteCard(idCardForDelete)
    .then(() => {
      cardElement.remove(); // Удаляем карточку из DOM
      closePopup(document.querySelector(".popup_type_delete")); // Закрываем попап подтверждения
      idCardForDelete = null; // Сбрасываем глобальную переменную
    })
    .catch((err) => {
      console.error("Ошибка при удалении карточки:", err); // Логируем ошибку
    });
}

// Настраиваем обработчик события на клик по кнопке подтверждения удаления
export function setupDeleteButton(closePopup) {
  // Находим кнопку подтверждения
  document.querySelector(".popup__button_confirm").addEventListener("click", () => {
      const cardElement = document.querySelector(`.card[data-id="${idCardForDelete}"]`); // Находим карточку по data-id
      if (cardElement) {
        deleteCard(cardElement, closePopup); // Вызываем функцию удаления карточки
      }
    });
}

// Функция для обработки лайков
export function likeCard(likeButton, cardId, likesCount) {
  const isLiked = likeButton.classList.contains("card__like-button_is-active"); // Проверяем, лайкнута ли карточка
  changeLikeCardStatus(cardId, isLiked)
    .then((data) => {
      likeButton.classList.toggle("card__like-button_is-active"); // Переключаем состояние кнопки лайка
      likesCount.textContent = data.likes.length; // Обновляем количество лайков
    })
    .catch((err) => {
      console.error("Ошибка при изменении лайка:", err); // Логируем ошибку
    });
}