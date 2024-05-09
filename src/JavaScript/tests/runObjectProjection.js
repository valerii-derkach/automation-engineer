const objectProjection = require('../objectProjection');

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function parseJSON(input) {
  try {
    return JSON.parse(input);
  } catch (e) {
    console.error('Invalid JSON input:', e.message);
    return null;
  }
}

console.log('Enter the source object JSON:');
rl.question('', (srcInput) => {
  const src = parseJSON(srcInput);

  if (!src) {
    rl.close();
    return;
  }

  console.log('Enter the prototype object JSON:');
  rl.question('', (protoInput) => {
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
