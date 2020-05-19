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
    //Error catches
    if (isNaN(a) || isNaN(b)){
        displayContent = "Error";
        historyContent = "";
        display.setAttribute('value', displayContent);
        historyDisplay.setAttribute('value', historyContent);
        return
    }else if (b === 0 && operator === divide) {
        displayContent = "Cannot divide by zero";
        historyContent = "";
        display.setAttribute('value', displayContent);
        historyDisplay.setAttribute('value', historyContent);
        return
    }
    //Rounding for decimal calculations
    let answer = Math.round((operator(a,b))*10000)/10000;
    displayContent = answer
    display.setAttribute('value', answer);
    return answer;
    
}

function clearEverything(){
    displayContent = "";
    historyContent = "";
    display.setAttribute('value', displayContent);
    historyDisplay.setAttribute('value', historyContent);
    document.querySelector('.decimal').disabled = false;
}

function erase(){
    if (displayContent.length > 1) {
        let contentArr = displayContent.split("");
        lastInput = contentArr[contentArr.length - 1];
        if (lastInput === " ") {
            contentArr.pop();
            contentArr.pop();
            contentArr.pop();
            displayContent = contentArr.join("");
            display.setAttribute('value', displayContent)
    
        }
        else {
            let a = contentArr.pop();
            if (a === ".") {
                document.querySelector('.decimal').disabled = false;
            }
            displayContent = contentArr.join("");
            display.setAttribute('value', displayContent)
        }
    }
    else {
        displayContent = "";
        display.setAttribute('value', displayContent)

    }
}

function doOneOperation (arr, operation) {
    //["2", "+", "3"]
    let a = parseFloat(arr[0]);
    let b = parseFloat(arr[arr.length-1]);
    operate(operation, a, b)
}


function doSequenceOperation (arr){
//Do × and ÷ firts, replace their values in the array and then add and subtract
//Final result will be the only element in the array.
    while (arr.length > 1){
        let test = arr.some(el => el === "×" || el === "÷");
        let test2 = arr.some(el => el === "+" || el === "-");

        //Multiply or divide
        while (test) {
            if (arr.includes("×")) {
                let a = parseFloat(arr[arr.indexOf("×") - 1]);
                let b = parseFloat(arr[arr.indexOf("×") + 1]);
                let result = operate(multiply, a, b);

                //Replace the operators with the result
                arr.splice((arr.indexOf("×") - 1),3, result);
                test = arr.some(el => el === "×" || el === "÷");
            }
            else {
                let a = parseFloat(arr[arr.indexOf("÷") - 1]);
                let b = parseFloat(arr[arr.indexOf("÷") + 1]);
                let result = operate(divide, a, b);

                arr.splice((arr.indexOf("÷")-1),3, result);
                test = arr.some(el => el === "×" || el === "÷");
            }
        }

        //Add or subtract
        while (test2) {
            //Determine if add or subtract should be done first; [12-18+1.2]
            //Returns -1 if the item is not found.
            let addIndex = arr.indexOf("+"); // = 3
            let subtractIndex = arr.indexOf("-"); // = 1, this is done first

            if (addIndex < subtractIndex  && addIndex !== -1|| subtractIndex === -1){
                let a = parseFloat(arr[arr.indexOf("+") - 1]);
                let b = parseFloat(arr[arr.indexOf("+") + 1]);
                let result = operate(add, a, b);

                arr.splice((arr.indexOf("+") - 1),3, result);
                test2 = arr.some(el => el === "+" || el === "-");
            }
            else {
                let a = parseFloat(arr[arr.indexOf("-") - 1]);
                let b = parseFloat(arr[arr.indexOf("-") + 1]);
                let result = operate(subtract, a, b);

                arr.splice((arr.indexOf("-")-1),3, result);
                test2 = arr.some(el => el === "+" || el === "-");
            }
        }

    }
}

function readDisplay (str){
    //numbers and operators are seperated by spaces
    let contentArr = str.split(" ");
    historyContent = str + " = ";
    historyDisplay.setAttribute('value', historyContent)

    //Includes one operation
    if (contentArr.length < 4){
        if (contentArr.includes("×")){
            doOneOperation(contentArr, multiply);
        }
        else if(contentArr.includes("÷")){
            doOneOperation(contentArr, divide);
        }else if(contentArr.includes("+")){
            doOneOperation(contentArr, add);
        }else if(contentArr.includes("-")){
            doOneOperation(contentArr, subtract);
        }
    }
    //Includes multiple operations
    else {
        doSequenceOperation(contentArr);
    }
}

function numpadToDisplay () {
    window.addEventListener('keydown', e => {
        const button = document.querySelector(`button[data-key="${e.keyCode}"]`)
        const value = button.textContent;
        const decimalBtn = document.querySelector('.decimal');
        if (!button || !value) return;

        if ( value >= 0){
            displayContent += value;
            display.setAttribute('value', displayContent);
            }
            else if (value === "CE"){
                clearEverything();
            }
            else if(value === "⌫") {
                erase ();
            }
            else if(value === "="){
                decimalBtn.disabled = false;
                //Make str (display content) into an array and seperate numbers and operators
                readDisplay(displayContent);
            }
            else if (value === "."){
                if (!decimalBtn.disabled){
                    displayContent += value;
                    display.setAttribute('value', displayContent);
                    decimalBtn.disabled = true;
                }
            }
            else {
                //Add spaces to operators
                displayContent += ` ${value} `;
                display.setAttribute('value', displayContent);
                decimalBtn.disabled = false;
            } 
    })
}

function createButtons () {
    const btnClasses = ["clear", "erase", "divide","multiply",
         "seven", "eight", "nine", "subtract",
         "four", "five", "six", "add",
         "one", "two", "three", "equal",
         "zero", "decimal"]
    const btnValues = ["CE","⌫", "÷","×",
        "7", "8", "9","-", 
        "4","5", "6", "+",
        "1", "2", "3", "=",
        "0", "."]
    const keyCodes = ["27", "8", "111", "106", 
            "103", "104", "105", "109",
            "100", "101", "102", "107",
            "97", "98", "99", "13",
            "96", "110"]

    for (let i= 0; i < btnClasses.length; i++){
        const button = document.createElement('BUTTON');
        button.classList.add(btnClasses[i]);
        button.textContent = btnValues[i];
        button.dataset.key = keyCodes[i];
        button.addEventListener('click', e => inputToDisplay(e, btnValues, i)); 
        document.querySelector('#buttons').appendChild(button);
    }       
}

function inputToDisplay (e, btnValues, i){
    let btnSelection = e.target.textContent;
    let value = btnValues[i];
    const decimalBtn = document.querySelector('.decimal');

    //[0-9] is >= 0
    if ( value >= 0){
    displayContent += btnSelection;
    display.setAttribute('value', displayContent);
    }
    else if (value === "CE"){
        clearEverything();
    }
    else if(value === "⌫") {
        erase ();
    }
    else if(value === "="){
        decimalBtn.disabled = false;
        //Make str (display content) into an array and seperate numbers and operators
        readDisplay(displayContent);
    }
    else if (value === "."){
        if (!decimalBtn.disabled){
            displayContent += btnSelection;
            display.setAttribute('value', displayContent);
            decimalBtn.disabled = true;
        }
    }
    else {
        //Add spaces to operators
        displayContent += ` ${btnSelection} `;
        display.setAttribute('value', displayContent);
        decimalBtn.disabled = false;
    } 
}

createButtons();
numpadToDisplay();
