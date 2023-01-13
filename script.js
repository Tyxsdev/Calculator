function add (){
    let total = 0;
    for (let i = 0; i < arguments.length; i++){
        total += Math.round(arguments[i] *100) / 100;
    }
    if (isNaN(total)){
        alert('Error');
        return clearDisplay()
    }else{
        console.log(`the total is ${total}`);
        return total;
    }
}

function sub (a, b) {
    let total = Math.round((a-b)*100)/100;    
    if (isNaN(total)){
        alert('Error');
        return clearDisplay()
    }else{
        console.log(`the total is ${total}`);
        return total;
    }
}

function mult(a, b) {
    let total = Math.round((a*b)*100)/100;
    if (isNaN(total)){
        alert('Error');
        return clearDisplay()
    }else{
        console.log(`the total is ${total}`);
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
        return clearDisplay()
    }else { 
        console.log(`the total is ${total}`);
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



function setDisplay(e){
    if(numberButtons.includes(e.target) || e.target.textContent === '-' || e.target.textContent === '.'){
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
    arrayOfValues = display.textContent.split(/[^\w.]|_/g);
    arrayOfValuesWhitoutSpace = arrayOfValues.filter(char => {
        if (char === '') return false;
        return true;
        })
    console.log(arrayOfValues);
    firstValue = arrayOfValuesWhitoutSpace[0];
}


numberButtons.forEach(button => {
    button.addEventListener('click', updateDisplay)
})

wrapper.addEventListener('click', setDisplay, {once: true});

function addDot(e){
    arrayOfValues = display.textContent.split(/[^\w.]|_/g);
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
    arrayOfValues = display.textContent.split(/[^\w.]|_/g);
    arrayOfValuesWhitoutSpace = arrayOfValues.filter(char => {
        if (char === '') return false;
        return true;
        })
    firstValue = arrayOfValuesWhitoutSpace[0];
    console.log(firstValue);
}

deleteButton.addEventListener('click', deleteFromDysplay);

function updateWithSymbol(e){
    let buttonClick = `${e.target.textContent}`;    
    display.textContent += e.target.textContent;
    fullArray = display.textContent.split('')
    if (fullArray[0] === '*' || fullArray [0] === '/' ||  fullArray [0] === '+'){
        alert(`Please enter a valid number as first value`);
        clearDisplay();
    } else {   
        arrayOfValues = display.textContent.split(/[^\w.]|_/g);
        arrayOfValuesWhitoutSpace = arrayOfValues.filter(char => {
            if (char === '') return false;
            return true;
        })
        arrayOfSymbols = display.textContent
            .split('')
            .filter(char => char !== '')
            .filter(char => char === '+' || char === '-' || char === '*' || char === '/');  
        let symbolsNegative = [...arrayOfSymbols.slice(1,)];               
        if (arrayOfValuesWhitoutSpace.length > 1){
            for (let i = 0; i < arrayOfValuesWhitoutSpace.length -1; i++){                
                if (firstValue === undefined){
                    firstValue = arrayOfValuesWhitoutSpace[i];
                } else if (firstValue < 0 && arrayOfSymbols.length > 2){
                    secondValue = parseFloat(arrayOfValuesWhitoutSpace[i+1]);                
                    symbolOperator = symbolsNegative[0];
                    firstValue = display.textContent = calculate(symbolOperator, firstValue, secondValue);
                    display.textContent += `${buttonClick}`;
                    console.log('a');    
                } else if (fullArray[0] ===  '-' && arrayOfSymbols.length > 2){
                    firstValue = firstValue * (-1)
                    secondValue = parseFloat(arrayOfValuesWhitoutSpace[i+1]);                
                    symbolOperator = symbolsNegative[0];
                    firstValue = display.textContent = calculate(symbolOperator, firstValue, secondValue);
                    display.textContent += `${buttonClick}`;
                    console.log('b');
                } else if (arrayOfValuesWhitoutSpace.length > 1 && symbolsNegative.length > 1){
                    secondValue = parseFloat(arrayOfValuesWhitoutSpace[i+1]);
                    symbolOperator = arrayOfSymbols[i];
                    firstValue = display.textContent = calculate(symbolOperator, firstValue, secondValue);
                    display.textContent += `${buttonClick}`;   
                    console.log('c');      
                }
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
    
    if (arrayOfValuesWhitoutSpace.length > 2 && fullArray[0] != '-'){
        firstValue = parseFloat(arrayOfValuesWhitoutSpace[0]);
        secondValue = parseFloat(arrayOfValuesWhitoutSpace[1]);
        symbolOperator = arrayOfSymbols[0];
        firstValue = calculate(symbolOperator, firstValue, secondValue);
        secondValue = parseFloat(arrayOfValuesWhitoutSpace[2]);
        symbolOperator = arrayOfSymbols[1];
        firstValue = display.textContent = calculate(symbolOperator, firstValue, secondValue);        
    }else if(arrayOfValuesWhitoutSpace.length > 2 && fullArray[0] === '-'){
        firstValue = (parseFloat(arrayOfValuesWhitoutSpace[0])) * (-1);
        secondValue = parseFloat(arrayOfValuesWhitoutSpace[1]);
        symbolOperator = arrayOfSymbols[0];
        firstValue = calculate(symbolOperator, firstValue, secondValue);
        secondValue = parseFloat(arrayOfValuesWhitoutSpace[2]);
        symbolOperator = arrayOfSymbols[1];
        firstValue = display.textContent = calculate(symbolOperator, firstValue, secondValue);
    }else if (arrayOfValues.length > 1 && fullArray[0] != '-'){
        firstValue = parseFloat(arrayOfValuesWhitoutSpace[0]);
        secondValue = parseFloat(arrayOfValuesWhitoutSpace[1]);
        symbolOperator = arrayOfSymbols[1] || arrayOfSymbols[0];
        firstValue = display.textContent = calculate(symbolOperator, firstValue, secondValue);
        console.log('d');
    }else if(fullArray[0] === '-'){
        firstValue = (parseFloat(arrayOfValuesWhitoutSpace[0])) * (-1);
        secondValue = parseFloat(arrayOfValuesWhitoutSpace[1]);
        symbolOperator = arrayOfSymbols[1] || arrayOfSymbols[0];
        firstValue = display.textContent = calculate(symbolOperator, firstValue, secondValue);
        console.log('e');
    } 
    else clearDisplay();    
} 

equal.addEventListener('click', grabSecond);

function clearDisplay(e){
    display.textContent = '';
    firstValue = undefined;
}

clear.addEventListener('click', clearDisplay); 