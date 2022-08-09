
let headerArea = document.querySelector(".header__area");
let iconSearch = document.querySelector(".fa-magnifying-glass");
let searchBar = document.querySelector(".search__bar");
let searchBarInput = document.querySelector("#search");
let searchBarClose = document.querySelector(".search__close-btn");

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

//*!--------------- Tiny Carousel ---------------*//

