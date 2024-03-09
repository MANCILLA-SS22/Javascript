// Application architecture
const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

// Parent class and child classes
class Workout{ 
    // date = new Date(); //This line and the next one are the same as the line 549 amd 550.
    // id = (Date.now() + "").slice(-10);  
    // clicks = 0;

    constructor(coords, distance, duration){
        this.date = new Date();
        this.id = (Date.now() + "").slice(-10);  //now() returns the number of milliseconds since midnight Jan 1, 1970
        this.clicks = 0;
        this.coords = coords;     // Must be an array [lat, lng]
        this.distance = distance; // in km
        this.duration = duration; // in min
    }

    _setDescription(){
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${months[this.date.getMonth()]} ${this.date.getDate()}`;
    }

    _click(){
        this.clicks++;
    }
}

class Running extends Workout{
    type = "running"; //This property is gonna be available on all the instances
    constructor(coords, distance, duration, cadence){
        super(coords, distance, duration);
        this.cadence = cadence;
        this.calcPace();
        this._setDescription(); //We can't use this method on the Workout object becuase the "type" variable is defined in the child classes. Through this the scope chain this constructor methid will get access to all the methods of the parent class, and of course, that includes the _setDescription() which is in the Workout class.
    }

    calcPace(){
        this.pace = this.duration / this.distance;
        return this.pace;
    }
}

class Cycling extends Workout{
    type = "cycling"; //This property is gonna be available on all the instances
    constructor(coords, distance, duration, elevationGain){
        super(coords, distance, duration);
        this.elevationGain = elevationGain;
        this.calcSpeed();
        this._setDescription(); //We can't use this method on the Workout object becuase the "type" variable is defined in the child classes. Through this the scope chain this constructor methid will get access to all the methods of the parent class, and of course, that includes the _setDescription() which is in the Workout class.
    }

    calcSpeed(){
        this.speed = this.distance / (this.duration / 60);
        return this.speed;
    }
}

class App{
    //We're gonna define the map and mapEvent as properties of the object and will use a private class field. Now, both of the will become private instances properties which are gonna be present  on all the instances created through this class.
    #map;
    #mapZoomLevel = 13;
    #mapEvent;
    #workouts = [];

    constructor(){
        //Get user's position
        this._getPosition();

        //Get data from local storage
        this._getLocalStorage();

        //Atach event handlers
        form.addEventListener("submit", this._newWorkout.bind(this));  //When we have event listeners inside of a class, you'll have to bind the this keywords all the time. Because if not, this._newWorkout will only point to the form. So we always want our this keywords to still point to the object itself (in this case, the app object, which is what "this" is currently pointing to).
        inputType.addEventListener("change",this._toggleElevaionField); //In _toggleElevaionField there aren't any this keyword, so we can avoid using the bind() method in inputType.addEventListener
        containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
    }

    _getPosition(){
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(  //First callback: It will be called on success.  Second callback: It will be called on error

                //JS will callback the _loadMap function here and pass in the position argument as soon as the curent position of the user is determined. This method is called by getCurrentPosition(), and this._loadMap is treated as a regular funcion call NOT AS A METHOD CALL. So, since this._loadMap is a  callback function, we're not calling it ourselves, it is to getCurrentPosition function that we'll call the callback funcion once that it gets its  current position of the user. So, when it calls the _loadMap function, then it does so as a regular function call. And, in a regular function,  the this keyword is set to undefined. To fix that, we bind (bind will simply return a new function) this function and finally the this keyword into bind points  to the current object so that the this is also inside of _loadMap(position). Bind() used when you want 'this' keyword in the method you are calling to point to the object.
                this._loadMap.bind(this), //First callback of getCurrentPosition. 
                function(){               //Second callback of getCurrentPosition. 
                alert("Coultn't get your position!")
            });
            // console.dir(this._loadMap);
        }; 
    }

    _loadMap(position){ //The getCurrentPosition method passes the GeolocationPosition object to the callback. That's why we don't need to put any parameter in this._loadMap. Into getCurrentPosition we don't invoke _loadMap. We just pass function's name so, there is no any parentheses and parameters. 
        const {latitude} = position.coords;
        const {longitude} = position.coords;
        const coords = [latitude, longitude];

        this.#map = L.map('map').setView(coords, this.#mapZoomLevel); //We use 'this.#map' and 'this.#mapEvent' because this is like a property that is defined on the object itself. It's no longer just a normal variable
        
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);

        this.#map.on("click", this._showForm.bind(this));
        this.#workouts.forEach(work => this._renderWorkoutMarker(work));

        //console.log(position);
        //console.log(latitude, longitude); 
        //console.log(`https://www.google.com.mx/maps/@${latitude},${longitude}`);
        // console.log(map);
    }

    _showForm(mapE){
        this.#mapEvent = mapE;
        form.classList.remove("hidden");
        inputCadence.focus();
    }

    _hideForm(){
        inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = "";
        form.style.display = "none";
        form.classList.add("hidden");
        setTimeout(function(){
            form.style.display = "grid";
        }, 1000)
    }
    
    _toggleElevaionField(){
        inputElevation.closest('.form__row').classList.toggle("form__row--hidden");
        inputCadence.closest('.form__row').classList.toggle("form__row--hidden");
    }

