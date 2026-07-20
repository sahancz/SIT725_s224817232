const form = document.querySelector("#calculator-form");
const resultBox = document.querySelector("#result");
const submitButton = form.querySelector("button");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const num1 = document.querySelector("#num1").value;
  const num2 = document.querySelector("#num2").value;
  const endpoint = `/api/add?num1=${encodeURIComponent(num1)}&num2=${encodeURIComponent(num2)}`;

  submitButton.disabled = true;
  submitButton.textContent = "Calculating...";
  resultBox.classList.remove("error");

  try {
    const response = await fetch(endpoint);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "The calculation failed.");
    }

    resultBox.innerHTML = `
      <span>Result</span>
      <strong>${data.result}</strong>
      <code>GET ${endpoint}</code>
    `;
  } catch (error) {
    resultBox.classList.add("error");
    resultBox.innerHTML = `
      <span>Error</span>
      <strong>!</strong>
      <code>${error.message}</code>
    `;
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Add numbers";
  }
});
