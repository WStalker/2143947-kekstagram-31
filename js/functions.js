// Проверка длины строки

const validateLength = (string, maxLength) => {
  return string.length <= maxLength;
};

console.log('Проверка длины строки');
console.log(`Ожидаемый результат 'true':`, validateLength('проверяемая строка', 30));
console.log(`Ожидаемый результат 'false':`, validateLength('проверяемая строка', 10));

// Проверка является ли строка палиндромом

const checkPalindrome = (string) => {
  let normalizedString = string.replaceAll(' ', '');
  normalizedString = normalizedString.toUpperCase();

  let controlString = '';

  for (let i = normalizedString.length - 1; i >= 0; i--) {
    controlString += normalizedString[i];
  }

  return controlString === normalizedString;
};

console.log('\n' + 'Проверка является ли строка палиндромом');
console.log(`Ожидаемый результат 'true':`, checkPalindrome('Лёша на полке клопа нашёл'));
console.log(`Ожидаемый результат 'false':`, checkPalindrome('Лёша на полке клопа не нашёл'));

// Извлечение цифр из строки

const extractNumbers = (string) => {
  string = string.toString();

  let normalizedString = string.replaceAll(' ', '');
  let number = '';

  for (let i = 0; i < normalizedString.length; i++) {
    if (!isNaN(normalizedString[i])) {
      number += parseInt(normalizedString[i], 10);
    }
  }

  return parseInt(number, 10);
};

console.log('\n' + 'Извлечение цифр из строки');
console.log(`Ожидаемый результат 2023:`, extractNumbers('2023 год'));
console.log(`Ожидаемый результат 2022:`, extractNumbers('ECMAScript 2022'));
console.log(`Ожидаемый результат 105:`, extractNumbers('1 кефир, 0.5 батона'));
console.log(`Ожидаемый результат 7:`, extractNumbers('агент 007'));
console.log(`Ожидаемый результат NaN:`, extractNumbers('а я томат'));
console.log(`Ожидаемый результат 2023:`, extractNumbers(2023));
console.log(`Ожидаемый результат 1:`, extractNumbers(-1));
console.log(`Ожидаемый результат 15:`, extractNumbers(1.5));
