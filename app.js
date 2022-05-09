let fullOperation = '';
let lastResult = undefined;
let lastOperator = undefined;

let fullOperationDisplay = document.querySelector('.full-operation');
let currentDisplayNumber = document.querySelector('.current-number');
const btns = document.querySelectorAll('.buttons');
const operators = document.querySelectorAll('.operator');

function updateFullOperationDisplay() {
  fullOperationDisplay.textContent = fullOperation;
}

function updateCurrentDisplayNumber(num) {
  currentDisplayNumber.textContent += num;
}

function getResult(operator, num) {
  if (lastResult === undefined) {
    lastResult = +num;
    lastOperator = operator;
  } else {
    lastResult = operate(lastOperator, +lastResult, +num);
    lastOperator = operator;
  }

  lastResult = Math.round(lastResult * 100) / 100;
}

function operate(operator, num1, num2) {
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

function changeSign() {
  let inputNumber = currentDisplayNumber.textContent;

  if (inputNumber.includes('-')) {
    currentDisplayNumber.textContent = inputNumber.replace('-', '');
  } else {
    currentDisplayNumber.textContent = '-' + inputNumber;
  }
}

function clear() {
  lastResult = undefined;
  lastOperator = undefined;
  fullOperation = '';
  updateFullOperationDisplay();
  clearDisplay();
}

function clearDisplay() {
  currentDisplayNumber.textContent = '';
}

function startBtnAction(btnContent) {
  // Dirty Fix :/
  if (btnContent.length > 3) return;

  let inputNumber = currentDisplayNumber.textContent;

  switch (btnContent) {
    case '%':
    case '+':
    case '-':
    case '÷':
    case '×':
      if (!inputNumber == '') {
        fullOperation += inputNumber + ' ';
        fullOperation += btnContent + ' ';
        updateFullOperationDisplay();
        getResult(btnContent, inputNumber);
        clearDisplay();
      }
      break;
    case '=':
      if (!inputNumber == '') {
        fullOperation += inputNumber + ' ';
        fullOperation += btnContent + ' ';
        updateFullOperationDisplay();
        getResult(btnContent, inputNumber);
        clearDisplay();
        updateCurrentDisplayNumber(lastResult);
        lastResult = undefined;
        lastOperator = undefined;
      }
      break;
    case 'AC':
      clear();
      break;
    case '+/-':
      if (!inputNumber == '') changeSign();
      break;
    case '.':
      if (!inputNumber.includes('.')) {
        updateCurrentDisplayNumber(btnContent);
      }
      break;
    default:
      updateCurrentDisplayNumber(btnContent);
      break;
  }
}

btns.forEach((btn) =>
  btn.addEventListener('click', (e) => startBtnAction(e.target.textContent))
);
