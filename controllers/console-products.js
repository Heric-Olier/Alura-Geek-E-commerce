const consolesProducts = document.querySelector(
  ".container__carousel-products-template-consoles"
); //template de los productos de consolas
const cardTemplate = document.querySelector("#card__template").content;

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

const consolesCarousel = () => {
  tns({
    container: ".consoles-products__carousel-content",
    items: 4,
    slideBy: 1,
    autoplay: true,
    nav: false,
    autoplayButtonOutput: false,
    autoplayTimeout: 5000,
    autoplayButton: false,
    loop: true,
    mouseDrag: true,
    controls: false
  });
};

async function showConsoleProducts() {
  try {
    const products = await getTypeProducts("Consoles");

    const fragment = document.createDocumentFragment();
    const div = document.createElement("div");
    div.classList.add("consoles-products__carousel-content");

    products.forEach(({ name, price, imageUrl }) => {
      const card = cardTemplate.cloneNode(true);
      card.querySelector(".products__template-subtitle").textContent = name;
      card.querySelector(".products__template-price").textContent = price;
      card.querySelector("img").src = imageUrl;
      fragment.appendChild(card);
    });

    div.appendChild(fragment);
    consolesProducts.appendChild(div);
  } catch (error) {
    console.log(error);
  } finally {
    consolesCarousel();
  }
}

showConsoleProducts();
