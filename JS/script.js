// Light/Dark themes
const toggleElement=document.querySelector('.themes__toggle');

const toggleDarkTheme=()=>{
    toggleElement.classList.toggle('themes__toggle--isActive');
};

const toggleDarkThemeWithEnter=(event)=>{
    if(event.key==='Enter'){
        toggleDarkTheme();
    }   
};
// const toggleDarkThemeWithEnter=(event)=> (event.key==='Enter') && toggleDarkTheme();


toggleElement.addEventListener('click',toggleDarkTheme);
toggleElement.addEventListener('keydown',toggleDarkThemeWithEnter);

// Logic for calculator
let storedNumber='';
let currentNumber='';
let operation='';

const resultElement=document.querySelector('.calc__result');
const keyElements=document.querySelectorAll('[data-type]');

const updateScreen=(value)=>{
    resultElement.innerText= !value ? "0" : value;
};

const numberButtonHandler=(value)=>{
    if(value==='.' && currentNumber.includes('.')) return;
    if(value==='0' && !currentNumber) return;
    currentNumber+=value;
    updateScreen(currentNumber);
};

const resetButtonHandler=()=>{
    currentNumber='';
    storedNumber='';
    operation='';
    updateScreen(currentNumber);
}

const deleteButtonHandler=()=>{
    if(!currentNumber || currentNumber==='0') return;
    if(currentNumber.length===1){
        currentNumber="";
    }else{
        currentNumber=currentNumber.substring(0,currentNumber.length-1);
    }
    updateScreen(currentNumber);
}

const executeOperation=()=>{
    if(currentNumber && storedNumber && operation){
        switch(operation){
            case'+':
                storedNumber=parseFloat(storedNumber)+parseFloat(currentNumber);
                break;
            case'-':
                storedNumber=parseFloat(storedNumber) - parseFloat(currentNumber);
                break;
            case'*':
                storedNumber=parseFloat(storedNumber)*parseFloat(currentNumber);
                break;
            case'/':
                storedNumber=parseFloat(storedNumber)/parseFloat(currentNumber);
                break;
        }
        currentNumber='';
        updateScreen(storedNumber);
    }
}

const operationButtonHandler=(operationValue)=>{
    if(!storedNumber && !currentNumber) return;
    if(currentNumber && !storedNumber){
        storedNumber=currentNumber;
        currentNumber='';
        operation=operationValue;
    }else if(storedNumber){
        operation=operationValue;
        if(currentNumber) executeOperation();
    }
}

const keyElementsHandler=(element)=>{
    element.addEventListener('click',()=>{
        const type=element.dataset.type;
        if(type==='number'){
            numberButtonHandler(element.dataset.value);
        }else if(type==='operation'){
            switch(element.dataset.value){
                case"c":
                    resetButtonHandler();
                    break;
                case"Backspace":
                    deleteButtonHandler();
                    break;
                case "Enter":
                    executeOperation();
                    break;
                    default:
                        operationButtonHandler(element.dataset.value);
            }
        }

    });
};

keyElements.forEach(keyElementsHandler);

// KeyBoard 
const availableNumber=['0','1','2','3','4','5','6','7','8','9','.'];
const availableOperation=['+','-','*','/'];
const availableKey=[...availableNumber, ...availableOperation,'Backspace','Enter','c'];


const keyboardWithoutHover=(key)=>{
    if(availableNumber.includes(key)){
        numberButtonHandler(key);
    }else if(availableOperation.includes(key)){
        operationButtonHandler(key);
    }else if(key==='Backspace'){
        deleteButtonHandler();
    }else if(key==='Enter'){
        executeOperation();
    }else if(key==='c'){
        resetButtonHandler();
    }
};

const keyboardWithHover=(key)=>{
    if(availableKey.includes(key)){
        const elem=document.querySelector(`[data-value="${key}"]`);

        elem.classList.add("hover");
        elem.click();
        setTimeout(() => {
            elem.classList.remove("hover");
        }, 100);
    }
}


window.addEventListener('keydown',(event)=>{
    // keyboardWithoutHover(event.key);
    keyboardWithHover(event.key);
});