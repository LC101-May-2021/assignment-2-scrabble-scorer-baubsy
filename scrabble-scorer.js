// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const voewls = ['A', 'E', 'I', 'O', 'U'];
const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
  //console.log("d")
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   let userSelection = input.question(`Which scoring algorithm would you like to use?\n0 - Simple: One point per character\n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses scrabble point system\nEnter 0, 1, or 2: `);

  while(userSelection > 2 || userSelection < 0){
    userSelection = input.question(`Please enter 0, 1, or 2`);
  }
  return scoringAlgorithms[userSelection];
};

function simpleScore(word){
  return word.length;
};

let simpleScoreObj = {
  name: 'Simple Score',
  description: 'Each letter is worth 1 point.', 
  scorerFunction: simpleScore
};

function vowelBonusScore(word){
  //let pointsReport = "";
  let points = 0;
    for(let i = 0; i < word.length; i++){
      if(voewls.indexOf(word[i]) > -1){
        //pointsReport += `Points for  ${word[i]} : 3\n`;
        points += 3;
      } else{
        //pointsReport += `Points for ${word[i]} : 1\n`
        points = points += 1;
      };
    }
    //return pointsReport;
  return points;
};
let vowelBonusScoreObj = {
  name: 'Bonus Vowels',
  descripton: 'Vowels are 3 pts, consonants are 1 pt.',
  scorerFunction: vowelBonusScore
};
function scrabbleScore(word, pointStructure){
    let gradedWord = word.toLowerCase();
    let points = 0;

    for(let i = 0; i < gradedWord.length; i++){
      points = points + pointStructure[gradedWord[i]];
    }
    return points;

};
let scrabbleScoreObj = {
  name: 'Scrabble',
  description: 'The traditional scoring algorithm.',
  scorerFunction: scrabbleScore
  };

const scoringAlgorithms = [simpleScoreObj, vowelBonusScoreObj, scrabbleScoreObj];

function scorerPrompt() {
  let userSelection = input.question(`Which scoring algorithm would you like to use?\n0 - Simple: One point per character\n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses scrabble point system\nEnter 0, 1, or 2: `);

  while(userSelection > 2 || userSelection < 0){
    userSelection = input.question(`Please enter 0, 1, or 2`);
  }
  return scoringAlgorithms[userSelection];
};

function transform(oldPointStructure) {
  let newPointStructure = {};

  for(letter in oldPointStructure){
    for(let i = 0; i < oldPointStructure[letter].length; i++){
      newPointStructure[oldPointStructure[letter][i].toLowerCase()] = Number(letter);
    }
  }
  newPointStructure[' '] = 0;
  return newPointStructure;
};

let newPointStructure = transform(oldPointStructure);

function runProgram(scoringAlgorithms) {
  //console.log(transform(oldPointStructure));
   //let word = initialPrompt(); 
   let scoreMode = initialPrompt();
   let word = '';
   while(word.toLowerCase() !== 'stop'){
     word = input.question("Enter a word to be scored, or 'Stop' to quit: ");
     if(word.toLowerCase() !== 'stop'){
       console.log(`Score for '${word}': ${scoreMode.scorerFunction(word.toLowerCase(), newPointStructure)}`);
     }
   }
   
   //console.log(scrabbleScore.scorerFunction(word));
   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

