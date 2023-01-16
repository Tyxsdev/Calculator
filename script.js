const wrapper = document.querySelector('.wrapper');
const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');
const allButtonsArray = Array.from(buttons);
const numberButtons = [...allButtonsArray.slice(0, 9), ...allButtonsArray.slice(10, 11)];
const symbolButtons = [...allButtonsArray.slice(9,10), ...allButtonsArray.slice(13, 16)];
const equal = document.querySelector('.equalButton');
const clear = document.querySelector('.clearButton');
const dot = document.querySelector('.dotButton');
const deleteButton = document.querySelector('.deleteButton');
let symbolOperator = '';
let firstValue;
let secondValue = 0;
let arrayOfValues = [];
let arrayOfValuesWhitoutSpace = [];
let arrayOfSymbols = [];
let fullArray = [];

// Operation Functions
function add (){
    let total = 0;
    for (let i = 0; i < arguments.length; i++){
        total += Math.round(arguments[i] *100) / 100;
    }
    if (isNaN(total)){
        alert('Error');
        return clearDisplay()
    }else{
        return total;
    }
}

function sub (a, b) {
    let total = Math.round((a-b)*100)/100;    
    if (isNaN(total)){
        alert('Error');
        return clearDisplay()
    }else{
        return total;
    }
}

function mult(a, b) {
    let total = Math.round((a*b)*100)/100;
    if (isNaN(total)){
        alert('Error');
        return clearDisplay()
    }else{
        return total;
    }
}

function div(a, b) {
    let total = Math.round((a/b)*100)/100;
    if (b === 0){
        alert(`Something's wrong i can feel it`)
        return clearDisplay();        
    } else if (isNaN(total)){
        alert('Error');
        clearDisplay()
        return clearDisplay()
    }else {
        return total;
    } 
}

