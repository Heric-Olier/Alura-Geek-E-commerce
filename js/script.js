let headerArea = document.querySelector(".header__area");

//*!--------------- scroll up & Header Area ---------------*//

// el header se espande con el scroll

window.addEventListener("scroll", () => {
  if (window.scrollY) {
    headerArea.classList.add("active");
  } else {
    headerArea.classList.remove("active");
  }
});
