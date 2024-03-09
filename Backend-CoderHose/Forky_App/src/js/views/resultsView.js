import previewView from "./previewView.js";
import View from "./View.js";

class ResultsView extends View{
    _parentElement = document.querySelector(".results");
    _errorMessage = "No recipe found for your query! Please try again.";
    _message = "";

    _generateMarkup(){
        // console.log(this._data);
        return this._data.map(res => previewView.render(res, false)).join("");
    }
}

export default new ResultsView();