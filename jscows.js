// function generateNumbers(){
//     let computerNumbers = 
//     for (let i = 0; i < 5; i += 1){

//     }
// }

//0.5 How many numbers are we guessing = tNumber
//1. Computer generates X numbers
//2. Computer starts guessing X numbers



const humanNumber = [1, 2, 3, 4];
const playNumber = 4;
const maxNumber = 9;
const guessCount = 0;
const potentialNumbers = [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0]];
const correctNumbers = [];

function resultFromComputerGuess(computerGuess, playNumber, humanNumber) {
  var bulls = 0;
  var cows = 0;
  for (let i = 0; i < playNumber; i += 1) {
    if (computerGuess[i] == humanNumber[i]) {
      bulls += 1;
    }
    else{
      for (let j = 0; j < playNumber; j += 1){
        if (computerGuess[i] == humanNumber[j]){
          cows += 1;
        }
      }
    }
  }
  return {
    bulls: bulls,
    cows: cows,
    computerGuess: computerGuess
  }
}

function findNumbers(guessCount, playNumber, maxNumber) {
  if (playNumber > maxNumber) {
    throw Error("The maximum allowed number is 9")
  }
  let computerGuess = [];

  if (guessCount == 0){
    const allowedNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

    for (let i = 0; i < playNumber; i += 1) {
      let len = allowedNumbers.length - 1;

      let adding = Math.round(Math.random() * len);

      computerGuess.push(allowedNumbers[adding]);
      allowedNumbers.splice(adding, 1);
      
    }
  }
  else if (guessCount == 1){
    for (let i = 0; i < playNumber; i += 1) {
      let len = allowedNumbers.length - 1;

      let adding = Math.round(Math.random() * len);

      computerGuess.push(allowedNumbers[adding]);
      allowedNumbers.splice(adding, 1);
      guessCount += 1;
    }
  }

  guessCount += 1;
  console.log(computerGuess);
  return computerGuess;
}

console.log(humanNumber)
var resultFromFirstGuess = resultFromComputerGuess(findNumbers(guessCount, playNumber, maxNumber), playNumber, humanNumber);


function assesResultFromComputerGuess(resultFromGuess, playNumber, potentialNumbers, guessCount, correctNumbers){
  let weightFactor = 100 / playNumber;
  let bulls = resultFromGuess.bulls;
  let cows = resultFromGuess.cows;
  let computerGuess = resultFromGuess.computerGuess;

  let score = 0;

  if (bulls == playNumber){
    endGame();
  }
  else if ((bulls + cows) == playNumber){
    score = 100;
  }
  else if ((bulls + cows) == 0){
    score = -1;
  }
  else{
    score = (cows + bulls) * weightFactor;
  }

  console.log(score);

  if (score == 100){
    for (let i = 0; i < computerGuess.length; i += 1){
      let currentNumber = computerGuess[i];
      potentialNumbers[currentNumber][1] = 95;
      correctNumbers[i] = potentialNumbers[currentNumber];
    }
  } 
  else if (score == -1){
    for (let i = 0; i < computerGuess.length; i += 1){
      let currentNumber = computerGuess[i];
      potentialNumbers.splice(currentNumber, 1);     
    }
  }
  else{
    for (let i = 0; i < computerGuess.length; i += 1){
      let currentNumber = computerGuess[i];
      if (score <= 25){
        if (potentialNumbers[currentNumber][1] < 25){
          potentialNumbers[currentNumber][1] += 10;
        }
        else if (potentialNumbers[currentNumber][1] >= 25 && potentialNumbers[currentNumber][1] < 75){
          potentialNumbers[currentNumber][1] -= 2;
        }
      }
      else if (score > 25 && score < 75){
        if (potentialNumbers[currentNumber][1] < 25){
          potentialNumbers[currentNumber][1] += 15;
        }
        else if (potentialNumbers[currentNumber][1] >= 25 && potentialNumbers[currentNumber][1] < 75){
          potentialNumbers[currentNumber][1] -= 3;
        }
      }
      else{
        potentialNumbers[currentNumber][1] += 30;
      }
      console.log(potentialNumbers[currentNumber][1]);
    }
  }

  if (guessCount <= 2){
    
  }

}




assesResultFromComputerGuess(resultFromFirstGuess, playNumber, potentialNumbers, guessCount, correctNumbers);

function endGame(){
  console.log('finished')
}

