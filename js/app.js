/*-------------- Constants -------------*/


/*---------- Variables (state) ---------*/
let timeLeft = 120;

/*----- Cached Element References  -----*/
timeEl = document.querySelector('#timer')

/*-------------- Functions -------------*/

function init() {

}

function gameTime() {
const intervalId = setInterval(() => {
    if (timeLeft >= 0) {
 document.getElementById("timer").innerHTML = `Timer: ${timeLeft--}s`;
    }
   

}, 2000)

}
 gameTime()
function reset() {

}

function checkCards() {

}



/*----------- Event Listeners ----------*/