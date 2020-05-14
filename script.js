let displayContent = ""

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
    return operator(a,b)
}

function createButtons () {
    const btnClasses = ["clear", "parentheses", "percentage", "divide",
         "seven", "eight", "nine", "multiply",
         "four", "five", "six", "subtract",
         "one", "two", "three", "add",
         "zero", "decimal", "equal"]
    const btnValues = ["C", "( )", "%", "÷",
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

    if (btnValues[i] === "C"){

    }else if (btnValues[i] === "%"){

    }else if(btnValues[i] === "="){
        

    }else{
        displayContent += btnSelection;
        document.querySelector('#display').setAttribute('value', displayContent);
    }  
}






createButtons()
