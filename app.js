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
    default:
      console.log("Unknown Operator");
      break;
  }
}

function updateDisplay(pressedBtn) {
  if (empty) {
    display.textContent = pressedBtn;
    empty = false;
  } else {
    display.textContent += pressedBtn;
  }

  
}

let empty = true;

const display = document.querySelector('.display');
const operators = document.querySelectorAll('.operator');
const numbers = document.querySelectorAll('.number');

numbers.forEach(num => num.addEventListener('click', e => updateDisplay(e.target.textContent)));

operators.forEach(operator => operator.addEventListener('click', e => operate(e.target.textContent, 4, 5)));