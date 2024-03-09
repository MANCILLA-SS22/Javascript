//Selecting elements
const player0El = document.querySelector(".player_0");
const player1El = document.querySelector(".player_1");
const score0EL = document.querySelector("#score_0");
const score1EL = document.getElementById("score_1");
const current0El = document.getElementById("current_0");
const current1El = document.getElementById("current_1");

const diceEL = document.querySelector(".dice");
const btnNew = document.querySelector(".btn_new");
const btnRoll = document.querySelector(".btn_roll");
const btnHold = document.querySelector(".btn_hold");

//Starting conditions
    diceEL.classList.add("hidden");//Agregamos el elemento "hidden" del css, lo cual permitira ocultar las imagenes.
    scores = [0, 0]; //El lado izquierdo representa el jugador 1 y el derecho el jugador 2
    currentScore = 0; //Varaible donde se acumula y almacena el resultado de la suma.
    activePlayer = 0; // Solo puede ser 0 o 1, dependiento de lo que suceda en la linea 38
    playing = true; //Mientras sea true, se ejecutara el codigo, pero cuando sea false, en la linea 23 cambiara y el resto del codigo no hara nada.

//Rolling dice functionality
btnRoll.addEventListener("click", function () {
    if (playing) {
        //1. Generating a random dice roll
        const dice = Math.trunc(Math.random()*6)+1; 

        //2. Display dice
        diceEL.classList.remove("hidden"); //Ahora eliminaremos el "hidden" añadido en la linea 12 para mostrar la imagen
        diceEL.src = `dice-${dice}.png`;
    
        //3. Check for rolled 1: if true, switch to next player
        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(`current_${activePlayer}`).textContent = currentScore;
        }else{
            switchPlayer();
        }
    }
});

const switchPlayer = function(){
    document.getElementById(`current_${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle("player_active");
    player1El.classList.toggle("player_active");
}

btnHold.addEventListener("click", function(){
    if (playing) {
        //1. Add current score to active player's score is >= 20
        scores[activePlayer] = scores[activePlayer] + currentScore;
        document.getElementById(`score_${activePlayer}`).textContent = scores[activePlayer];
    
        //2. Check if player's score is >= 20
        if (scores[activePlayer] >= 20) {
            playing = false;
            diceEL.classList.add("hidden");
            document.querySelector(`.player_${activePlayer}`).classList.add("player_winner");
            document.querySelector(`.player_${activePlayer}`).classList.remove("player_active");
        }else{
            switchPlayer();
        }
    }
});

btnNew.addEventListener("click", function(){
    score0EL.textContent = 0;
    score1EL.textContent = 0; 
    diceEL.classList.add("hidden");//Agregamos el elemento "hidden" del css, lo cual permitira ocultar las imagenes.
    
    scores = [0, 0]; //El lado izquierdo representa el jugador 1 y el derecho el jugador 2
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    current0El.textContent = 0;
    current1El.textContent = 0;

    player0El.classList.remove("player_winner");
    player1El.classList.remove("player_winner");

    player0El.classList.add("player_active");
    player1El.classList.remove("player_active");
});


//Mismo codigo pero optimizado
/* //Selecting elements
const player0El = document.querySelector(".player_0");
const player1El = document.querySelector(".player_1");
const score0EL = document.querySelector("#score_0");
const score1EL = document.getElementById("score_1");
const current0El = document.getElementById("current_0");
const current1El = document.getElementById("current_1");

const diceEL = document.querySelector(".dice");
const btnNew = document.querySelector(".btn_new");
const btnRoll = document.querySelector(".btn_roll");
const btnHold = document.querySelector(".btn_hold");

//Starting conditions
let scores, currentScore, activePlayer, playing;
const init = function(){    
    scores = [0, 0]; //El lado izquierdo representa el jugador 1 y el derecho el jugador 2
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0EL.textContent = 0;
    score1EL.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    diceEL.classList.add("hidden");//Agregamos el elemento "hidden" del css, lo cual permitira ocultar las imagenes.

    player0El.classList.remove("player_winner");
    player1El.classList.remove("player_winner");

    player0El.classList.add("player_active");
    player1El.classList.remove("player_active");
}

const switchPlayer = function(){
    document.getElementById(`current_${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle("player_active");
    player1El.classList.toggle("player_active");
}

//Rolling dice functionality
btnRoll.addEventListener("click", function () {
    if (playing) {
        //1. Generating a random dice roll
        const dice = Math.trunc(Math.random()*6)+1; 

        //2. Display dice
        diceEL.classList.remove("hidden"); //Ahora eliminaremos el "hidden" añadido en la linea 12 para mostrar la imagen
        diceEL.src = `dice-${dice}.png`;
    
        //3. Check for rolled 1: if true, switch to next player
        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(`current_${activePlayer}`).textContent = currentScore;
        }else{
            switchPlayer();
        }
    }
});

btnHold.addEventListener("click", function(){
    if (playing) {
        //1. Add current score to active player's score is >= 100
        scores[activePlayer] = scores[activePlayer] + currentScore; //Tomamos primero la posicion 0, despues, cuando llamemos a la funcion switchPlayer(), en la linea 27, se hara el cambio de 0 a 1, por lo que ahora activePlayer = 1, y sera el jugador numero 2
        document.getElementById(`score_${activePlayer}`).textContent = scores[activePlayer];
    
        //2. Check if player's score is >= 100
        if (scores[activePlayer] >= 20) {
            playing = false;
            diceEL.classList.add("hidden");
            document.querySelector(`.player_${activePlayer}`).classList.add("player_winner");
            document.querySelector(`.player_${activePlayer}`).classList.remove("player_active");
        }else{
            switchPlayer();
        }
    }
});

btnNew.addEventListener("click", init); */