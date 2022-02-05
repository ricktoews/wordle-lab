'use strict';

/*
  Set of functions to generate padded codes.
*/

// Convert base 10 number to other specified base.
function convert(num, base) {
	var conversion = '';
	while (num > 0) {
		var digit = num % base;
		conversion = digit + conversion;
		num = (num - digit) / base;
	}
	return conversion;
}

// Pad string to specified length with specified character
function pad(str, padlen, padchar) {
	while (str.length < padlen) {
		str = padchar + str;
	}
	return str;
}

function toDigitArray(base, str, arrLen) {
	let num = str > '' ? parseInt(str, 10) : 0;
	var digitArray = Array(arrLen);
	digitArray.fill('');
	for (let p = arrLen - 1; p >= 0; p--) {
		let digitNdx = arrLen - p - 1;
		let numPlace = Math.pow(base, p);
		if (num < numPlace) {
			digitArray[digitNdx] = 0;
		}
		else {
			let digit = parseInt(num / numPlace, 10);
			digitArray[digitNdx] = digit;
			num = num - numPlace * digit;
		}
	}

	return digitArray;
}

// Return simple increment, for when such affects only the unit position.
function increment(str) {
	var lastNdx = str.length - 1;
	var lastDig = str.charAt(lastNdx);
	lastDig *= 1;
	lastDig += 1;
	str = str.substr(0, lastNdx) + lastDig;
	return str;
}


function translate(raw) {
	var translated = '';
	var len = raw.length;
	for (let i = 0; i < len; i++) {
		let rawNdx = raw[i] * 1;
		translated += chars[rawNdx];
	}
	return translated;
}

function translateDigits(digitArr) {
	var translated = '';
	var len = digitArr.length;
	for (let i = 0; i < len; i++) {
		let rawNdx = digitArr[i] * 1;
		translated += chars[rawNdx];
	}
	return translated;
}

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
function build(base, length) {
    var max = Math.pow(base, length);
    var raw = '';
    var perms = [];
    for (let qty = 0; qty < max; qty++) {
        raw = (qty % base === 0) ? convert(qty, base) : increment(raw);
        let numcode = pad(raw, length, '0');
	let digitArray = toDigitArray(base, qty, length);
        let perm = translateDigits(digitArray);
        perms.push(perm);
    }
    return perms;
}

function choose(pool) {
	var ndx = Math.floor(Math.random() * pool.length);
	return pool[ndx];
}

const permutations = {
	build,
	choose
};
//
exports.build = build;
exports.choose = choose;
