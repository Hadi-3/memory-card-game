/*-------------- Constants -------------*/
const imgNames = ['crown', 'heart', 'treasure', 'sword']
const imgPairs = [...imgNames, ...imgNames]

/*---------- Variables (state) ---------*/
let timeLeft = 60;
let flippedCards = [];
let numOfPairs = 0;
let gameEnd = false;
let hasGameStarted = false;
let lock = false;
let intervalId;

/*----- Cached Element References  -----*/
timeEl = document.querySelector('#timer')
allCard = document.querySelectorAll('.card')
resetBtnEl = document.querySelector('.reset-btn')

/*-------------- Functions -------------*/

function init() {

shuffleCards(imgPairs)   
reset()

allCard.forEach(card => {
  card.addEventListener('click', () => {
    if (!hasGameStarted) {
      hasGameStarted = true;
      gameTime();
    }
    checkCards(card);
  });
});

}


function shuffleCards(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const random = Math.floor(Math.random() * (i+1));
        [array[i], array[random]] = [array[random], array[i]]
    }

for (let i= 0; i < allCard.length; i++) {
const card = allCard[i]
const imgName = imgPairs[i]

card.setAttribute('data-picture' , imgName);
  const img = card.querySelector('.card-back img');
  img.src = `assets/${imgName}.png`;
}
}

function gameTime() {
  timeEl.innerHTML = `Timer: ${timeLeft}s`;

  intervalId = setInterval(() => {
    if (gameEnd) {
      clearInterval(intervalId);
      return;
    }

    timeLeft--;
    
    if (timeLeft >= 0 && numOfPairs < 4) {
      timeEl.innerHTML = `Timer: ${timeLeft}s`;
    }

    if (timeLeft === 0 && numOfPairs < 4 && !gameEnd) {
      timeEl.innerHTML = 'You lose !';
      timeEl.style.color = 'red';
      gameEnd = true;
      clearInterval(intervalId);
    }

    if (numOfPairs === 4 && !gameEnd) {
      timeEl.innerHTML = 'You win !';
      timeEl.style.color = 'green';
      gameEnd = true;
      clearInterval(intervalId);
    }
  }, 1000);
}

 
function reset() {
  resetBtnEl.addEventListener('click', () => {

    clearInterval(intervalId);

    timeLeft = 60;
    flippedCards = [];
    numOfPairs = 0;
    gameEnd = false;
    hasGameStarted = false;
    lock = false;

    timeEl.innerHTML = `Timer: 60s`;
    timeEl.style.color = '';

    shuffleCards(imgPairs);

    allCard.forEach(card => {
    card.classList.remove('flipped');
    });
  });
}

function checkCards(card) {
  if (gameEnd || card.classList.contains('flipped') || lock) return;
  card.classList.add('flipped');
    flippedCards.push(card)

if (flippedCards.length === 2) {
const first = flippedCards[0].getAttribute('data-picture');
const second = flippedCards[1].getAttribute('data-picture');
if (first === second) {
    flippedCards = [];
    numOfPairs++
    
} else {

  lock = true
  
      setTimeout(() => {
        flippedCards[0].classList.remove('flipped');
        flippedCards[1].classList.remove('flipped');
        flippedCards = [];
        lock = false
      }, 800);
}
}

}


init();

/*----------- Event Listeners ----------*/