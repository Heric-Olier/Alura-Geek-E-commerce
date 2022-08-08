import { clientServices } from "./client-services.js";

const newProducts = document.querySelector("[data-new-products]");
console.log(newProducts);

//creamos una funcion para traer los datos de los articulos desde la api json

const newProductsList = (name, price, imageUrl) => {
  const cardProduct = document.createElement("div");
  const content = `
  <div>
  <img src="${imageUrl}" alt="new product 01"/>
  <h3 class="products__template-subtitle">${name}</h3>
  <h2 class="products__template-price">${price}</h2>
  <div class="card__hide-content">
    <button><i class="fa-solid fa-cart-plus cart-products"></i><span>Agregar al carrito</span></button>
  </div>
</div>
  `;
  cardProduct.innerHTML = content;
  cardProduct.classList.add("products__template-content-card");
  return cardProduct;
};


const showProducts = async () => {
  try {
    const productsList = await clientServices.productsList();
    productsList.forEach((product) => {
      newProducts.appendChild(
        newProductsList(product.name, product.price, product.imageUrl)
      );
    });
  } catch (error) {
    console.log(error);
  }
};

showProducts();
