const editProductModal = document.querySelector(".edit-product__area");
const btnEditProduct = document.querySelectorAll(".btn-edit");
const btnCloseEditProductsModal = document.querySelector(".btn__close-edit-product-area");
const canvasOverlayBlurEdit = document.querySelector(".canvas__overlay-blur-modal");


const showEditProductModal = () => {
    editProductModal.classList.toggle("active");
    canvasOverlayBlurEdit.classList.toggle("active");
  };
  
  btnEditProduct.forEach((btn) => {
    btn.addEventListener("click", showEditProductModal);
  
  });


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


//   formEditProduct.addEventListener("submit", (e) => {
//     e.preventDefault();
//     const id = e.target.dataset.id;
//     const name = e.target.querySelector("[data-name-edit]").value;
//     const price = e.target.querySelector("[data-price-edit]").value;
//     const imageUrl = e.target.querySelector("[data-image-edit]").value;
//     const description = e.target.querySelector("[data-description-edit]").value;
//     editProduct(id, name, price, imageUrl, description);
//     console.log(id, name, price, imageUrl, description);
//   });
  

