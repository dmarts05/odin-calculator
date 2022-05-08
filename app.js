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

const operators = document.querySelectorAll('.operator');

operators.forEach(operator => operator.addEventListener('click', e => operate(e.target.textContent, 4, 5)));