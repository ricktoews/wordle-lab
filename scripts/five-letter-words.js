var fs = require('fs');
var tools = require('./word-check-tools');

var filename = 'scrabble-words.txt';

fs.readFile(filename, 'utf8', function(err, data) {
	var lines = data.split(/\r?\n/);
	var selected = lines.filter(l => l.length === 5);

	var result = { words: selected };
	var json = JSON.stringify(result, null, 4);
	fs.writeFile('five-letter-words.json', json, 'utf8', function(res) { console.log('done?'); });
console.log(selected);
});
