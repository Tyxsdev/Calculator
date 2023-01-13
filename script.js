function add (){
    let total = 0;
    for (let i = 0; i < arguments.length; i++){
        total += Math.round(arguments[i] *100) / 100;
    }
    console.log(`the total is ${total}`);
    return total;
}

function sub (a, b) {
    let total = Math.round((a-b)*100)/100;
    console.log(`the total is ${total}`);
    return total;
}

function mult(a, b) {
    let total = Math.round((a*b)*100)/100;
    console.log(`the total is ${total}`);
    return total;
}

function div(a, b) {
    let total = Math.round((a/b)*100)/100;
    if (total === Infinity){
        return `Error`;        
    } else{
        return total;
    }
    
    
    
}

function calculate(operator, num1, num2){
    console.log(`running calculate with symbol=${operator}, num1=${num1}, num2=${num2}`);
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
const equal = document.querySelector('.first button')
const clear = document.querySelector('.container-three button')
let displayValue = 0;
let symbolOperator = '';
let firstValue;
let secondValue = 0;
let arrayOfValues = [];
let arrayOfValuesWhitoutSpace = [];
let arrayOfSymbols = [];



function setDisplay(e){
    if(buttonsToDisplay.includes(e.target)){
        display.textContent = null;
        display.textContent = e.target.textContent;          
    } else {
        display.textContent = null;
    }
}

function updateDisplay(e){
    if (display.textContent.includes('Error')){
        clearDisplay();
    }
    display.textContent += e.target.textContent;
}


numberButtons.forEach(button => {
    button.addEventListener('click', updateDisplay)
})

wrapper.addEventListener('click', setDisplay, {once: true});

function updateWithSymbol(e){
    let buttonClick = `${e.target.textContent}`;
    display.textContent += e.target.textContent;
    arrayOfValues = display.textContent.split(/[^\w.]|_/g);
    arrayOfValuesWhitoutSpace = arrayOfValues.filter(char => {
        if (char === '') return false;
        return true;
    })
    arrayOfSymbols = display.textContent
        .split('')
        .filter(char => char !== '')
        .filter(char => char === '+' || char === '-' || char === '*' || char === '/');
    console.log(arrayOfValuesWhitoutSpace);
    if (arrayOfValuesWhitoutSpace.length){
        for (let i = 0; i < arrayOfValuesWhitoutSpace.length -1; i++){
            console.log(arrayOfValuesWhitoutSpace.length);
            if (firstValue === undefined){
                firstValue = arrayOfValuesWhitoutSpace[i];
            } else if (firstValue < 0){
                let symbolsNegative = [...arrayOfSymbols.slice(1,)];
                console.log(`symbolsNegative ${symbolsNegative}`);
                secondValue = parseFloat(arrayOfValuesWhitoutSpace[i+1]);                
                symbolOperator = symbolsNegative[symbolsNegative.length - 1];
                console.log(`negative operator = ${symbolOperator}`);
                firstValue = display.textContent = calculate(symbolOperator, firstValue, secondValue);
                display.textContent += `${buttonClick}`;    
            } else{
                secondValue = parseFloat(arrayOfValuesWhitoutSpace[i+1]);
                console.log(`firstValue = ${firstValue}`);
                console.log(`secondValue = ${secondValue}`);
                symbolOperator = arrayOfSymbols[i]
                console.log(`symbol = ${symbolOperator}`);
                firstValue = display.textContent = calculate(symbolOperator, firstValue, secondValue);
                display.textContent += `${buttonClick}`;         
            }
        }
    }
}

symbolButtons.forEach(button => {
    button.addEventListener('click', updateWithSymbol);
})

function grabFirst(e){
    displayValue = parseFloat(display.textContent.slice(0, -1));
    displayValue = 0;
}

symbolButtons.forEach(button => {
    button.addEventListener('click', grabFirst)
})


function grabSecond(e){  
    arrayOfValues = display.textContent.split(/[^\w.]|_/g);
    arrayOfValuesWhitoutSpace = arrayOfValues.filter(char => {
        if (char === '') return false;
        return true;
    })
    arrayOfSymbols = display.textContent
        .split('')
        .filter(char => char !== '')
        .filter(char => char === '+' || char === '-' || char === '*' || char === '/');
    console.log(arrayOfValues);
    if (arrayOfValues.length > 1 && firstValue === undefined){
        firstValue = parseFloat(arrayOfValuesWhitoutSpace[0]);
        secondValue = parseFloat(arrayOfValuesWhitoutSpace[1]);
        symbolOperator = arrayOfSymbols[1] || arrayOfSymbols[0];
        firstValue = display.textContent = calculate(symbolOperator, firstValue, secondValue);
    }else if(arrayOfValues.length > 1){
        secondValue = parseFloat(arrayOfValuesWhitoutSpace[1]);
        symbolOperator = arrayOfSymbols[1] || arrayOfSymbols[0];
        firstValue = display.textContent = calculate(symbolOperator, firstValue, secondValue);
    }
    else clearDisplay();    
} 

equal.addEventListener('click', grabSecond);

function clearDisplay(e){
    console.log('clearing display');
    display.textContent = ''
    console.log('-----------');
    firstValue = undefined;
}

clear.addEventListener('click', clearDisplay);