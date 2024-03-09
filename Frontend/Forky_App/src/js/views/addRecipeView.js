import View from "./View.js";
import icons from "url:../../imgs/icons.svg";

class AddRecipeView extends View{
    _parentElement = document.querySelector(".upload");
    _message = "Recipe was successfully uploaded :)"

    _window = document.querySelector(".add-recipe-window");
    _overlay = document.querySelector(".overlay");
    _btnOpen = document.querySelector(".nav__btn--add-recipe");
    _btnClose = document.querySelector(".btn--close-modal");

    constructor(){
        super();
        this._addHandlerShowWindow(); // The _addHandlerShowWindow() method is gonna be used inside of this class. In order to show the window, the controller doesn't interfere at all. And, what we'll have to do in the controller, is to import this object at the end of the code, because otherwise, our main script sort of controller will never execute this file, and so the object () will never be created, and so the event listener in _btnOpen will never be added.
        this._addHandlerHideWindow();
    }

    toggleWindow(){
        this._overlay.classList.toggle("hidden");
        this._window.classList.toggle("hidden");
    }

    _addHandlerShowWindow(){ //We want this to be called as soon as the page loads. This has nothing to do with any controler because there's nothing special happening here that the controller needs to tell us. When this click happens o the button open, all that will happen is really for the window to show. So the controller, it doesn't need to interfere in any of the below variables (_overlay and _window). Fianlly, we can run this funcion as soon as this object is created. 
        this._btnOpen.addEventListener("click", this.toggleWindow.bind(this)); //Remember that we must not use the this keyword inside of a handler function because the this keyword inside of it points to the element on which that listener is attached to. So in this case, the _btnOpen. To solve this, we manually sett the this keyword inside of the toggleWindow function, now to the this keyword that we actually want it to be. So, the this keyword inside of bind points to the current object.
    }

    _addHandlerHideWindow(){
        this._btnClose.addEventListener("click", this.toggleWindow.bind(this));
        this._overlay.addEventListener("click", this.toggleWindow.bind(this));
    }

    _addHandlerUpload(handler){
        this._parentElement.addEventListener("submit", function(event){
            event.preventDefault();
            const dataArr = [...new FormData(this)]; //The FormData interface provides a way to construct a set of key/value pairs representing form fields and their values, which can be sent using the fetch(), XMLHttpRequest.send() or navigator.sendBeacon() methods. It uses the same format a form would use if the encoding type were set to "multipart/form-data
            const data = Object.fromEntries(dataArr);

            // handler(dataArr); 
            handler(data);
        })
    }

    _generateMarkup(){

    }


}

export default new AddRecipeView();
