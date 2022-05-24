 const editButton = document.querySelector('.profile__button-edit');
 const popup = document.querySelector('.popup');
 const closePopButton = document.querySelector('.popup__close');

 const titleElement = document.querySelector('.profile__name');
 const nameFieldElement = document.querySelector('[name="name"]')

 const aboutElement = document.querySelector('.profile__about');
 const nameAboutFieldElement = document.querySelector('[name="nameAbout"]')

 // console.log(editButton)
 // console.log(popup)
 // console.log(closePopButton)

 editButton.addEventListener('click', function () {
     popup.classList.add('popup_isOpen')
     nameFieldElement.value = titleElement.textContent;
     nameAboutFieldElement.value = aboutElement.textContent;
 } )

 closePopButton.addEventListener('click', function () {
     popup.classList.remove('popup_isOpen')
 })
