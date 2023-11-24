'use strict';


const score0El = document.querySelector("#score--0")
const score1El = document.querySelector("#score--1")
const current0El = document.getElementById("current--0")
const current1El = document.getElementById("current--1")
const diceEl = document.querySelector(".dice")
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const modal = document.querySelector(".modal")
const overlay = document.querySelector(".overlay")
const winModal = document.querySelector(".win-modal")
const winOverlay = document.querySelector(".win-overlay")
const btnCloseModal = document.querySelector(".close-modal")
const winner = document.querySelector(".winner")

let btnNew = document.querySelector(".btn--new")
let btnStart = document.querySelector(".btn--start")
let btnRoll = document.querySelector(".btn--roll")
let btnHold = document.querySelector(".btn--hold")


let currentScore
let activePlayer
let playingStatus
let score;

document.addEventListener("keydown", function (event) {
    // console.log(event);
    event.keyCode === 27 ? closeModal() : null
})

// Start Game Function
btnStart.addEventListener("click", function () {
    modal.classList.add("hidden")
    overlay.classList.add("hidden")
})

const closeModal = function () {
    modal.classList.add("hidden")
    overlay.classList.add("hidden")
}
btnCloseModal.addEventListener("click", closeModal)

overlay.addEventListener("click", closeModal)



// game initialization
const initGame = function () {
    score = [0, 0]
    currentScore = 0;
    activePlayer = 0;
    playingStatus = true
    score0El.textContent = 0
    score1El.textContent = 0
    current0El.textContent = 0
    current1El.textContent = 0

    diceEl.classList.add("hidden")
    player0El.classList.remove("player--winner")
    player1El.classList.remove("player--winner")
    player0El.classList.add("player--active")
    player1El.classList.remove("player--active")
    winOverlay.classList.add("hidden")
    winModal.classList.add("hidden")
}
initGame()

// Switching Player
function switchPlayer() {
    document.getElementById(`current--${activePlayer}`).textContent = 0
    activePlayer = activePlayer === 0 ? 1 : 0
    currentScore = 0;
    player0El.classList.toggle("player--active")
    player1El.classList.toggle("player--active")

}




// Roll Dice
btnRoll.addEventListener("click", function () {
    if (playingStatus) {


        const dice = Math.trunc((Math.random() * 6) + 1)
        // console.log(dice);
        diceEl.classList.remove("hidden")
        diceEl.src = `dice-${dice}.png`

        if (dice !== 1) {
            currentScore += dice
            document.getElementById(`current--${activePlayer}`).textContent = currentScore
            // console.log(currentScore);
        } else {
            // Switching Player and resetting score

            switchPlayer()

        }
    }
})


// Saving Score When Press Hold And Switch Player
btnHold.addEventListener("click", function () {

    // add score to score array depending on index
    if (playingStatus) {


        score[activePlayer] += currentScore
        document.getElementById(`score--${activePlayer}`).textContent = score[activePlayer]

        // Winning Conditions
        if (score[activePlayer] >= 100) {
            winModal.classList.remove("hidden")
            playingStatus = false
            document.querySelector(`.player--${activePlayer}`).classList.add("player--winner")
            document.querySelector(`.player--${activePlayer}`).classList.remove("player--active")


            diceEl.classList.add("hidden")
            winner.classList.remove("hidden")
            winner.textContent = `Player ${activePlayer + 1} won 😎 - Score is ${score[activePlayer]}`;
        }
        else {
            // Switching Player
            switchPlayer()
            diceEl.classList.add("hidden")

        }
    }
})
// Initialize and Reset After Winning
btnNew.addEventListener("click", initGame)
