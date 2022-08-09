const newProducts = document.querySelector(
  ".container__carousel-products-template"
); //template de los productos nuevos
const cardTemplate = document.querySelector("#card__template").content;

//creamos una funcion para traer los datos de todos los articulos desde la api json

async function getAllProducts() {
  try {
    const response = await fetch(
      "https://alura-geek-fake-appi-server.herokuapp.com/products"
    );
    const products = await response.json();
    return products;
  } catch (error) {
    console.log(error);
  }
}

// creamos una funcion para traer los datos de un articulo especifico desde la api json

async function getTypeProducts(typeProduct) {
  try {
    const response = await fetch(
      `https://alura-geek-fake-appi-server.herokuapp.com/products?category=${typeProduct}`
    );
    const products = await response.json();
    return products;
  } catch (error) {
    console.log(error);
  }
}

const newProductsCarousel = () => {
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
};

// creamos una funcion para moostrar los productos nuevos

async function showProducts() {
  try {
    const products = await getTypeProducts("NewProduct");

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
    newProductsCarousel();
  }
}

showProducts();
