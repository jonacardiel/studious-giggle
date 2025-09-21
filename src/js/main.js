import { getParkData } from "./parkService.mjs";

// Show loading state while fetching park data
document.body.classList.add('loading');

try {
  // Fetch and update all park information
  const parkData = getParkData();
  
  const disclaimerLink = document.querySelector(".disclaimer > a");
  if (disclaimerLink) {
    disclaimerLink.href = parkData.url;
    disclaimerLink.innerHTML = parkData.fullName;
  }

  document.title = parkData.fullName;

  const heroImg = document.querySelector(".hero-image__img");
  if (heroImg && parkData.images && parkData.images.length > 0) {
    heroImg.src = parkData.images[0].url;
    heroImg.alt = parkData.images[0].altText;
  }

  const heroText = document.querySelector(".hero-image__text");
  if (heroText) {
    heroText.innerHTML = `
      <a href="${parkData.url}" class="hero-banner__title">${parkData.name}</a>
      <p class="hero-banner__subtitle">
        <span>${parkData.designation}</span>
        <span>${parkData.states}</span>
      </p>
    `;
  }

  document.body.classList.remove('loading');
} catch (error) {
  // Handle errors gracefully with user-friendly message
  console.error('Failed to load park data:', error);
  document.body.classList.remove('loading');
  document.body.classList.add('error');
  
  const heroText = document.querySelector(".hero-image__text");
  if (heroText) {
    heroText.innerHTML = `
      <div class="error-message">
        <h1>Sorry, we couldn't load the park information</h1>
        <p>Please try refreshing the page.</p>
      </div>
    `;
  }
}