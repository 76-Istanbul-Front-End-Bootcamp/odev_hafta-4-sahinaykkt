const data = {
    USD: { EUR: 0.82, GBP: 0.74, NOK: 8.64},
    EUR: { USD: 1.23, GBP: 0.91, NOK: 10.55},
    GBP: { USD: 1.35, EUR: 1.10, NOK: 11.53},
    NOK: { USD: 0.12, EUR: 0.095, GBP: 0.087}
  };

const currencyKeys = Object.keys(data);

function createCurrencyElements(elements, root, inputName) {
    for (let i = 0; i < elements.length; i++) {
        const currencyKeyDiv = document.createElement("div");
        const currencyKeyInput = document.createElement("input");
        currencyKeyInput.setAttribute("type", "radio");
        currencyKeyInput.setAttribute("name", inputName);
        currencyKeyInput.setAttribute("id", inputName + elements[i]);
        currencyKeyInput.setAttribute("value", elements[i]);

        const currencyKeyLabel = document.createElement("label");
        currencyKeyLabel.setAttribute("for", inputName + elements[i]);
        currencyKeyLabel.textContent = elements[i];

        currencyKeyDiv.appendChild(currencyKeyInput);
        currencyKeyDiv.appendChild(currencyKeyLabel);
        root.appendChild(currencyKeyDiv);
    }
}

const parentEl = document.querySelector("#currency-box-from");
const fromInputName = "currency_from";
createCurrencyElements(currencyKeys, parentEl, fromInputName);

const parentToEl = document.querySelector("#currency-box-to");
const toInputName = "currency_to";
createCurrencyElements(currencyKeys, parentToEl, toInputName);

const calculateButton = document.querySelector("#calculate-button");

calculateButton.addEventListener("click", function () {
    const fromTarget = document.querySelector("input[name='currency_from']:checked");
    const toTarget = document.querySelector("input[name='currency_to']:checked");
    const amount = document.querySelector("input[name='amount']").value;

    if (isNaN(amount)) {
        return alert("Please enter a  valid number.");
    }

    if (!fromTarget && !toTarget) {
        return alert("Please make currency selection.");
    }
    if (!fromTarget) {
        return alert("Please choose currency from.");
    }
    if (!toTarget) {
        return alert("Please choose currency to.");
    }

    const fromTargetValue = document.querySelector("input[name='currency_from']:checked").value;
    const toTargetValue = document.querySelector("input[name='currency_to']:checked").value;

    if (fromTargetValue == toTargetValue) {
        return alert("Please choose different currencies.");
    }

    const currentCurrencyObject = data[fromTargetValue];
    const resultForOne = currentCurrencyObject[toTargetValue];
    const result = amount * resultForOne;

    const currencyResult = document.querySelector("#currency-result");
    currencyResult.innerHTML = amount + " " + fromTargetValue + " = " + result + " " + toTargetValue;
});