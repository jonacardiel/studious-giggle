function parkInfoTemplate(info) {
  return `
    <h1 class="hero-banner__title">
      <a href="${info.url}">${info.fullName}</a>
    </h1>
    <div class="hero-banner__subtitle">
      <span class="hero-banner__designation">${info.designation}</span>
      <span class="hero-banner__location">${info.states.split(',').join(', ')}</span>
    </div>`;
}

function mediaCardTemplate(info) {
  return `<article class="media-card">
    <img src="${info.image}" alt="${info.name}">
    <div class="media-card__content">
      <h3>
        <a href="${info.link}" class="card-link">
          ${info.name}
        </a>
      </h3>
      <p>${info.description}</p>
    </div>
  </article>`;
}

function getMailingAddress(addresses) {
  const mailing = addresses.find((address) => address.type === "Mailing");
  return mailing;
}

function getVoicePhone(phoneNumbers) {
  const voice = phoneNumbers.find((phone) => phone.type === "Voice");
  return voice ? voice.phoneNumber : null;
}

function footerTemplate(info) {
  const mailing = getMailingAddress(info.addresses);
  const voiceNumber = getVoicePhone(info.contacts.phoneNumbers);

  return `<section class="contact">
    <h2>CONTACT INFO</h2>
    <div class="contact-info">
      <h3>Mailing Address:</h3>
      <p>${mailing.line1}</p>
      <p>Yellowstone National Park, WY 82190-0168</p>
      
      <h3>Phone:</h3>
      <p>${voiceNumber}</p>
    </div>
    <a href="${info.url}" class="external-link" target="_blank" rel="noopener">
      Open "https://www.nps.gov/yell/index.htm" in a new tab
    </a>
  </section>`;
}

import spritePath from '../images/sprite.symbol.svg';

export function alertTemplate(alert) {
  let alertType = "";
  // "Park Closure" needs to be mapped to "closure" for the icon
  switch (alert.category) {
    case "Park Closure":
      alertType = "closure";
      break;
    default:
      alertType = alert.category.toLowerCase();
  }
  
  return `<li class="alert">
    <svg class="icon" focusable="false" aria-hidden="true">
      <use xlink:href="${spritePath}#alert-${alertType}"></use>  
    </svg>
    <div>
      <h3 class="alert-${alertType}">${alert.title}</h3>
      <p>${alert.description}</p>
    </div>
  </li>`;
}

export function visitorCenterTemplate(center) {
  return `<div class="visitor-center">
    <h3>${center.name}</h3>
    <p>${center.description}</p>
    ${center.directionsInfo ? `<p><strong>Directions:</strong> ${center.directionsInfo}</p>` : ''}
  </div>`;
}

export { parkInfoTemplate, mediaCardTemplate, footerTemplate };