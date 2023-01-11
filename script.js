function add (){
    let total = 0;
    for (let i = 0; i < arguments.length; i++){
        total += Math.round(arguments[i] *100) / 100;
    }
    console.log(total);
    return total;
}

function sub (a, b) {
    let total = Math.round((a-b)*100)/100;
    console.log(total);
    return total;
}

function mult(a, b) {
    let total = Math.round((a*b)*100)/100;
    console.log(total);
    return total;
}

function div(a, b) {
    let total = Math.round((a/b)*100)/100;
    console.log(total);
    return total;
}

function calculate(operator, num1, num2){
    if(operator === '+'){
        return add(num1, num2);
    }else if (operator === '-'){
        return sub(num1, num2);
    }else if (operator === '*'){
        return mult(num1, num2);
    }else if (operator === '/'){
        return div(num1, num2);
    }
}

const wrapper = document.querySelector('.wrapper')
const display = document.querySelector('.display')
const buttons = document.querySelectorAll('button');
const allButtonsArray = Array.from(buttons);
const buttonsToDisplay = [...allButtonsArray.slice(0, 12), ...allButtonsArray.slice(13, 15)];
const numberButtons = [...allButtonsArray.slice(0, 9), ...allButtonsArray.slice(10, 11)];
const symbolButtons = [...buttonsToDisplay.slice(9,10), ...buttonsToDisplay.slice(11,)];
let displayValue = 0;
let operator = '';


function setDisplay(e){
    if(buttonsToDisplay.includes(e.target)){
        display.textContent = null;
        display.textContent = e.target.textContent;          
    } else {
        display.textContent = null;
    }
    if (numberButtons.includes(e.target)){
        displayValue = e.target.textContent;
        displayValue = parseFloat(displayValue)
    }
}

function updateDisplay(e){
    display.textContent += e.target.textContent;
    if (numberButtons.includes(e.target)){
        displayValue += e.target.textContent;
        displayValue = parseFloat(displayValue)
    }

}


numberButtons.forEach(button => {
    button.addEventListener('click', updateDisplay)
})

wrapper.addEventListener('click', setDisplay, {once: true});

function updateWithSymbol(e){
    display.textContent += e.target.textContent;
}
symbolButtons.forEach(button => {
    button.addEventListener('click', updateWithSymbol)
})

function grabFirst(e){
    operator = e.target.textContent;
    num1 = displayValue;
    console.log(num1);
    console.log(operator);
}
symbolButtons.forEach(button => {
    button.addEventListener('click', grabFirst)
})









