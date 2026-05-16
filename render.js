
// render.js

export function renderList(data, container, category) {

//   container.innerHTML = "";

if (category === "people" || category === "planets" || category === "species" || category === "starships" || category === "vehicles") {
    data.forEach(item => {

        const card = document.createElement("div");
        card.classList.add("card");
        card.textContent = item.name || item.title;

        card.addEventListener("click", () => {

        window.location.href =
            `content.html?url=${encodeURIComponent(item.url)}&category=${category}`;

        });

        container.appendChild(card);

    });
} else {
    data.forEach(item => {

    const card = document.createElement("div");
    card.classList.add("card");
    card.textContent = item.properties.name || item.properties.title;

    card.addEventListener("click", () => {

      window.location.href =
        `content.html?url=${encodeURIComponent(item.properties.url)}&category=${category}`;

    });

    container.appendChild(card);

  });
}

 

}

export function renderDetail(data, leftContainer) {

  leftContainer.innerHTML = "";

  const properties =
    data.properties;

  Object.entries(properties).forEach(([key, value]) => {

    const row =
      document.createElement("div");

    row.classList.add("detail-row");

    row.textContent =
      `${key}: ${value}`;

    leftContainer.appendChild(row);

  });

}

export function renderRelatedLinks(data, rightContainer) {

  rightContainer.innerHTML = "";

  Object.entries(data.properties).forEach(([key, value]) => {

    if (Array.isArray(value)) {

      value.forEach(link => {

        if (typeof link === "string" &&
            link.includes("https")) {

          const button =
            document.createElement("button");

          button.textContent = key;

          button.addEventListener("click", () => {

            window.location.href =
              `content.html?url=${encodeURIComponent(link)}`;

          });

          rightContainer.appendChild(button);

        }

      });

    }

  });

}