function showInputError(inputPair, errorMessage, inputErrorClass, activeErrorClass) {
    console.log(errorMessage);
    inputPair.input.classList.add(inputErrorClass);
    inputPair.error.textContent = errorMessage;
    inputPair.error.classList.add(activeErrorClass);
}

function hideInputError(inputPair, inputErrorClass, activeErrorClass) {
    inputPair.input.classList.remove(inputErrorClass);
    inputPair.error.textContent = "";
    inputPair.error.classList.remove(activeErrorClass);
}

function checkInputValidity(inputPair, inputErrorClass, activeErrorClass) {
    if (!inputPair.input.validity.valid) {
        showInputError(inputPair, inputPair.input.validationMessage, inputErrorClass, activeErrorClass);
    } else {
        hideInputError(inputPair, inputErrorClass, activeErrorClass);
    }
}

function hasInvalidInput(inputsList) {
    return inputsList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

function toggleButtonState(inputsList, buttonEl, buttonClass) {
    if (hasInvalidInput(inputsList)) {
        buttonEl.classList.add(buttonClass);
    } else {
        buttonEl.classList.remove(buttonClass);
    }
}

function enableFormValidation(conf, formElement) {
    const buttonEl = formElement.querySelector(conf.submitButtonSelector);
    const inputsList = Array.from(formElement.querySelectorAll(conf.inputSelector));
    const errorsList = Array.from(formElement.querySelectorAll(conf.errorClass));
    const inputPairsList = inputsList.map((v, i) => {
        return {'input': v, 'error': errorsList[i]};
    });
    formElement.addEventListener('open', () => {
        toggleButtonState(inputsList, buttonEl, conf.inactiveButtonClass);
    });
    inputPairsList.forEach((inputPair) => {
        inputPair.input.addEventListener('input', () => {
            checkInputValidity(inputPair, conf.inputErrorClass, conf.activeErrorClass);
            toggleButtonState(inputsList, buttonEl, conf.inactiveButtonClass);
        });
    });
}

function enableValidation(conf) {
    const formList = Array.from(document.querySelectorAll(conf.formSelector));
    formList.forEach(enableFormValidation.bind(null, conf));
}

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_error',
    errorClass: '.popup__input-error',
    activeErrorClass: 'popup__input-error_active'
});