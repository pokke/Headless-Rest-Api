import { displayCheckout } from "./checkout.js";
import { wrapper } from "./helper.js";

export const cart = JSON.parse(localStorage.getItem("cart")) || [];

export const displayCart = () => {
  wrapper.innerHTML = "";
  const cartWrapper = document.createElement("div");
  cartWrapper.classList.add("cart-wrapper");
  const ul = document.createElement("ul");
  ul.classList.add("cart");

  cart?.map((item) => {
    const li = document.createElement("li");
    li.classList.add("cart-item");
    const h2 = document.createElement("h2");
    const div = document.createElement("div");
    const p = document.createElement("p");
    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("button-section");
    const decreaseButton = document.createElement("button");
    const increaseButton = document.createElement("button");
    decreaseButton.classList.add("cart-button");
    decreaseButton.textContent = "-";
    decreaseButton.addEventListener("click", () => {
      removeFromCart(item);
      displayCart();
    });

    increaseButton.classList.add("cart-button");
    increaseButton.textContent = "+";
    increaseButton.addEventListener("click", () => {
      addToCart(item);
      displayCart();
    });
    const quantity = document.createElement("p");
    quantity.textContent = `Quantity ${item.quantity}`;
    h2.textContent = item.name;
    p.textContent = `${item.price * item.quantity} SEK`;
    div.appendChild(p);
    div.appendChild(quantity);
    li.appendChild(h2);
    li.appendChild(div);
    buttonsDiv.appendChild(decreaseButton);
    buttonsDiv.appendChild(increaseButton);
    li.appendChild(buttonsDiv);
    ul.appendChild(li);
  });
  if (cart.length > 0) {
    const button = document.createElement("button");
    button.textContent = "Go to Checkout";
    button.addEventListener("click", () => displayCheckout());
    cartWrapper.appendChild(ul);
    cartWrapper.appendChild(button);
    wrapper.appendChild(cartWrapper);
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
export const removeFromCart = (product) => {
  const itemToRemoveIndex = cart?.findIndex((item) => item.id == product.id);
  if (itemToRemoveIndex != -1) {
    if (cart[itemToRemoveIndex].quantity > 1)
      cart[itemToRemoveIndex].quantity -= 1;
    else {
      cart.splice(itemToRemoveIndex, 1);
    }
  }
  let stringedCart = JSON.stringify(cart);
  localStorage.setItem("cart", stringedCart);
};
