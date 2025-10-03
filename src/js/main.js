import { getParkData, getInfoLinks } from "./parkService.mjs";
import setHeaderFooter from "./setHeaderFooter.mjs";
import { mediaCardTemplate } from "./templates.mjs";

console.log('Main script starting...');

function setParkIntro(data) {
  try {
    const introEl = document.querySelector(".intro");
    if (!introEl) {
      console.error("Intro element not found!");
      return;
    }
    introEl.innerHTML = `<h1>${data.fullName}</h1>
    <p>${data.description}</p>`;
    console.log("Intro content set:", data.fullName);
  } catch (error) {
    console.error('Error setting intro:', error);
  }
}

function setParkInfoLinks(data) {
  try {
    const infoEl = document.querySelector(".info");
    if (!infoEl) {
      console.error("Info element not found!");
      return;
    }
    // Transform array of objects into array of HTML strings
    const html = data.map(mediaCardTemplate);
    // Join and insert into section
    infoEl.insertAdjacentHTML("afterbegin", html.join(""));
    console.log("Info links set successfully");
  } catch (error) {
    console.error('Error setting info links:', error);
  }
}

async function init() {
  const parkData = await getParkData();
  const links = getInfoLinks(parkData.images); // Pass the images array from parkData
  setHeaderFooter(parkData);
  setParkIntro(parkData);
  setParkInfoLinks(links); // Use the updated links
}
init();