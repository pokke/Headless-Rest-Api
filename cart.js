import { wrapper } from "./helper.js";

export const cart = JSON.parse(localStorage.getItem("cart")) || [];

export const displayCart = () => {
  wrapper.innerHTML = "";

  const ul = document.createElement("ul");
  ul.classList.add("cart");
  console.log(cart);
  cart?.map((item) => {
    const li = document.createElement("li");
    const h2 = document.createElement("h2");
    const div = document.createElement("div");
    const p = document.createElement("p");

    const quantity = document.createElement("p");
    quantity.textContent = `${item.quantity}X`;
    h2.textContent = item.name;
    div.innerHTML = item.description;
    p.textContent = `${item.price * item.quantity} SEK`;
    div.appendChild(p);
    div.appendChild(quantity);
    li.appendChild(h2);
    li.appendChild(div);
    ul.appendChild(li);
  });
  if (cart.length > 0) {
    const button = document.createElement("button");
    button.textContent = "Go to Checkout";
    ul.appendChild(button);
    wrapper.appendChild(ul);
  } else {
    const h1 = document.createElement("h1");
    h1.classList.add("error-cart");
    h1.textContent = "You have not added anything in cart";
    wrapper.appendChild(h1);
  }
};
export const addToCart = (product) => {
  const itemExist = cart?.findIndex((item) => item.id == product.id);

  if (itemExist != -1) {
    cart[itemExist].quantity += 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }
  let stringedCart = JSON.stringify(cart);
  localStorage.setItem("cart", stringedCart);
};
