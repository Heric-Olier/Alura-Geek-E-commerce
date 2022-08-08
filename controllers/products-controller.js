

const newProducts = document.querySelector(
  ".container__carousel-products-template"
);
const cardTemplate = document.querySelector("#card__template").content;
console.log(newProducts);

//creamos una funcion para traer los datos de los articulos desde la api json

const showProducts = async () => {
  try {
    const response = await fetch(
      "https://alura-geek-fake-appi-server.herokuapp.com/products"
    );
    const products = await response.json();

    const fragment = document.createDocumentFragment();
    const div = document.createElement("div");
    div.classList.add("new-products__carousel-content");

    products.forEach(({ name, price, imageUrl }) => {
      const card = cardTemplate.cloneNode(true);
      card.querySelector(".products__template-subtitle").textContent = name;
      card.querySelector(".products__template-price").textContent = price;
      card.querySelector("img").src = imageUrl;
      fragment.appendChild(card);
    });
    div.appendChild(fragment);
    newProducts.appendChild(div);
  } catch (error) {
    console.log(error);
  } finally {
    tns({
      container: ".new-products__carousel-content",
      items: 4,
      slideBy: 1,
      autoplay: true,
      controls: false,
      nav: false,
      autoplayButtonOutput: false,
      autoplayTimeout: 5000,
      autoplayButton: false,
      loop: true,
      mouseDrag: true,
    });
  }
};

showProducts();
