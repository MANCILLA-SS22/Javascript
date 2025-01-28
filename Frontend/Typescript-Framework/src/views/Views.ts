import { HasId, Model } from "../models/Model";

abstract class View<T extends Model<K>, K extends HasId> { //(1)
    regions: {[key: string]: Element} = {}

    constructor(public parent: Element, public model: T) {
        this.bindModel();
    };

    abstract template(): string;


    regionsMap(): { [key: string]: string } {
        return {};
    }

    mapRegions(fragment: DocumentFragment): void{
        const regionsMap =  this.regionsMap();

        for(let key in regionsMap){
            const selector = regionsMap[key];
            const element = fragment.querySelector(selector);
            if(element) this.regions[key] = element;
        }
    }

    eventsMap(): { [key: string]: () => void } { //We remove the "abstract" keyword from eventsMap() becasue we're saying that eventsMap is no longer required to be implemented in a child class (UserShow).
        return {}; //The type definition is saying 'if we ever look up a key in this object, we should get back a function that doesnt return anything'. That type definition doesn't say that there has to be a property in there, only that if there is a property, we should get X.

    }
    
    bindModel = (): void => {
        this.model.on("change", () => {
            this.render();
        });
    };

    onRender(): void{

    }

    render(): void {
        this.parent.innerHTML = "";
        const templateElement = document.createElement("template");
        templateElement.innerHTML = this.template();
        this.bindEvents(templateElement.content);
        this.mapRegions(templateElement.content);
        this.onRender();
        this.parent.append(templateElement.content);
    }

    bindEvents(fragment: DocumentFragment): void {
        const eventsMap = this.eventsMap();

        for (let eventKey in eventsMap) {
            const [eventName, selector] = eventKey.split(":");
            fragment.querySelectorAll(selector).forEach(element => element.addEventListener(eventName, eventsMap[eventKey]));
        }
    }
}

export {View};

//So this is saying that t is going to have all the same properties as a model with type K loaded into it. And where is the definition of K coming from? The definition of K is coming from the second generic
//type being passed in. So whenever we make reference to view, we're going to pass in a type of model. And then the second type that we're going to pass in is going to be the set of attributes that are
//going to exist inside of that model. The type K is being like copy pasted over Model<K>.