export default function isValidEmail(email) {
  let isValid = false;
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (regex.test(email)) {
    isValid = true;
  }
  return isValid;
}