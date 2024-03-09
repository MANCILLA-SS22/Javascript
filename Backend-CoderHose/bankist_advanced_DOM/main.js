//Proyecto 2: Bankist_Advanced-DOM
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector(".nav");
const header = document.querySelector(".header");

function openModal(evento) {
    evento.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

function closeModal() {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

//Metodo 2
btnsOpenModal.forEach(function(evento) {
    evento.addEventListener("click", openModal)
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

//Closing a card by using the keydown method in addEventListener
document.addEventListener('keydown', function (evento) {
    if (evento.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

//Finding coordenates and position, and use of scroll
btnScrollTo.addEventListener("click", function(evento){
    section1.scrollIntoView({behavior: "smooth"});
});

//Page navigation
document.querySelector(".nav__links").addEventListener("click", function(evento){
    evento.preventDefault();

    //Aqui usamos evento.target porque en este caso estamos utilizando el <ul> como elemento padre, y sus hijos son <li> y <a>. Ahora, con el addEventListener podemos hacer click en el elemento padre o incluso sus hijos y JS ejecutara la tarea deseada. Si usamos this como en el metodo 1, este solo funcionara para elelemento actual o el padre, es decir <ul>.
    if (evento.target.classList.contains("nav__link")) {
        const id = evento.target.getAttribute("href"); //Retorna unicamente el nombre del atriuto contenido en esa etiqueta. Si usamos const id = this.href, entonces tendremos el link completo que aparece en la barra de navegacion
        document.querySelector(id).scrollIntoView({behavior: "smooth"});
    }
});

// Building a Tabbed Component
tabsContainer.addEventListener('click', function (evento) {

    //Debemos añadir el closest(), ya que operations__tab-container tiene de hijos tres elementos botones con un span cada uno. Por lo que al presionar el boton, especificamente el texto (span), no funcionara correctamente el boton. Es por eso que agregamos el closest(), para que al presionar el boton, considere unicamente el elemento mas cercano con el nombre operations__tab (incluyendo su hijo <span>).  Cabe mencionar que, si precionamos donde esta el <div class="operations__tab-container"> entonces tendremos un null en consola, ya que no existe ningun elemento padre con el  class ".operations__tab". Para eso usamos el Guard clause, para que al no haber un click en el botton, simplemente salga de la funcion y no ejecute las lineas siguientes.
    const clicked = evento.target.closest('.operations__tab');  console.log(clicked);
    
    // Guard clause
    if (!clicked) return;

    //Realizamos un barrido en cada uno de los 3 botones y en cada uno de los 3 contenidos de texto. Dependiendo del boton seleccionado, a este se le eliminaran sus "active"
    tabs.forEach(evento => evento.classList.remove('operations__tab--active'));
    tabsContent.forEach(evento => evento.classList.remove('operations__content--active'));

    //Una vez eliminado los "active" en el boton y el contenido seleccinado, ahora se procede a "activar" el boton y su contenido seleccionado.
    clicked.classList.add('operations__tab--active');

    //Dependiendo del boton que se haya presionado, este realizara la animacion en el boton, y tambien se desplegara el contenido de texto del boton seleccionado.
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active'); 
});

//Passing Arguments to Event Handlers
function handleHover(evento) {
    //Recordar que cuando utilizamos bind(), la keyword "this" representa los parametros que le enviamos a la funcion, en este caso, 0.5 y 1.
    if (evento.target.classList.contains('nav__link')) {
        const link = evento.target;
        const siblings = link.closest('.nav').querySelectorAll('.nav__link');

        siblings.forEach(iter => { //Convertir a arrow function
            if (iter !== link) iter.style.opacity = this;
        });
    }
};

// Usamos bind para retornar una nueva funcion de esa funcion handleHover, y de esa forma, no tener que usar una funcion que llame a otra funcion.
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

//Sticky navigation
function stickyNav(entries, observer){
    const [entry] = entries; //entries is always an array because the options in IntersectionObserver can have multiple thresholds, and for each threshold, there will be an entry in the array, even if there is only one threshold.
    // console.log(entry, observer);

    if (entry.isIntersecting) { //When the target isn't intersecting the root, then we want the sticky class to be applied.
        nav.classList.remove("sticky");
    }else{
        nav.classList.add("sticky");
    }
}

const options = {
    root: null, //We select null because we are interested in the entire viewport
    threshold: 0, //A value of 0 means that even a single visible pixel counts as the target being visible. That's to say, when the header shows a 0% of itself, then the function will get called .

    //We use getBoundingClientRect().height to calculate dynamically the height (for responsive webpages) of the nav without the needed of hard coding and tupe an specific height. It'll be 90px.
    rootMargin: `-${nav.getBoundingClientRect().height}px` //This value is in pixels and will be applied outside of the target element
};

const headerObserver = new IntersectionObserver(stickyNav, options);
headerObserver.observe(header);


// Revealing Elements on Scroll
const allSections = document.querySelectorAll(".section");

const revealSection = function(entries, observer){
    const [entry] = entries;     //console.log(entry)

    if(entry.isIntersecting === false) return;
    entry.target.classList.remove("section--hidden");

    observer.unobserve(entry.target);
};
const opciones = {
    root: null,
    threshold: 0.15, //We use something greater than zero because we don't want to show the section right as it enters the viewport, but a litte latter.
}

const sectionObserver = new IntersectionObserver(revealSection, opciones)

allSections.forEach(function(section){
    sectionObserver.observe(section);
    // section.classList.add("section--hidden");
});


//Lazy Loading Images
const imgTarget = document.querySelectorAll("img[data-src]");  // console.log(imgTarget);

const loadImg = function(entries, observer){
    const [entry] = entries;   //console.log(entry);

    if(entry.isIntersecting === false) return;

    //Replace the src ("imgs/grow-lazy.jpg") with data-src ("imgs/grow.jpg"). That's to say, src is the blur image and the data-src is the high-quality image.
    entry.target.src = entry.target.dataset.src;

    entry.target.addEventListener("load", function(){
        entry.target.classList.remove("lazy-img");
    })

    observer.unobserve(entry.target)
}

const Opciones = {
    root: null,
    threshold: 0,
    rootMargin: "200px"
}

const imgObserver = new IntersectionObserver(loadImg, Opciones);
imgTarget.forEach(evento => imgObserver.observe(evento));


//Slider
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector(".dots");
let curSlide = 0;
const maxSlide = slides.length;


function goToSlide(slide) {
    slides.forEach(function(evento, iter){
        evento.style.transform = `translateX(${100 * (iter - slide)}%)`; //0%, 100%, 200%
        // console.log(`${iter} , ${evento.style.transform}`);
    })
};

function nextSlide() {
    curSlide === maxSlide - 1 ? curSlide = 0 : curSlide++;
    goToSlide(curSlide);
    activateDot(curSlide)
};

function prevSlide() {
    curSlide === 0 ? curSlide = maxSlide - 1 : curSlide--;
    goToSlide(curSlide);
    activateDot(curSlide)
};

function createDots() {
    slides.forEach(function (_, i) {
        dotContainer.insertAdjacentHTML('beforeend',
            `<button class="dots__dot" data-slide="${i}"></button>`
        );
    });
};

function activateDot(slide){
    document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));
    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
};

function init(){
    createDots();
    goToSlide(0);
    activateDot(0);
}

init();
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', function (evento) {
    console.log(evento)
    if (evento.key === 'ArrowLeft') prevSlide();
    if (evento.key === 'ArrowRight') nextSlide();
});

dotContainer.addEventListener('click', function (evento) {
    if (evento.target.classList.contains('dots__dot')) {
        const slide = evento.target.dataset.slide;  //const { slide } = e.target.dataset;
        goToSlide(slide);
        activateDot(slide);
    }
});
