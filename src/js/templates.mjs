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
  // Assuming the number is what we want, return the phoneNumber field if found, otherwise null
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

export { parkInfoTemplate, mediaCardTemplate, footerTemplate };