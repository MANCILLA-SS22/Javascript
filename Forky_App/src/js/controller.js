import { async } from "regenerator-runtime";
import "regenerator-runtime/runtime"; //This is for polyfilling async/await
import "core-js/stable";
import * as model from "./model.js";
import {MODAL_CLOSE_SEC} from "./config.js"
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import bookmarksView from "./views/bookmarksView.js";
import addRecipeView from "./views/addRecipeView.js";
import paginationView from "./views/paginationView.js"

if (module.hot) { //This comes from Parcel.
  module.hot.accept();
}

//We can't export functions from controller to the view becuase: 1) Controller is the main module that controls what happens in the app. It delegates tasks to models and views. 2) The controller.js file is linked with the index.html file, which makes it an entry point for all other JavaScript modules.
function init(){
  bookmarksView.addHandlerRender(controlBookmars);
  addRecipeView._addHandlerUpload(controlAddRecipe);
  recipeView.addHandlerrender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark)
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  // controlServings(); We MUST NOT use this function here because of the asynchronous nature of our application. So, we're basically trying to control the servings simply after registering the handler functions right up. But by that time, no recipe has yet arrived from the API. And therefore state.recipe is not yet defined. So here we're then trying to read ingredients from the recipe that doesn't exist. If we would want to solve this, we can use this funcion at the end of contronRecipes(). After the recipe is loaded.
}

async function controlRecipe(){
  try{

    const id = window.location.hash.slice(1);  //console.log(id);
    if(!id) return;
    recipeView.renderSpinner();

    // 0) Update results view to mark selectect search result
    resultsView.update(model.getSearchResultPage());

    // 1) Updating bookmarks view
    bookmarksView.update(model.state.bookmarks);

    // 2) Loading the recipe
    await model.loadRecipe(id); //This is an async function calling another asyinc function. That's why we use await.
    
    // 3) Rendering recipe
    recipeView.render(model.state.recipe);  //This is the same as the following line of code: const res = new recipeView(model.state.recipe);
    
    

  } catch (err) {
    console.error(`${err} 😈`)
    recipeView.renderError(); //We catch the re-thrown error from model.js and then call the renderError() function from the same file.
  }

  
}

async function controlSearchResults(){
  try {

    resultsView.renderSpinner();

    // 1) Get serch query
    const query = searchView.getQuery();
    if(!query) return resultsView.renderError();

    // 2) Load search resutls
    await model.loadSearchResults(query);

    // 3) Render results
    // console.log(model.state.search.results);
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultPage());

    // 4) Render initial pagination buttons
    paginationView.render(model.state.search);

  } catch (err) {
    console.log(err)
  }
}

function controlPagination(gotoPage){
  //this actually works because render will basically overwrite the markup that was there previously. And the reason for that is that we here have the clear method. And so before any new HTML is inserted into the page, the parentElement is first cleared, so it's first emptied, right. And so then that means that render here basically overwrites everything that was there and puts the new content in the same place.

  // 3) Render NEW results
  resultsView.render(model.getSearchResultPage(gotoPage));

  // 4) Render NEW pagination buttons
  paginationView.render(model.state.search);
}

function controlServings(newServings){

  //Update the recipe servings (in state)
  model.updateServings(newServings);

  //Update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe); //The difference between this line en the above one, is that this one will basically update text and attributes in the DOM, without having to re-render the entire view, and the other one will render all the html.
}

function controlAddBookmark(){
  // 1) Add/delete bookmark
  !model.state.recipe.bookmarked ? model.addBookmark(model.state.recipe) : model.deleteBookmark(model.state.recipe.id);
  
  // 2) Update recipe view
  console.log(model.state.recipe);
  recipeView.update(model.state.recipe);

  // 3) Render bookmarks
  bookmarksView.render(model.state.bookmarks);
}

function controlBookmars(){
  bookmarksView.render(model.state.bookmarks);
}

function clearBookmarks(){
  localStorage.clear("bookmarks");
}

async function controlAddRecipe(newRecipe){
  try {
    //Show loadig spinner
    addRecipeView.renderSpinner();

    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    //Render recipe
    recipeView.render(model.state.recipe);

    //Success message
    addRecipeView.renderMessage();

    //Render bookmark view
    bookmarksView.render(model.state.bookmarks);

    //Change ID in the URL
    window.history.pushState(null, "", `#${model.state.recipe.id}`);

    //Close form window
    setTimeout(function() {
      addRecipeView.toggleWindow()
    }, MODAL_CLOSE_SEC * 1000);

  } catch (err) {
    console.error("💣", err);
    addRecipeView.renderError(err.message);
  }
}

init();
// clearBookmarks();






