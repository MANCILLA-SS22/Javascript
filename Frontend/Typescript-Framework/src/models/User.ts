import { AxiosResponse } from "axios";
import { Attributes } from "./Attribute";
import {Eventing} from "./Eventing";
import {Sync} from "./Sync";

interface UserProps {
    id?: number | string;
    name?: string;
    age?: number;
}

class User {
    public events: Eventing = new Eventing(); //(1)
    public sync: Sync<UserProps> = new Sync<UserProps>('http://localhost:3000/users');
    public attributes: Attributes<UserProps>;

    constructor(attrs: UserProps){ //attrs may be like {id: "ss22"}, {name: german} or {age: 26}
        this.attributes = new Attributes<UserProps>(attrs);
    }

    get on(){
        return this.events.on;
    }

    get trigger(){
        return this.events.trigger;
    }

    get get(){
        return this.attributes.get;
    }

    set(update: UserProps): void{
        this.attributes.set(update);
        this.events.trigger("change");
    }

    async fetch(): Promise<void>{
        try {
            const id: string | number = this.get('id');
            if(typeof id !== 'number' && typeof id !== 'string') throw new Error('Cannot fetch without an id');
            const response: AxiosResponse = await this.sync.fetch(id);
            this.set(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    async save(): Promise<void>{
        try {
            const response: AxiosResponse = await this.sync.save(this.attributes.getAll());
            this.trigger("save")
            console.log('response', response);
        } catch (error) {
            console.log('error');
        }
    }
}

export { User, UserProps}

// (1)
// 1. "public events" declares a property named events that belongs to the User class. The public keyword means:
//      - The property is accessible from outside the class.
//      - You can access it directly using an instance of the class, like user.events.
// 2. The property events is explicitly typed as an instance of the Eventing class:
//      - public events: Eventing;    --> This means events must have the structure and behavior defined in the Eventing class.
// 3. The "= new Eventing();" part creates a new instance of the Eventing class and assigns it to the events property when the User instance is created.
//      - new Eventing() calls the constructor of the Eventing class, initializing it as needed.