const editButton = document.querySelector('.profile__button-edit');
const popup = document.querySelector('.popup');
const closePopButton = document.querySelector('.popup__close');

const titleElement = document.querySelector('.profile__name');

const aboutElement = document.querySelector('.profile__about');

const formElement = document.querySelector('.popup__form');
const nameFieldElement = formElement.querySelector('[name="name"]');
const nameAboutFieldElement = formElement.querySelector('[name="nameAbout"]');


editButton.addEventListener('click', function () {
    openPopup(popup)
    nameFieldElement.value = titleElement.textContent;
    nameAboutFieldElement.value = aboutElement.textContent;
})

closePopButton.addEventListener('click', function () {
    closePopup(popup)
})

formElement.addEventListener('submit', formSubmitHandler);

document.body.addEventListener('click', function (event) {
    detectClickOutside(event)
})


function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
}

function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened')
}

function formSubmitHandler(event) {
    event.preventDefault();
    titleElement.textContent = nameFieldElement.value;
    aboutElement.textContent = nameAboutFieldElement.value;
    closePopup(popup)
}

function detectClickOutside(event) {
    console.log(event.target)
    if (event.target.classList.contains('popup')) {
        closePopup(popup);
    }
}
