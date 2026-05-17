
// return an array with list of objects from choice of category
export async function searchCategory(category) {
    
    const response = await fetch(`https://www.swapi.tech/api/${category}`);
    const data = await response.json();
    if (category === "people" || category === "planets" || category === "species" || category === "starships" || category === "vehicles"){
        console.log(data.results)
        return data.results; 
    }
    console.log(data.result)
    return data.result;
}

// return an array of one item from the category and input choice
export async function searchSingleItem(category, input) {

    const response = await fetch(`https://www.swapi.tech/api/${category}`);
    const data = await response.json();

    const items = category === "films" ? data.result : data.results;
    const match = items.find(item => {

        const name =
        item.properties?.name ||
        item.properties?.title ||
        item.name ||
        item.title;

        return name?.toLowerCase().trim() === input.toLowerCase().trim();
    });

  return match;
}

export async function searchByURL(url) {

  const response = await fetch(url);
  const data = await response.json();
  console.log(data.result); 
  return data.result;
}
