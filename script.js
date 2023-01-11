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

/* const one = document.querySelector('.file-three :nth-child(1)');
const two = document.querySelector('.file-three :nth-child(2)');
const three = document.querySelector('.file-three :nth-child(3)');
const four = document.querySelector('.file-two :nth-child(1)');
const five = document.querySelector('.file-two :nth-child(2)');
const six = document.querySelector('.file-two :nth-child(3)');
const seven = document.querySelector('.file-one :nth-child(1)');
const eigth = document.querySelector('.file-one :nth-child(2)');
const nine = document.querySelector('.file-one :nth-child(3)');
const divideSymbol = document.querySelector('.file-four :nth-child(1)');
const zero = document.querySelector('.file-four :nth-child(2)');
const multSymbol = document.querySelector('.file-four :nth-child(3)');
const equalSymbol = document.querySelector('.first button');
const addSymbol = document.querySelector('.second button'); 
const subSymbol = document.querySelector('.third button');   */
const wrapper = document.querySelector('.wrapper')
const display = document.querySelector('.display')
const buttons = document.querySelectorAll('button');
const allButtonsArray = Array.from(buttons);
const buttonsToDisplay = [...allButtonsArray.slice(0, 12), ...allButtonsArray.slice(13, 15)];
const numberButtons = [...allButtonsArray.slice(0, 9), ...allButtonsArray.slice(10, 11)];
const symbolButtons = [...buttonsToDisplay.slice(9,10), ...buttonsToDisplay.slice(11,)];
let displayValue = display.textContent;


function setDisplay(e){
    if(buttonsToDisplay.includes(e.target)){
        display.textContent = null;
        display.textContent += e.target.textContent;
        displayValue = display.textContent;
    } else {
        display.textContent = null;
        displayValue = display.textContent;
    }
    
}

function updateDisplay(e){
    display.textContent += e.target.textContent;
    displayValue = display.textContent;
}


buttonsToDisplay.forEach(button => {
    button.addEventListener('click', updateDisplay)
})

wrapper.addEventListener('click', setDisplay, {once: true});

console.log(displayValue);








