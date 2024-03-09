'use strict';

/* document.querySelector(".message").textContent = 'Correct Number 🤠';
console.log(document.querySelector(".message").textContent);

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 10;

document.querySelector(".guess").value = 23;
console.log(document.querySelector('.guess').value); */

/* //Ejercicio realizado de la primer manera, sin funciones.

let secretNumber = Math.trunc(Math.random()*20)+1;
let score = 20;
let highScore = 0;

document.querySelector(".check").addEventListener("click", function(){
    const guess = Number(document.querySelector(".guess").value);
    console.log(guess, typeof guess);

    if(!guess){
    //When there is no input
        document.querySelector(".message").textContent = "NO NUMBER 🥵";

    //When  player wins
    }else if (guess === secretNumber) {
        document.querySelector(".message").textContent = "YOU WIN !!🤩";
        document.querySelector(".number").textContent = secretNumber;
        document.querySelector("body").style.backgroundColor = "#60b347";
        document.querySelector(".number").style.width = "30rem";

        if (score > highScore) {
            highScore = score;
            document.querySelector(".highscore").textContent = highScore;
        }

    }else if (guess !== secretNumber) {
        if (score > 1) {
            document.querySelector(".message").textContent = guess > secretNumber ? "TOO HIGH 🥶" : "TOO SLOW 🥶" ;
            score--;
            document.querySelector(".score").textContent = score;
        }else{
            document.querySelector(".message").textContent = "YOU LOST THE GAME! 😭💔";
            document.querySelector(".score").textContent = 0;
        }
    }
});

document.querySelector(".again").addEventListener("click", function () {
    let secretNumber = Math.trunc(Math.random()*20)+1;
    let score = 20;
    document.querySelector(".message").textContent = "start guessing...";
    document.querySelector(".score").textContent = score;
    document.querySelector(".number").textContent = "?";
    document.querySelector(".guess").value = "";

    document.querySelector("body").style.backgroundColor = "#222";
    document.querySelector(".number").style.width = "15rem";
}); */

//Ejercicio realizado de la primer manera, con funciones.
let secretNumber = Math.trunc(Math.random()*20)+1;
let score = 20;
let highScore = 0;

const displayMessage = function(message){
    document.querySelector(".message").textContent = message
}

document.querySelector(".check").addEventListener("click", function(){
    const guess = Number(document.querySelector(".guess").value);
    console.log(guess, typeof guess);

    if(!guess){
    //When there is no input
        displayMessage("NO NUMBER 🥵");

    //When  player wins
    }else if (guess === secretNumber) {
        displayMessage("YOU WIN !!🤩");
        document.querySelector(".number").textContent = secretNumber;
        document.querySelector("body").style.backgroundColor = "#60b347";
        document.querySelector(".number").style.width = "30rem";

        if (score > highScore) {
            highScore = score;
            document.querySelector(".highscore").textContent = highScore;
        }

    }else if (guess !== secretNumber) {
        if (score > 1) {
            displayMessage(guess > secretNumber ? "TOO HIGH 🥶" : "TOO SLOW 🥶");
            score--;
            document.querySelector(".score").textContent = score;
        }else{
            document.querySelector(".message").textContent = "YOU LOST THE GAME! 😭💔";
            document.querySelector(".score").textContent = 0;
        }
    }
});

document.querySelector(".again").addEventListener("click", function () {
    let score = 20;
    displayMessage("start guessing...");
    document.querySelector(".score").textContent = score;
    document.querySelector(".number").textContent = "?";
    document.querySelector(".guess").value = "";

    document.querySelector("body").style.backgroundColor = "#222";
    document.querySelector(".number").style.width = "15rem";
});