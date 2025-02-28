// ! Initialize DOM ELEMENT

// container Element
const  menuStartElement = document.getElementById('menu-start');
const  inGameElement = document.getElementById('in-game');
const  menuEndElement = document.getElementById('menu-end');

//  buton Element

const btnStartElement = document.getElementById('btn-start');


// Event
btnStartElement.addEventListener('click', () => {
    menuStartElement.classList.remove('show');
    inGameElement.classList.add('show');
})

