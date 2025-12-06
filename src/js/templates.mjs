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
  return `<li class="visitor-center">
    <h4><a href="visitor-center.html?id=${center.id}">${center.name}</a></h4>
    <p>${center.description}</p>
    <p>${center.directionsInfo}</p>
  </li>`;
}

// Helper function for icons
export function iconTemplate(iconId) {
  return `<svg class="icon" role="presentation" focusable="false">
    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="./images/sprite.symbol.svg#${iconId}"></use>
  </svg>`;
}

// Visitor Center Detail Page Templates
export function vcTitleTemplate(text) {
  return `${iconTemplate("ranger-station")} ${text}`;
}

export function vcInfoTemplate(data) {
  const image = data.images[0];
  return `<figure>
    <img src="${image.url}" alt="${image.altText}" />
    <figcaption>${image.caption} <span>${image.credit}</span></figcaption>
  </figure>
  <p>${data.description}</p>`;
}

export function listTemplate(data, contentTemplate) {
  const html = data.map(contentTemplate);
  return `<ul>${html.join("")}</ul>`;
}

function vcAddressTemplate(data) {
  return `<section>
    <h3>${data.type} Address</h3>
    <address>
      ${data.line1}<br />
      ${data.city}, ${data.stateCode} ${data.postalCode}
    </address>
  </section>`;
}

export function vcAddressesListTemplate(data) {
  const physical = data.find((address) => address.type === "Physical");
  const mailing = data.find((address) => address.type === "Mailing");
  let html = vcAddressTemplate(physical);
  if (mailing) {
    html += vcAddressTemplate(mailing);
  }
  return html;
}

export function vcAmenityTemplate(data) {
  return `<li>${data}</li>`;
}

export function vcDirectionsTemplate(data) {
  return `<p>${data}</p>`;
}

export function vcContactsTemplate(data) {
  const email = data.emailAddresses && data.emailAddresses.length > 0 ? data.emailAddresses[0].emailAddress : '';
  const phone = data.phoneNumbers && data.phoneNumbers.length > 0 ? data.phoneNumbers[0].phoneNumber : '';
  
  return `${email ? `<section class="vc-contact__email">
    <h3>Email Address</h3>
    <a href="mailto:${email}">Send this visitor center an email</a>
  </section>` : ''}
  ${phone ? `<section class="vc-contact__phone">
    <h3>Phone numbers</h3>
    <a href="tel:+1${phone}">${phone}</a>
  </section>` : ''}`;
}

export function vcImageTemplate(data) {
  return `<li><img src="${data.url}" alt="${data.altText}" /></li>`;
}

export function vcDetailsTemplate(id, summaryText, iconId, content) {
  return `<details name="vc-details" id="${id}">
    <summary>
      ${iconTemplate(iconId)}
      ${summaryText}
    </summary>
    ${content}
  </details>`;
}

export { parkInfoTemplate, mediaCardTemplate, footerTemplate };