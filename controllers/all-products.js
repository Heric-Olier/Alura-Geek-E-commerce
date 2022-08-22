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
const alertSuccessEditProduct = document.querySelector(
  ".alert__success-edit-product"
);
const alertRemoveProduct = document.querySelector(".alert__remove-product");
const btnRemoveProduct = document.querySelector(".btn-remove-product");
const btnCancelRemoveProduct = document.querySelector(
  ".btn-cancel-remove-product"
);
const alertSuccessRemoveProduct = document.querySelector(
  ".alert__success-remove-product"
);

let idProduct;

btnCloseEditProductsModal.addEventListener("click", () => {
  editProductModal.classList.remove("active");
  canvasOverlayBlurEdit.classList.remove("active");
});

canvasOverlayBlurEdit.addEventListener("click", () => {
  editProductModal.classList.remove("active");
  canvasOverlayBlurEdit.classList.remove("active");
});

btnCancelRemoveProduct.addEventListener("click", () => {
  alertRemoveProduct.classList.remove("active");
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
    setTimeout(() => {
      window.location.reload();
      alertSuccessRemoveProduct.classList.remove("active");
    }, 2600);
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
      alertRemoveProduct.classList.remove("active");
      alertSuccessEditProduct.classList.remove("active");
    }, 2600);
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
  alertSuccessEditProduct.classList.add("active");
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
        alertRemoveProduct.classList.add("active");

        btnRemoveProduct.addEventListener("click", () => {
          alertSuccessRemoveProduct.classList.add("active");
          removeProduct(btnRemove.dataset.id);
        });
        // removeProduct(btnRemove.dataset.id);
      });

      card.querySelector(".btn-edit").addEventListener("click", () => {
        editProductModal.classList.toggle("active");
        canvasOverlayBlurEdit.classList.toggle("active");
        drawDataForm(btnEdit.dataset.id);
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

// creamos una funcion para buscar un producto por su nombre y mostrarlo en la pagina

const searchInput = document.getElementById("search"); //obtenemos el elemento de la barra de busqueda
const searchButton = document.getElementById("search-button"); //obtenemos el elemento del boton de busqueda
searchInput.addEventListener("keyup", async (e) => {

  console.log(e.target.value); //obtenemos el valor de la barra de busqueda
  const search = e.target.value; //obtenemos el valor de la barra de busqueda
  const products = await getAllProducts(); //obtenemos todos los productos
  const filteredProducts = products.filter((product) => {
    //creamos una funcion para filtrar los productos
    return product.name.toLowerCase().includes(search.toLowerCase()); //devuelve true si el nombre del producto contiene el valor de la barra de busqueda
  });

  localStorage.setItem("search", search); //guardamos la busqueda en localStorage

  if (filteredProducts.length > 0) {
    //si el numero de productos filtrados es mayor a 0
    const fragment = document.createDocumentFragment(); //creamos un fragmento
    filteredProducts.forEach((product) => {
      //iteramos sobre los productos filtrados
      const card = cardTemplate.cloneNode(true); //clonamos el template de la tarjeta
      card.querySelector(".products__template-subtitle").textContent =
        product.name; //obtenemos el nombre del producto y lo mostramos en el template
      card.querySelector(".products__template-price").textContent =
        product.price; //obtenemos el precio del producto y lo mostramos en el template
      card.querySelector("img").src = product.imageUrl; //obtenemos la imagen del producto y la mostramos en el template
      card.querySelector(".btn__product-card").dataset.id = product.id; //obtenemos el id del producto y lo mostramos en el template
      card.querySelector(".btn-remove").dataset.id = product.id; //obtenemos el id del producto y lo mostramos en el template
      card.querySelector(".btn-edit").dataset.id = product.id; //obtenemos el id del producto y lo mostramos en el template
      fragment.appendChild(card); //agregamos el fragmento al contenedor de productos
    });

    allProductsContainer.innerHTML = ""; //limpiamos el contenedor de productos
    allProductsContainer.appendChild(fragment); //agregamos el fragmento al contenedor de productos
  } else {
    //si el numero de productos filtrados es menor a 0
    allProductsContainer.innerHTML = ""; //limpiamos el contenedor de productos
  }
});

