import { wrapper } from "./helper.js";
export default function hero() {
  wrapper.innerHTML = "";
  const newDiv = document.createElement("div");
  const heroTitle = document.createElement("h1");

  heroTitle.textContent = "This is title of website";

  const heroP = document.createElement("p");

  heroP.textContent = "Crazy description";
  newDiv.append(heroTitle);
  newDiv.append(heroP);
  newDiv.id = "hero";
  wrapper.append(newDiv);
}
