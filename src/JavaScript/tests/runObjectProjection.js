const objectProjection = require('../objectProjection');

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function parseJSON(input) {
  try {
    const trimmedInput = input.trim();
    return JSON.parse(trimmedInput);
  } catch (error) {
    console.error('Invalid JSON input:', error.message);

    return null;
  }
}

rl.question('Enter the source object JSON:', (srcInput) => {
  const src = parseJSON(srcInput);

  if (!src) {
    rl.close();

    return;
  }

  rl.question('Enter the prototype object JSON:', (protoInput) => {
    const proto = parseJSON(protoInput);

    if (!proto) {
      rl.close();

      return;
    }

    const result = objectProjection(src, proto);
    console.log('Projected object:', JSON.stringify(result, null, 2));
    rl.close();
  });
});
