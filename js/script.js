let headerArea = document.querySelector(".header__area");
let iconSearch = document.querySelector(".fa-magnifying-glass");
let searchBar = document.querySelector(".search__bar");
let searchBarInput = document.querySelector("#search");
let searchBarClose = document.querySelector(".search__close-btn");
const navBurguer = document.querySelector(".nav__burguer");
const navMenu = document.querySelector(".nav__menu");
const navMenuItems = document.querySelectorAll(".nav__menu ul li");
const navBurguerLine1 = document.querySelector(".nav__burguer-line-1");
const navBurguerLine2 = document.querySelector(".nav__burguer-line-2");
const navBurguerLine3 = document.querySelector(".nav__burguer-line-3");


//*!--------------- scroll up & Header Area ---------------*//

// el header se espande con el scroll

window.addEventListener("scroll", () => {
  if (window.scrollY) {
    headerArea.classList.add("active");
  } else {
    headerArea.classList.remove("active");
  }
});

//*!--------------- Search bar ---------------*//

// al click del icono, aparece el input

iconSearch.addEventListener("click", () => {
  searchBar.classList.toggle("active");
  searchBarInput.focus();
  searchBarInput.value = "";
});

// al click del boton de cerrar, se cierra el input

searchBarClose.addEventListener("click", () => {
  searchBar.classList.remove("active");
  searchBarInput.value = "";
});

//*!--------------- Burguer Menu ---------------*//


const showNav = () => {
  navMenu.classList.toggle("active");
  navBurguerLine1.classList.toggle("active");
  navBurguerLine2.classList.toggle("active");
  navBurguerLine3.classList.toggle("active");
  navBurguer.classList.toggle("active");
};

// El menu se muestra y se oculta con un click en el icono de hamburguesa
navBurguer.addEventListener("click", () => {
  showNav();
  searchBar.classList.remove("active");
});

// El menú se cierra al hacer click en un elemento del mismo
navMenuItems.forEach((item) => {
  item.addEventListener("click", () => {
    showNav();
    searchBar.classList.remove("active");
  });
});