function calculate(operator, num1, num2){
    console.log(`running operator = ${operator}, num1 = ${num1}, num2 = ${num2}`);
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

function operatingWithNegative(){
    firstValue = parseFloat(arrayOfValuesWhitoutSpace[0]) * (-1);
    secondValue = parseFloat(arrayOfValuesWhitoutSpace[1]);
    symbolOperator = arrayOfSymbols[1] || arrayOfSymbols[0];
    firstValue = display.textContent = calculate(symbolOperator, firstValue, secondValue);
}

function operatingWithPositive(){
    firstValue = parseFloat(arrayOfValuesWhitoutSpace[0]);
    secondValue = parseFloat(arrayOfValuesWhitoutSpace[1]);
    symbolOperator = arrayOfSymbols[1] || arrayOfSymbols[0];
    firstValue = display.textContent = calculate(symbolOperator, firstValue, secondValue);
}

// Seting the arrays and values function

function arraysFromDisplay(){
    fullArray = display.textContent.split('');
    arrayOfValues = display.textContent.split(/[^\w.]|_/g);
    arrayOfValuesWhitoutSpace = arrayOfValues.filter(char => {
        if (char === '') return false;
        return true;
    })
    arrayOfSymbols = display.textContent
        .split('')
        .filter(char => char !== '')
        .filter(char => char === '+' || char === '-' || char === '*' || char === '/');
}

// Click Events and functions

function setDisplay(e){
    if(numberButtons.includes(e.target) || e.target.textContent === '-' || e.target.textContent === '.'){
        display.textContent = null;
        display.textContent = e.target.textContent;          
    } else {
        display.textContent = null;
    }    
}

function updateDisplay(e){
    display.textContent += e.target.textContent;
    fullArray = display.textContent;
    if (fullArray[0] === '*' || fullArray [0] === '/' ||  fullArray [0] === '+'){
        display.textContent = e.target.textContent;       
    }else{
        arraysFromDisplay();    
        firstValue = arrayOfValuesWhitoutSpace[0];
    }
    
}

numberButtons.forEach(button => {
    button.addEventListener('click', updateDisplay)
})

wrapper.addEventListener('click', setDisplay, {once: true});

function addDot(e){    
    arraysFromDisplay();
    let isButton = arrayOfValues.filter(function(char){
        if (char.includes('.')) return false;
        return true;
    })
    if(isButton.length){
        display.textContent += e.target.textContent;
    }
    return;
}

dot.addEventListener('click', addDot);


function deleteFromDysplay(e){
    display.textContent = display.textContent.slice(0, -1);
    arraysFromDisplay();
    firstValue = arrayOfValuesWhitoutSpace[0];
}

deleteButton.addEventListener('click', deleteFromDysplay);

function updateWithSymbol(e){
    let buttonClick = `${e.target.textContent}`;
    display.textContent += e.target.textContent;
    arraysFromDisplay ();          
    if (arrayOfSymbols.length > 1 && fullArray[0] != '-' && arrayOfValuesWhitoutSpace.length > 1){
            operatingWithPositive();
        } else if (arrayOfSymbols.length > 1 && fullArray[0] === '-' && arrayOfValuesWhitoutSpace.length > 1){
            operatingWithNegative();
            display.textContent += `${buttonClick}`;
        }                
}    


symbolButtons.forEach(button => {
    button.addEventListener('click', updateWithSymbol);
})

function grabSecond(e){  
    arraysFromDisplay ();      
    if (arrayOfValues.length > 1 && fullArray[0] != '-'){
        operatingWithPositive();
    }else if(fullArray[0] === '-'){
        operatingWithNegative();
    } 
    else clearDisplay();    
} 

equal.addEventListener('click', grabSecond);

function clearDisplay(e){
    display.textContent = '';
    firstValue = undefined;
}

clear.addEventListener('click', clearDisplay);


// Keyboard events and functions
function keyboardNextPress(e){
    let buttonClick = `${e.key}`;
    if (e.key === '0' || e.key === '1' || e.key === '2' || e.key === '3' || e.key === '4' || e.key === '5' ||
    e.key === '6' || e.key === '7' || e.key === '8' || e.key === '9' || e.key === '+' || e.key === '-' ||
    e.key === '/' || e.key === '*' || e.key === '.'){
        if (display.textContent.includes('Calculate')){
            display.textContent = e.key;
        }
        else {
            display.textContent += e.key;
            fullArray = display.textContent;
            if (fullArray[0] === '*' || fullArray [0] === '/' ||  fullArray [0] === '+'){
                arraysFromDisplay ();
            }else{
                arraysFromDisplay ();   
                firstValue = arrayOfValuesWhitoutSpace[0];
            }
        }
        if (arrayOfSymbols.length > 1 && fullArray[0] != '-' && arrayOfValuesWhitoutSpace.length > 1 && 
        (e.key === '/' || e.key === '-' || e.key === '+' || e.key === '*' )){
            operatingWithPositive();
        } else if (arrayOfSymbols.length > 1 && fullArray[0] === '-' && arrayOfValuesWhitoutSpace.length > 1
        && (e.key === '/' || e.key === '-' || e.key === '+' || e.key === '*' )){
            operatingWithNegative();
            display.textContent += `${buttonClick}`;
        } 
    } 
    return;
}
    
window.addEventListener('keydown', keyboardNextPress);

function deleteKey(e){
    if (display.textContent === 'Calculate'){
        return
    }    
    if (e.key === 'Backspace'){
        display.textContent = display.textContent.slice(0, -1);
        arraysFromDisplay ();
        firstValue = arrayOfValuesWhitoutSpace[0];
    }
}
window.addEventListener('keydown', deleteKey);

function equalKey(e){
    if (display.textContent === 'Calculate'){
        return
    } 
    if (e.key === '='){
        arraysFromDisplay ();    
        if (arrayOfValues.length > 1 && fullArray[0] != '-'){
            operatingWithPositive();
        }else if(fullArray[0] === '-'){
            operatingWithNegative();
        } else clearDisplay();    
    } 
}   

window.addEventListener('keydown', equalKey);


