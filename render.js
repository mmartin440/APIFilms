
import {searchByURL} from "./api.js";

export function renderList(data, container, category) {

    if(category === "films") {
      data.forEach((item, index) => {

        const card = document.createElement("div");
        card.classList.add("card");
            
        const listOrder = document.createElement("div");
        listOrder.classList.add("num-order"); 
        listOrder.textContent = index + 1; 
        card.appendChild(listOrder); 

        const title = document.createElement("div"); 
        title.classList.add("title-name"); 
        title.textContent = item.properties.name || item.properties.title;
        card.appendChild(title); 
 
        title.addEventListener("click", () => {
          title.classList.add("clicked");
          window.location.href = `content.html?url=${encodeURIComponent(item.properties.url)}&category=${category}`;
        });

        container.appendChild(card);

      });
        
    } else {
        data.forEach((item, index) => {

            const card = document.createElement("div");
            card.classList.add("card");
            const listOrder = document.createElement("div");
            listOrder.classList.add("num-order"); 
            listOrder.textContent = index + 1; 
            card.appendChild(listOrder); 

            const title = document.createElement("div"); 
            title.classList.add("title-name");
            title.textContent = item.name || item.title;
            card.appendChild(title); 

            title.addEventListener("click", () => {

            window.location.href =
                `content.html?url=${encodeURIComponent(item.url)}&category=${category}`;
            });

            container.appendChild(card);
        });
    }
}

function renderElements(container, labels, values) {

  const infoContainer = document.createElement("div"); 
  infoContainer.classList.add("info-container");

  labels.forEach((lableName, index) => {
    const infoContent = document.createElement("div"); 
    infoContent.classList.add("info-content");

    const label = document.createElement("span"); 
    label.classList.add("label"); 
    label.textContent = lableName + " : "; 
    infoContent.appendChild(label); 

    const value = document.createElement("span"); 
    value.classList.add("value"); 
    value.textContent = values[index]; 
    infoContent.appendChild(value); 

    infoContainer.appendChild(infoContent)
  })

  container.appendChild(infoContainer); 
}

function renderElementsPlusHomeworld(container, labels, values) {
  const infoContainer = document.createElement("div"); 
  infoContainer.classList.add("info-container");

  labels.forEach((lableName, index) => {
    const infoContent = document.createElement("div"); 
    infoContent.classList.add("info-content");

    const label = document.createElement("span"); 
    label.classList.add("label"); 
    label.textContent = lableName + " : "; 
    infoContent.appendChild(label); 

    const value = document.createElement("span"); 
    value.classList.add("value"); 
    value.textContent = values[index]; 
    infoContent.appendChild(value); 

    infoContainer.appendChild(infoContent)
  })

  container.appendChild(infoContainer); 
}

