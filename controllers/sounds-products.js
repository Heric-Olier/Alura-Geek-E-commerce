const soundsProducts = document.querySelector(".container__carousel-products-template-sounds"); // template de los productos de joysticos
  const cardTemplateSounds = document.querySelector("#card__template").content;
  
  async function getTypeProductsSounds(typeProduct) {
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
  
  const soundsCarousel = () => {
    tns({
      container: ".sounds-products__carousel-content",
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
  
  async function showSoundsProducts() {
    try {
      const products = await getTypeProductsSounds("Sounds");
  
      const fragment = document.createDocumentFragment();
      const div = document.createElement("div");
      div.classList.add("sounds-products__carousel-content");
  
      products.forEach(({ name, price, imageUrl, id }) => {
        const card = cardTemplateSounds.cloneNode(true);
        card.querySelector(".products__template-subtitle").textContent = name;
        card.querySelector(".products__template-price").textContent = price;
        card.querySelector("img").src = imageUrl;
        card.querySelector(".btn__product-card").dataset.id = id;
        fragment.appendChild(card);
      });
  
      div.appendChild(fragment);
      soundsProducts.appendChild(div);
    } catch (error) {
      console.log(error);
    } finally {
      soundsCarousel();
    }
  }
  
  showSoundsProducts();
  