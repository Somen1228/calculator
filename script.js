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
// Numbers operators Decimal
function updateExpression(input) {
  if (!isNaN(input) || input === ".") {
    // Check if input is a number or decimal point
    if (expressionField.innerText === "0" && !lastInputWasOperator) {
      expressionFieldValue = ""; // Reset if the display is "0"
    }

    if (display.innerText !== "0" && !lastInputWasOperator && expressionFieldValue === "") {   
      historyVal += `+${input}`;
      expressionFieldValue += `+${input}`;
    } else {
      historyVal += input;
      expressionFieldValue += input;
    }

    lastInputWasOperator = false;
  } else if (operators.includes(input)) {
    // Check if input is an operator
    if (!lastInputWasOperator) {
      // Avoid multiple operators in a row
        if(expressionFieldValue == "0") {
            expressionFieldValue = "";
        }
        
      expressionFieldValue += input;
      historyVal += input;
      lastInputWasOperator = true;
    }
  }

  expressionField.innerText = expressionFieldValue;
  historyField.innerText = historyVal;
}

function evaluateExpression() {
  let expression = expressionFieldValue;

  // Check if the expression ends with an operator and remove it
  while (operators.includes(expression.slice(-1))) {
    expression = expression.slice(0, -1);
  }
  
  if (expression.slice(0, 1) == "0") {
    expression = expression.slice(1, expression.length);
  }
  
  // Evaluate the cleaned expression
  let val;
  try {
    if (answer != 0) {
      expression = String(answer) + expression;
    }
    
    val = eval(expression);
  } catch (error) {
    val = "Error";
  }

  if (val !== undefined) {
    expressionFieldValue = "0"; // Reset the expression field
    expressionField.innerText = expressionFieldValue; // Reset the expression field
    if (String(val).includes(".")) {
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

    if(expressionFieldValue == "0") {
        return;
    }

  const lengthToRemove = expressionFieldValue.length;

  // Remove the last expression from the history
    historyVal = historyVal.slice(0, -lengthToRemove);

  // Reset the expression field value and content
  expressionFieldValue = "0"; // Reset the expression field
  expressionField.innerText = expressionFieldValue; // Reset the expression field

  // Update the history field with the updated history value
  historyField.innerText = historyVal;
  lastInputWasOperator = false;
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
      i--;
    }

    historyVal = historyVal.slice(0, -1);
    historyField.innerText = historyVal;
  } else if (expressionFieldValue !== "0" && expressionFieldValue !== "") {
    expressionFieldValue = expressionFieldValue.slice(0, -1);
    expressionField.innerText = expressionFieldValue;
    historyVal = historyVal.slice(0, -1);
    historyField.innerText = historyVal;
  }
}

function handleKeyDown(e) {
  if ((e.key >= "0" && e.key <= "9") || e.key === ".") {
    updateExpression(e.key);
  } else if (operators.includes(e.key)) {
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


// Function to set the theme
function setTheme(themeName) {
    document.documentElement.className = themeName;
}

// Event listener to toggle between themes
document.getElementById('theme-toggle').addEventListener('click', function() {
    const currentTheme = document.documentElement.className;
    if (currentTheme === 'light-theme') {
        setTheme('dark-theme');
    } else if (currentTheme === 'dark-theme') {
        setTheme('solarized-theme');
    } else if (currentTheme === 'solarized-theme') {
        setTheme('beige-theme');
    } else {
        setTheme('light-theme');
    }
});


setTheme('light-theme');


document.addEventListener('DOMContentLoaded', () => {
    const themeButton = document.getElementById('theme-toggle');
    const doodleAlert = document.getElementById('doodle-alert');

    doodleAlert.style.opacity = '1';
    doodleAlert.style.visibility = 'visible';

    // Hides the alert message after 5 seconds
    setTimeout(() => {
        doodleAlert.style.opacity = '0';
        doodleAlert.style.visibility = 'hidden';
    }, 5000);

    themeButton.addEventListener('touchstart', function() {
        this.classList.add('beam-animate');
    });

    themeButton.addEventListener('animationend', function() {
        this.classList.remove('beam-animate');
    });
});


