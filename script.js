import news from "./news.js";
import nav from "./nav.js";
import hero from "./hero.js";
import { displayProducts } from "./products.js";
import { displayProductCategories } from "./products.js";

nav();
document.addEventListener("DOMContentLoaded", () => {
  displayProductCategories(), displayProducts();
});
