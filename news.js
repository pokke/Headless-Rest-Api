import { wrapper } from "./helper.js";

export default function news() {
  const fetchApi = async (endpoint) => {
    const originURL = "http://64.226.89.57/wp-json";
    const data = await fetch(originURL + endpoint);
    const json = await data.json();
    console.log(json);
    return json;
  };

  const displayData = async () => {
    const data = await fetchApi("/wp/v2/posts");
    wrapper.innerHTML = "";
    const postsContainer = document.createElement("div");
    postsContainer.id = "container";

    for (const post of data) {
      const postElement = document.createElement("div");
      postElement.setAttribute("id", "newsArticle");
      postElement.classList.add("post");

      const titleElement = document.createElement("h2");
      titleElement.textContent = post.title.rendered;
      postElement.appendChild(titleElement);

      const contentElement = document.createElement("div");
      contentElement.innerHTML = post.content.rendered;
      postElement.appendChild(contentElement);

      postsContainer.appendChild(postElement);
    }
    wrapper.appendChild(postsContainer);
  };
  displayData();
}
