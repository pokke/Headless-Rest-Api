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

    const logo = document.createElement("a");
    logo.setAttribute("href", "#");
    logo.textContent = "Logo";
    logo.classList.add("logo");
    logoDiv.appendChild(logo);

    const routesDiv = document.createElement("div");
    routesDiv.classList.add("routes-div");

    const linksList = document.createElement("ul");
    linksList.classList.add("links-list");

    data.items.map((i) => {
      const route = document.createElement("li");
      const routeText = document.createElement("a");
      route.classList.add(`link`);
      routeText.setAttribute("href", i.url);
      routeText.textContent = i.title;
      route.appendChild(routeText);
      linksList.appendChild(route);
    });

    routesDiv.appendChild(linksList);

    navbar.appendChild(logoDiv);
    navbar.appendChild(routesDiv);
  };
  Navbar();
}
