const passwordField = document.getElementById("password");
const copyBtn = document.getElementById("copyBtn");
const generateBtn = document.getElementById("generateBtn");

const lengthSlider = document.getElementById("lengthSlider");
const lengthValue = document.getElementById("lengthValue");

const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");

const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");

const toast = document.getElementById("toast");

lengthSlider.addEventListener("input", () => {
  lengthValue.innerText = lengthSlider.value;
  updateStrength();
});

function showToast(message) {
  toast.innerText = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 1800);
}

function generatePassword() {
  const length = parseInt(lengthSlider.value);

  const upperSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerSet = "abcdefghijklmnopqrstuvwxyz";
  const numberSet = "0123456789";
  const symbolSet = "!@#$%^&*()_+-=[]{}|;:,.<>?/";

  let allChars = "";
  if (uppercase.checked) allChars += upperSet;
  if (lowercase.checked) allChars += lowerSet;
  if (numbers.checked) allChars += numberSet;
  if (symbols.checked) allChars += symbolSet;

  if (allChars.length === 0) {
    showToast("Select at least one option ❌");
    return;
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  passwordField.value = password;
  updateStrength();
}

function updateStrength() {
  const length = parseInt(lengthSlider.value);

  let score = 0;
  if (uppercase.checked) score++;
  if (lowercase.checked) score++;
  if (numbers.checked) score++;
  if (symbols.checked) score++;

  if (length >= 12) score++;
  if (length >= 18) score++;

  if (score <= 2) {
    strengthText.innerText = "Weak";
    strengthBar.style.width = "30%";
    strengthBar.style.background = "#fb7185";
  } else if (score <= 4) {
    strengthText.innerText = "Medium";
    strengthBar.style.width = "60%";
    strengthBar.style.background = "#facc15";
  } else {
    strengthText.innerText = "Strong";
    strengthBar.style.width = "100%";
    strengthBar.style.background = "#22c55e";
  }
}

generateBtn.addEventListener("click", generatePassword);

copyBtn.addEventListener("click", () => {
  if (passwordField.value === "") {
    showToast("Generate a password first ⚡");
    return;
  }

  navigator.clipboard.writeText(passwordField.value);
  showToast("Copied to clipboard ✅");
});

[uppercase, lowercase, numbers, symbols].forEach((checkbox) => {
  checkbox.addEventListener("change", updateStrength);
});

updateStrength();
