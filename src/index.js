import './pages/index.css'; // добавьте импорт главного файла стилей  
import { openPopup, closePopup, closePopupByOverlay } from './scripts/modal.js';
import { createCard, likeCard } from './scripts/card.js';
import { enableValidation, clearValidation } from './scripts/validation.js';
import { getUserInfo, getInitialCards, updateUserInfo, updateAvatar, addCard, deleteCard as apiDeleteCard } from './scripts/api.js';

// Получили элементы в DOM  
const placesList = document.querySelector(".places__list");  

// Получаем элементы модальных окон и кнопок  
const editProfilePopup = document.querySelector('.popup_type_edit');  
const newCardPopup = document.querySelector('.popup_type_new-card');  
const imagePopup = document.querySelector('.popup_type_image');   
const editAvatarPopup = document.querySelector('.popup_type_edit-avatar');
const deletePopup = document.querySelector('.popup_type_delete');

// Получаем элементы изображения и заголовка изображения
const imagePopupCard = imagePopup.querySelector('.popup__image');  
const imagePopupCaption = imagePopup.querySelector('.popup__caption');
  
const editProfileButton = document.querySelector('.profile__edit-button');  
const addCardButton = document.querySelector('.profile__add-button');  
const editAvatarButton = document.querySelector('.profile__edit-avatar-button'); 
  
const closeButtons = document.querySelectorAll('.popup__close');  

// Получаем элементы профиля
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar  = document.querySelector('.profile__image');

// Получаем форму для отправки редактирования
const newEditProfileForm = editProfilePopup.querySelector('.popup__form'); // Находим форму в DOM
const nameInput = editProfilePopup.querySelector('.popup__input_type_name'); // Находим поле имени
const jobInput = editProfilePopup.querySelector('.popup__input_type_description'); // Находим поле описания

// Получаем форму для редактирования аватара
const editAvatarForm = editAvatarPopup.querySelector('.popup__form'); // Находим форму в DOM
const avatarInput = editAvatarPopup.querySelector('.popup__input_type_avatar'); // Находим поле ссылки на аватар

// Получаем форму для добавления новой карточки
const newCardForm = newCardPopup.querySelector('.popup__form'); 
const cardNameInput = newCardPopup.querySelector('.popup__input_type_card-name'); 
const cardLinkInput = newCardPopup.querySelector('.popup__input_type_url'); 

// Переменные для хранения ID 
let userId = ''; 
let idCardForDelete = null; // Глобальная переменная для хранения ID карточки, которую нужно удалить

// Валидация форм 
const validationConfig = { 
  formSelector: '.popup__form', 
  inputSelector: '.popup__input', 
  submitButtonSelector: '.popup__button', 
  inactiveButtonClass: 'form__submit_inactive', 
  inputErrorClass: 'form__input_type_error', 
  errorClass: 'form__input-error_active' 
}; 

// Загрузка данных пользователя и карточек
Promise.all([getUserInfo(), getInitialCards()]) 
  .then(([userData, cardsData]) => { 
    // Сохраняем ID пользователя 
    userId = userData._id; 

    // Обновляем элементы профиля 
    profileTitle.textContent = userData.name; 
    profileDescription.textContent = userData.about; 
    profileAvatar.style.backgroundImage = `url(${userData.avatar})`; 

    // Генерируем карточки 
    generateCards(cardsData, likeCard, openImagePopup, userId, handleDeleteButtonClick); 
  }) 
  .catch((err) => { 
    console.error('Ошибка при загрузке данных:', err); 
  }); 

// Функция для добавления карточек на страницу   
function generateCards(dataCard, likeCard, openImagePopup, userId, handleDeleteButtonClick) {   
  // Итерация по массиву   
  dataCard.forEach((cardInfo) => {   
    // Создаём карточки   
    const cardElement = createCard(cardInfo, likeCard, openImagePopup, userId, handleDeleteButtonClick);    
    placesList.append(cardElement); // Добавляем карточку в список   
  });   
}   

// Открываем модальное окно для изображения  
function openImagePopup(link, name) { 
  // Устанавливаем src и alt для изображения в модальном окне 
  imagePopupCard.src = link;   
  imagePopupCard.alt = name;   
  // Устанавливаем текст заголовка в модальном окне 
  imagePopupCaption.textContent = name;   
  // Открываем модальное окно с изображением 
  openPopup(imagePopup);   
} 

// Открываем модальное окно редактирования профиля   
editProfileButton.addEventListener('click', () => {   
  // Заполняем поля формы значениями из профиля 
  nameInput.value = profileTitle.textContent; // Заполняем поле имени 
  jobInput.value = profileDescription.textContent; // Заполняем поле описания 
  clearValidation(newEditProfileForm, validationConfig); // Очищаем валидацию 
  openPopup(editProfilePopup);  
});   

// Открываем модальное окно добавления новой карточки   
addCardButton.addEventListener('click', () => {   
  clearValidation(newCardForm, validationConfig); // Очищаем валидацию 
  openPopup(newCardPopup); 
});   

