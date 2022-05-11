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
      case 'C':
        backspaceCurrentNumber();
        break;
      case '.':
        updateCurrentNumberDisplay(btn);
        break;
      default:
        if (currentNumber.length < 11) updateCurrentNumberDisplay(btn);
        else currentNumberDisplay.classList.add('error');
        setTimeout(() => {
          currentNumberDisplay.classList.remove('error');
        }, 100);
        break;
    }
  }
}

function updateFullOperationDisplay(currentNumber, operator) {
  if (currentNumber !== '' && operator !== '') {
    if (fullOperation.length < 400 || operator === '=') {
      fullOperation += currentNumber + ' ';
      fullOperation += operator + ' ';
    } else {
      fullOperationDisplay.classList.add('error');
      setTimeout(() => {
        fullOperationDisplay.classList.remove('error');
      }, 100);
    }
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
        equation[j - 1] = String(
          calc(operators[i], +equation[j - 1], +equation[j + 1])
        );
        // Remove used operators
        equation.splice(j, 2);
        j = 0;
      }
    }
  }

  const result = Math.round(equation[0] * 100) / 100;
  if (fullOperation.includes('=')) fullOperation = '';

  if (String(result).length < 12) return Math.round(equation[0] * 100) / 100;
  else return Infinity;
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
    case 'C':
      return true;
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

function backspaceCurrentNumber() {
  const currentNumber = currentNumberDisplay.textContent;
  currentNumberDisplay.textContent = currentNumber.slice(
    0,
    currentNumber.length - 1
  );
}

btns.forEach((btn) =>
  btn.addEventListener('click', (e) => launchBtnAction(e.target.textContent))
);

document.addEventListener('keydown', (e) => {
  const numbers = document.querySelectorAll('.number');
  const operators = document.querySelectorAll('.operator');

  const operatorsConversion = {
    '*': '×',
    '/': '÷',
    '%': '%',
    '-': '-',
    '+': '+',
    '=': '=',
  };

  if (e.key === '.' || (!isNaN(e.key) && e.key !== ' ')) {
    numbers.forEach((btn) => {
      if (btn.textContent.includes(e.key)) btn.click();
    });
  } else if (e.key === 'Delete') {
    document.getElementById('clear').click();
  } else if (e.key === 'Backspace') {
    if (!numPadDisabled) backspaceCurrentNumber();
  } else if (e.key === 'Enter') {
    document.getElementById('equals').click();
  } else if (e.key in operatorsConversion) {
    operators.forEach((btn) => {
      if (btn.textContent.includes(operatorsConversion[e.key])) btn.click();
    });
  }
});
