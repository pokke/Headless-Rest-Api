import { addToCart, cart, removeFromCart } from "./cart.js";
import { fetchApi, originURL, wrapper } from "./helper.js";
import news from "./news.js";
let totalPriceNumber = 0;
const displayCartProducts = (ul, totalPriceNumber) => {
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
      ul.innerHTML = "";
      displayCartProducts(ul, totalPriceNumber);
    });

    increaseButton.classList.add("cart-button");
    increaseButton.textContent = "+";
    increaseButton.addEventListener("click", () => {
      addToCart(item);
      ul.innerHTML = "";
      displayCartProducts(ul, totalPriceNumber);
    });

    const quantity = document.createElement("p");
    quantity.textContent = `Quantity ${item.quantity}`;
    h2.textContent = item.name;
    p.textContent = `${item.price * item.quantity} SEK`;
    increaseTotalPrice(item.price, item.quantity);
    console.log(totalPriceNumber);
    div.appendChild(p);
    div.appendChild(quantity);
    li.appendChild(h2);
    li.appendChild(div);
    buttonsDiv.appendChild(decreaseButton);
    buttonsDiv.appendChild(increaseButton);
    li.appendChild(buttonsDiv);
    ul.appendChild(li);
  });
};
const increaseTotalPrice = (itemPrice, itemQuantity) => {
  totalPriceNumber += itemPrice * itemQuantity;
};
export const displayCheckout = async () => {
  wrapper.innerHTML = "";
  const checkoutWrapper = document.createElement("div");
  checkoutWrapper.classList.add("checkout");
  const productsWrapper = document.createElement("div");
  productsWrapper.classList.add("products-wrapper");
  const ul = document.createElement("ul");

  displayCartProducts(ul, totalPriceNumber);
  const totalPrice = document.createElement("p");
  totalPrice.classList.add("total-cart");
  totalPrice.textContent = `Your total is ${
    totalPriceNumber + 100
  } SEK, including taxes and shipping`;

  const form = document.createElement("form");
  form.classList.add("form");
  const firstName = document.createElement("input");
  const firstNameLabel = document.createElement("label");
  const lastName = document.createElement("input");
  const lastNameLabel = document.createElement("label");
  const adress = document.createElement("input");
  const adressLabel = document.createElement("label");
  const city = document.createElement("input");
  const cityLabel = document.createElement("label");
  const state = document.createElement("input");
  const stateLabel = document.createElement("label");
  const postcode = document.createElement("input");
  const postCodeLabel = document.createElement("label");
  const country = document.createElement("input");
  const countryLabel = document.createElement("label");
  const email = document.createElement("input");
  const emailLabel = document.createElement("label");
  const phone = document.createElement("input");
  const phoneLabel = document.createElement("label");
  const submitButton = document.createElement("button");
  firstName.name = "first-name";
  lastName.name = "last-name";
  adress.name = "adress";
  city.name = "city";
  state.name = "state";
  postcode.name = "postcode";
  country.name = "country";
  email.name = "email";
  phone.name = "phone";
  firstNameLabel.textContent = "First Name";
  lastNameLabel.textContent = "Last Name";
  adressLabel.textContent = "Adress";
  cityLabel.textContent = "City";
  stateLabel.textContent = "State";
  postCodeLabel.textContent = "Postcode";
  countryLabel.textContent = "Country";
  emailLabel.textContent = "Email";
  phoneLabel.textContent = "Phone";
  email.type = "email";
  phone.type = "tel";
  submitButton.textContent = "Pay";
  submitButton.addEventListener("click", async (e) => {
    e.preventDefault();
    submitButton.textContent = "Processing...";
    submitButton.disabled = true;
    const formData = new FormData(form);

    const items = [];
    cart.map((item) => {
      items.push({ product_id: item.id, quantity: item.quantity });
    });
    const data = {
      payment_method: "bacs",
      payment_method_title: "Direct Bank Transfer",
      set_paid: true,
      customer_id: 1,
      billing: {
        first_name: formData.get("first-name"),
        last_name: formData.get("last-name"),
        address_1: formData.get("adress"),
        city: formData.get("city"),
        state: formData.get("state"),
        postcode: formData.get("postcode"),
        country: formData.get("country"),
        email: formData.get("email"),
        phone: formData.get("phone"),
      },
      shipping: {
        first_name: formData.get("first-name"),
        last_name: formData.get("last-name"),
        address_1: formData.get("adress"),
        city: formData.get("city"),
        state: formData.get("state"),
        postcode: formData.get("postcode"),
        country: formData.get("country"),
      },
      line_items: items,
      shipping_lines: [
        {
          method_id: "flat_rate",
          method_title: "Flat Rate",
          total: "100",
        },
      ],
    };
    const postForm = await fetch(`${originURL}/wc/v3/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const json = await postForm.json();
    if (json) {
      localStorage.removeItem("cart");
      cart.splice(0, cart.length);

      news();
    }
  });
  form.appendChild(firstNameLabel);
  form.appendChild(firstName);
  form.appendChild(lastNameLabel);
  form.appendChild(lastName);
  form.appendChild(adressLabel);
  form.appendChild(adress);
  form.appendChild(cityLabel);
  form.appendChild(city);
  form.appendChild(stateLabel);
  form.appendChild(state);
  form.appendChild(postCodeLabel);
  form.appendChild(postcode);
  form.appendChild(countryLabel);
  form.appendChild(country);
  form.appendChild(emailLabel);
  form.appendChild(email);
  form.appendChild(phoneLabel);
  form.appendChild(phone);
  form.appendChild(submitButton);
  productsWrapper.appendChild(ul);
  productsWrapper.appendChild(totalPrice);
  checkoutWrapper.appendChild(productsWrapper);
  checkoutWrapper.appendChild(form);
  wrapper.appendChild(checkoutWrapper);
};
