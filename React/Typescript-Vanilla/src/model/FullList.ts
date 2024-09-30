import ListItem from "./ListItem";

interface List {
    list: ListItem[],
    load(): void,
    save(): void,
    clearList(): void,
    addItem(itemObj: ListItem): void,
    removeItem(id: string): void,
};

class FullList implements List {
    static instance: FullList = new FullList(); //(1)
    private constructor(private _list: ListItem[] = []) {} //(2)

    load(): void {
        const storedList: string | null = localStorage.getItem("myList");
        if (typeof storedList !== "string") return;

        const parsedList: { _id: string, _item: string, _checked: boolean }[] = JSON.parse(storedList);
        parsedList.forEach(itemObj => {
            const newListItem = new ListItem(itemObj._id, itemObj._item, itemObj._checked);
            FullList.instance.addItem(newListItem);
        });
    };

    save(): void {
        localStorage.setItem("myList", JSON.stringify(this._list));
    };

    clearList(): void {
        this._list = [];
        this.save();
    };

    addItem(itemObj: ListItem): void {
        this._list.push(itemObj);
        this.save();
    };

    removeItem(id: string): void {
        this._list = this._list.filter(item => item.id !== id);
        this.save();
    };

    get list(): ListItem[] {
        return this._list;
    };
};

export default FullList;

// (1) We use "private" in front of the constructor because we're creating a Singleton, which means that there will only be one instance of this class created and we'll keep referring to that instance because 
//     we'll only have one list in our application.
// (2) We're instanciating this right here and we'll be able to refer to that as the instance of our class. 
//       - static --> static means that instance is a class-level property, not an instance-level property. It can be accessed directly on the class (FullList.instance) without creating an object of FullList.
//       - instance --> is a property of type FullList.
//       - new FullList() --> creates a new instance of the FullList class and assigns it to the instance property.
//     The combination of static and private constructor is used to implement the singleton pattern, which ensures that only one instance of the FullList class can exist. Here's how it works:
//       - Static Property(instance): The static instance holds a single instance of the FullList class. This instance is created at the time the class is loaded.
//       - Private Constructor: The constructor is marked as private, meaning that no other part of the code can create an instance of FullList using the new keyword.This enforces the rule that only the static instance property can be used to get the instance of FullList.
//     This pattern is useful when you need to ensure that only a single instance of a class is used throughout the application, typically for managing a shared resource or data, like a list of items in this example.
//     To use the FullList instance, you would do something like:     const listInstance = FullList.instance;
//     This guarantees that listInstance will always refer to the same instance of FullList.