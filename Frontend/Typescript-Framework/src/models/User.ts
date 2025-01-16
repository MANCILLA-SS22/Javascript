import Eventing from "./Eventing";
import Sync from "./Sync";

interface UserProps {
    id?: number | string;
    name?: string;
    age?: number;
}

const rootUrl = 'http://localhost:3000/users';

class User {
    public events: Eventing = new Eventing(); //(1)
    public sync: Sync<UserProps> = new Sync<UserProps>(rootUrl);
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