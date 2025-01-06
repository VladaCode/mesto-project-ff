// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);  // Находим элемент ошибки внутри самой функции
      inputElement.classList.add(validationConfig.inputErrorClass);
      errorElement.textContent = errorMessage; //  // Заменим содержимое span с ошибкой на переданный параметр
      errorElement.classList.add(validationConfig.errorClass);   // Показываем сообщение об ошибке
  };
  
  // Функция, которая удаляет класс с ошибкой
  const hideInputError = (formElement, inputElement, validationConfig) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);  // Находим элемент ошибки внутри самой функции
      inputElement.classList.remove(validationConfig.inputErrorClass);
      errorElement.classList.remove(validationConfig.errorClass);   // Показываем сообщение об ошибке
      errorElement.textContent = '';
  };
  
  // Функция, которая проверяет валидность поля и для отображение кастомного сообщения об ошибке
  const checkInputValidity  = (formElement, inputElement, validationConfig) =>{
    if(inputElement.validity.patternMismatch){
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    }else{
      inputElement.setCustomValidity("");
    }
    if(!inputElement.validity.valid) {
       showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig); // Показываем сообщение об ошибке
    } else {
      hideInputError(formElement, inputElement, validationConfig); // Скрываем сообщение об ошибке
    }
  };
  
  
  // Блокируем кнопку отправки формы
  // Функция принимает массив полей
  
  const hasInvalidInput = (inputList) => {
    // проходим по этому массиву методом some
    return inputList.some((inputElement) => {
          // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся функция
      // hasInvalidInput вернёт true
  
      return !inputElement.validity.valid;
    })
  }; 
  
  // Функция принимает массив полей ввода
  // и элемент кнопки, состояние которой нужно менять
  const toggleButtonState = (inputList, buttonElement, validationConfig) => {
    // Если есть хотя бы один невалидный инпут
    if (hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
      buttonElement.disabled = true;
      buttonElement.classList.add(validationConfig.inactiveButtonClass);
    } else {
          // иначе сделай кнопку активной
      buttonElement.disabled = false;
      buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    }
  }; 
  
  
  //Функция, которая принимает параметр элемент формы и добавляет  её полям нужные обработчики
  const setEventListeners = (formElement, validationConfig) => {
      // Находим все поля внутри формы,
    // сделаем из них массив методом Array.from
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
      // Найдём в текущей форме кнопку отправки
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
      // Вызовем toggleButtonState, чтобы кнопка блокировалась до начала ввода
    toggleButtonState(inputList, buttonElement, validationConfig.inactiveButtonClass);
    // Обойдём все элементы полученной коллекции
    inputList.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener('input', () => {
        // Внутри колбэка вызовем isValid,
        // передав ей форму и проверяемый элемент
        checkInputValidity(formElement, inputElement, validationConfig)
         // Вызовем toggleButtonState и передадим ей массив полей и кнопку
         toggleButtonState(inputList, buttonElement, validationConfig);
      });
    });
  }; 
  
  //Функция, которая находит и перебирает все формы на странице 
  const enableValidation = (validationConfig) => {
   // Найдём все формы с указанным классом в DOM,
    // сделаем из них массив методом Array.from
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  
    // Переберём полученную коллекцию
    formList.forEach((formElement) => {
      // Для каждой формы вызовем функцию setEventListeners,
      // передав ей элемент формы
      setEventListeners(formElement, validationConfig);
    });
  };
  
  
  
  // Функция для очистки ошибок валидации
  const clearValidation = (formElement, validationConfig) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
    
    inputList.forEach((inputElement) => {
      hideInputError(formElement, inputElement, validationConfig.inputErrorClass);
    });
    // Сброс состояния кнопки
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  };
  
export{enableValidation, clearValidation}  