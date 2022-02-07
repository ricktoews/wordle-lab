import { useEffect, useRef, useState } from 'react';
import WordWithControls from './WordWithControls';
import Results from './Results';
import wordPoolJSON from './utils/five-letter-words.json';
import { getFilteredPool } from './utils/word-tools';
console.log('words', wordPoolJSON);

function WordEntry() {
	const [word, setWord] = useState('');
	const [currentGuess, setCurrentGuess] = useState('');
	const [guesses, setGuesses] = useState([]);
	const [poolSize, setPoolSize] = useState([]);
	const [isPoolEmpty, setIsPoolEmpty] = useState(false);
	const [patterns, setPatterns] = useState([]);
	const [wordPool, setWordPool] = useState(wordPoolJSON.words);
	const [overlayStatus, setOverlayStatus] = useState('hide');

	useEffect(() => {
	}, []);

	function reset(stat) {
		if (stat !== 'same') {
			setWord('');
		}
		setCurrentGuess('');
		setGuesses([]);
		setPoolSize([]);
		setIsPoolEmpty(false);
		setPatterns([]);
		setWordPool(wordPoolJSON.words);
		setOverlayStatus('hide');
	}


	function isComplete(pattern) {
		var statuses = pattern.filter(item => item !== 'G');
		return (statuses.length === 0);
	}


	const handleAgainDifferent = () => {
		reset();		
	}

	const handleAgainSame = () => {
		reset('same');		
	}

	const handleWordEntry = e => {
		var el = e.target;
		var capitalized = el.value.toUpperCase();
		setWord(capitalized);
		if (capitalized.length === 5) {
			if (wordPool.indexOf(capitalized) === -1) {
				setWord('');
			}
		}
	}

	function pickWord(pool) {
		var poolSize = pool.length;
		var ndx = Math.floor(Math.random() * pool.length);
		var word = pool[ndx];
		return word;
	}

	const makeGuess = (pool) => {
		var guess = pickWord(pool);
		setCurrentGuess(guess);
		let _guesses = guesses.slice(0);
		_guesses.push(guess);
		setGuesses(_guesses);
		let _poolSize = poolSize.slice(0);
		_poolSize.push(pool.length);
		setPoolSize(_poolSize);
	}

	const submitAttempt = (pattern) => {
		let _patterns = patterns.slice(0);
		_patterns.push(pattern);
		setPatterns(_patterns);
		var filteredPool = getFilteredPool(wordPool, currentGuess, pattern);
		setWordPool(filteredPool);
console.log('submitAttempt isComplete', isComplete(pattern));
		if (isComplete(pattern)) {
			setOverlayStatus('show');
		}
		else if (filteredPool.length > 0) {
			makeGuess(filteredPool);
		}
		else {
			console.log('Something went wrong; no words left.');
			setIsPoolEmpty(true);
		}
	}

	const start = e => {
		console.log('Start picking!');
		makeGuess(wordPool);
	}

	return (
	<div className="game-layout">
          <div className="col">
            <div className="wrap-word-entry">
              <div className="intro">
                <p>Enter a five-letter word. The app will attempt to determine your word by selecting from its list and narrowing down that list based on your feedback, according to Wordle rules. The initial list consists of the five-letter words in the Scrabble dictionary.</p>
              </div>
    	      <div className="word-entry-field"><label htmlFor="word">Your word</label>: <input type="text" name="word" id="word" value={word} onChange={handleWordEntry} /></div>

	      { isPoolEmpty && (<p>There are simply no words for this. Guessing there was an issue in the Green / Yellow selections.</p>) }

	      { word.length === 5 && (
	      <div className="word-entry">
	        <div id="wrap-target-word">Target word: <span className="target-word">{word}</span></div>
                <div className="wrap-button">
	          Click Start to prompt for the initial guess. <button onClick={start}>Start</button>
                </div>
              </div>
	      ) }

          { wordPool.length < 10 && (
	    <div>{wordPool.join(', ')}</div>
	  ) }
            </div>
          </div>
          <div className="col">

	    { (word.length === 5 && guesses.length > 0) && (
	    <div className="guess-list">
	    { guesses.map((guess, ndx) => <WordWithControls key={ndx} poolSize={poolSize[ndx]} word={word} guess={guess} submitAttempt={submitAttempt} final={ndx === guesses.length - 1} /> ) }
	    </div>
	    ) }
          </div>

	{/* Overlay for end of round */}
          <div className={'wrap-overlay ' + overlayStatus}>
            <div className="overlay">
              <p>Completed in {patterns.length} attempts.</p>
	      { guesses.map((word, ndx) => <div key={ndx}>{word}</div>) }
              <br/>
	      <Results patterns={patterns} />
              <div className="wrap-buttons">
                <button onClick={handleAgainSame}>Again, Same Word</button>
                <button onClick={handleAgainDifferent}>Again, Different Word</button>
              </div>
            </div>
          </div>
	{/* End Overlay for end of round */}

	</div>
	);
}

export default WordEntry;
