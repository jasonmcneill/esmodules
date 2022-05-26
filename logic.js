import isValidEmail from "./js/esm/isValidEmail.js";
import watchInvalidEmail from "./js/esm/watchInvalidEmail.js";
import getPhrases from "./js/esm/getPhrases.js";

let phrases = [];

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

function onSubmit(e) {
  const isValidForm = validateForm(e);

  if (!isValidForm) {
    e.preventDefault();
  }
}

function attachListeners() {
  document.querySelector("#myForm").addEventListener("submit", onSubmit);
}

function init() {
  getPhrases("i18n");
  attachListeners();
}

init();