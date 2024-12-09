
const cardTemplate = document.querySelector("#card-template").content;  

//Ф-ция для создания карточки. Принимает в аргументах данные одной карточки и функцию-колбэк для удаления  
export function createCard(dataCard, deleteCallback, likeCard, openImagePopup) {  
    // Кланируем шаблон карточки  
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);  
    
    // Устанавливаем значения вложенных элементов  
    const cardTitle = cardElement.querySelector(".card__title");  
    const deleteButton = cardElement.querySelector(".card__delete-button");  
    const likeButton = cardElement.querySelector(".card__like-button"); // Находим кнопку лайка
    const cardImage = cardElement.querySelector(".card__image");  //Находим изображения
    
    // Устанавливаем  атрибуты(src, alt, textContent) для отображение элиментов  
    cardImage.src = dataCard.link;  
    cardImage.alt = dataCard.name;  
    cardTitle.textContent = dataCard.name;  
  
    likeButton.addEventListener('click', () => {
      likeCard(likeButton);  //Вызов функции обработчика лайка 
    });
    
    // Добавляем обработчик события для кнопки удаления  
    deleteButton.addEventListener('click', () => {  
      deleteCallback(cardElement);
    });  
  
    cardImage.addEventListener('click', () => {
      openImagePopup(dataCard);
    });
  
    return cardElement;  
  }  

  //Функция удаление карточек  
export function deleteCard(cardElement) {  
  cardElement.remove();  
}  

//Функция обработчика лайка
export function likeCard(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}
