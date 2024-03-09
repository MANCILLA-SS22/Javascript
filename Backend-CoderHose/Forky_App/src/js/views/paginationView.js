import View from "./View.js";
import icons from "url:../../imgs/icons.svg";

class PaginationView extends View{
    _parentElement = document.querySelector(".pagination");

    _generateMarkupButton(type, currentPage) {
            return `
                <button data-goto="${type === 'next' ? currentPage + 1 : currentPage - 1}" class="btn--inline pagination__btn--${type}">
                    ${type === 'next' ? `<span>Page ${currentPage + 1}</span>` : ''}
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-${type === 'next' ? 'right' : 'left'}"></use>
                    </svg>
                    ${type === 'prev' ? `<span>Page ${currentPage - 1}</span>` : ''}
                </button>
            `
        }

    _generateMarkup() {
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
        const currentPage = this._data.page;

        // First page
        if (currentPage === 1 && numPages > 1){
            return this._generateMarkupButton('next', currentPage);
        }
        
        // Last page
        if (currentPage === numPages && numPages > 1){
            return this._generateMarkupButton('prev', currentPage);
        }

        // Other page
        if (currentPage < numPages){
            return `${this._generateMarkupButton('next', currentPage)}
                    ${this._generateMarkupButton('prev', currentPage)}`;
        }
        
        // Page 1, no other pages
        return '';
    }

    addHandlerClick(handler){
        this._parentElement.addEventListener('click', function (event) {
            console.log(event)
            const btn = event.target.closest('.btn--inline'); //We need to use closese because, when clicking the child elements of the button, those will look up for the parent ".btn--inline". But, if we click on this element itself, we'll just get "null";
            console.log(btn);
            
            if(!btn) return;
            
            const gotoPage = Number(btn.dataset.goto);
            handler(gotoPage);
        })
    }

}

export default new PaginationView();
