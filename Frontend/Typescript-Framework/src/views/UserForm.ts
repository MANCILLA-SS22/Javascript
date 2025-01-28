import { User, UserProps } from "../models/User"; import { View } from "./Views";

class UserForm extends View<User, UserProps>{ //(1)
    template(): string {
        return `
            <div>
                <input placeholder="${this.model.get('name')}"/>
                <button class="set-name">Change name</button>
                <button class="set-age">Set Random Age</button>
                <button class="save-model">Save User</button>
            </div>
        `;
    } 

    eventsMap(): { [key: string]: () => void } {
        return {
            "click:.set-age": this.onSetAgeClick,
            "click:.set-name": this.onSetNameClick,
            "click:.save-model": this.onSaveClick,
        }
    };

    onSetAgeClick = (): void => {
        this.model.setRandomAge();
    };

    onSetNameClick = (): void => {
        const input = this.parent.querySelector("input");
        if(input){
            const name = input.value;
            this.model.set({ name });
        }
    };

    onSaveClick = ():void =>{
        this.model.save();
    }
}

export {UserForm};

//(1)
//We need to pass in UserProps along with User that already references UserProps because the term 'ViewModel' has a very specific definition that doesn't quite fit what we're building here.