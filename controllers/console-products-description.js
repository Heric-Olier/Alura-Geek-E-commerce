// const productDescriptionContainer = document.querySelector(
//   ".product__description"
// );
// const templateDescription = document.querySelector(
//   "#template__card-description"
// ).content;
// // const productsContentCard = document.querySelectorAll(".card__template-product");

// async function getTypeProducts(id) {
//   try {
//     const response = await fetch(
//       `https://alura-geek-fake-appi-server.herokuapp.com/products?id=${id}`
//     );
//     const products = await response.json();
//     return products;
//   } catch (error) {
//     console.log(error);
//   }
// }

// async function showProductDescriptionConsole() {
//   try {
//     const products = await getTypeProducts("id");
//     const fragment = document.createDocumentFragment();
//     const div = document.createElement("div");
//     div.classList.add("product__description-content");

//     products.forEach(({ name, price, imageUrl, description }) => {
//       const card = templateDescription.cloneNode(true);
//       card.querySelector("img").src = imageUrl;
//       card.querySelector(".product__description-content-title").textContent = name;
//       card.querySelector(".product__description-content-price").textContent = price;
//       card.querySelector(".product__description-content-description").textContent = description;
//       fragment.appendChild(card);
//     });
//     div.appendChild(fragment);
//     productDescriptionContainer.appendChild(div);
//   } catch (error) {
//     console.log(error);
//   }
// }

// showProductDescriptionConsole();
