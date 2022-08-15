const variousProducts = document.querySelector(
  ".container__carousel-products-template-various"
); // template de los productos de varios
const cardTemplateVarious = document.querySelector("#card__template").content;

async function getTypeProductsVarious(typeProduct) {
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

const variousCarousel = () => {
  tns({
    container: ".various-products__carousel-content",
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

async function showVariousProducts() {
  try {
    const products = await getTypeProductsVarious("Various");

    const fragment = document.createDocumentFragment();
    const div = document.createElement("div");
    div.classList.add("various-products__carousel-content");

    products.forEach(({ name, price, imageUrl, id }) => {
      const card = cardTemplateVarious.cloneNode(true);
      card.querySelector(".products__template-subtitle").textContent = name;
      card.querySelector(".products__template-price").textContent = price;
      card.querySelector("img").src = imageUrl;
      card.querySelector(".btn__product-card").dataset.id = id;
      fragment.appendChild(card);
    });

    div.appendChild(fragment);
    variousProducts.appendChild(div);
  } catch (error) {
    console.log(error);
  } finally {
    variousCarousel();
  }
}

showVariousProducts();
