const historyField = document.querySelector("#eval-history"); 
const display = document.getElementById('display');
const expressionField = document.getElementById("expression");
const actionBtns = document.querySelectorAll(".action-btn");
const allBtns = document.querySelectorAll(".buttons");
const equalsTo = document.querySelector(".equals");
const backspace = document.querySelector(".backspace");
const clear = document.querySelector(".clear");
const clearAll = document.querySelector(".clear-all");

//Variables
let answer = 0;
let expressionFieldValue = "";
let historyVal = "";

allBtns.forEach((btn) => {
	btn.addEventListener('click', (e) => {
		expressionFieldValue += e.target.innerText;
        expressionField.innerText = expressionFieldValue;
        historyVal += e.target.innerText;
        historyField.innerText = historyVal;
	})
})

equalsTo.addEventListener('click', () => {
	const val = answer + eval(expressionField.innerText);
    if(val){
        expressionFieldValue = "";
        expressionField.innerText = "0";
        display.innerText = val; 
        answer = Number(val);
    }
})

clear.addEventListener('click', () => {
    expressionFieldValue = "";
    expressionField.innerText = "0";
})

clearAll.addEventListener('click', () => {
    expressionFieldValue = "";
    expressionField.innerText = "0";
    display.innerText = "0";
    answer = 0;
    historyVal = ""
    historyField.innerText = "";
})

backspace.addEventListener('click', () => {
    expressionFieldValue = expressionFieldValue.slice(0, -1);
    expressionField.innerText = expressionFieldValue;
})


// Handle keyboard input
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') {
        // Number keys
        expressionFieldValue += e.key;
        expressionField.innerText = expressionFieldValue;
    } else if (['+', '-', '*', '/'].includes(e.key)) {
        // Operator keys
        expressionFieldValue += e.key;
        expressionField.innerText = expressionFieldValue;
    } else if (e.key === 'Enter' || e.key === '=') {
        // Enter key or '=' key for equals
        equalsTo.click();
    } else if (e.key === 'Backspace') {
        // Backspace key
        backspace.click();
    } else if (e.key === 'Escape') {
        // Escape key for clear
        clear.click();
    } else if (e.key === 'c') {
        // 'c' key for clear all
        clearAll.click();
    } else if (e.key === '.') {
        // Decimal point
        expressionFieldValue += e.key;
        expressionField.innerText = expressionFieldValue;
    }
});