let displayContent = "";
let historyContent = "";
const display = document.querySelector('#display');
const historyDisplay = document.querySelector('#historyDisplay');

function add (a,b) {
    
    return a+b; 
}

function subtract (a,b) {
    return a-b;
}

function multiply (a,b) {
    return a*b;
}

function divide (a,b) {
    return a/b;
}

function operate (operator, a, b) {
    clearDisplay()
    let answer = operator(a,b);
    display.setAttribute('value', answer);
    
}

function clearDisplay() {
    displayContent = ""
    display.setAttribute('value', displayContent);
}

function readDisplay (str){
    //numbers and operators are seperated by spaces
    const contentArr = str.split(" ");
    if (contentArr.includes("+")){
        let a = parseInt(contentArr[contentArr.indexOf("+") - 1])
        let b = parseInt(contentArr[contentArr.indexOf("+") + 1])
        operate(add, a, b)
    }
    
}

function createButtons () {
    const btnClasses = ["clear", "erase", "percentage", "divide",
         "seven", "eight", "nine", "multiply",
         "four", "five", "six", "subtract",
         "one", "two", "three", "add",
         "zero", "decimal", "equal"]
    const btnValues = ["C", "⌫", "%", "÷",
        "7", "8", "9", "×",
        "4", "5", "6", "-",
        "1", "2", "3", "+",
        "0", ".", "="]

    for (let i= 0; i < btnClasses.length; i++){
        const button = document.createElement('BUTTON');
        button.classList.add(btnClasses[i]);
        button.textContent = btnValues[i];
        button.addEventListener('click', e => inputToDisplay(e, btnValues, i)); 
        document.querySelector('#buttons').appendChild(button);
    }       
}

function inputToDisplay (e, btnValues, i){
    let btnSelection = e.target.textContent;
    let value = btnValues[i];

    //[0-9] is >= 0
    if ( value >= 0){
    displayContent += btnSelection;
    display.setAttribute('value', displayContent);
    }
    else if (value === "C"){
        clearDisplay();
    }
    else if (value === "%"){

    }
    else if(value === "="){
        //function to make str (display content) into an array and seperate numbers and operators
        readDisplay(displayContent);
    }
    else if (value === "⌫"){
        let newContent = displayContent.substring(0, displayContent.length-1);
        displayContent = newContent;
        display.setAttribute('value', displayContent);
    }
    else {
        //Add spaces to operators
        displayContent += ` ${btnSelection} `;
        display.setAttribute('value', displayContent);

    } 
}




createButtons()
/* spread input, kui vajutada equal siis votta elemendid ja arvutada.
 Nt kui leiab + siis uks enne ja parast element omavahel 
 liita ja panna see historisse ning result display peale */