    _newWorkout(event){
        event.preventDefault();

        function validInputs(...inputs){
            return inputs.every(inp => Number.isFinite(inp));
        }

        function allPositives(...inputs){
            return inputs.every(inp => inp > 0);
        }

        //Get data from form
        const type = inputType.value;
        const distance = Number(inputDistance.value);
        const duration = Number(inputDuration.value);
        const {lat, lng} = this.#mapEvent.latlng;    // console.log(this.#mapEvent); console.log(lat, lng);
        let workout;

        //If workout rining, creat runing object
        if (type === "running") {
            const cadence = Number(inputCadence.value);

            //Check if data is valid. (The reason why we did this cheking here inside of the parent if, is because if we did the same out of the if, then we would also want to check for the elevation. That's to say, only one of the cadence and elevation can be defined at the same time. They can't both be defined at the same time)
            if(!validInputs(distance, duration, cadence) || !allPositives(distance, duration, cadence)){
                return alert("Inputs have to be positive numbers!"); 
            }

            workout = new Running([lat, lng], distance, duration, cadence);
        }

        //If workout cycling, creat cycling object
        if (type === "cycling") {
            const elevation = Number(inputElevation.value);

            //Check if data is valid. (The reason why we did this cheking here inside of the parent if, is because if we did the same out of the if, then we would also want to check for the elevation. That's to say, only one of the cadence and elevation can be defined at the same time. They can't both be defined at the same time)
            if(!validInputs(distance, duration, elevation) || !allPositives(distance, duration)){
                return alert("Inputs have to be positive numbers!"); 
            }

            workout = new Cycling([lat, lng], distance, duration, elevation);
        }

        //Add new object to workout array
        this.#workouts.push(workout);      console.log(workout);

        //Render workout on map as marker
        this._renderWorkoutMarker(workout);

        //Render workout on list
        this._renderWorkout(workout);

        //Hide form + clear input fields
        this._hideForm();

        //Set local storage to all workouts
        this._setLocalStorage();
    }

    _renderWorkoutMarker(workout){
        L.marker(workout.coords)
        .addTo(this.#map) //There's no need to use the this keyword in this line because we're already using it in the "render workout on map as marker" line as a method of the this keyword. Besides that, we're calling it ourselves, so it's not a callback funcion of any other funcion in JS. And so therefore, the this keyword in this method here, will still be the current object. And so, no need to using bind in this case.
        .bindPopup(L.popup({
            maxWidth: 250,
            minWidth: 100,
            autoClose: false,
            closeOnClick: false,
            className: `${workout.type}-popup`
        }))
        .setPopupContent(`${workout.type === "running" ? "🏃‍♂️" : "🚴‍♀️"} ${workout.description}`)
        .openPopup()
    }

    _renderWorkout(workout){
        let html = `
            <li class="workout workout--${workout.type}" data-id="${workout.id}">
            <h2 class="workout__title">${workout.description}</h2>
            <div class="workout__details">
                <span class="workout__icon">${workout.type === "running" ? "🏃‍♂️" : "🚴‍♀️"}</span>
                <span class="workout__value">${workout.distance}</span>
                <span class="workout__unit">km</span>
            </div>
    
            <div class="workout__details">
                <span class="workout__icon">⏱</span>
                <span class="workout__value">${workout.duration}</span>
                <span class="workout__unit">min</span>
            </div>
        `;

        if(workout.type === 'running'){
            html += `
                    <div class="workout__details">
                        <span class="workout__icon">⚡️</span>
                        <span class="workout__value">${workout.pace.toFixed(1)}</span>
                        <span class="workout__unit">min/km</span>
                    </div>
                    <div class="workout__details">
                        <span class="workout__icon">🦶🏼</span>
                        <span class="workout__value">${workout.cadence}</span>
                        <span class="workout__unit">spm</span>
                    </div>
                </li>
            `;
        }
        if(workout.type === 'cycling'){
            html += `
                    <div class="workout__details">
                        <span class="workout__icon">⚡️</span>
                        <span class="workout__value">${workout.speed.toFixed(1)}</span>
                        <span class="workout__unit">km/h</span>
                    </div>
                    <div class="workout__details">
                        <span class="workout__icon">⛰</span>
                        <span class="workout__value">${workout.elevationGain}</span>
                        <span class="workout__unit">m</span>
                    </div>
                </li>
            `;
        }
        
        form.insertAdjacentHTML('afterend', html);
    }

    _moveToPopup(event){
        const workoutEl = event.target.closest(".workout");   // console.log(workoutEl);

        if (!workoutEl) return;

        const workout = this.#workouts.find(event => event.id === workoutEl.dataset.id);      console.log(workoutEl.dataset.id);
        this.#map.setView(workout.coords, this.#mapZoomLevel, {
            animate: true, 
            pan: {duration: 1}
        });
        
        // workout._click(); // using the public interface
    }

    _setLocalStorage(){
        localStorage.setItem("workouts", JSON.stringify(this.#workouts));
    }

    _getLocalStorage(){
        const data = JSON.parse(localStorage.getItem('workouts'));
        console.log(data);

        if(!data) return;

        this.#workouts = data; //This method will be executed right at the begining. And data will always start with an empty array with that will be stored in this.#workouts
        this.#workouts.forEach(work => this._renderWorkout(work)); //We ise _renderWorkout instead of _renderWorkoutMarker because once our page is reloaded right at the beginning, the #map in the _renderWorkoutMarker is not yed defined. So, that's why we get an error. On the other hand, the method _renderWorkout doesn't have this variable (#map).

        //When we convert our objects to a string and then back to a script from object, we lose the prototype chain. So, the new objects that we recover from the local storage are now regular objects. They're now no longer objects that were created by the running class or by the cycling class. And therefore, they won't be able to inherit any of their methods.
    }

    _reset(){
        localStorage.removeItem("workouts");
        location.reload(); //location is basically a big object that contains a lot of methods and properties in the browser. 
    }
    
}

const app = new App();   
// console.log(app);