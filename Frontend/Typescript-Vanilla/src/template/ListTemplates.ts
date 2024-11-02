import FullList from "../model/FullList"

interface DOMList {
    ul: HTMLUListElement,
    clear(): void,
    render(fullList: FullList): void,
}

class ListTemplate implements DOMList {
    ul: HTMLUListElement;
    static instance: ListTemplate = new ListTemplate();

    private constructor() {
        this.ul = document.getElementById("listItems") as HTMLUListElement;
    }

    clear(): void {
        this.ul.innerHTML = '';
    }

    render(fullList: FullList): void {
        this.clear();
        const self = this; //(1)

        fullList.list.forEach(function (item) {
            const li = document.createElement("li") as HTMLLIElement;
            li.className = "item";

            const check = document.createElement("input") as HTMLInputElement;
            check.type = "checkbox";
            check.id = item.id; 
            check.checked = item.checked;
            li.append(check);

            check.addEventListener('change', function(){
                item.checked = !item.checked;
                fullList.save();
            });

            const label = document.createElement("label") as HTMLLabelElement;
            label.htmlFor = item.id;
            label.textContent = item.item;
            li.append(label);

            const button = document.createElement("button") as HTMLButtonElement;
            button.className = 'button';
            button.textContent = 'X';
            li.append(button);

            button.addEventListener('click', function () {
                fullList.removeItem(item.id);
                self.render(fullList);
            });

            self.ul.append(li);
        });
    };
};

export default ListTemplate;

// (1)
//If we don't use this line of code then we'll get an error in this.render(fullList) and this.ul.append(li). This occurs because of the usage of the function keyword inside the forEach loop. In JS and TS.

//Inside the forEach callback and the click event listener on the button, "this" by default refers to the scope in which the callback function is executed, not the instance of ListTemplate.
//using the function keyword creates its own "this" context, which means that "this" inside the forEach function does not refer to the ListTemplate instance as you might expect. Instead, it refers to the function
//itself or the global context, leading to an error when trying to access this.render or this.ul.
//In your code, this.render(fullList) and this.ul.append(li) will throw errors because this is not bound to the instance of ListTemplate at that point.
//If we want to solve this by using the "function" keyword, then we must store the reference to "this" in a variable, which is called "self". In this approach, self is used to refer to the ListTemplate 
//instance inside the callback functions. This way, "this" doesn't get lost when the context changes.

//If you don't want to use the "function" keyword you can use an arrow function (() => {}) inside the forEach loop and event listeners. 
//Arrow functions do not have their own this context but inherit it from the surrounding lexical scope, which means this will correctly refer to the ListTemplate instance; 
//instead, they capture the this value from the enclosing lexical context, which is what you want in this case. By doing so you must also delete this line of code --> const self = this;
//This ensures that this correctly refers to the instance of ListTemplate. This change will fix the errors related to this.render(fullList); and this.ul.append(li);, as "this" will correctly 
//refer to the ListTemplate instance when the arrow functions are used.