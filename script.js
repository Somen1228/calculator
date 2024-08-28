const expressionArea = document.querySelector("#expression");
const allBtns = document.querySelectorAll(".buttons");
const ceBtn = document.querySelector(".ce")
const cancelBtn= document.querySelector(".cancel")


//variables
let expressionValue = "";

allBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        console.log(e.target.innerText);
        expressionValue += e.target.innerText;

        expressionArea.innerText = expressionValue;
    })
})

cancelBtn.addEventListener('click', () => {
    expressionValue = "";
})