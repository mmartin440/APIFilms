// app.js

import {searchCategory,searchSingleItem,searchByURL} from "./api.js";

import {renderList,renderDetail,renderRelatedLinks} from "./render.js";


// ------------------------------------
// HOME PAGE LOGIC
// ------------------------------------

const searchForm = document.getElementById("searchForm");


searchForm.addEventListener("submit", async (e) => {

  e.preventDefault();

  const inputValue = document.getElementById("input").value.trim();
  const category = document.getElementById("swf-categories").value;
   const content = document.getElementById("content");

  content.innerHTML = ""; 
  console.log(category); 
  if(category) {

    // RULE 1
    // category selected + NO input
    if (!inputValue ) {
    // we get request for the category and then display on screen
      const data = await searchCategory(category);
      renderList(data, content, category);
      console.log(category)
      return;
    }

    // RULE 2
    // category + input
    const match = await searchSingleItem(category,inputValue);

      // if we found the name or title of what object user looking for then we switch to content page (content.html)
      if (match) {
        console.log(match);
        // This function wipes everything from original origin directing you to the new page and re start reading app.js from top to bottom
        category === "films" ? window.location.href =`content.html?url=${encodeURIComponent(match.properties.url)}` : window.location.href =`content.html?url=${encodeURIComponent(match.url)}`
        
      } else {
        content.innerHTML ="<h2>No Match Found</h2>"
      }
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

  const data = await searchByURL(url);

  console.log(data); 
  renderDetail(data, leftContainer);
  renderRelatedLinks(data, rightContainer);

}