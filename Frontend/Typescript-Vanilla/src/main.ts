import './css/style.css';
import FullList from './model/FullList';
import ListTemplate from './template/ListTemplates';
import ListItem from './model/ListItem';

function initApp(): void{
    const fullList = FullList.instance;
    const template = ListTemplate.instance;    
    const itemEntryForm = document.getElementById("itemEntryForm") as HTMLFormElement; // Add listener to new entry form submit
    const clearItems = document.getElementById("clearItemsButton") as HTMLButtonElement; // Add listener to "Clear" button

    itemEntryForm.addEventListener("submit", function(event: SubmitEvent): void{
        event.preventDefault();
        const input = document.getElementById("newItem") as HTMLInputElement;// Get the new item value
        const newEntryText: string = input.value.trim();
        if (!newEntryText.length) return;
        
        const itemId: number = fullList.list.length ? parseInt(fullList.list[fullList.list.length - 1].id) + 1 : 1; // calculate item ID
        const newItem = new ListItem(itemId.toString(), newEntryText); // create new item
        fullList.addItem(newItem); // Add new item to full list
        template.render(fullList); // Re-render list with new item included
    });

    clearItems.addEventListener('click', function(): void{
        fullList.clearList();
        template.clear();
    });

    fullList.load(); // load initial data
    template.render(fullList); // initial render of template
}

document.addEventListener("DOMContentLoaded", initApp); //This says that we're not going to run our JS code until the DOM content is loaded. We make sure those elements exist before we try to interact with them