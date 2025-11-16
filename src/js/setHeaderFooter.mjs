import { parkInfoTemplate, footerTemplate } from "./templates.mjs";
import enableNavigation from "./navigation.mjs";

function setHeaderInfo(data) {
  try {
    // insert data into disclaimer section
    const disclaimer = document.querySelector(".disclaimer a");
    if (!disclaimer) {
      console.error("Disclaimer element not found");
      return;
    }
    disclaimer.href = data.url;
    disclaimer.textContent = "Yellowstone National Park";

    // update the title of the site
    const titleEl = document.querySelector("head > title");
    if (titleEl) {
      titleEl.textContent = data.fullName;
    }

    // set the banner image
    const heroImg = document.querySelector(".hero-image__img");
    if (heroImg) {
      heroImg.src = data.images[0].url;
      heroImg.alt = data.images[0].altText;
    }

    // set the park specific info in the header
    const heroText = document.querySelector(".hero-image__text");
    if (heroText) {
      heroText.innerHTML = parkInfoTemplate(data);
    }

    console.log("Header info set successfully");
  } catch (error) {
    console.error("Error setting header info:", error);
  }
}

function setFooter(data) {
  try {
    const footerEl = document.querySelector(".park-footer");
    if (!footerEl) {
      console.error("Footer element not found");
      return;
    }
    footerEl.innerHTML = footerTemplate(data);
    console.log("Footer content set successfully");
  } catch (error) {
    console.error("Error setting footer:", error);
  }
}

export default function setHeaderFooter(data) {
  try {
    setHeaderInfo(data);
    setFooter(data);
    enableNavigation();
    console.log("Header and footer setup complete");
  } catch (error) {
    console.error("Error in setHeaderFooter:", error);
  }
}