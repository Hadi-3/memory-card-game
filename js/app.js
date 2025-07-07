/*-------------- Constants -------------*/
const imgNames = ['crown', 'heart', 'treasure', 'sword']
const imgPairs = [...imgNames, ...imgNames]

/*---------- Variables (state) ---------*/
let timeLeft = 60;
let flippedCards = [];
let numOfPairs = 0
let gameEnd = false
let hasGameStarted = false;
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
  document.getElementById("timer").innerHTML = `Timer: ${timeLeft--}s`;
const intervalId = setInterval(() => {
    if (timeLeft >= 0) {
 document.getElementById("timer").innerHTML = `Timer: ${timeLeft--}s`;
    
} else if (timeLeft < 0) {
    document.getElementById("timer").innerHTML = 'You lose !'
    gameEnd = true

}
   if(numOfPairs === 4) {
    document.getElementById("timer").innerHTML = 'You win !'
    gameEnd = true
} 
}, 1000)

}
 
function reset() {
resetBtnEl.addEventListener('click', function(){
  window.location.reload();
  return false;
});
}

function checkCards(card) {
  if (gameEnd || card.classList.contains('flipped')) return;
  card.classList.add('flipped');
    flippedCards.push(card)

if (flippedCards.length === 2) {
const first = flippedCards[0].getAttribute('data-picture');
const second = flippedCards[1].getAttribute('data-picture');
if (first === second) {
    flippedCards = [];
    numOfPairs++
    
} else {
  
      setTimeout(() => {
        flippedCards[0].classList.remove('flipped');
        flippedCards[1].classList.remove('flipped');
        flippedCards = [];
      }, 800);
}
}

}


init()




/*----------- Event Listeners ----------*/




 /* WHAT YOUR GAME IS
 WHAT YOUR CHALANGE
WHAT YOU LEARN
ANY ADVICE ?
 */