const allProductsContainer = document.querySelector(".all-products-cards"); //template de los productos nuevos
const cardTemplate = document.querySelector("#card__template").content;
const editProductModal = document.querySelector(".edit-product__area");
const btnEdit = document.querySelectorAll(".btn-edit");
const btnCloseEditProductsModal = document.querySelector(".btn__close-edit-product-area");
const canvasOverlayBlurEdit = document.querySelector(".canvas__overlay-blur-modal");

btnCloseEditProductsModal.addEventListener("click", () => {
  editProductModal.classList.remove("active");
  canvasOverlayBlurEdit.classList.remove("active");
});

canvasOverlayBlurEdit.addEventListener("click", () => {
  editProductModal.classList.remove("active");
  canvasOverlayBlurEdit.classList.remove("active");
});

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

const removeProduct = async (id) => {
  try {
    console.log(id);
    const res = await fetch(
      `https://alura-geek-fake-appi-server.herokuapp.com/products/${id}`,
      {
        method: "DELETE",
      }
    );
    console.log(res);
    // const products = await response.json();
    // return products;
  } catch (error) {
    console.log(error);
  } finally {
    window.location.reload();
  }
};

const editProduct = async (id, name, price, imageUrl, description) => {
  try {
    console.log(id);
    const res = await fetch(
      `https://alura-geek-fake-appi-server.herokuapp.com/products/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          price,
          imageUrl,
          description,
        }),
      }
    );
    console.log(res);
    // const products = await response.json();
    // return products;
  } catch (error) {
    console.log(error);
  } finally {
    // window.location.reload();
  }
};

const urlPage = window.location.pathname;

async function showAllProducts() {
  try {
    const products = await getAllProducts();

    const fragment = document.createDocumentFragment();
    // const div = document.createElement("div");
    // div.classList.add("new-products__carousel-content");

    products.forEach(({ name, price, imageUrl, id }) => {
      const card = cardTemplate.cloneNode(true);
      card.querySelector(".products__template-subtitle").textContent = name;
      card.querySelector(".products__template-price").textContent = price;
      card.querySelector("img").src = imageUrl;
      card.querySelector(".btn__product-card").dataset.id = id;
      card.querySelector(".btn-remove").dataset.id = id;
      card.querySelector(".btn-edit").dataset.id = id;

      const allProductsPage = window.location.pathname;
      console.log(allProductsPage);

      const btnRemove = card.querySelector(".btn-remove");
      const btnEdit = card.querySelector(".btn-edit");

      card.querySelector(".btn-remove").addEventListener("click", () => {
        removeProduct(btnRemove.dataset.id);
      });
      card.querySelector(".btn-edit").addEventListener("click", () => {
        // const nameProduct = document.querySelector("[data-name-edit]").value;
        // const descriptionProduct = document.querySelector("[data-description-edit]").value;
        // const priceProduct = document.querySelector("[data-price-edit]").value;
        // const imageProduct = document.querySelector("[data-image-edit]").value;
        // const categoryProduct = document.querySelector("[data-category-edit]").value;
        editProductModal.classList.toggle("active");
        canvasOverlayBlurEdit.classList.toggle("active");
        editProduct( btnEdit.dataset.id, name, price, imageUrl, description, category);
        console.log(btnEdit.dataset.id);
      });

      fragment.appendChild(card);
    });

    // div.appendChild(fragment);
    // allProductsContainer.appendChild(div);
    allProductsContainer.appendChild(fragment);
  } catch (error) {
    console.log(error);
  } finally {
  }
}

showAllProducts();
