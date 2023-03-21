export default function nav() {
  const fetchApi = async (endpoint, options = undefined) => {
    const originURL = "http://64.226.89.57/wp-json";
    const data = await fetch(originURL + endpoint, options);
    const json = await data.json();
    console.log(json);
    return json;
  };

  const Navbar = async () => {
    const data = await fetchApi("/menus/v1/menus/nav");

    const navbar = document.getElementById("navbar");

    const logoDiv = document.createElement("div");
    logoDiv.classList.add("logo-div");
    navbar.appendChild(logoDiv);

    const logo = document.createElement("a");
    logo.setAttribute("href", "#");
    logo.innerHTML = "Logo";
    logo.classList.add("logo");
    logoDiv.appendChild(logo);

    const routesDiv = document.createElement("div");
    routesDiv.classList.add("routes-div");
    navbar.appendChild(routesDiv);

    const linksUL = document.createElement("ul");
    linksUL.classList.add("links-ul");
    routesDiv.appendChild(linksUL);

    data.items.map((i) => {
      const li = document.createElement("li");
      const liText = document.createElement("a");
      li.classList.add(`link-${i.slug}`);
      liText.setAttribute("href", i.url);
      liText.innerHTML = i.title;
      li.appendChild(liText);
      linksUL.appendChild(li);
    });
  };
  Navbar();
}
