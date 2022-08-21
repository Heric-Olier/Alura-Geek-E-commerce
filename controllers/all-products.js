const allProductsContainer = document.querySelector(".all-products-cards"); //template de los productos nuevos
const cardTemplate = document.querySelector("#card__template").content;
const editProductModal = document.querySelector(".edit-product__area");
const btnEdit = document.querySelectorAll(".btn-edit");
const btnCloseEditProductsModal = document.querySelector(
  ".btn__close-edit-product-area"
);
const canvasOverlayBlurEdit = document.querySelector(
  ".canvas__overlay-blur-modal"
);
const btnEditPut = document.getElementById("btn__edit-product");

let idProduct;

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

const editProduct = async (
  id,
  name,
  price,
  imageUrl,
  description,
  category
) => {
  try {
    const product = {
      name: name,
      price: price,
      description: description,
      imageUrl: imageUrl,
      category: category,
      id: id,
    };
    console.log(id);
    const res = await fetch(
      `https://alura-geek-fake-appi-server.herokuapp.com/products/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      }
    );
    console.log(res);
    // const products = await response.json();
    // return products;
  } catch (error) {
    console.log(error);
  } finally {
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
};

const drawDataForm = async (id) => {
  try {
    const form = document.querySelector("[data-form-edit]");

    const response = await fetch(
      `https://alura-geek-fake-appi-server.herokuapp.com/products?id=${id}`
    );
    const products = await response.json();
    console.log(products);
    const { name, price, imageUrl, description, category } = products[0];
    idProduct = id;

    form.querySelector("[data-name-edit]").value = name;
    form.querySelector("[data-price-edit]").value = price;
    form.querySelector("[data-image-edit]").value = imageUrl;
    form.querySelector("[data-description-edit]").value = description;
    form.querySelector("[data-category-edit]").value = category;
  } catch (error) {
    console.log(error);
  }
};

btnEditPut.addEventListener("click", (e) => {
  e.preventDefault();
  const form = document.querySelector("[data-form-edit]");
  const id = idProduct;
  const name = form.querySelector("[data-name-edit]").value;
  const price = form.querySelector("[data-price-edit]").value;
  const imageUrl = form.querySelector("[data-image-edit]").value;
  const description = form.querySelector("[data-description-edit]").value;
  const categoryOption = form.querySelector("[data-category-edit]");
  const category = categoryOption.options[categoryOption.selectedIndex].value;
  console.log(category);

  editProduct(id, name, price, imageUrl, description, category);
});

const urlPage = window.location.pathname;

async function showAllProducts() {
  try {
    const products = await getAllProducts();

    const fragment = document.createDocumentFragment();


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
        editProductModal.classList.toggle("active");
        canvasOverlayBlurEdit.classList.toggle("active");
        drawDataForm(btnEdit.dataset.id);
        // editProduct( btnEdit.dataset.id, name, price, imageUrl, description, category);
        // console.log(btnEdit.dataset.id);
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
