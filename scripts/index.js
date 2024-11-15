// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

//Привет, я пыталась максимально всё развёрнуто расписать, чтобы моржно было быстро проверить)

//Получили элименты в DOM
const placesList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

//Ф-ция для создания карточки. Принимает в аргументах данные одной карточки и функцию-колбэк для удаления
function createCard(dataCard, deleteCallback) {
  // Кланируем шаблон карточки
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  // Устанавливаем значения вложенных элементов
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  // Устанавливаем  атрибуты(src, alt, textContent) для отображение элиментов
  cardImage.src = dataCard.link;
  cardImage.alt = dataCard.name;
  cardTitle.textContent = dataCard.name;

  // Добавляем обработчик события для кнопки удаления
  deleteButton.addEventListener("click", () => {
    deleteCallback(cardElement);
  });
  return cardElement;
}

// Функция для добавления карточек на страницу
//Объявляем функции
function generateCards(cards, del) {
  // Итерация по массиву
  cards.forEach((cardInfo) => {
    // Создаём карточки
    const cardElement = createCard(cardInfo, del);
    placesList.append(cardElement); // Добавляем карточку в список
  });
   
}

//Функция удаление карточек
function deleteCard(cardElement) {
  cardElement.remove();
}

// Вызываем функцию для рендеринга карточек
generateCards(initialCards, deleteCard);
