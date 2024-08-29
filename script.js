// Selectors
const historyField = document.querySelector("#eval-history");
const display = document.querySelector('#display');
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

// Functions
function updateExpression(input) {
    if (!isNaN(input) || input === ".") {  // Check if input is a number or decimal point
        if (expressionField.innerText === "0" && !lastInputWasOperator) {
            expressionFieldValue = "";  // Reset if the display is "0"
        }

        if (display.innerText !== "0" && !lastInputWasOperator && expressionFieldValue === "") {
            historyVal += ` + ${input}`;
        } else {
            historyVal += input;
        }

        expressionFieldValue += input;
        lastInputWasOperator = false;
    } else if (['+', '-', '*', '/'].includes(input)) {  // Check if input is an operator
        if (!lastInputWasOperator) {  // Avoid multiple operators in a row
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
    console.log(expression);
    
    // Check if the expression ends with an operator and remove it
    const operators = ['+', '-', '*', '/'];
    while (operators.includes(expression.slice(-1))) {
        expression = expression.slice(0, -1);
    }
    console.log(expression);
    
    // Evaluate the cleaned expression
    let val;
    try {
        if(answer != 0) {
            expression = String(answer) + expression;
        } 
        val = eval(expression)
    } catch (error) {
        console.log('Error evaluating expression', error);
        val = "Error";
    }

    if (val !== undefined) {
        expressionFieldValue = ""; // Reset the expression field
        expressionField.innerText = "0"; // Reset the expression field
        display.innerText = val; // Show the result
        answer = Number(val); // Update the answer
        lastInputWasOperator = false; // Reset the operator flag

        // Update history
        historyVal += ` = ${val}`;
        historyField.innerText = historyVal;
    }
}

function clearExpression() {
    // Reset the expression field value and content
    expressionFieldValue = "";
    expressionField.innerText = "0";

    // Remove the last value or operator from the history
    const lastIndex = historyVal.lastIndexOf(' ');
    if (lastIndex !== -1) {
        historyVal = historyVal.slice(0, lastIndex);
    }

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
    expressionFieldValue = expressionFieldValue.slice(0, -1);
    expressionField.innerText = expressionFieldValue;
    historyVal = historyVal.slice(0, -1);
    historyField.innerText = historyVal;
}

function handleKeyDown(e) {
    if (e.key >= '0' && e.key <= '9' || e.key === '.') {
        updateExpression(e.key);
    } else if (['+', '-', '*', '/'].includes(e.key)) {
        updateExpression(e.key);
    } else if (e.key === 'Enter' || e.key === '=') {
        evaluateExpression();
    } else if (e.key === 'Backspace') {
        handleBackspace();
    } else if (e.key === 'Escape') {
        clearExpression();
    } else if (e.key === 'Delete') {
        clearAllData();
    }
}

// Event Listeners
allBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => updateExpression(e.target.innerText));
});

equalsTo.addEventListener('click', evaluateExpression);
clear.addEventListener('click', clearExpression);
clearAll.addEventListener('click', clearAllData);
backspace.addEventListener('click', handleBackspace);
document.addEventListener('keydown', handleKeyDown);
