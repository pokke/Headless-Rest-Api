import { addToCart, cart } from "./cart.js";
import { fetchApi, originURL, wrapper } from "./helper.js";
const displayProduct = (product, ul) => {
  let li = document.createElement("li");
  li.id = product.id;
  let button = document.createElement("button");
  button.addEventListener("click", () => {
    displaySingleProduct(product);
  });
  let h2 = document.createElement("h2");
  let div = document.createElement("div");
  let p = document.createElement("p");
  p.textContent = `${product.price} SEK`;
  let img = document.createElement("img");
  h2.textContent = product.name;
  div.innerHTML = product.description;
  div.appendChild(p);
  if (product.images.length > 0) img.src = product.images[0].src;

  button.appendChild(h2);
  button.appendChild(div);
  button.appendChild(img);
  li.appendChild(button);
  ul.appendChild(li);
};
const displaySingleProduct = (product) => {
  wrapper.innerHTML = "";
  let article = document.createElement("article");

  let h2 = document.createElement("h2");
  let div = document.createElement("div");
  let p = document.createElement("p");
  let button = document.createElement("button");
  button.textContent = "Add to Cart";
  button.addEventListener("click", () => {
    addToCart(product);
  });
  p.textContent = `${product.price} SEK`;
  let img = document.createElement("img");
  h2.textContent = product.name;
  div.innerHTML = product.description;
  div.appendChild(p);
  if (product.images.length > 0) img.src = product.images[0].src;
  article.appendChild(h2);
  article.appendChild(div);
  article.appendChild(img);
  article.appendChild(button);
  wrapper.appendChild(article);
};
export const displayProducts = async (category) => {
  const products = await fetchApi("/wc/v3/products");

  const ul =
    document.querySelector(".products") || document.createElement("ul");

  if (!ul.classList.contains("products")) ul.classList.add("products");
  ul.innerHTML = "";
  products?.map((product) => {
    if (category && product.categories) {
      if (product.categories.find((pCategory) => pCategory.id == category.id))
        displayProduct(product, ul);
    } else if (!category) {
      displayProduct(product, ul);
    }
  });
  wrapper.appendChild(ul);
};
export const displayProductCategories = async () => {
  wrapper.innerHTML = "";
  const categories = await fetchApi("/wc/v3/products/categories");

  displayProducts();
  const ul = document.createElement("ul");
  ul.classList.add("categories");
  displayCategory(0, "show all", ul);
  categories?.map((category) => {
    if (category.count > 0)
      displayCategory(category.id, category.name, ul, category);
  });
  wrapper.appendChild(ul);
};
const displayCategory = (id, name, ul, category = null) => {
  const li = document.createElement("li");
  li.id = id;
  const button = document.createElement("button");
  button.addEventListener("click", () => {
    if (category) displayProducts(category);
    else {
      displayProducts();
    }
  });
  const p = document.createElement("p");
  p.textContent = name;
  button.appendChild(p);
  li.appendChild(button);
  ul.appendChild(li);
};
