import './pages/index.css'; // добавьте импорт главного файла стилей  
import { initialCards } from './scripts/cards.js'; 
import {openPopup, closePopup} from './scripts/modal.js';
import { createCard } from './scripts/card.js';

 
//Получили элименты в DOM  
const placesList = document.querySelector(".places__list");  

// Получаем элементы модальных окон и кнопок  
const editProfilePopup = document.querySelector('.popup_type_edit');  
const newCardPopup = document.querySelector('.popup_type_new-card');  
const imagePopup = document.querySelector('.popup_type_image');   
  
const editProfileButton = document.querySelector('.profile__edit-button');  
const addCardButton = document.querySelector('.profile__add-button');  
  
const closeButtons = document.querySelectorAll('.popup__close');  

// Получаем эдименты профеля
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

//Получаем форму для отправки редактирование
const formElement = editProfilePopup.querySelector('.popup__form'); // Находим форму в DOM
const nameInput = editProfilePopup.querySelector('.popup__input_type_name'); // Находим поле имени
const jobInput = editProfilePopup.querySelector('.popup__input_type_description'); // Находим поле описания

// Получаем форму для добавления новой карточки
const newCardForm = newCardPopup.querySelector('.popup__form'); 
const cardNameInput = newCardPopup.querySelector('.popup__input_type_card-name'); 
const cardLinkInput = newCardPopup.querySelector('.popup__input_type_url'); 




// Функция для добавления карточек на страницу  
//Объявляем функции (dataCard, deleteCallback, likeCard, openImagePopup)
function generateCards(cards, del, like, openImage) {  
  // Итерация по массиву  
  cards.forEach((cardInfo) => {  
    // Создаём карточки  
    const cardElement = createCard(cardInfo, del, like, openImage);   
    placesList.append(cardElement); // Добавляем карточку в список  
  });  
     
}  
//Функция удаление карточек  
function deleteCard(cardElement) {  
  cardElement.remove();  
}  

//Функция обработчика лайка
function likeCard(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}

function openImagePopup(dataCard) {
  const imagePopupCard = imagePopup.querySelector('.popup__image');  
  const imagePopupCaption = imagePopup.querySelector('.popup__caption');  
  // Устанавливаем src и alt для изображения в модальном окне
  imagePopupCard.src = dataCard.link;  
  imagePopupCard.alt = dataCard.name;  
  // Устанавливаем текст заголовка в модальном окне
  imagePopupCaption.textContent = dataCard.name;  
  // Открываем модальное окно с изображением
  openPopup(imagePopup);  
}

// Вызываем функцию для рендеринга карточек  
generateCards( initialCards, deleteCard, likeCard, openImagePopup);




// Открываем модальное окно редактирования профиля  
editProfileButton.addEventListener('click', () => {  
 // Заполняем поля формы значениями из профиля
//  const nameInput = editProfilePopup.querySelector('.popup__input_type_name');
//  const descriptionInput = editProfilePopup.querySelector('.popup__input_type_description');


 nameInput.value = profileTitle.textContent; // Заполняем поле имени
 jobInput.value = profileDescription.textContent; // Заполняем поле описания
 
 openPopup(editProfilePopup); 
});  

// Открываем модальное окно добавления новой карточки  
addCardButton.addEventListener('click', () => {  
  openPopup(newCardPopup);  
});  

// Закрываем модальные окна при нажатии на кнопку
closeButtons.forEach(button => {  
  button.addEventListener('click', () => {  
      const popup = button.closest('.popup');  
      closePopup(popup);  
  });  
});  

// Закрытие попапа кликом на оверлей через делегирование событий
document.addEventListener('click',  (event) =>  {
  const popup = event.target.closest('.popup'); // Проверяем есть ли клик по попапу 
  if(popup && event.target === popup) {
    closePopup(popup);  
  }

})

// Обработчик закрытия попапа при нажатии клавиши Esc
function EscClose(evt) {
  // Проверяем, была ли нажата клавиша 'Esc'
  if(evt.key === 'Escape' ) {
     // Находим открытое модальное окно с классом popup_is-opened
    const openPopup = document.querySelector('.popup_is-opened'); 
    // Если найдено открытое модальное окно
    if (openPopup) { 
      // Закрываем его, вызывая функцию closePopup
      closePopup(openPopup); 
    } 
  } 
}

document.addEventListener('keydown', EscClose);


//// Обработчик «отправки» формы редактирование, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault();
   // Получаем значения полей
   const newName = nameInput.value;
   const newDescription = jobInput.value;

   // Вставляем новые значения в элементы профиля
   profileTitle.textContent = newName;
   profileDescription.textContent = newDescription;

   // Закрываем попап
   closePopup(editProfilePopup);

}

// Прикрепляем обработчик к форме
formElement.addEventListener('submit', handleFormSubmit);








// Обработчик «отправки» формы добавления новой карточки
function handleNewCardSubmit(evt) {
  evt.preventDefault();
  
  // Получаем значения полей
  const newCardName = cardNameInput.value;
  const newCardLink = cardLinkInput.value;

  // Создаем объект новой карточки
  const newInitialCards = {
    name: newCardName,
    link: newCardLink
  };

  // Создаем карточку и добавляем её в начало списка
  const newCardElement = createCard(newInitialCards, deleteCard);
  placesList.prepend(newCardElement); // Добавляем карточку в начало списка

  // Закрываем попап и очищаем поля формы
  closePopup(newCardPopup);
  cardNameInput.value = ''; // Очищаем поле имени
  cardLinkInput.value = ''; // Очищаем поле ссылки
}

// Прикрепляем обработчик к форме
newCardForm.addEventListener('submit', handleNewCardSubmit);