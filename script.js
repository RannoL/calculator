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
    //Rounding for decimal calculations
    let answer = Math.round((operator(a,b))*10000)/10000;
    displayContent = answer
    display.setAttribute('value', answer);
    return answer;
    
}

function clearDisplay() {
    displayContent = "";
    historyContent = "";
    display.setAttribute('value', displayContent);
    historyDisplay.setAttribute('value', historyContent);

}

function doOneOperation (arr, operation) {
    //["2", "+", "3"]
    let a = parseFloat(arr[0]);
    let b = parseFloat(arr[arr.length-1]);
    console.log({a,b,arr})
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
            if (arr.includes("+")) {
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
    if ( value >= 0 || value === "."){
    displayContent += btnSelection;
    display.setAttribute('value', displayContent);
    }
    else if (value === "C"){
        clearDisplay();
    }
    else if (value === "%"){

    }
    else if(value === "="){
        //Make str (display content) into an array and seperate numbers and operators
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


createButtons();