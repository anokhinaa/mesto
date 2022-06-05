const initialCards = [
    {
        name: 'Австралия',
        alt: 'Австралия',
        link: './images/AUSTRALIA_3.JPG'
    },

    {
        name: 'Сумароково, Кострома',
        alt: 'Кострома',
        link: './images/SUMAROKOVO_2.JPG'
    },

    {
        name: 'Алтай',
        alt: 'Алтай',
        link: './images/ALTAI_1.JPG'
    },

    {
        name: 'Корковаду',
        alt: 'Корковаду',
        link: './images/RIO_3.JPG'
    },

    {
        name: 'Лима',
        alt: 'Lima',
        link: './images/LIMA_2.JPG'
    },

    {
        name: 'Ипанема',
        alt: 'Рио',
        link: './images/RIO_1.JPG'
    }
];

const cardsTemplateElement = document.querySelector('.cards__template');
const cardsSection = document.querySelector('.cards');
const editButton = document.querySelector('.profile__button-edit');
const addButton = document.querySelector('.profile__button-plus');

const titleElement = document.querySelector('.profile__name');
const aboutElement = document.querySelector('.profile__about');

const closePopButtons = document.querySelectorAll('.popup__close');

const popupProfile = document.querySelector('.popup-profile');
const profileFormElement = popupProfile.querySelector('.popup__form');
const profileNameFieldElement = profileFormElement.querySelector('[name="name"]');
const profileNameAboutFieldElement = profileFormElement.querySelector('[name="nameAbout"]');

const popupContent = document.querySelector('.popup-content');
const contentFormElement = popupContent.querySelector('.popup__form');
const contentNameFieldElement = contentFormElement.querySelector('[name="name"]');
const contentLinkFieldElement = contentFormElement.querySelector('[name="link"]');

const popupView = document.querySelector('.popup-view');
const viewImageElement = popupView.querySelector('.popup__image');
const viewDescrElement = popupView.querySelector('.popup__description');

// Функции для работы с карточками
function createCardElement (name, alt, link) {
    const element = cardsTemplateElement.content.querySelector('.cards__element').cloneNode(true);
    const img = element.querySelector ('.cards__image');
    const title = element.querySelector ('.cards__title');
    img.src = link;
    img.alt = alt;
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
    img.addEventListener("click", evt => {
        const info = evt.currentTarget.closest('.cards__info');
        const titleElement = info.querySelector('.cards__title');
        viewImageElement.src = evt.currentTarget.src;
        viewDescrElement.textContent = titleElement.textContent;
        openPopup(popupView);
    });
    return element;
}

function addCardElement (name, alt, link) {
    const element = createCardElement(name, alt, link);
    cardsSection.append(element);
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

function profileFormSubmitHandler(evt) {
    evt.preventDefault();
    titleElement.textContent = profileNameFieldElement.value;
    aboutElement.textContent = profileNameAboutFieldElement.value;
    closePopup(popupProfile)
}

function contentFormSubmitHandler(evt) {
    evt.preventDefault();
    addCardElement(contentNameFieldElement.value, contentNameFieldElement.value, contentLinkFieldElement.value);
    contentFormElement.reset();
    closePopup(popupContent);
}

// Запускается при старте:
editButton.addEventListener('click', function () {
    openPopup(popupProfile);
    profileNameFieldElement.value = titleElement.textContent;
    profileNameAboutFieldElement.value = aboutElement.textContent;
});

addButton.addEventListener('click', function () {
    openPopup(popupContent);
    contentFormElement.reset();
});

closePopButtons.forEach(v => {
    v.addEventListener('click', evt => {
        const popup = evt.currentTarget.closest('.popup');
        closePopup(popup);
    });
});

profileFormElement.addEventListener('submit', profileFormSubmitHandler);
contentFormElement.addEventListener('submit', contentFormSubmitHandler);

document.body.addEventListener('click', function (event) {
    detectClickOutside(event)
})

initialCards.forEach(e => {
    addCardElement(e.name, e.alt, e.link);
});