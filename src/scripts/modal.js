// Функция для открытия модального окна
export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", escClose); // Добавляем обработчик нажатия Esc
}

// Функция для закрытия модального окна
export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.addEventListener("keydown", escClose); // Удаляем обработчик нажатия Esc
}

// Метод закрытия попапа по оверлею
export const closePopupByOverlay = (event) => {
  if (event.target.classList.contains("popup")) {
    closePopup(event.target);
  }
};

// Обработчик закрытия попапа при нажатии клавиши Esc
export function escClose(evt) {
  // Проверяем, была ли нажата клавиша 'Esc'
  if (evt.key === "Escape") {
    // Находим открытое модальное окно с классом popup_is-opened
    const openPopup = document.querySelector(".popup_is-opened");
    // Если найдено открытое модальное окно
    if (openPopup) {
      // Закрываем его, вызывая функцию closePopup
      closePopup(openPopup);
    }
  }
}
