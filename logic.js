import isValidEmail from "./js/esm/isValidEmail.js";
import watchInvalidEmail from "./js/esm/watchInvalidEmail.js";
import getPhrases from "./js/esm/getPhrases.js";

function showDetectLocation() {
  if (navigator.geolocation) {
    document.querySelector("#detectcoordinates_container").removeAttribute("hidden");
  }
}

function validateForm(e) {
  const emailEl = e.target.email;
  const feedbackEl = emailEl.parentElement.querySelector(".invalid-feedback");
  const email = emailEl.value.trim().toLowerCase();
  const isValidEmailInput = isValidEmail(email);
  let isValidForm = true;

  if (!isValidEmailInput) {
    feedbackEl.innerText = "A valid e-mail is required.";
    emailEl.parentElement.classList.add("has-validation");
    emailEl.classList.add("is-invalid");
    watchInvalidEmail();
    isValidForm = false;
  } else {
    emailEl.parentElement.classList.remove("has-validation");
  }

  return isValidForm;
}

function onDetectLocation() {
  const coordinates = document.querySelector("#coordinates");
  const lat = document.querySelector("#latitude");
  const long = document.querySelector("#longitude");
  const btnEl = document.querySelector("[data-i18n='detectMyLocation']");
  const spinner = document.querySelector("#detectcoordinates > .spinner-border");

  const btnText = {
    default: getPhrase("detectMyLocation"),
    spinning: getPhrase("detectingLocation")
  };

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  const success = (pos) => {
    const coords = pos.coords;

    lat.value = coords.latitude;
    long.value = coords.longitude;
    coordinates.scrollIntoView({ behavior: "smooth" });

    /* spinner.setAttribute("hidden", false); */
    btnEl.innerText = btnText.default;
  }

  const error = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);

    lat.value = "";
    long.value = "";

    /* spinner.setAttribute("hidden", false); */
    btnEl.innerText = btnText.default;
  }

  spinner.removeAttribute("hidden");
  btnEl.innerText = btnText.spinning;

  navigator.geolocation.getCurrentPosition(success, error, options);
}

function onSubmit(e) {
  const isValidForm = validateForm(e);

  if (!isValidForm) {
    e.preventDefault();
  }
}

function attachListeners() {
  document.querySelector("#myForm").addEventListener("submit", onSubmit);
  document.querySelector("#detectcoordinates").addEventListener("click", onDetectLocation);
}

async function init() {
  pagePhrases = await getPhrases();
  showDetectLocation();
  attachListeners();
}

init();