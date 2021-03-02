//
const colors = ['yellow', 'red', 'blue', 'orange', 'pink', 'green', 'cyan', 'rebeccapurple'];
const cardArray = [...colors, ...colors];
cardArray.sort(() => 0.5 - Math.random());
//
const grid = document.querySelector('.grid');
const score = document.querySelector('#result');
const text = document.querySelector('#text');
let cardsChosen = [];
let cardsChosenId = [];
let cardsWon = [];
//
const createBoard = () => {
  for (let i = 0; i < cardArray.length; i++) {
    const card = document.createElement('div');
    card.classList.add('cell');
    card.setAttribute('data-id', i);
    card.addEventListener('click', flipCard);
    grid.appendChild(card);
  }
};
//
const showTextAndRemove = (msg) => {
  text.textContent = msg;
  setTimeout(() => {
    text.textContent = '';
  }, 1000);
};
//
const createAndRemoveButton = () => {
  const btn = document.createElement('button');
  btn.classList.add('btn');
  btn.textContent = 'Refresh';
  document.querySelector('.info').appendChild(btn);
  btn.addEventListener('click', () => {
    window.location.reload();
    btn.remove();
  });
};
//
const flipCard = (e) => {
  let cardId = e.target.getAttribute('data-id');
  cardsChosen.push(cardArray[cardId]);
  cardsChosenId.push(cardId);
  cards[cardId].style.backgroundColor = cardArray[cardId];
  if (cardsChosen.length === 2) {
    setTimeout(checkForMatch, 400);
  }
};
//
const checkForMatch = () => {
  const [oneId, twoId] = cardsChosenId;
  if (oneId === twoId) {
    cards[oneId].style.backgroundColor = 'white';
    cards[twoId].style.backgroundColor = 'white';
    showTextAndRemove('You have clicked the same cell');
  } else if (cardsChosen[0] === cardsChosen[1]) {
    showTextAndRemove('You found a Match!');
    cards[oneId].style.backgroundColor = '#797979';
    cards[twoId].style.backgroundColor = '#797979';
    cards[oneId].removeEventListener('click', flipCard);
    cards[twoId].removeEventListener('click', flipCard);
    cardsWon.push(cardsChosen);
  } else {
    cards[oneId].style.backgroundColor = 'white';
    cards[twoId].style.backgroundColor = 'white';
    showTextAndRemove('Sorry, try again');
  }
  cardsChosen = [];
  cardsChosenId = [];
  score.textContent = cardsWon.length;
  if (cardsWon.length === cardArray.length / 2) {
    score.textContent = 'You WON!';
    setTimeout(createAndRemoveButton, 1000);
  }
};
//
createBoard();
const cards = [...document.querySelectorAll('[data-id]')];
