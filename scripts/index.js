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

const cardsTemplateElement = document.querySelector('.cards__template');
const cardsSection = document.querySelector('.cards');
const buttonEdit = document.querySelector('.profile__button-edit');
const buttonAdd = document.querySelector('.profile__button-plus');

const titleElement = document.querySelector('.profile__name');
const aboutElement = document.querySelector('.profile__about');

const buttonsPopClose = document.querySelectorAll('.popup__close');
const sectionsPopup = document.querySelectorAll('.popup');

const popupProfile = document.querySelector('.popup-profile');
const profileFormElement = popupProfile.querySelector('.popup__form');
const profileNameFieldElement = profileFormElement.querySelector('[name="name"]');
const profileNameAboutFieldElement = profileFormElement.querySelector('[name="nameAbout"]');

const popupContent = document.querySelector('.popup-content');
const contentFormElement = popupContent.querySelector('.popup__form');
const contentNameFieldElement = contentFormElement.querySelector('[name="name"]');
const contentLinkFieldElement = contentFormElement.querySelector('[name="link"]');

const popupView = document.querySelector('.popup-view');
const elementViewImage = popupView.querySelector('.popup__image');
const elementViewDescr = popupView.querySelector('.popup__description');

// Функции для работы с карточками
function createCardElement (name, link) {
    const element = cardsTemplateElement.content.querySelector('.cards__element').cloneNode(true);
    const img = element.querySelector ('.cards__image');
    const title = element.querySelector ('.cards__title');
    img.src = link;
    img.alt = name;
    title.textContent = name;
    const delButton = element.querySelector('.cards__delete');
    delButton.addEventListener("click", evt => {
        const card = evt.currentTarget.closest('.cards__element');
        card.remove();
    });
    const likeButton = element.querySelector('.cards__like');
    likeButton.addEventListener("click", evt => {
        evt.currentTarget.classList.toggle("cards__like_active");
    });
    img.addEventListener("click", function() {
        elementViewImage.src = link;
        elementViewImage.alt = name;
        elementViewDescr.textContent = name;
        openPopup(popupView);
    });
    return element;
}

function addCardElement (name, link) {
    const element = createCardElement(name, link);
    cardsSection.prepend(element);
}

// Функции для работы с попапами
function detectClickOutside(evt) {
    if (evt.target.classList.contains('popup')) {
        closePopup(evt.target);
    }
}

function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
}

function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened')
}

function submitProfileFormHandler(evt) {
    evt.preventDefault();
    titleElement.textContent = profileNameFieldElement.value;
    aboutElement.textContent = profileNameAboutFieldElement.value;
    closePopup(popupProfile)
}

function submitContentFormHandler(evt) {
    evt.preventDefault();
    addCardElement(contentNameFieldElement.value, contentLinkFieldElement.value);
    closePopup(popupContent);
}

// Запускается при старте:
buttonEdit.addEventListener('click', function () {
    openPopup(popupProfile);
    profileNameFieldElement.value = titleElement.textContent;
    profileNameAboutFieldElement.value = aboutElement.textContent;
});

buttonAdd.addEventListener('click', function () {
    openPopup(popupContent);
    contentFormElement.reset();
});

buttonsPopClose.forEach(v => {
    v.addEventListener('click', evt => {
        const popup = evt.currentTarget.closest('.popup');
        closePopup(popup);
    });
});

profileFormElement.addEventListener('submit', submitProfileFormHandler);
contentFormElement.addEventListener('submit', submitContentFormHandler);

sectionsPopup.forEach(v => {
    v.addEventListener('click', function (evt) {
        detectClickOutside(evt);
    });
});

initialCards.forEach(e => {
    addCardElement(e.name, e.link);
});