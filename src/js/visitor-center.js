import "../css/style.css";
import "../css/visitor-center.css";
import setHeaderFooter from "./setHeaderFooter.mjs";
import { getParkData, getParkVisitorCenterDetails } from "./parkService.mjs";
import { 
  vcTitleTemplate, 
  vcInfoTemplate, 
  vcDetailsTemplate,
  vcAddressesListTemplate,
  vcDirectionsTemplate,
  vcContactsTemplate,
  vcAmenityTemplate,
  vcImageTemplate,
  listTemplate
} from "./templates.mjs";

function getParam(param) {
  const search = location.search;
  const params = new URLSearchParams(search);
  return params.get(param);
}

function buildPage(data) {
  // Set the title
  document.querySelector(".vc-name").innerHTML = vcTitleTemplate(data.name);
  
  // Set the info section (image and description)
  document.querySelector(".vc-info").innerHTML = vcInfoTemplate(data);
  
  // Clear and rebuild the details list
  const detailsEl = document.querySelector(".vc-details-list");
  detailsEl.innerHTML = "";
  
  // Addresses section
  const addressHTML = vcAddressesListTemplate(data.addresses);
  detailsEl.insertAdjacentHTML(
    "beforeend",
    vcDetailsTemplate(
      "vcAddresses",
      "Addresses",
      "heading-icon_map-pin",
      addressHTML
    )
  );
  
  // Directions section
  detailsEl.insertAdjacentHTML(
    "beforeend",
    vcDetailsTemplate(
      "vcDirections",
      "Directions",
      "directions",
      vcDirectionsTemplate(data.directionsInfo)
    )
  );
  
  // Amenities section
  const amenitiesHTML = listTemplate(data.amenities, vcAmenityTemplate);
  detailsEl.insertAdjacentHTML(
    "beforeend",
    vcDetailsTemplate(
      "vcAmenities",
      "Amenities",
      "heading-icon_info",
      amenitiesHTML
    )
  );
  
  // Contact information section
  detailsEl.insertAdjacentHTML(
    "beforeend",
    vcDetailsTemplate(
      "vcContact",
      "Contact Information",
      "phone",
      vcContactsTemplate(data.contacts)
    )
  );
  
  // Gallery
  const galleryHTML = listTemplate(data.images, vcImageTemplate);
  const galleryEl = document.querySelector(".vc-gallery");
  // Remove existing ul if present
  const existingUl = galleryEl.querySelector("ul");
  if (existingUl) {
    existingUl.remove();
  }
  // Insert new gallery
  galleryEl.insertAdjacentHTML("beforeend", galleryHTML);
}

async function init() {
  const parkData = await getParkData();
  const id = getParam("id");
  const centerDetails = await getParkVisitorCenterDetails(id);
  
  setHeaderFooter(parkData);
  buildPage(centerDetails);
}

init();