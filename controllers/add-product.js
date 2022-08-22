import { alerts } from "../js/alerts.js";
const btnAddProducts = document.querySelector(".products__btn-add-products");
const addProductsModal = document.querySelector(".add-product__area");
const canvasOverlayBlur = document.querySelector(".canvas__overlay-blur-modal");
const btnCloseAddProductsModal = document.querySelector(".btn__close-add-product-area");
const formAddProduct = document.querySelector("[data-form]");
const nameInput = document.querySelector(".add-product__area-content-form input");
const alertSuccessAddProduct = document.querySelector(".alert__success-add-product");

const showAddProductsModal = () => {
  nameInput.focus();
  addProductsModal.classList.add("active");
  canvasOverlayBlur.classList.add("active");
};

btnAddProducts.addEventListener("click", showAddProductsModal);
canvasOverlayBlur.addEventListener("click", () => {
  addProductsModal.classList.remove("active");
  canvasOverlayBlur.classList.remove("active");
  alerts.showMessageError("");
});

btnCloseAddProductsModal.addEventListener("click", () => {
  addProductsModal.classList.remove("active");
  canvasOverlayBlur.classList.remove("active");
  alerts.showMessageError("");
});

const createProduct = (
  nameProduct,
  priceProduct,
  descriptionProduct,
  imageProduct,
  categoryProduct
) => {
  fetch("https://alura-geek-fake-appi-server.herokuapp.com/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: nameProduct,
      price: priceProduct,
      description: descriptionProduct,
      imageUrl: imageProduct,
      category: categoryProduct,
    }),
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setTimeout(() => {
        window.location.reload();
        alertSuccessAddProduct.classList.remove("active");
      }, 2600);
    });
};

formAddProduct.addEventListener("submit", (event) => {
  event.preventDefault();
  alertSuccessAddProduct.classList.remove("active");
  const regexImage =
    /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
  const regexPrice = /^[0-9]+$/;
  if (
    formAddProduct.querySelector("[data-name]").value === "" ||
    formAddProduct.querySelector("[data-price]").value === "" ||
    formAddProduct.querySelector("[data-description]").value === "" ||
    formAddProduct.querySelector("[data-image]").value === "" ||
    formAddProduct.querySelector("[data-category]").value === ""
  ) {
    alerts.showMessageError("Por favor, complete todos los campos");
  } else if (
    formAddProduct.querySelector("[data-name]").value.length < 8 ||
    formAddProduct.querySelector("[data-description]").value.length < 8 ||
    formAddProduct.querySelector("[data-image]").value.length < 8
  ) {
    alerts.showMessageError(
      "Los campos de texto deben tener al menos 8 caracteres"
    );
  } else if (
    !regexImage.test(formAddProduct.querySelector("[data-image]").value)
  ) {
    alerts.showMessageError("La URL de la imagen no es válida");
  } else if (
    !regexPrice.test(formAddProduct.querySelector("[data-price]").value)
  ) {
    alerts.showMessageError("El precio no es un numero válido");
  } else {
    const nameProduct = document.querySelector("[data-name]").value;
    const descriptionProduct = document.querySelector("[data-description]").value;
    const priceProduct = document.querySelector("[data-price]").value;
    const imageProduct = document.querySelector("[data-image]").value;
    const categoryProduct = document.querySelector("[data-category]").value;
    createProduct(
      nameProduct,
      priceProduct,
      descriptionProduct,
      imageProduct,
      categoryProduct
      );
      alertSuccessAddProduct.classList.add("active");
    }
    
});
