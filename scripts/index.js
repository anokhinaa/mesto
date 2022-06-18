const initialCards = [
    {
        name: 'Австралия',
        link: './images/AUSTRALIA_3.JPG'
    },

    {
        name: 'Сумароково, Кострома',
        link: './images/SUMAROKOVO_2.JPG'
    },

    {
        name: 'Алтай',
        link: './images/ALTAI_1.JPG'
    },

    {
        name: 'Корковаду',
        link: './images/RIO_3.JPG'
    },

    {
        name: 'Лима',
        link: './images/LIMA_2.JPG'
    },

    {
        name: 'Ипанема',
        link: './images/RIO_1.JPG'
    }
];

const cardsTemplateEl = document.querySelector('.cards__template');
const cardsSection = document.querySelector('.cards');
const buttonEdit = document.querySelector('.profile__button-edit');
const buttonAdd = document.querySelector('.profile__button-plus');

const titleEl = document.querySelector('.profile__name');
const aboutEl = document.querySelector('.profile__about');

const buttonsPopClose = document.querySelectorAll('.popup__close');
const sectionsPopup = document.querySelectorAll('.popup');

const popupProfile = document.querySelector('.popup-profile');
const profileFormEl = popupProfile.querySelector('.popup__form');
const profileNameFieldEl = profileFormEl.querySelector('[name="name"]');
const profileNameAboutFieldEl = profileFormEl.querySelector('[name="nameAbout"]');

const popupContent = document.querySelector('.popup-content');
const contentFormEl = popupContent.querySelector('.popup__form');
const contentNameFieldEl = contentFormEl.querySelector('[name="name"]');
const contentLinkFieldEl = contentFormEl.querySelector('[name="link"]');

const popupView = document.querySelector('.popup-view');
const elementViewImage = popupView.querySelector('.popup__image');
const elementViewDescr = popupView.querySelector('.popup__description');

// Функции для работы с карточками
function deleteCardEl(evt) {
    const card = evt.currentTarget.closest('.cards__element');
    card.remove();
}

function toggleLike(evt) {
    evt.currentTarget.classList.toggle("cards__like_active");
}

function showFullImage(name, link, evt) {
    elementViewImage.src = link;
    elementViewImage.alt = name;
    elementViewDescr.textContent = name;
    openPopup(popupView);
}

function createCardEl (name, link) {
    const element = cardsTemplateEl.content.querySelector('.cards__element').cloneNode(true);
    const img = element.querySelector ('.cards__image');
    const title = element.querySelector ('.cards__title');
    img.src = link;
    img.alt = name;
    title.textContent = name;
    const delButton = element.querySelector('.cards__delete');
    delButton.addEventListener("click", deleteCardEl);
    const likeButton = element.querySelector('.cards__like');
    likeButton.addEventListener("click", toggleLike);
    img.addEventListener("click", showFullImage.bind(null, name, link));
    return element;
}

function addCardEl (name, link) {
    const element = createCardEl(name, link);
    cardsSection.prepend(element);
}

// Функции для работы с попапами
function detectClickOutside(evt) {
    if (evt.target.classList.contains('popup')) {
        closePopup(evt.target);
    }
}
function setHandlerClickOutside(sectionPopup) {
    sectionPopup.addEventListener('click', detectClickOutside);
}

function closePopup(popupEl) {
    popupEl.classList.remove('popup_opened')
}

function handleEsc(popupEl, evt) {
    if (evt.key !== "Escape") {
        return;
    }
    closePopup(popupEl);
    document.removeEventListener('keydown', handleEsc);
}

function openPopup(popupEl) {
    popupEl.classList.add('popup_opened');
    document.addEventListener('keydown', handleEsc.bind(null, popupEl));
}

function raiseOpenEvent(formEl) {
    const event = new Event('open');
    formEl.dispatchEvent(event);
}

function submitProfileFormHandler(evt) {
    evt.preventDefault();
    titleEl.textContent = profileNameFieldEl.value;
    aboutEl.textContent = profileNameAboutFieldEl.value;
    closePopup(popupProfile)
}

function submitContentFormHandler(evt) {
    evt.preventDefault();
    addCardEl(contentNameFieldEl.value, contentLinkFieldEl.value);
    closePopup(popupContent);
}

function openProfilePopup() {
    profileNameFieldEl.value = titleEl.textContent;
    profileNameAboutFieldEl.value = aboutEl.textContent;
    raiseOpenEvent(profileFormEl);
    openPopup(popupProfile);
}

function openContentPopup() {
    contentFormEl.reset();
    raiseOpenEvent(contentFormEl);
    openPopup(popupContent);
}

function handleClickClosePopup(evt) {
    const popup = evt.currentTarget.closest('.popup');
    closePopup(popup);
}

function setClosePopupListener(buttonClose) {
    buttonClose.addEventListener('click', handleClickClosePopup);
}

// Запускается при старте:
buttonEdit.addEventListener('click', openProfilePopup);
buttonAdd.addEventListener('click', openContentPopup);

buttonsPopClose.forEach(setClosePopupListener);
sectionsPopup.forEach(setHandlerClickOutside);

profileFormEl.addEventListener('submit', submitProfileFormHandler);
contentFormEl.addEventListener('submit', submitContentFormHandler);

initialCards.forEach(e => {
    addCardEl(e.name, e.link);
});
