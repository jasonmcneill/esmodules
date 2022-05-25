import isValidEmail from "./js/esm/isValidEmail.js";
import watchInvalidEmail from "./js/esm/watchInvalidEmail.js";

function validate(e) {
  const emailEl = e.target.email;
  const feedbackEl = emailEl.parentElement.querySelector(".invalid-feedback");
  const email = emailEl.value.trim().toLowerCase();
  let isValid = true;

  if (!isValidEmail(email)) {
    feedbackEl.innerText = "A valid e-mail is required.";
    emailEl.classList.add("is-invalid");
    watchInvalidEmail();
    return false;
  }

  return isValid;
}

function onSubmit(e) {
  const isValidForm = validate(e);

  if (!isValidForm) {
    e.preventDefault();
  }
}

function attachListeners() {
  document.querySelector("#myForm").addEventListener("submit", onSubmit);
}

function init() {
  attachListeners();
}

init();