import icons from "url:../../imgs/icons.svg";
import {Fraction} from "fractional";

export default class View{ //We're exporting the class itself because we aren't going to create any instance of this view. This is the parent class of the other child views.
    _data;

    /**
    * Render the received object to the DOM
    * @param {Object | Object[]} data The data to be rendered (e.g. recipe)
    * @param {boolean} [render=true] If false, create markup string instead of rendering to the DOM
    * @returns {undefined | string} A markup string is returned if render=false
    * @this {Object} View instance
    * @author Jonas Schmedtmann
    * @todo Finish implementation
    */
    
    render(data, render = true){
        // console.log(data)
        if( !data || (Array.isArray(data) && data.length === 0) ) return this.renderError();
        this._data = data;
        const markup = this._generateMarkup();
        if(!render) return markup;
        
        this._clear();
        this._parentElement.insertAdjacentHTML("afterbegin", markup);
    }

    update(data){
        this._data = data; //Once we update the data, we then want the view's data to become that new data
        const newMarkup = this._generateMarkup(); //We also want to generate some new markup. And this will be the entire Markup as if we wanted to render a new view. (We're just going to update the Markup). For doing that, we still need the entire markup so that we can then compare it to the old markup. So, here we'll create a new markup but not render it. Finally, we'll generate this markup and then compare that new HTML to the current HTML, and then only change text and attributes that actually have changed from the old version to the new one. Remember that this markup is just a string.
        const newDOM = document.createRange().createContextualFragment(newMarkup); //The second method convert the string from newMarkup into new real DOM node objects. Then, newDom will become like a big object which is like a virtual DOM. So, a DOM that is not really living on the page, but which live in our memory. And so we can now use that DOM as if it was a real DOM on our page.
        const newElements = Array.from(newDOM.querySelectorAll("*")); //We will select and see all the elements that will be contained inside of the newDom element that we basically created from generating the new Markup from the updated data.
        const curElements = Array.from(this._parentElement.querySelectorAll("*"));

        //console.log("newMarkup", newMarkup); 
        // console.log("newDOM", newDOM);
        // console.log("newElements", newElements); 
        // console.log("curElements", curElements);

        newElements.forEach(function(newEl, i){ 
            const curEl = curElements[i];
            // console.log(curEl, newEl.isEqualNode(curEl)); //Here we're going to compare the nodes both in newElements and curElements. So, we'll do that with thank for the isEqualNode() method.

            // Updates changed TEXT
            if (!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== ''){ //We verify if both element's nodes are different and if the text first child of the element newEl is diferent to an empty string. We use firstChild because this returns the first child node of an element, and we use this because that node contains the text. After that, We use nodeValue because this Sets or returns the value of a node. So, the value of this method will be null if the node is an element, but if it's text, then we'll actually get the content. We also use the optional chaining (?.) because the first child might not always exist, and if we don't use it appropriately, then we'll get an error.
                // console.log('😈', newEl.firstChild.nodeValue.trim());
                curEl.textContent = newEl.textContent; //If so, we update the textContent from curEl with the textContent from the newEl. Remember that curEl es the actual element that is currently on the page.
            }

            // Updates changed ATTRIBUES
            if (!newEl.isEqualNode(curEl)){ //We use this logic because once the element change, the atrributes must change as well. We don't use newEl.firstChild?.nodeValue.trim() because right up we needed to deal with elements with only text. So not here.
                // console.log(newEl.attributes);
                Array.from(newEl.attributes).forEach(function(attr) {
                    // console.log("attr.name", attr.name); console.log("attr.value", attr.value);
                    return curEl.setAttribute(attr.name, attr.value); //What we're doing here is to simply replace all the attributes in the current element by the attributes coming from the new element 
                });
            }
        });
    }

    _clear(){
        this._parentElement.innerHTML = '';
    }

    renderSpinner(){
        const markup = `
        <div class="spinner">
            <svg>
                <use href="${icons}#icon-loader"></use>
            </svg>
        </div>`
        this._clear();
        this._parentElement.insertAdjacentHTML("afterbegin", markup);
    }

    renderError(message = this._errorMessage){
        const markup = `
            <div class="error">
                <div>
                    <svg>
                        <use href="${icons}#icon-alert-triangle"></use>
                    </svg>
                </div>
                <p>${message}</p>
            </div>
        `;

        this._clear();
        this._parentElement.insertAdjacentHTML("afterbegin", markup);
    }

    renderMessage(message = this._message){
        const markup = `
            <div class="message">
                <div>
                    <svg>
                        <use href="${icons}#icon-smile"></use>
                    </svg>
                </div>
                <p>${message}</p>
            </div>
        `;

        this._clear();
        this._parentElement.insertAdjacentHTML("afterbegin", markup);
    }

    _generateMarkupIngredient(event){
        return `
            <li class="recipe__ingredient">
                <svg class="recipe__icon">
                    <use href="${icons}#icon-check"></use>
                </svg>
                <div class="recipe__quantity">${event.quantity ? new Fraction(event.quantity).toString() : ""}</div>
                <div class="recipe__description">
                    <span class="recipe__unit">${event.unit}</span>
                    ${event.description}
                </div>
            </li> `
    }
}
