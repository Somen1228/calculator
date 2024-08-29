// Selectors
const historyField = document.querySelector("#eval-history");
const display = document.querySelector("#display");
const expressionField = document.getElementById("expression");
const actionBtns = document.querySelectorAll(".action-btn");
const allBtns = document.querySelectorAll(".buttons");
const equalsTo = document.querySelector(".equals");
const backspace = document.querySelector(".backspace");
const clear = document.querySelector(".clear");
const clearAll = document.querySelector(".clear-all");

// Variables
let answer = 0;
let expressionFieldValue = "";
let historyVal = "";
let lastInputWasOperator = false;
const operators = ["+", "-", "*", "/"];

// Functions
function updateExpression(input) {
  if (!isNaN(input) || input === ".") {
    // Check if input is a number or decimal point
    if (expressionField.innerText === "0" && !lastInputWasOperator) {
      expressionFieldValue = ""; // Reset if the display is "0"
    }

    if (
      display.innerText !== "0" &&
      !lastInputWasOperator &&
      expressionFieldValue === ""
    ) {
      historyVal += `+${input}`;
    } else {
      historyVal += input;
    }

    expressionFieldValue += input;
    lastInputWasOperator = false;
  } else if (operators.includes(input)) {
    // Check if input is an operator
    if (!lastInputWasOperator) {
      // Avoid multiple operators in a row
      expressionFieldValue += input;
      historyVal += input;
      lastInputWasOperator = true;
    }
  }

  expressionField.innerText = expressionFieldValue;
  historyField.innerText = historyVal;
}

function evaluateExpression() {
  let expression = expressionField.innerText;

  // Check if the expression ends with an operator and remove it
  while (operators.includes(expression.slice(-1))) {
    expression = expression.slice(0, -1);
  }

  // Evaluate the cleaned expression
  let val;
  try {
    if (answer != 0) {
      expression = String(answer) + expression;
    }
    val = eval(expression);
  } catch (error) {
    console.log("Error evaluating expression", error);
    val = "Error";
  }

  if (val !== undefined) {
    expressionFieldValue = "0"; // Reset the expression field
    expressionField.innerText = expressionFieldValue; // Reset the expression field
    if(String(val).includes(".")) {
        display.innerText = String(val).slice(0, 10); // Show the result
    } else {
        display.innerText = val; // Show the result
    }
    answer = Number(val); // Update the answer
    lastInputWasOperator = false; // Reset the operator flag

    // Update history
    historyVal += `=${val}`;
    historyField.innerText = historyVal;
  }
}

function clearExpression() {

  const lengthToRemove = expressionFieldValue.length;

  // Remove the last value or operator from the history
  if(expressionFieldValue.slice(0, 1) == "0") {
    historyVal = historyVal.slice(0, -(lengthToRemove-1));
  } else {
    historyVal = historyVal.slice(0, -(lengthToRemove+1));
  }
  // Reset the expression field value and content
  expressionFieldValue = "0"; // Reset the expression field
  expressionField.innerText = expressionFieldValue; // Reset the expression field

  // Update the history field with the updated history value
  historyField.innerText = historyVal;
}

function clearAllData() {
  clearExpression();
  display.innerText = "0";
  answer = 0;
  historyVal = "";
  historyField.innerText = "";
}

function handleBackspace() {

  if (expressionFieldValue.length === 1 && expressionFieldValue !== "0") {
    expressionFieldValue = "0";
    expressionField.innerText = expressionFieldValue;

    const length = historyVal.length;
    let i = length - 1;
    
    while (!operators.includes(historyVal.charAt(i)) && i > 0) {
      historyVal = historyVal.slice(0, -1);
      historyField.innerText = historyVal;
      console.log("Func updates: ", historyVal);

      i--;
    }

    historyVal = historyVal.slice(0, -1);
    historyField.innerText = historyVal;
    
  } else if(expressionFieldValue !== "0" && expressionFieldValue !== ""){
    expressionFieldValue = expressionFieldValue.slice(0, -1);
    expressionField.innerText = expressionFieldValue;
    historyVal = historyVal.slice(0, -1);
    historyField.innerText = historyVal;
  }
}

function handleKeyDown(e) {
  if ((e.key >= "0" && e.key <= "9") || e.key === ".") {
    updateExpression(e.key);
  } else if (["+", "-", "*", "/"].includes(e.key)) {
    updateExpression(e.key);
  } else if (e.key === "Enter" || e.key === "=") {
    evaluateExpression();
  } else if (e.key === "Backspace") {
    handleBackspace();
  } else if (e.key === "Escape") {
    clearExpression();
  } else if (e.key === "Delete") {
    clearAllData();
  }
}

// Event Listeners
allBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => updateExpression(e.target.innerText));
});

equalsTo.addEventListener("click", evaluateExpression);
clear.addEventListener("click", clearExpression);
clearAll.addEventListener("click", clearAllData);
backspace.addEventListener("click", handleBackspace);
document.addEventListener("keydown", handleKeyDown);
