const Stack = require('./stack');

const parsePostfixNotation = (expression) => {
  const chars = expression.split(' ');
  const stack = new Stack();

  for(let char of chars) {
    if(/\d/.test(char)) {
      stack.push(Number(char));
      continue;
    };
    const secondNumber = stack.pop();
    const firstNumber = stack.pop();
    let operationResult;

    switch(char) {
      case '+': {
        operationResult = firstNumber + secondNumber;
        break;
      }
      case '-': {
        operationResult = firstNumber - secondNumber;
        break;
      }
      case '*': {
        operationResult = firstNumber * secondNumber;
        break;
      }
      case '/': {
        operationResult = firstNumber / secondNumber;
        break;
      }
    }

    stack.push(operationResult);
  }

  return stack.pop();
}

module.exports = parsePostfixNotation;