export async function renderDetail(data, leftContainer, category) {
  const container = leftContainer; 
  container.innerHTML = "";
  const properties = data.properties; 

  const titleContainer = document.createElement("div"); 
  titleContainer.classList.add("title-container"); 
  
  const title = document.createElement("h2"); 
  title.classList.add("title"); 
  title.textContent = properties.title || properties.name; 
  titleContainer.appendChild(title); 
  container.appendChild(titleContainer);

  let labels = []; 
  let values = []; 
  let homeworldData; 

  switch (category) {
  case "films":
    labels = ["Release Date", "Director", "Producer", "Episode Number"]; 
    values = [properties.release_date, properties.director, properties.producer, properties.episode_id]
    renderElements(container, labels, values);
    break;

  case "people":
    homeworldData = await searchByURL(properties.homeworld); 
    labels = ["Home World", "Birth Year", "Gender", "Height (cm)", "Eye Color", "Hair Color", "Mass (kg)" ]; 
    values = [homeworldData.properties.name, properties.birth_year, properties.gender, properties.height, properties.eye_color, properties.hair_color, properties.mass]

    renderElementsPlusHomeworld(container, labels, values);
    break;

  case "planets":
    labels = ["Population", "Climate", "Terrain", "Surface Warter Percentage", "Diameter (km)", "Rotation Period", "Orbital Period", "Gravity"]; 
    values = [properties.population, properties.climate, properties.terrain, properties.surface_water, properties.diameter, properties.rotation_period, properties.orbital_period, properties.gravity]
    renderElements(container, labels, values);
    break;

  case "species":
    homeworldData = await searchByURL(properties.homeworld); 
    labels = ["Classified", "Designation" ,"Home World", "Language", "Average Lifespan (yr)","Average Height (cm)", "Eye Color", "Hair Colors", "Skin Colors"]; 
    values = [properties.classification, properties.designation ,homeworldData.properties.name, properties.language, properties.average_lifespan ,properties.average_height, properties.eye_colors, properties.hair_colors, properties.skin_colors]
    renderElements(container, labels, values);
    break;

  case "starships":
    labels = ["Starship Class" , "Model", "Manufacture", "Cost in Credits", "Length", "Crew", "Number of Passenger", "Maximum Speed", "Hyperdrive Rating", "MGLT", "Cargo Capacity (kg)", "Consumables Amount"]
    values = [properties.starship_class, properties.model, properties.manufacturer, properties.cost_in_credits, properties.length, properties.crew, properties.passengers, properties.max_atmosphering_speed, properties.hyperdrive_rating, properties.MGLT, properties.cargo_capacity, properties.consumables]; 
    renderElements(container, labels, values);
    break;

  case "vehicles":
    labels = ["Model", "Vehicle Class", "Manufacture", "Length (m)", "Cost in Credits", "Crew", "Numer of Passengers", "Max Atmosphere Speed", "Cargo Capacity", "Consumables"]
    values = [properties.model, properties.vehicle_class, properties.manufacturer, properties.length, properties.cost_in_credits, properties.crew, properties.passengers, properties.max_atmosphering_speed, properties.cargo_capacity, properties.consumables]
    renderElements(container, labels, values);
    break;

  default:
    console.log("Unknown Category")
  }
}

function attributeExplanation(currentCategory) {

  if(currentCategory === "films") {
    return {
      "starships": "Starships featured in this film: ",
      "vehicles": "Vehicles featured in this film: ",
      "planets": "Planets featured in this film: ",
      "characters": "Characters appearing in this film: ",
      "species": "Species featured in this film: "
    }
  } else if(currentCategory === "people") {
    return {
      "films": "Films this person appears in: ",
      "starships": "Starships this person has piloted: ",
      "vehicles": "Vehicles this person has piloted: "
    }
  } else if(currentCategory === "species") {
    return {
      "people": "People belonging to this species: "
    }
  } else if(currentCategory === "starships") {
    return{
      "films": "Films this starship appears in: ",
      "pilots": "Characters who have piloted this starship: "
    }
  } else if(currentCategory === "vehicles"){
    return {
      "films": "Films this vehicle appears in: ",
      "pilots": "Characters who have piloted this vehicle: "
    }
  }
}

export function renderRelatedLinks(data, rightContainer, currentCategory) {
  console.log("right side laoding ..."); 

  rightContainer.innerHTML = "";

  const labels = attributeExplanation(currentCategory); 

  const relatedItems = document.createElement("div"); 
  relatedItems.classList.add("related-items"); 
  relatedItems.textContent = "Here is a list of related information for " + (data.properties.name || data.properties.title) + " "; 
  rightContainer.appendChild(relatedItems); 

  const subRightContainer = document.createElement("div"); 
  subRightContainer.classList.add("right-sub-container"); 
  rightContainer.appendChild(subRightContainer)

  Object.entries(data.properties).forEach( ([key, value]) => {

    if (Array.isArray(value) && value.length > 0 ) {
      
      const section = document.createElement("div");
      section.classList.add("related-section");

      const title = document.createElement("div"); 
      title.classList.add("related-container-title"); 
      title.textContent = labels[key] || key;
      section.appendChild(title); 
      
      const buttonContainer = document.createElement("div"); 
      buttonContainer.classList.add("btn-container"); 
      section.appendChild(buttonContainer)

      value.forEach(async (link) => {

        console.log(link); 
        if (typeof link === "string" && link.includes("https")) {
          const relatedData =  await searchByURL(link);

          const button = document.createElement("button");
          button.classList.add("sub-related-btn")
          button.textContent = relatedData.properties.name || relatedData.properties.title;

          button.addEventListener("click", () => {

            window.location.href = `content.html?url=${encodeURIComponent(link)}`;

          });

          buttonContainer.appendChild(button);

        }

      });

      subRightContainer.appendChild(section); 
    }


  });

}