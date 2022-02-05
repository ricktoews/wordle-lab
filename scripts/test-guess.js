permutations = require('./perms.js');
obj = require('./filter_perms.js');

var perms = permutations.build(26, 3);
console.log(perms.length);
var code = permutations.choose(perms);

console.log('code', code);

var guess = 'QUE';
var green = [0];
var yellow = [2];
perms = filter_words(perms, green, yellow, guess);
/*
update_perms(perms);

let score = score_guess(mycode, entry.code);

*/
