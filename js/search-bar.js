let searchInputBar = document.getElementById("search");

// guardamos el valor de la barra de busqueda en una variable
let searchValue = searchInputBar.value;

// guardamos el valor en localStorage convertido a JSON
localStorage.setItem("searchValue", JSON.stringify(searchValue));

// recuperamos el valor de localStorage convertido a JSON

let searchValueJSON = JSON.parse(localStorage.getItem("searchValue"));

// si el valor de la barra de busqueda es diferente de vacio, se muestra el valor de la barra de busqueda
if (searchValueJSON !== "") {
  searchInputBar.value = searchValueJSON;
}


searchInputBar.addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.key === "Enter") {
    searchValue = searchInputBar.value;
    localStorage.setItem("searchValue", JSON.stringify(searchValue));
    // window.location.href = "./products.html";
    JSON.parse(localStorage.getItem("searchValue"));
    window.location.href = "./products.html?search=" + searchValue;

  }
  

});