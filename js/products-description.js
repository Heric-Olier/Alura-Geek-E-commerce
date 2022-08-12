const productDescription = document.querySelector('.product__description');
const productDescriptionModal = document.querySelector('.modal__product-description');
const overlayCanvasBlur = document.querySelector('.canvas__overlay-blur-product-description');
const btncCloseProductDescription = document.querySelector('.product__description-btn-close');
const btnAddToFavorite = document.querySelector('.add-favorites');
const templateModal = document.querySelector("#template__card-description").content;





async function showProducts(id) {
    try {
        productDescriptionModal.textContent = '';
        const response = await fetch(
            `https://alura-geek-fake-appi-server.herokuapp.com/products?id=${id}`
          );
          const products = await response.json();
  
      const fragment = document.createDocumentFragment();
  
      products.forEach(({ name, price, imageUrl, description }) => {
        const card = templateModal.cloneNode(true);
        card.querySelector(".product__description-content-title").textContent = name;
        card.querySelector(".product__description-content-price").textContent = price;
        card.querySelector(".product__description-content-description").textContent = description;
        card.querySelector("img").src = imageUrl;
        
        const favoriteItem = card.querySelector(".add-favorites");
        console.log(favoriteItem);
        card.querySelector(".add-favorites").addEventListener('click', () => {
            console.log(favoriteItem);
            favoriteItem.classList.toggle('active');
            console.log('Añadir a favoritos');
        });
        
        fragment.appendChild(card);
      });
  
      productDescriptionModal.appendChild(fragment);
    } catch (error) {
      console.log(error);
    } finally {

    }
  }
  
  
  
  const showProductDescription = (event) => { 
   const idProduct = event.target.parentElement.dataset.id;
      productDescription.classList.toggle('active');
      overlayCanvasBlur.classList.toggle('active');
      showProducts(idProduct);
}


btncCloseProductDescription.addEventListener('click', () => {
    productDescription.classList.toggle('active');
    overlayCanvasBlur.classList.toggle('active');
});

