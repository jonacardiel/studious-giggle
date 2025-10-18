import "../css/style.css";
import "../css/conditions.css";
import { getParkData, getAlertsData, getVisitorCenterData } from "./parkService.mjs";
import setHeaderFooter from "./setHeaderFooter.mjs";
import { alertTemplate, visitorCenterTemplate } from "./templates.mjs";

async function setAlerts(parkCode) {
  const alertsData = await getAlertsData(parkCode);
  const alertsListEl = document.querySelector(".alerts-list");
  
  if (alertsData.length > 0) {
    alertsListEl.innerHTML = alertsData.map(alertTemplate).join("");
  } else {
    alertsListEl.innerHTML = "<li>No current alerts for this park.</li>";
  }
}

async function setVisitorCenters(parkCode) {
  const visitorCenterData = await getVisitorCenterData(parkCode);
  const visitorCentersEl = document.querySelector(".visitor-centers-list");
  
  if (visitorCenterData.length > 0) {
    visitorCentersEl.innerHTML = visitorCenterData.map(visitorCenterTemplate).join("");
  } else {
    visitorCentersEl.innerHTML = "<p>No visitor center information available.</p>";
  }
}

function setActivities(parkData) {
  const activitiesEl = document.querySelector(".activities-list");
  
  if (parkData.activities && parkData.activities.length > 0) {
    const activitiesHtml = parkData.activities
      .map(activity => `<div class="activity-item">${activity.name}</div>`)
      .join("");
    activitiesEl.innerHTML = activitiesHtml;
  } else {
    activitiesEl.innerHTML = "<p>No activities information available.</p>";
  }
}

async function init() {
  const parkData = await getParkData();
  
  setHeaderFooter(parkData);
  await setAlerts(parkData.parkCode);
  await setVisitorCenters(parkData.parkCode);
  setActivities(parkData);
}

init();