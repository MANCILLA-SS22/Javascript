const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');
const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');
const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');
const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
    interestRate: 1.2, // %
    pin: 1111,
    movementsDates: [ // Las fechas se muestran con el formato toISOString()
        '2019-11-18T21:31:17.178Z',
        '2019-12-23T07:42:02.383Z',
        '2020-01-28T09:15:04.904Z',
        '2020-04-01T10:17:24.185Z',
        '2020-05-08T14:11:59.604Z',
        '2023-05-27T17:01:17.194Z',
        '2023-07-23T23:36:17.929Z',
        '2023-07-18T10:51:36.790Z',
    ],
    currency: 'EUR',
    locale: 'pt-PT', // de-DE
};
const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
    movementsDates: [ // Las fechas se muestran con el formato toISOString()
        '2019-11-01T13:15:33.035Z',
        '2019-11-30T09:48:16.867Z',
        '2019-12-25T06:04:23.907Z',
        '2020-01-25T14:18:46.235Z',
        '2020-02-05T16:33:06.386Z',
        '2020-04-10T14:43:26.374Z',
        '2020-06-25T18:49:59.371Z',
        '2020-07-26T12:01:20.894Z',
    ],
    currency: 'USD',
    locale: 'en-US',
};
const accounts = [account1, account2]; //Almacenamos la informacion de los 4 objetos en un array.

// FAKE ALWAYS LOGGED IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

let currentAccount, timer;
let sorted = false;// For the btnSort, we fix this variable to false so the function displayMovements still recieve false, which means that it doesn't sort the array.

createUserNames(accounts);
function createUserNames (accs){
    accs.forEach(function(num_acc){
        num_acc.username = num_acc.owner.toLowerCase().split(" ").map(name => name[0]).join(""); // We create a new element (num_acc.username) that will contain the lower case letters of each owner's name
    })
}

function updateUI(acc){
    displayMovements(acc);
    calcDisplayBalance(acc);
    calcDisplaySummary(acc);
}

function formatMovementDate(date, locale){

    function calcDaysPassed(date1, date2){
        return Math.round(Math.abs(date2 - date1) / (1000*60*60*24));
    }

    const dayPassed = calcDaysPassed(new Date(), date);
    if (dayPassed === 0) return "Today";
    if (dayPassed === 1) return "Yesterday";
    if (dayPassed <= 7)  return `${dayPassed} days`;
    
    // // METODO 1
    // const day = `${date.getDate()}`.padStart(2, 0);
    // const month = `${date.getMonth() + 1}`.padStart(2, 0);
    // const year = date.getFullYear();
    // return `${day}/${month}/${year}`;
    
    //METODO 2
    return new Intl.DateTimeFormat(locale).format(date)

}

function formatCur(value, locale, currency){
    return new Intl.NumberFormat(locale, {style: "currency", currency: currency}).format(value);
}

function displayMovements(acc, sort=false){

    containerMovements.innerHTML="";
    const movs = sort ? acc.movements.slice().sort((a,b) => a - b) : acc.movements;
    
    movs.forEach(function(mov, i) {
        const date = new Date(acc.movementsDates[i]); //Accedemos a las fechas que estan en account1.movementsDates[]
        const displayDate = formatMovementDate(date, acc.locale);

        const type = mov > 0 ? "deposit" : "withdrawal";    

        //METODO 1
        // const html = `
        //     <div class="movements__row">
        //         <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        //         <div class="movements__date">${displayDate}</div>
        //         <div class="movements__value">${mov.toFixed(2)}€</div>
        //     </div>`
        // containerMovements.insertAdjacentHTML("afterbegin", html);

        //METODO 2
        const formattedMov = formatCur(mov, acc.locale, acc.currency);
        const html = `
            <div class="movements__row">
                <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
                <div class="movements__date">${displayDate}</div>
                <div class="movements__value">${formattedMov}</div>
            </div>`
        containerMovements.insertAdjacentHTML("afterbegin", html);
    });
}

function calcDisplayBalance(acc){
    acc.balance = acc.movements.reduce(function(acc, mov){
        return acc + mov;
    }, 0);

    //METODO 1
    // labelBalance.textContent = `${acc.balance.toFixed(2)}€`

    //METODO 2
    const formattedMov = formatCur(acc.balance, acc.locale, acc.currency);
    labelBalance.textContent = formattedMov;
}

function calcDisplaySummary(acc){
    // //METODO 1
    // const incomes = acc.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);
    // labelSumIn.textContent = `${incomes.toFixed(2)}€`;

    // const out = acc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0);
    // labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;

    // const interest = acc.movements.filter(mov => mov > 0).map( deposit => (deposit*acc.interestRate)/100 ).filter((int) => int >= 1).reduce((acc, int) => acc + int, 0);
    // labelSumInterest.textContent = `${interest.toFixed(2)}€`;

    //METODO 2
    const incomes = acc.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);
    labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

    const out = acc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0);
    labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

    const interest = acc.movements.filter(mov => mov > 0).map( deposit => (deposit*acc.interestRate)/100 ).filter((int) => int >= 1).reduce((acc, int) => acc + int, 0);
    labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
}

