const screenDisplay = document.querySelector(".screen");
const buttons = document.querySelectorAll("button");

let calculation = [];
let accumulationCalculation;

buttons.forEach((evento) =>
    evento.addEventListener("click", function (){
        calculateButton(evento);
    })
)

function calculateButton(x){
    const value = x.textContent;
    if (value === "CLEAR") {
        calculation = [];
        screenDisplay.textContent = ".";
    }else if (value === "=") {
        screenDisplay.textContent = eval(accumulationCalculation);
    }else{
        calculation.push(value);
        accumulationCalculation = calculation.join("");
        screenDisplay.textContent = accumulationCalculation;
    }
}