// Открываем модальное окно для редактирование аватара 
editAvatarButton.addEventListener('click', () => { 
  clearValidation(editAvatarForm, validationConfig); // Очищаем валидацию 
  openPopup(editAvatarPopup);   
}); 

// Закрываем модальные окна при нажатии на кнопку 
closeButtons.forEach(button => {   
  button.addEventListener('click', () => {   
      const popup = button.closest('.popup');   
      closePopup(popup);   
  });   
});   

// Закрытие попапа кликом на оверлей через делегирование событий 
document.addEventListener('click', closePopupByOverlay);  

// Обработчик «отправки» формы редактирования профиля 
function handleEditProfileFormSubmit(evt) { 
  evt.preventDefault(); 

  // Изменяем текст кнопки на "Сохранение..." 
  const saveButton = newEditProfileForm.querySelector('.popup__button'); 
  saveButton.textContent = 'Сохранение...'; 

  // Получаем значения полей 
  const newName = nameInput.value; 
  const newDescription = jobInput.value; 

  updateUserInfo(newName, newDescription) 
    .then((updatedUserData) => { 
      profileTitle.textContent = updatedUserData.name; 
      profileDescription.textContent = updatedUserData.about; 
      profileAvatar.style.backgroundImage = `url(${updatedUserData.avatar})`; 
      closePopup(editProfilePopup); 
    }) 
    .catch((err) => { 
      console.error('Ошибка при обновлении данных:', err); 
    }) 
    .finally(() => { 
      saveButton.textContent = 'Сохранить'; 
    }); 
} 

// Прикрепляем обработчик к форме 
newEditProfileForm.addEventListener('submit', handleEditProfileFormSubmit); 

// Обработчик «отправки» формы редактирования аватара 
function handleEditAvatarFormSubmit(evt) { 
  evt.preventDefault(); 

  // Изменяем текст кнопки на "Сохранение..." 
  const saveButton = editAvatarForm.querySelector('.popup__button'); 
  saveButton.textContent = 'Сохранение...'; 

  // Получаем значение поля 
  const newAvatar = avatarInput.value; 

  updateAvatar(newAvatar) 
    .then((updatedAvatar) => { 
      profileAvatar.style.backgroundImage = `url(${updatedAvatar.avatar})`; 
      closePopup(editAvatarPopup); 
    }) 
    .catch((err) => { 
      console.error('Ошибка при обновлении аватара:', err); 
    }) 
    .finally(() => { 
      saveButton.textContent = 'Сохранить'; 
    }); 
} 

// Обработчик «отправки» формы редактирования аватара 
editAvatarForm.addEventListener('submit', handleEditAvatarFormSubmit); 

// Обработчик «отправки» формы добавления новой карточки 
function handleNewCardSubmit(evt) { 
  evt.preventDefault(); 

  // Изменяем текст кнопки на "Сохранение..." 
  const saveButton = newCardForm.querySelector('.popup__button'); 
  saveButton.textContent = 'Сохранение...'; 

  // Получаем значения полей 
  const newCardName = cardNameInput.value; 
  const newCardLink = cardLinkInput.value; 

  addCard(newCardName, newCardLink) 
    .then((newCard) => { 
      const newCardElement = createCard(newCard, likeCard, openImagePopup, userId, handleDeleteButtonClick); 
      placesList.prepend(newCardElement); 
      closePopup(newCardPopup); 
      newCardForm.reset(); 
    }) 
    .catch((err) => { 
      console.error('Ошибка при добавлении карточки:', err); 
    }) 
    .finally(() => { 
      saveButton.textContent = 'Сохранить'; 
    }); 
} 

// Прикрепляем обработчик к форме 
newCardForm.addEventListener('submit', handleNewCardSubmit); 

// Вызовем функцию 
enableValidation(validationConfig);  

// Настраиваем кнопку удаления
function setupDeleteButton(closePopup) { 
  // Находим кнопку подтверждения 
  document.querySelector(".popup__button_confirm").addEventListener("click", () => { 
      const cardElement = document.querySelector(`.card[data-id="${idCardForDelete}"]`); // Находим карточку по data-id 
      if (cardElement) { 
        deleteCard(cardElement, closePopup, idCardForDelete); // Вызываем функцию удаления карточки 
      } 
    }); 
} 

// Настраиваем кнопку удаления
setupDeleteButton(closePopup);

// Функция-обработчик клика на кнопку удаления карточки
function handleDeleteButtonClick(cardId) {
  idCardForDelete = cardId;
  openPopup(deletePopup);
}

// Функция для удаления карточек 
function deleteCard(cardElement, closePopup, cardId) { 
  apiDeleteCard(cardId) 
    .then(() => { 
      cardElement.remove(); // Удаляем карточку из DOM 
      closePopup(deletePopup); // Закрываем попап подтверждения 
    }) 
    .catch((err) => { 
      console.error("Ошибка при удалении карточки:", err); // Логируем ошибку 
    }); 
}