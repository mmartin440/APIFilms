// app.js

import {searchCategory,searchSingleItem,searchByURL} from "./api.js";
import {renderList,renderDetail,renderRelatedLinks} from "./render.js";
const searchForm = document.getElementById("searchForm");
const img = document.getElementById("homeImage");

// ------------------------------------
// HOME PAGE LOGIC
// ------------------------------------

if (window.location.pathname === "/home.html") {
  const img = document.getElementById("homeImage");
  img.classList.remove("hidden");
}


searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const submitBtn = document.getElementById("submit-btn");
  img.classList.add("hidden");

  // Prevent double submit
  if (submitBtn.disabled) return;
  submitBtn.disabled = true;

  try {
    const inputValue = document.getElementById("input").value.trim();
    const category = document.getElementById("swf-categories").value;
    const content = document.getElementById("content");
    const errorMessage = document.getElementById("category-error");

    content.innerHTML = "";

    if (category) {
      errorMessage.style.display = "none";

      // RULE 1
      if (!inputValue) {
        const data = await searchCategory(category);
        renderList(data, content, category);
        return;
      }

      // RULE 2
      const match = await searchSingleItem(category, inputValue);

      if (match) {
        category === "films"
          ? window.location.href = `content.html?url=${encodeURIComponent(match.properties.url)}`
          : window.location.href = `content.html?url=${encodeURIComponent(match.url)}`;
      } else {
        content.innerHTML = "<h2>No Match Found</h2>";
      }

    } else {
      errorMessage.style.display = "inline";
    }

  } finally {
    // Re-enable button after request completes
    submitBtn.disabled = false;
  }
});

// ------------------------------------
// CONTENT PAGE LOGIC
// ------------------------------------

// if the page changes to content.html then it will read these content as true does displaying the information
const leftContainer = document.querySelector(".leftSide-container");
const rightContainer = document.querySelector(".rightSide-container");

  if (leftContainer && rightContainer) {
    // if both are containers exist on page then we display info about content
    loadContentPage();
  }

async function loadContentPage() {

  // this will allow us to read any query string in the URL (after the ?)
  const params = new URLSearchParams(window.location.search);
  const url = decodeURIComponent(params.get("url"));
  if (!url) return;
  
  const filepath = url.split("/api/")[1]; 
  const fileCategory = filepath.split("/")[0]; 

  const data = await searchByURL(url); 
  renderDetail(data, leftContainer, fileCategory);
  renderRelatedLinks(data, rightContainer, fileCategory);

}