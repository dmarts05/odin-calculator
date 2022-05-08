let fullOperation = [];
let indexCurrentOperation = 2;

let fullOperationDisplay = document.querySelector('.full-operation');
let currentDisplayNumber = document.querySelector('.current-number');
const btns = document.querySelectorAll('.buttons');

function updateFullOperationDisplay() {
  fullOperationDisplay.textContent = '';
  fullOperation.forEach(
    (num) => (fullOperationDisplay.textContent += ' ' + num)
  );
}

function updateCurrentDisplayNumber(num) {
  currentDisplayNumber.textContent += num;
}

function getResult(operator, num) {
  let result = num;

  if (indexCurrentOperation + 1 > fullOperation.length) {
    return result;
  } else {
    result = operate(operator, num, fullOperation[indexCurrentOperation]);
    indexCurrentOperation += 2;
  }

  return result;
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
  fullOperation = [];
  indexCurrentOperation = 2;
  currentDisplayNumber.textContent = '';
}

function startBtnAction(btnContent) {
  switch (btnContent) {
    case '%':
    case '+':
    case '-':
    case '÷':
    case '×':
      fullOperation.push(currentDisplayNumber.textContent);
      fullOperation.push(btnContent);
      updateFullOperationDisplay();
      updateCurrentDisplayNumber(getResult(btnContent, currentDisplayNumber.textContent));
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