function startLogOutTimer(){
    function tick(){
        const min = String(Math.trunc(tiempo / 60)).padStart(2, 0);
        const sec = String(tiempo % 60).padStart(2, 0);
        labelTimer.textContent = `${min}:${sec}`;
        if(tiempo === 0) {
            clearInterval(startLogOutTimer);
            labelWelcome.textContent = "Log in to get started"
            containerApp.style.opacity = 0;
        }
        tiempo--;
    }

    let tiempo = 20;
    tick(); //Llamamos a la funcion antes de que se ejecute el setInterval para que, al final se ejecuten al mismo tiempo. Ya que, de ejecutarse esta funcion dentro del setInterval, entonces obtendremos primero un '1' en la pantalla y luego iniciara el temporizador.
    return setInterval(tick, 1000); //Volvemos a llamar a la funcion tick en el setInterval para que cada segundo que pase, se vuelva a ejecutar.
}

btnLogin.addEventListener("click", function(evento){
    evento.preventDefault();
    
    currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value) //We verify if the username typed in the input is the same as the one in the array that is into "accounts". If so, we get the found object.

    if(currentAccount?.pin === Number(inputLoginPin.value)){ //We check if the pin in the object is the same as the one typed in the input. (We must write use "?." so that we can get an "undefined" and not an error)
        labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(" ")[0]}`; //If so, then we change the sentence in the upper right corner.
        containerApp.style.opacity = 100; //We do this so that we can see the menu with information.

        //METODO 1
        // const now = new Date();
        // const day = `${now.getDate()}`.padStart(2, 0);
        // const month = `${now.getMonth() + 1}`.padStart(2, 0);
        // const year = now.getFullYear();
        // const hour = `${now.getHours()}`.padStart(2, 0);
        // const min = `${now.getMinutes()}`.padStart(2, 0);
        // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

        //METODO 2
        const now = new Date();
        const options = {hour:"numeric", minute: "numeric", day: "numeric", month: "numeric", year: "numeric", }; //weekday: "numeric"

        // const locale = navigator.language;
        labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(now);
        inputLoginUsername.value = inputLoginPin.value = ""; //Now we delete the written values in our inputs (user and PIN)
        inputLoginPin.blur(); //This work so that when we want to log in and finally press "enter", then our cursor will disappear.

        if (timer) {//Cuando iniciamos sesion, timer es undefined, por lo que no se ejecuta el if.
            clearInterval(timer)
        }
        timer = startLogOutTimer(); //pero cuando iniciamos sesion, ejecutamos la funcion del conteo y se almacena en timer. Posterior a eso, como ya existira timer, ahora si se ejecutara el if, el cual reiniciara el conteo.
        updateUI(currentAccount);
    }
});

btnTransfer.addEventListener("click", function(evento){
    evento.preventDefault();
    const amount = Number(inputTransferAmount.value); //Recuperamos el numero ingresado en el input donde introducimos el dinero
    const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value); //Recuperamos el objeto contenido en uno de los arrays de accounts, al verificar si el nombre de usuario existe dentro de los 4 arrays de accounts y si es igual al ingresado en el input.
    inputTransferAmount.value = inputTransferTo.value = "";

    if (amount > 0 && receiverAcc && currentAccount.balance >= amount && receiverAcc?.username !== currentAccount.username) {
        currentAccount.movements.push(-amount);
        receiverAcc.movements.push(amount);

        currentAccount.movementsDates.push(new Date().toISOString());
        receiverAcc.movementsDates.push(new Date().toISOString());

        updateUI(currentAccount);

        clearInterval(timer); //Cuando iniciamos sesion, timer es undefined, por lo que no se ejecuta el if.
        timer = startLogOutTimer(); //pero cuando iniciamos sesion, ejecutamos la funcion del conteo y se almacena en timer. Posterior a eso, como ya existira timer, ahora si se ejecutara el if, el cual reiniciara el conteo.
    }
});

btnClose.addEventListener("click", function(evento){
    evento.preventDefault();

    if (inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin) { //We verify if the written values in the inputs are the same as those in the current object.
        const index = accounts.findIndex(acc => acc.username === currentAccount.username); //If so, we proceed to find the index of the object in the array "accounts"
        accounts.splice(index, 1);
        containerApp.style.opacity = 0; 
        console.log(accounts);
    }

    inputCloseUsername.value = inputClosePin.value = "";
});

btnLoan.addEventListener("click", function(evento){
    evento.preventDefault();

    const amount = Math.floor(inputLoanAmount.value)
    if (amount > 0 && currentAccount.movements.some(mov => (mov >= amount*0.1))) {
        
        setTimeout(function(){
            currentAccount.movements.push(amount);
            currentAccount.movementsDates.push(new Date().toISOString());

            updateUI(currentAccount);

            clearInterval(timer);
            timer = startLogOutTimer();
        }, 2500);

    }
    inputLoanAmount.value = "";
});

btnSort.addEventListener("click", function(evento){
    evento.preventDefault();

    displayMovements(currentAccount.movements, !sorted); //When clicking the button, then that variable changes to true and the array is sorted.
    sorted =! sorted; //After that, we need to change the "sorted" variable to the opposite boolean value. We do this so that when we press the button again, this back to normal (unsorted).
})

labelBalance.addEventListener('click', function () {
    let valor = document.querySelectorAll('.movements__value'); 
    const movementsUI = Array.from(valor, function(el){   // Array.from(Array-like or iterable object, mapFunction, thisValue)
        return Number(el.textContent.replace('€', ''))
    });  console.log(movementsUI);
    // const movementsUI2 = [...document.querySelectorAll('.movements__value')];


    [...document.querySelectorAll(".movements__row")].forEach(function(row, i){
        if (i % 2 === 0) row.style.backgroundColor = "orangered";
        if (i % 3 === 0) row.style.backgroundColor = "blue";
    })
});
