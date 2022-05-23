const readline = require('readline');
const fs = require('fs');
const path = require('path');
const { stdin: input, stdout: output } = require('process');

const rl = readline.createInterface({ input, output });

const recursiveQuestion = function () {
  rl.question('Hi my friend, how was your introduction to NODE.js? ', (answer) => {
    console.log('>>>', answer);
    if (answer == 'exit') {
      return rl.close(); 
    }
    fs.appendFile(path.join(__dirname, 'text.txt'), answer, (err) => {
      if (err) {
        console.log(err);
      }
    });
    recursiveQuestion(); 
  });
};

recursiveQuestion();
