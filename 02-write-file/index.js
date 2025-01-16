const fs = require('fs');
const readline = require('readline');
const path = require('path');
const filePath = path.join(__dirname, 'text.txt');
const output = fs.createWriteStream(filePath, { flags: 'a'});
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
console.log(
  'Enter text to write to file. To exit, press Ctrl+C or type "exit".'
);
rl.on('line', (input) => {
  if (input.trim() === 'exit') {
    rl.close();
  } else {
    output.write(input + '\n');
  }
});
rl.on('close', () => {
  console.log('Thank you. Good bye!');
  process.exit(0);
});
process.on('SIGINT', () => {
  rl.close();
});
