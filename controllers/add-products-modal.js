const btnAddProducts = document.querySelector(".products__btn-add-products");
const addProductsModal = document.querySelector(".add-product__area");
const canvasOverlayBlur = document.querySelector(".canvas__overlay-blur");
const btnCloseAddProductsModal = document.querySelector(".btn__close-add-product-area");

const showAddProductsModal = () => {
  addProductsModal.classList.add("active");
  canvasOverlayBlur.classList.add("active");
};

btnAddProducts.addEventListener("click", showAddProductsModal);

canvasOverlayBlur.addEventListener("click", () => {
  addProductsModal.classList.remove("active");
  canvasOverlayBlur.classList.remove("active");
});

btnCloseAddProductsModal.addEventListener("click", () => {
  addProductsModal.classList.remove("active");
  canvasOverlayBlur.classList.remove("active");
});
