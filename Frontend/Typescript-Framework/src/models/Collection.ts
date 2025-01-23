import axios, { AxiosResponse } from "axios";
import { Eventing } from "./Eventing";


// 1. Use .bind(this)
class Collection<T, K> {
    models: T[] = [];
    events: Eventing = new Eventing();
    

    constructor(public rootUrl: string, public deserialize: (json: K) => T) { }

    get on() {
        return this.events.on;
    }

    get trigger() {
        return this.events.trigger;
    }

    async fetch(): Promise<void> {
        try {
            const response: AxiosResponse = await axios.get(this.rootUrl);

            response.data.forEach(function (value: K) { //(1)
                this.models.push(this.deserialize(value));
            }.bind(this));

            this.trigger('change');

        } catch (error) {
            console.log('error', error);
        }
    }
}

export { Collection }

/* // 2. Use an Arrow Function
class Collection<T, K>{
    models: T[] = [];
    events: Eventing = new Eventing();

    constructor(public rootUrl: string, public deserialize: (json: K) => T){}

    get on(){
        return this.events.on;
    }

    get trigger() {
        return this.events.trigger;
    }

    async fetch(): Promise<void>{
        try {
            const response: AxiosResponse = await axios.get(this.rootUrl);
            
            response.data.forEach((value: K) => { //(1)
                this.models.push(this.deserialize(value));
            });

            this.trigger('change');

        } catch (error) {
            console.log('error', error);
        }
    }
}

export {Collection} */

/* // 3. Store this in a Variable
class Collection<T, K>{
    models: T[] = [];
    events: Eventing = new Eventing();

    constructor(public rootUrl: string, public deserialize: (json: K) => T) {
    }

    get on() {
        return this.events.on;
    }

    get trigger() {
        return this.events.trigger;
    }

    async fetch(): Promise<void> {
        try {
            const response: AxiosResponse = await axios.get(this.rootUrl);
            const self = this;

            response.data.forEach(function (value: K) { //(1)
                self.models.push(this.deserialize(value));
            });

            this.trigger('change');

        } catch (error) {
            console.log('error', error);
        }
    }
} 

export { Collection }*/

//(1)
//The error "TypeError: this is undefined" occurs because of how the this keyword behaves in the callback function within the forEach method inside your fetch method.
//In JavaScript, the behavior of this depends on how a function is called, not where it is defined:
//    - Arrow functions inherit the this value from their enclosing lexical scope.
//    - Regular functions(function (value: UserProps)) create their own this, which defaults to undefined in strict mode(or the global object in non - strict mode).
// The forEach callback is a regular function, so this inside it refers to undefined (in strict mode). It does not inherit the this from the enclosing fetch method.
// The solutions are: 
//    1. Use an Arrow Function: Arrow functions inherit the this value from the surrounding lexical scope, which in this case is the fetch method.
//    2. Store 'this' in a Variable: Before the forEach loop, you can store the value of this in a variable, and then use the variable inside the callback.
//    3. Use .bind(this): You can explicitly bind the correct this to the callback function using .bind.