type Callback = () => void;

class Eventing {

    constructor(){
        this.on = this.on.bind(this);
        this.trigger = this.trigger.bind(this);
    }

    events: { [key: string]: Callback[] } = {}
    
    on(eventName: string, callback: Callback): void{
        const handlers = this.events[eventName] || [];
        handlers.push(callback);
        this.events[eventName] = handlers;
    }

    trigger(eventName: string): void{
        console.log("eventName", eventName);
        const handlers = this.events[eventName];
        if (!handlers || handlers.length === 0) return;

        handlers.forEach(function (callback) {
            return callback();
        });
    }
}

export {Eventing};

/* //Method 2
type Callback = () => void;

class Eventing {
    events: { [key: string]: Callback[] } = {}

    on = (eventName: string, callback: Callback): void => {
        const handlers = this.events[eventName] || [];
        handlers.push(callback);
        this.events[eventName] = handlers;
    }

    trigger = (eventName: string): void => {
        const handlers = this.events[eventName];
        if (!handlers || handlers.length === 0) return;

        handlers.forEach(function (callback) {
            return callback();
        });
    }
}

export default Eventing; */