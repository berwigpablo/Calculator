let numbers = [...document.getElementsByClassName('number')];
let operators = [...document.getElementsByClassName('operator')];
let clear = document.getElementById('clear');
let dlt = document.getElementById('delete');
let smallDisplay = document.querySelector('p');
let displayFirst = document.getElementById('displayFirst');
let displayOperator = document.getElementById('displayOperator');
let displaySecond = document.getElementById('displaySecond');

clear.addEventListener('click', clearDisplay);
dlt.addEventListener('click', deleteDisplay);
numbers.forEach(number => number.addEventListener('click', register));
operators.forEach(operator => operator.addEventListener('click', operate));
//operators.forEach(operator => operator.addEventListener('click', display));

function register(e){
    if(displayOperator.textContent){
        displaySecond.textContent += e.target.textContent;
    } else{
        displayFirst.textContent += e.target.textContent;
    } 
}

function clearDisplay(e){
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

function display(e){

    if(displayOperator.textContent){
        smallDisplay.textContent = `${displayFirst.textContent} ${displayOperator.textContent} ${displaySecond.textContent}`;
    } else{
        displayOperator.textContent = e.target.textContent; 
    }
}

function operate(e){

    if(!displayOperator.textContent && e.target.textContent !== '=' && displayFirst.textContent){

        displayOperator.textContent = e.target.textContent;

    } else if(displayOperator.textContent === '+'){
    
        smallDisplay.textContent = `${displayFirst.textContent} ${displayOperator.textContent} ${displaySecond.textContent}`;
        displayFirst.textContent = Number(displayFirst.textContent) + Number(displaySecond.textContent);
        displayOperator.textContent = '';
        displaySecond.textContent = '';

    } else if(displayOperator.textContent === '-'){

        smallDisplay.textContent = `${displayFirst.textContent} ${displayOperator.textContent} ${displaySecond.textContent}`;
        displayFirst.textContent = Number(displayFirst.textContent) - Number(displaySecond.textContent);
        displayOperator.textContent = '';
        displaySecond.textContent = '';

    } else if(displayOperator.textContent === '÷'){

        if(displaySecond.textContent === '0'){
            displayFirst.textContent = 'nope';
            displaySecond.textContent = '';
            displayOperator.textContent = '';

            setTimeout(clearDisplay, 200);
        }else if(displaySecond.textContent === ''){
            smallDisplay.textContent = `${displayFirst.textContent} ${displayOperator.textContent}`;
            displayFirst.textContent = Number(displayFirst.textContent) / 1;
            displayOperator.textContent = '';
            displaySecond.textContent = '';

        }else{
            smallDisplay.textContent = `${displayFirst.textContent} ${displayOperator.textContent} ${displaySecond.textContent}`;
            displayFirst.textContent = Number(displayFirst.textContent) / Number(displaySecond.textContent);
            displayOperator.textContent = '';
            displaySecond.textContent = '';
        }

    } else if(displayOperator.textContent === '×'){

        smallDisplay.textContent = `${displayFirst.textContent} ${displayOperator.textContent} ${displaySecond.textContent}`;
        displayFirst.textContent = Number(displayFirst.textContent) * Number(displaySecond.textContent);
        displayOperator.textContent = '';
        displaySecond.textContent = '';

    }

    if(e.target.textContent !== '='){
        displayOperator.textContent = e.target.textContent;
    }

    if(displayFirst.textContent.split('').includes('.') && !displayOperator.textContent){
        decimalCount(displayFirst);
    }
}

function decimalCount(num){
    let decCount = num.textContent.split('.');

    if(decCount[1].length > 4){
        displayFirst.textContent = Number(displayFirst.textContent).toFixed(4);
    }
}