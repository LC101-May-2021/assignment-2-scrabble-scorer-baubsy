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
   return input.question("Let's play some scrabble! Enter a word: ");
};

let simpleScore = {
  name: 'Simple Score',
  description: 'Each letter is worth 1 point.', 
  scorerFunction: function(word){
  return word.length;
}
};


let vowelBonusScore = {
  name: 'Bonus Vowels',
  descripton: 'Vowels are 3 pts, consonants are 1 pt.',
  scorerFunction: function(word){
  let pointsReport = "";
    for(let i = 0; i < word.length; i++){
      if(voewls.indexOf(word[i]) > -1){
        pointsReport += `Points for  ${word[i]} : 3\n`;
      } else{
        pointsReport += `Points for ${word[i]} : 1\n`
      };
    }
    return pointsReport;
  }

  
};

let scrabbleScore = {
  name: 'Scrabble',
  description: 'The traditional scoring algorithm.',
  scorerFunction: function(word){return oldScrabbleScorer(word);
}};

const scoringAlgorithms = [simpleScore, vowelBonusScore, scrabbleScore];

function scorerPrompt() {
  let useSelection = input.question(`Which scoring algorithm would you like to use?\n0 - Simple: One point per character\n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses scrabble point system\nEnter 0, 1, or 2: `);

};

function transform() {};

let newPointStructure;

function runProgram() {
   let word = initialPrompt().toUpperCase();
   scorerPrompt();
   console.log(scrabbleScore.scorerFunction(word));
   
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

