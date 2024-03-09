import { API_URL, RES_PER_PAGE, KEY } from "./config.js";
import { AJAX } from "./helpers.js";
// import { getJSON, sendJSON } from "./helpers.js";

export const state = {
    recipe: {},
    search: {
        query: "",
        results: [],
        page: 1,
        resultsPerPage: RES_PER_PAGE
    },
    bookmarks: [],
};

function createRecipeObject(data){
    const {recipe} = data.data;
    return state.recipe = {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        sourceUrl: recipe.source_url,
        image: recipe.image_url,
        servings: recipe.servings,
        cooking_time: recipe.cooking_time,
        ingredients: recipe.ingredients,
        ...(recipe.key && {key:recipe.key})
    };
}

export async function loadRecipe(id){ //This function doesn't return anything, so therefore, we are not storing any result into any new variable. Instead, we'll get access state.recipe. So to that state.recipe that is going to be manipulated right up. loadRecipe function is not a pure function. So it has the side effect of manipulating this variable that is outside of it. 
    try {
        const data = await AJAX(`${API_URL}${id}?key=${KEY}`); //console.log(data)

        state.recipe = createRecipeObject(data);

        if(state.bookmarks.some(event => {event.id === id;})){
            state.recipe.bookmarked = true;
        }else{
            state.recipe.bookmarked = false;
        }
        // console.log(state.recipe);
    } catch (err) {
        console.error(`${err} 🥶`);
        throw err; //We re-throw this error so the other file (controller.js) can recive it.
    }
};

export async function loadSearchResults(query){
    try {
        state.search.query = query;
        const res = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);
        // console.log(res);

        state.search.results = res.data.recipes.map(function(event){ //This will return a new arraw tith the new objects.
            return {
                id: event.id,
                title: event.title,
                publisher: event.publisher,
                image: event.image_url,
                ...(event.key && {key:event.key})
            }
        });
        state.search.page = 1;
        // console.log(state.search.results)

    } catch (err) {
        console.error(`${err} ☠`);
        throw err; //We re-throw this error so the other file (controller.js) can recive it.
    }
};

export function getSearchResultPage(page = state.search.page){
    state.search.page = page; //We need to do this because it's important to know where page we are in and upgrade this new value in the state object. So, once we naviate across the pages, we'll have stored the number of the page.
    const start = (page - 1) * state.search.resultsPerPage;
    const end = (page) * state.search.resultsPerPage;

    return state.search.results.slice(start, end);
};

export function updateServings(newServings){ //This function reachs into the state (into the recipe ingredients), and then change the quantity in each ingredient.
    state.recipe.ingredients.forEach(function(ing){ //We can create a new array and then override state.recipe.
        ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
    });

    state.recipe.servings = newServings; //We're doing that at the end of the function because otherwise, we could not preserve the old state.recipe.servings (the original value).
};

export function addBookmark(recipe){
    state.bookmarks.push(recipe);
    
    if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

    persistBookmarks();
};

export function deleteBookmark(id){
    const index = state.bookmarks.findIndex(el => el.id === id);
    state.bookmarks.splice(index, 1);
    
    if (id === state.recipe.id) state.recipe.bookmarked = false;

    persistBookmarks();
};

function persistBookmarks(){
    localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

function init(){
    const storage = localStorage.getItem("bookmarks");
    if(storage) state.bookmarks = JSON.parse(storage);
};

export async function uploadRecipe(newRecipe){//This one will make a request to the API and so therefore this needs to e an async function. This function will take the raw input data and transform it into the same format as the data that we also get out of the API. 
    try {
        const ingredients = Object.entries(newRecipe)
        .filter(function(entry){
            return entry[0].startsWith("ingredient") && entry[1] !== "";
        })
        .map(function(ing){
            const ingArr = ing[1].split(",").map(res => res.trim());  // const ingArr = ing[1].replaceAll("").split(",");
            if(ingArr.length !== 3) throw new Error("Wrong ingredient format, please use the correct format!");
    
            const [quantity, unit, description] = ingArr;
    
            return {
                quantity: quantity ? Number(quantity) : null, 
                unit: unit, 
                description: description
            };
        })

        const recipe = {
            title: newRecipe.title,
            source_url: newRecipe.sourceUrl, //sourceUrl: recipe.source_url
            image_url: newRecipe.image,      //image_url: recipe.image_url
            publisher: newRecipe.publisher,
            cooking_time: Number(newRecipe.cookingTime), //DUDA
            servings: Number(newRecipe.servings),
            ingredients: newRecipe.ingredients
        };

        const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
        state.recipe = createRecipeObject(data);
        addBookmark(state.recipe);
        
        //console.log(state.recipe);
        // console.log(data); 
        // console.log(ingredients); 
        // console.log(recipe);

    } catch (err) {
        throw err;
    }
}

init();