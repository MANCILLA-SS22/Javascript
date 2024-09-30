interface Item {
    id: string,
    item: string,
    checked: boolean
};

class ListItem implements Item {
    constructor(private _id: string = '', private _item: string = '', private _checked: boolean = false){}

    get id(): string{
        return this._id;
    };

    set id(id: string){
        this._id = id;
    };

    get item(): string {
        return this._item;
    };

    set item(item: string) {
        this._id = item;
    };

    get checked(): boolean {
        return this._checked;
    };

    set checked(checked: boolean) {
        this._checked = checked;
    };
};

export default ListItem;

//The underscore (_) prefix in the constructor parameters (_id, _item, _checked) is a common convention in TypeScript to distinguish between private class fields and public properties or getter methods.
// - The underscore prefix (_) is used to denote that these fields are private members of the class.
// - The private keyword automatically creates and initializes private fields, which means you don't need to declare them separately.
// - This convention helps differentiate between the internal representation (_id) and the public getters (id).
//For example:
// -  _id is the private field that stores the actual value.
// -  The public getter get id() provides access to the value without exposing the underlying private field.
//This approach keeps the internal state of the class hidden and allows you to control how the values are accessed or modified, which is an important principle in object - oriented programming(encapsulation).
//You could also use different names for the fields and getters, but using an underscore is a common way to maintain consistency and readability.