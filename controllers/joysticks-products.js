

const joysticksProducts = document.querySelector(".container__carousel-products-template-joysticks"); // template de los productos de joysticos
const cardTemplateJoy = document.querySelector("#card__template").content;


async function getTypeProductsJoy(typeProduct) {
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
  

async function showJoysticksProducts() {
    try {
        const products = await getTypeProductsJoy("Joysticks");

        const fragment = document.createDocumentFragment();
        const div = document.createElement("div");
        div.classList.add("joysticks-products__carousel-content");

        products.forEach(({ name, price, imageUrl }) => {
            const card = cardTemplateJoy.cloneNode(true);
            card.querySelector(".products__template-subtitle").textContent = name;
            card.querySelector(".products__template-price").textContent = price;
            card.querySelector("img").src = imageUrl;
            fragment.appendChild(card);
        });

        div.appendChild(fragment);
        joysticksProducts.appendChild(div);
    } catch (error) {
        console.log(error);
    } finally {
        tns({
            container: ".joysticks-products__carousel-content",
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
}
  
showJoysticksProducts();
console.log(joysticksProducts);

 