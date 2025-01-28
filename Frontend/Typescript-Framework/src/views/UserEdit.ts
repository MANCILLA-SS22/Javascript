import { User, UserProps } from "../models/User"; import { UserForm } from "./UserForm"; import { UserShow } from "./UserShow"; import { View } from "./Views";

class UserEdit extends View<User, UserProps> {
    regionsMap(): { [key: string]: string } {
        return {
            userShow: '.user-show',
            userForm: '.user-form'
        }
    };

    onRender(): void {
        const userShow = new UserShow(this.regions.userShow, this.model);
        const userForm = new UserForm(this.regions.userShow, this.model);

        userShow.render();
        userForm.render();
    };

    template(): string {
        return `
            <div>
                <div class="user-show">
                    
                </div>
                <div class="user-form">
                    
                </div>
            </div>
        `;
    }
}

export { UserEdit };