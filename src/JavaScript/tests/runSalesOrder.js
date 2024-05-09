const orderByTotal = require('../salesOrder');

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('Enter sales data as a JSON array (e.g., [{"amount": 10000, "quantity": 2}, {"amount": 5000, "quantity": 10}]):');

rl.on('line', (input) => {
  try {
    const sales = JSON.parse(input);
    const orderedSales = orderByTotal(sales);
    console.log('Ordered Sales:', orderedSales);
    rl.close();
  } catch (e) {
    console.error('Invalid JSON input. Please ensure your input is a valid JSON array.', e.message);
    rl.close();
  }
});
