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

calculate('/', 5, 7);