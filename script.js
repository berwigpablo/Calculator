let numbers = [...document.getElementsByClassName('number')];
let operators = [...document.getElementsByClassName('operator')];
let clear = document.getElementById('clear');
let dlt = document.getElementById('delete');
let smallDisplay = document.querySelector('p');
let displayFirst = document.getElementById('displayFirst');
let displayOperator = document.getElementById('displayOperator');
let displaySecond = document.getElementById('displaySecond');
let keys = document.addEventListener('keydown', filterKeyboard);

clear.addEventListener('click', clearDisplay);
dlt.addEventListener('click', deleteDisplay);
numbers.forEach(number => number.addEventListener('click', register));
operators.forEach(operator => operator.addEventListener('click', operate));

function filterKeyboard(e){

    console.log(e);
    console.log(e.key);

    if(e.key === 'Escape'){
        clearDisplay();
    }
    if(e.key === 'Backspace'){
        deleteDisplay();
    }

    let keyPress = e.key;
    let numArray = [...'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ','];
    let operatorArray = [...'+', '-', '/', '*', 'Enter'];
    
    if(numArray.includes(keyPress)){
        register(e);
    } else if(operatorArray.includes(keyPress)){
        operate(e);
    }
}

function register(e){
    let num = '';

    if(e.key === undefined){
        num = e.target.textContent;
    }else if(e.key === '*'){
        num = '×';
        console.log(num);
    }else if(e.key === '/'){
        num = '÷';
        console.log(num);
    }else if(e.key === 'Enter'){
        num = '=';
    }else if(e.key === ','){
        num = '.';
    }else{
        num = e.key;
    }

    if(displayOperator.textContent){
        if(num === '.' && displaySecond.textContent.split('').includes('.')){
            return
        } else{
            displaySecond.textContent += num;
        }
    } else{
        if(num === '.' && displayFirst.textContent.split('').includes('.')){
            return
        } else{
            displayFirst.textContent += num;
        }
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
    let num = '';

    if(e.key === undefined){
        num = e.target.textContent;
    }else if(e.key === '*'){
        num = '×';
    }else if(e.key === '/'){
        num = '÷';
    }else if(e.key === 'Enter'){
        num = '=';
    }else{
        num = e.key;
    }

    if(!displayOperator.textContent && num !== '=' && displayFirst.textContent){

        displayOperator.textContent = num;

    } else if(displayOperator.textContent === '+'){
    
        smallDisplay.textContent = `${displayFirst.textContent} ${displayOperator.textContent} ${displaySecond.textContent}`;
        displayFirst.textContent = Number(displayFirst.textContent) + Number(displaySecond.textContent);
        displayOperator.textContent = '';
        displaySecond.textContent = '';
        decimalCount(displayFirst);

    } else if(displayOperator.textContent === '-'){

        smallDisplay.textContent = `${displayFirst.textContent} ${displayOperator.textContent} ${displaySecond.textContent}`;
        displayFirst.textContent = Number(displayFirst.textContent) - Number(displaySecond.textContent);
        displayOperator.textContent = '';
        displaySecond.textContent = '';
        decimalCount(displayFirst);

    } else if(displayOperator.textContent === '÷'){

        if(displaySecond.textContent === '0'){
            displayFirst.textContent = 'lmfao';
            displaySecond.textContent = '';
            displayOperator.textContent = '';

            setTimeout(clearDisplay, 200);

        }else if(displaySecond.textContent === ''){
            smallDisplay.textContent = `${displayFirst.textContent} ${displayOperator.textContent}`;
            displayFirst.textContent = Number(displayFirst.textContent) / 1;
            displayOperator.textContent = '';
            displaySecond.textContent = '';
            decimalCount(displayFirst);

        }else{
            smallDisplay.textContent = `${displayFirst.textContent} ${displayOperator.textContent} ${displaySecond.textContent}`;
            displayFirst.textContent = Number(displayFirst.textContent) / Number(displaySecond.textContent);
            displayOperator.textContent = '';
            displaySecond.textContent = '';
            decimalCount(displayFirst);
        }

    } else if(displayOperator.textContent === '×'){

        smallDisplay.textContent = `${displayFirst.textContent} ${displayOperator.textContent} ${displaySecond.textContent}`;
        displayFirst.textContent = Number(displayFirst.textContent) * Number(displaySecond.textContent);
        displayOperator.textContent = '';
        displaySecond.textContent = '';
        decimalCount(displayFirst);
    }

    if(num !== '='){
        displayOperator.textContent = num;
    }

}

function decimalCount(num){
    if(displayFirst.textContent.split('').includes('.')){
        
        let decCount = num.textContent.split('.');

        if(decCount[1].length > 4){
            displayFirst.textContent = Number(displayFirst.textContent).toFixed(4);
        }
    }
}