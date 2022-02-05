word = 'STOP';

rounds = [
{ guess: 'POTS', expected: 'YYYY' },
{ guess: 'PORT', expected: 'YY-Y' },
{ guess: 'SOCK', expected: 'GY--' },
{ guess: 'HALF', expected: '----' },
{ guess: 'FIST', expected: '--YY' },
{ guess: 'STOP', expected: 'GGGG' },
];

function getGreenYellowPattern(word, guess) {
	var result = Array(word.length);
	result.fill('');
	var wordLetters = word.split('');
	var guessLetters = guess.split('');

	// Mark Green
	guessLetters.forEach((letter, pos) => {
		if (letter === wordLetters[pos]) {
			result[pos] = 'G';
			guessLetters[pos] = '_';
			wordLetters[pos] = '_';
		}
	});

	// Mark Yellow
	guessLetters.forEach((letter, pos) => {
		if (letter !== '_' && letter !== '-') {
			let ndx = wordLetters.indexOf(letter);
			if (ndx !== -1) {
				result[pos] = 'Y';
				guessLetters[pos] = '-';
				wordLetters[ndx] = '-';
			}
		}
	})

	return result;
}

function checkWord(poolWord, guessWord, pattern) {
	var letterCount = poolWord.length;
	var poolLetters = poolWord.split('');
	var guessLetters = guessWord.split('');
	var isMatch = true;
	for (let i = 0; i < letterCount; i++) {
		let status = pattern[i];

		// Green: the letters in this position must match.
		if (status === 'G') {
			if (poolLetters[i] !== guessLetters[i]) {
				isMatch = false;
			}			
			else {
				poolLetters[i] = '_';
				guessLetters[i] = '_';
			}
		}
	}

	if (isMatch) {
		for (let i = 0; i < letterCount; i++) {
			let status = pattern[i];

			// Yellow: the letter in the guess must match a letter somewhere else in the pool word.
			if (status === 'Y') {
				let ndx = poolLetters.indexOf(guessLetters[i]);
				if (ndx === -1) {
					isMatch = false;
				}
				else {
					poolLetters[ndx] = '-';
					guessLetters[i] = '-';
				}		
			}
		}
	}

	if (isMatch) {
		for (let i = 0; i < letterCount; i++) {
			let status = pattern[i];

			// Not Green or Yellow: the letter in the guess must not be present in the pool word.
			if (status === '-') {
				let ndx = poolLetters.indexOf(guessLetters[i]);
				if (ndx !== -1) {
					isMatch = false;
				}
			}
		}
	}

	return isMatch;
}
 
function filter_words(wordPool, word, pattern) {
}

console.log('word', word);
var testPool = [
/*
{ pool: 'POTS', guess: 'SPOT', pattern: ['Y', 'Y', 'Y', 'Y'], match: 1 },
{ pool: 'POTS', guess: 'SPOT', pattern: ['G', 'Y', 'Y', 'Y'], match: 0 },
{ pool: 'POTS', guess: 'SPIT', pattern: ['Y', 'Y', '-', 'Y'], match: 1 },
{ pool: 'POTS', guess: 'SPIT', pattern: ['Y', 'G', '-', 'Y'], match: 0 },
{ pool: 'POTS', guess: 'PAST', pattern: ['G', '-', 'Y', 'Y'], match: 1 },
{ pool: 'POTS', guess: 'PAST', pattern: ['G', '-', '-', 'Y'], match: 0 },
*/
{ pool: 'POTS', guess: 'PASS', pattern: ['G', '-', '-', 'G'], match: 1 },
{ pool: 'POTS', guess: 'PASS', pattern: ['G', '-', 'Y', 'G'], match: 0 },
];

testPool.forEach(item => {
	let isMatch = checkWord(item.pool, item.guess, item.pattern);
	if (isMatch == item.match) {
		console.log('Good result for', item);
	}
	else {
		console.log('Error with', item);
	}
});

/*
rounds.forEach(round => {
	let result = getGreenYellowPattern(word, round.guess);
	console.log('Guess', round.guess, 'Result', result, 'Expected', round.expected);
});
*/
