require('../extendDate');

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function parseDate(input) {
  const trimmedInput = input.trim();
  const timestamp = Date.parse(trimmedInput);
  if (isNaN(timestamp)) {

    return null;
  }

  return new Date(timestamp);
}

rl.question('Enter the first date (e.g., 2024-05-10T10:00:05): ', (firstInput) => {
  const date1 = parseDate(firstInput);
  if (!date1) {
    console.log('Invalid first date.');
    rl.close();

    return;
  }

  rl.question('Enter the second date (e.g., 2024-05-12T10:00:05): ', (secondInput) => {
    const date2 = parseDate(secondInput);
    if (!date2) {
      console.log('Invalid second date.');
      rl.close();

      return;
    }

    const result = date1.daysTo(date2);
    if (result.error) {
      console.error('Error:', result.error);
    } else {
      console.log(`Complete days between: ${result}`);
    }

    rl.close();
  });
});
