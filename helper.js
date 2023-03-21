export const originURL = "http://64.226.89.57/wp-json";
export const fetchApi = async (endpoint, options = undefined) => {
  const data = await fetch(originURL + endpoint, options);
  const json = await data.json();

  return json;
};
export const wrapper = document.getElementById("wrapper");

export const pages = {
  home: "Home",
  cart: "Cart",
  shop: "Shop",
};
