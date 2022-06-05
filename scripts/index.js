const initialCards = [
    {
        name: 'Австралия',
        alt: 'Австралия',
        link: './images/AUSTRALIA_3.JPG'
    },
    {
        name: 'Алтай',
        alt: 'Алтай',
        link: './images/ALTAI_1.JPG'
    },
    {
        name: 'Рио-де-Жанейро',
        alt: 'Рио',
        link: './images/RIO_1.JPG'
    },
    {
        name: 'Париж',
        alt: 'Париж',
        link: './images/PARIS_1.JPG'
    },
    {
        name: 'Сумароково, Кострома',
        alt: 'Кострома',
        link: './images/SUMAROKOVO_2.JPG'
    },
    {
        name: 'Лима',
        alt: 'Lima',
        link: './images/LIMA_2.JPG'
    }
];


const editButton = document.querySelector('.profile__button-edit');
const popup = document.querySelector('.popup');
const closePopButton = document.querySelector('.popup__close');
const titleElement = document.querySelector('.profile__name');
const aboutElement = document.querySelector('.profile__about');
const formElement = document.querySelector('.popup__form');
const nameFieldElement = formElement.querySelector('[name="name"]');
const nameAboutFieldElement = formElement.querySelector('[name="nameAbout"]');
const cardsTemplateElement = document.querySelector('.cards__template');
const cardsSection = document.querySelector('.cards');

function createCardElement (name, alt, link) {
    const element = cardsTemplateElement.content.querySelector('.cards__element').cloneNode(true);
    const img = element.querySelector ('.cards__image');
    const title = element.querySelector ('.cards__title');
    img.src = link;
    img.alt = alt;
    title.textContent = name;
    return element;
}

function addCardElement (name, alt, link) {
    const element = createCardElement(name, alt, link);
    cardsSection.append(element);
}



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
    if (event.target.classList.contains('popup')) {
        closePopup(popup);
    }
}

initialCards.forEach(e => {
    addCardElement(e.name, e.alt, e.link);
});