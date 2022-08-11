const productsContentCard = document.querySelectorAll(".card__template-product");
const productDescription = document.querySelector('.product__description');
const overlayCanvasBlur = document.querySelector('.canvas__overlay-blur-product-description');
const btncCloseProductDescription = document.querySelector('.product__description-btn-close');
const btnAddToFavorite = document.querySelector('.add-favorites');


const showProductDescription = () => { 
    productDescription.classList.toggle('active');
    overlayCanvasBlur.classList.toggle('active');
}


productsContentCard.forEach(card => {
    card.addEventListener('click', () => {
        showProductDescription();
    });
});

btncCloseProductDescription.addEventListener('click', () => {
    showProductDescription();
});

overlayCanvasBlur.addEventListener('click', () => {
    showProductDescription();
} );

btnAddToFavorite.addEventListener('click', () => {
    btnAddToFavorite.classList.toggle('active');
});

