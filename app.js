let fullOperation = '';
let lastResult = undefined;
let lastOperator = undefined;
let numPadDisabled = false;

let fullOperationDisplay = document.querySelector('.full-operation');
let currentNumberDisplay = document.querySelector('.current-number');
const btns = document.querySelectorAll('.buttons');
const operators = document.querySelectorAll('.operator');

function launchBtnAction(btn) {
  if (checkBtnCanBePressed(btn)) {
    let currentNumber = currentNumberDisplay.textContent;

    switch (btn) {
      case '%':
      case '+':
      case '-':
      case '÷':
      case '×':
        operate(currentNumber, btn);
        updateFullOperationDisplay(currentNumber, btn);
        clearCurrentNumberDisplay();
        numPadDisabled = false;
        break;
      case '=':
        operate(currentNumber, btn);
        updateFullOperationDisplay(currentNumber, btn);
        clearCurrentNumberDisplay();
        updateCurrentNumberDisplay(lastResult);
        clearStoredNumberOperator();
        numPadDisabled = true;
        break;
      case 'AC':
        clear();
        break;
      case '+/-':
        changeSign();
        break;
      case '.':
        updateCurrentNumberDisplay(btn);
        break;
      default:
        updateCurrentNumberDisplay(btn);
        break;
    }
  }
}

function updateFullOperationDisplay(currentNumber, operator) {
  if (currentNumber !== '' && operator !== '') {
    fullOperation += currentNumber + ' ';
    fullOperation += operator + ' ';
  } else {
    fullOperation = '';
  }

  fullOperationDisplay.textContent = fullOperation;
}

function updateCurrentNumberDisplay(num) {
  currentNumberDisplay.textContent += num;
}

function operate(num, operator) {
  if (lastResult === undefined) {
    lastResult = +num;
  } else {
    lastResult = calc(lastOperator, +lastResult, +num);
  }

  lastOperator = operator;
  lastResult = Math.round(lastResult * 100) / 100;
}

function calc(operator, num1, num2) {
  switch (operator) {
    case '%':
      return num1 % num2;
    case '÷':
      return num1 / num2;
    case '×':
      return num1 * num2;
    case '-':
      return num1 - num2;
    case '+':
      return num1 + num2;
  }
}

function checkBtnCanBePressed(btn) {
  if (btn.length > 3) return false; // Prevents user from pressing container instead of buttons

  let currentNumber = currentNumberDisplay.textContent;

  switch (btn) {
    case '%':
    case '+':
    case '-':
    case '÷':
    case '×':
    case '=':
      return !(currentNumber === '');
    case 'AC':
      return true;
    case '+/-':
      return !(currentNumber === '') && !numPadDisabled;
    case '.':
      return !currentNumber.includes('.') && !numPadDisabled;
    default:
      return !numPadDisabled;
  }
}

function clear() {
  numPadDisabled = false;
  clearStoredNumberOperator();
  updateFullOperationDisplay('', '');
  clearCurrentNumberDisplay();
}

function clearStoredNumberOperator() {
  lastResult = undefined;
  lastOperator = undefined;
}

function clearCurrentNumberDisplay() {
  currentNumberDisplay.textContent = '';
}

function changeSign() {
  let currentNumber = currentNumberDisplay.textContent;

  if (currentNumber.includes('-')) {
    currentNumberDisplay.textContent = currentNumber.replace('-', '');
  } else {
    currentNumberDisplay.textContent = '-' + currentNumber;
  }
}

btns.forEach((btn) =>
  btn.addEventListener('click', (e) => launchBtnAction(e.target.textContent))
);
