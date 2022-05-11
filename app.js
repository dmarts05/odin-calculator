let fullOperation = '';
let numPadDisabled = false;

const fullOperationDisplay = document.querySelector('.full-operation');
const currentNumberDisplay = document.querySelector('.current-number');
const btns = document.querySelectorAll('.buttons');

function launchBtnAction(btn) {
  if (checkBtnCanBePressed(btn)) {
    const currentNumber = currentNumberDisplay.textContent;

    switch (btn) {
      case '%':
      case '+':
      case '-':
      case '÷':
      case '×':
        updateFullOperationDisplay(currentNumber, btn);
        clearCurrentNumberDisplay();
        numPadDisabled = false;
        break;
      case '=':
        updateFullOperationDisplay(currentNumber, btn);
        const result = operate();
        clearCurrentNumberDisplay();
        updateCurrentNumberDisplay(result);
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

function operate() {
  const operators = ['×', '÷', '%', '-', '+'];
  let equation = fullOperation
    .split(' ')
    .filter((operator) => operator !== '=' && operator !== '');

  for (let i = 0; i < operators.length; i++) {
    for (let j = 0; j < equation.length; j++) {
      if (operators[i] === equation[j]) {
        const result = calc(operators[i], +equation[j - 1], +equation[j + 1]);
        equation[j - 1] = String(result);
        equation.splice(j, j + 1);
      }
    }
  }

  if (fullOperation.includes('=')) fullOperation = '';

  return equation[0];
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

  const currentNumber = currentNumberDisplay.textContent;

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
  updateFullOperationDisplay('', '');
  clearCurrentNumberDisplay();
}

function clearCurrentNumberDisplay() {
  currentNumberDisplay.textContent = '';
}

function changeSign() {
  const currentNumber = currentNumberDisplay.textContent;

  if (currentNumber.includes('-')) {
    currentNumberDisplay.textContent = currentNumber.replace('-', '');
  } else {
    currentNumberDisplay.textContent = '-' + currentNumber;
  }
}

btns.forEach((btn) =>
  btn.addEventListener('click', (e) => launchBtnAction(e.target.textContent))
);
