const API_URL = "https://open.er-api.com/v6/latest/";

const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const amountInput = document.getElementById("amount");
const resultDiv = document.getElementById("resultDiv");
const currentDate = document.getElementById("currentDate");

// Set today's date wow
function setCurrentDate() {
  const date = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  currentDate.textContent = date.toLocaleDateString("en-US", options);
}

// Initialize currencies
function initializeCurrencies() {
  fetch(`${API_URL}USD`)
    .then((response) => response.json())
    .then((data) => {
      const currencies = data.rates;
      for (const currency in currencies) {
        const option = document.createElement("option");
        option.value = currency;
        option.textContent = currency;

        // Add options to both dropdowns
        fromCurrency.appendChild(option.cloneNode(true));
        toCurrency.appendChild(option.cloneNode(true));
      }
      fromCurrency.value = "USD";
      toCurrency.value = "EUR";
    })
    .catch((error) => {
      console.error("Error fetching currency data:", error);
      alert("Unable to load currencies. Please try again later.");
    });
}

// Convert currency
function convertCurrency() {
  const from = fromCurrency.value;
  const to = toCurrency.value;
  const amount = parseFloat(amountInput.value);

  if (isNaN(amount) || amount <= 0) {
    resultDiv.textContent = "Enter a valid amount";
    return;
  }

  fetch(`${API_URL}${from}`)
    .then((response) => response.json())
    .then((data) => {
      const rate = data.rates[to];
      if (!rate) {
        resultDiv.textContent = "Rate unavailable";
        return;
      }
      const convertedAmount = (amount * rate).toFixed(2);
      resultDiv.textContent = `${convertedAmount} ${to}`;
    })
    .catch((error) => {
      console.error("Error fetching conversion data:", error);
      resultDiv.textContent = "Error converting";
    });
}

// Swap currencies
function swapCurrencies() {
  const fromValue = fromCurrency.value;
  const toValue = toCurrency.value;

  // Swap the values
  fromCurrency.value = toValue;
  toCurrency.value = fromValue;

  // Trigger conversion to update the result after swapping
  convertCurrency();
}

// Initialize the app
setCurrentDate();
initializeCurrencies();
