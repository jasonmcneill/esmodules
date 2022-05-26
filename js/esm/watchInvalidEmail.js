import isValidEmail from "./isValidEmail.js";

export default function watchInvalidEmail() {
  document.querySelectorAll(".validate-email").forEach((item) => {
    item.addEventListener("input", (e) => {
      const inputEl = e.target;
      const feedbackEl = e.target.parentElement.querySelector(".invalid-feedback");
      const isValidValue = isValidEmail(inputEl.value);
      const isValidMsg = feedbackEl.innerText;

      if (inputEl.value.length && !isValidValue) {
        feedbackEl.innerText = isValidMsg;
        inputEl.parentElement.classList.add("has-validation");
        inputEl.classList.add("is-invalid");
      } else {
        inputEl.parentElement.classList.remove("has-validation");
        inputEl.classList.remove("is-invalid");
      }
    });
  });
}