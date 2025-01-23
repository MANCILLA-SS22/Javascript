import { ApiSync } from "./ApiSync";
import { Attributes } from "./Attribute";
import { Collection } from "./Collection";
import { Eventing } from "./Eventing";
import { Model } from "./Model";

interface UserProps {
    id?: number | string;
    name?: string;
    age?: number;
}

const rootUrl = 'http://localhost:3000/users';

class User extends Model<UserProps>{
    //Method 1: Using "constructor and the "super" class
    // constructor(attrs: UserProps) {
    //     super(new Attributes<UserProps>(attrs), new Eventing(), new ApiSync<UserProps>(rootUrl));
    // }

    // static buildUserCollection(): Collection<User, UserProps> {
    //     return new Collection<User, UserProps>(rootUrl, (attrs: UserProps) => new User(attrs));
    // }

    //Method 2: Using "static"
    static buildUser(attrs: UserProps): User { //attrs may be like {id: "ss22"}, {name: german} or {age: 26}
        return new User(new Attributes<UserProps>(attrs), new Eventing(), new ApiSync<UserProps>(rootUrl));
    }

    static buildUserCollection(): Collection<User, UserProps> {
        return new Collection<User, UserProps>(rootUrl, (attrs: UserProps) => User.buildUser(attrs));
    }
}

export { User, UserProps }

// public events: Eventing = new Eventing(); //(1)
// 1. "public events" declares a property named events that belongs to the User class. The public keyword means:
//      - The property is accessible from outside the class.
//      - You can access it directly using an instance of the class, like user.events.
// 2. The property events is explicitly typed as an instance of the Eventing class:
//      - public events: Eventing;    --> This means events must have the structure and behavior defined in the Eventing class.
// 3. The "= new Eventing();" part creates a new instance of the Eventing class and assigns it to the events property when the User instance is created.
//      - new Eventing() calls the constructor of the Eventing class, initializing it as needed.