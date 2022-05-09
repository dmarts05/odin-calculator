let fullOperation = '';
let lastResult = undefined;
let lastOperator = undefined;

let fullOperationDisplay = document.querySelector('.full-operation');
let currentDisplayNumber = document.querySelector('.current-number');
const btns = document.querySelectorAll('.buttons');

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
  let inputNumber = currentDisplayNumber.textContent;

  switch (btnContent) {
    case '%':
    case '+':
    case '-':
    case '÷':
    case '×':
      fullOperation += inputNumber + ' ';
      fullOperation += btnContent + ' ';
      updateFullOperationDisplay();
      getResult(btnContent, inputNumber);
      clearDisplay();
      break;
    case '=':
      fullOperation += inputNumber + ' ';
      fullOperation += btnContent + ' ';
      updateFullOperationDisplay();
      getResult(btnContent, inputNumber);
      clearDisplay();
      updateCurrentDisplayNumber(lastResult);
      break;
    case 'AC':
      clear();
      break;
    default:
      updateCurrentDisplayNumber(btnContent);
      break;
  }
}

btns.forEach((btn) =>
  btn.addEventListener('click', (e) => startBtnAction(e.target.textContent))
);
