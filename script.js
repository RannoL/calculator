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
    return answer;
    
}

function clearDisplay() {
    displayContent = ""
    display.setAttribute('value', displayContent);
}

function doOneOperation (arr, operation) {
    console.log(arr)
    //["2", "+", "3"]
    let a = parseInt(arr[0]);
    let b = parseInt(arr[arr.length-1]);
    operate(operation, a, b)
}

function doSequenceOperation (arr){
    let result = 0;
    while (arr.length > 0){
        return
    }
}


function readDisplay (str){
    //numbers and operators are seperated by spaces
    let contentArr = str.split(" ");

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

    /* while (contentArr.length > 0){
        if (contentArr.includes("×")){
            let aIndex = (contentArr.indexOf("×") - 1);
            let bIndex = (contentArr.indexOf("×") + 1);
            let a = parseInt(contentArr[aIndex]);
            let b = parseInt(contentArr[bIndex]);
            result = operate(multiply, a, b);

            //Remove this operation from array
            contentArr.splice(aIndex,3);
            console.log(result);
            console.log(contentArr);
        }
        else if (contentArr.includes("÷")){
            let a = parseInt(contentArr[contentArr.indexOf("÷") - 1]);
            console.log(`a in / before evaluation: ${a}`);
            if (isNaN(a)){
                a = result;
                console.log(`a=result a: ${a}`);
                let b = parseInt(contentArr[contentArr.indexOf("÷") + 1]);
                result = operate(divide, a, b);
                console.log(`result /: ${result}`);
                contentArr.splice((contentArr.indexOf("÷")),2);
                console.log(contentArr);
            }
            else {
                let b = parseInt(contentArr[contentArr.indexOf("÷") + 1]);
                result = operate(divide, a, b);
                console.log(`result / : ${result}`);
                contentArr.splice((contentArr.indexOf("÷")-1),3);
                console.log(contentArr);
            }

        }
        else if (contentArr.includes("+")){
            let a = parseInt(contentArr[contentArr.indexOf("+") - 1]);
            console.log(`a in + before evaluation: ${a}`);
            if (isNaN(a) && ){
                a = result;
                console.log(`a=result a: ${a}`);
                let b = parseInt(contentArr[contentArr.indexOf("+") + 1]);
                result = operate(add, a, b);
                console.log(`result +: ${result}`);
                contentArr.splice((contentArr.indexOf("+")),2);
                console.log(contentArr);
            }
            else {
                console.log("a != Nan");
                let b = parseInt(contentArr[contentArr.indexOf("+") + 1]);
                //If "+" the last element, b will be Nan; 4+2*3
                if (isNaN(b)){
                    b = result;
                    result = operate(add,a,b);
                    contentArr.splice((contentArr.indexOf("+")-1),2);
                    console.log(`b isNan result +: ${result}`)
                }
                result = operate(add, a, b);
                contentArr.splice((contentArr.indexOf("+")-1),3);
                console.log(contentArr); 
            }

        }
        else if (contentArr.includes("-")){
            let a = parseInt(contentArr[contentArr.indexOf("-") - 1]);
            console.log(`a in - before evaluation: ${a}`);
            if (isNaN(a)){
                a = result;
                let b = parseInt(contentArr[contentArr.indexOf("-") + 1]);
                result = operate(subtract, a, b);
                console.log(`result -: ${result}`);
                contentArr.splice((contentArr.indexOf("-")),2);
                console.log(contentArr);
            }
            else {
                console.log("a != Nan");
                let b = parseInt(contentArr[contentArr.indexOf("-") + 1]);
                
                if (isNaN(b)){
                    b = result;
                    result = operate(subtract,a,b);
                    contentArr.splice((contentArr.indexOf("-")-1),2);
                    console.log(`b isNan result: ${result}`)
                }
                result = operate(subtract, a, b);
                contentArr.splice((contentArr.indexOf("-")-1),3);
                console.log(contentArr); 
            }   
        }
    }   */
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