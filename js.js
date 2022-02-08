const prompt = require('prompt-sync')({sigint: true});

const numberToGuess = Math.floor(Math.random()*10);

let foundCorrectNumber = false;

while(!foundCorrectNumber){
  let guess = prompt('Guess number ');
  guess = Number(guess);

  if(guess === numberToGuess){
      foundCorrectNumber = true;
      console.log('congratulations, you win')
  } else {
      console.log('guess again');
  }
}

