// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

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

let wordToScore = '';
let scorerChoice = '';



function initialPrompt() {
  console.log("\nLet's play some scrabble!\n");
  wordToScore = input.question('Enter a word to score: ');
  return wordToScore;
};


let simpleScore = function(word) {
  return word.length;
};


let vowelBonusScore = function(word) {
  word = word.toUpperCase();
  let letterPoints = 0;
  let vowels = ['A', 'E', 'I', 'O', 'U'];
  for (let i = 0; i < word.length; i++) {
    if (vowels.includes(word[i])) {
      letterPoints += 3;
    } else {
      letterPoints += 1;
    }
  }
  return letterPoints;
};

const simpleScoreObj = {
  name: 'Simple Score',
  description: 'Each letter is worth 1 point.',
  scoringFunction: simpleScore,
};

const vowelBonusScoreObj = {
  name: 'Bonus Vowels',
  description: 'Vowels are 3 pts, consonants are 1 pt.',
  scoringFunction: vowelBonusScore,
};

const scrabbleScoreObj = {
  name: 'Scrabble',
  description: 'The traditional scoring algorithm.',
  scoringFunction: oldScrabbleScorer,
};


let scrabbleScore = function (scorerChoice, wordToScore) {
  if (scorerChoice === "0" ) {
    console.log("algorithm name: ", scoringAlgorithms[0].name);
    console.log("scoringFunction result: ", scoringAlgorithms[0].scoringFunction(wordToScore));
  } else if (Number(scorerChoice) === 1) {
    console.log("algorithm name: ", scoringAlgorithms[1].name);
    console.log("scoringFunction result: ", scoringAlgorithms[1].scoringFunction(wordToScore));
  } else if (scorerChoice === "2") { 
    console.log("algorithm name: ", scoringAlgorithms[2].name);
    console.log("scoringFunction result: ", scoringAlgorithms[2].scoringFunction(wordToScore));
  }
}; 


const scoringAlgorithms = [simpleScoreObj, vowelBonusScoreObj, scrabbleScoreObj];

function scorerPrompt() {
  console.log('\nWhich scoring algorithm would you like to use?\n0 - Simple: One point per character\n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses scrabble point system\n');
  scorerChoice = input.question(`Enter 0, 1, or 2: `);
  return scorerChoice;
};


function transform(oldPointStructure) {
  let newObject = {};
  for (label in oldPointStructure) {
    //console.log(label);
    //console.log(oldPointStructure[label]);
    for(let i=0; i < oldPointStructure[label].length; i++) {
    //console.log(oldPointStructure[label][i]);
    newObject[oldPointStructure[label][i].toLowerCase()] = label
    }
  }
  return newObject;
}
  console.log(transform(oldPointStructure));

let newPointStructure;

function runProgram() {
   let word = initialPrompt();
   let scorer = scorerPrompt();
  //  console.log(`scorer: ${scorer}`)
  //  console.log(`word: ${word}`)
      scrabbleScore(scorer, word);
   
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

