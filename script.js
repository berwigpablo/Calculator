let numbers = [...document.getElementsByClassName('number')];
let operators = [...document.getElementsByClassName('operator')];
let clear = document.getElementById('clear');
let dlt = document.getElementById('delete');
let smallDisplay = document.querySelector('p');
let displayFirst = document.getElementById('displayFirst');
let displayOperator = document.getElementById('displayOperator');
let displaySecond = document.getElementById('displaySecond');

console.log(numbers);
console.log(operators);

clear.addEventListener('click', clearDisplay);
dlt.addEventListener('click', deleteDisplay);
numbers.forEach(number => number.addEventListener('click', register));
operators.forEach(operator => operator.addEventListener('click', operate));

function register(e){
    if(displayOperator.textContent){
        displaySecond.textContent += e.target.textContent;
    } else{
        displayFirst.textContent += e.target.textContent;
    } 
}

function clearDisplay(){
    if(!displayFirst.textContent && !displaySecond.textContent){
        smallDisplay.textContent = '';
    }

    displayFirst.textContent = '';
    displayOperator.textContent = '';
    displaySecond.textContent = '';
}

function deleteDisplay(){
    if(!displayOperator.textContent){
        let displayDelete = displayFirst.textContent.split('');
        displayDelete.pop();
        displayDelete = displayDelete.join('');

        displayFirst.textContent = displayDelete;

    } else if(displayOperator.textContent && !displaySecond.textContent){
        displayOperator.textContent = '';

    } else{
        let displayDelete = displaySecond.textContent.split('');
        displayDelete.pop();
        displayDelete = displayDelete.join('');

        displaySecond.textContent = displayDelete;
    }   
}

function operate(e){

    if(displayOperator.textContent){
        smallDisplay.textContent = `${displayFirst.textContent} ${displayOperator.textContent} ${displaySecond.textContent}`
        clearDisplay();

    } else{
        displayOperator.textContent = e.target.textContent; 
    }
}


