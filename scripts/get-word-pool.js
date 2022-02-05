const tools = require('./word-check-tools');

var wordPool = require('./five-letter-words.json');

var words = wordPool.words

console.log(tools);

var rNdx = parseInt(Math.random() * words.length, 10);
var selectedWord = words[rNdx];
console.log(words.length, rNdx, selectedWord);

function getFilteredPool(words, guess, pattern) {
	var filteredPool = [];
	words.forEach((word, ndx) => {
		if (tools.checkWord(word, guess, pattern)) {
			filteredPool.push(word);
		}
	});
	return filteredPool;
}

var guessWord = 'COAST';
var pattern = 'Y-Y-G';

var filteredPool = getFilteredPool(words, guessWord, pattern);
console.log('Reminder', guessWord, pattern);
console.log('filteredPool length', filteredPool.length);
console.log(filteredPool);
