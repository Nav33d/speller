import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Store } from '../Store';

const Spell = () => {
  const [answerResult, setAnswerResult] = useState(null);
  const [selectedWord, setSelectedWord] = useState(null);
  const [answer, setAnswer] = useState("");
  const {state, dispatch} = React.useContext(Store);
  let words = useRef([...state.words]);
  let selectedIndex = useRef(null);
  const isCurrent = useRef(true);
  let history = useHistory();

  const getRandomWord = useCallback(() => {
    if (!words.current.length) {
      history.push("/results");
    }

    const min = 0;
    const max = words.current.length - 1;
    selectedIndex.current = Math.floor(Math.random() * (max - min + 1)) + min;
    setSelectedWord(words.current[selectedIndex.current]);
  }, [history, words]);

  const sayWord = useCallback((wordObject) => {
    let stringToSay = wordObject.word;
    if (state.hint === "meaning") {
      stringToSay = wordObject.meaning;
    }
    let utter = new SpeechSynthesisUtterance(stringToSay);
    if (state.voice) {
      utter.voice = state.voice;
    }
    window.speechSynthesis.speak(utter);
  }, [state.voice, state.hint]);

  useEffect(() => {
    dispatch({ type: "RESET_CORRECT" });
    dispatch({ type: "RESET_WRONG" });
    return () => { isCurrent.current = false; }
  }, [dispatch]);

  useEffect(() => {
    getRandomWord();
  }, [getRandomWord]);

  useEffect(() => {
    if (selectedWord) {
      sayWord(selectedWord);
    }
  }, [sayWord, selectedWord]);

  const handleSubmit = (event) => {
    event.preventDefault();
    checkAnswer();
  }

  const checkAnswer = () => {
    if (answer.toUpperCase() === selectedWord.word.toUpperCase()) {
      setAnswerResult(true);
      dispatch({
        type: "ADD_CORRECT",
        payload: selectedWord
      });
    } else {
      setAnswerResult(false);
      dispatch({
        type: "ADD_WRONG",
        payload: selectedWord
      });
    }
    setTimeout(() => {
      if (isCurrent.current) {
        setAnswerResult("");
      }
    }, 500);
    words.current.splice(selectedIndex.current, 1);
    setAnswer("");
    getRandomWord();
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-col justify-center items-center">
        <button className="w-6 mb-4 focus:outline-yellow" title="Say the word" onClick={() => sayWord(selectedWord)}>
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="volume-up" className="svg-inline--fa fa-volume-up fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#000000" d="M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zm233.32-51.08c-11.17-7.33-26.18-4.24-33.51 6.95-7.34 11.17-4.22 26.18 6.95 33.51 66.27 43.49 105.82 116.6 105.82 195.58 0 78.98-39.55 152.09-105.82 195.58-11.17 7.32-14.29 22.34-6.95 33.5 7.04 10.71 21.93 14.56 33.51 6.95C528.27 439.58 576 351.33 576 256S528.27 72.43 448.35 19.97zM480 256c0-63.53-32.06-121.94-85.77-156.24-11.19-7.14-26.03-3.82-33.12 7.46s-3.78 26.21 7.41 33.36C408.27 165.97 432 209.11 432 256s-23.73 90.03-63.48 115.42c-11.19 7.14-14.5 22.07-7.41 33.36 6.51 10.36 21.12 15.14 33.12 7.46C447.94 377.94 480 319.54 480 256zm-141.77-76.87c-11.58-6.33-26.19-2.16-32.61 9.45-6.39 11.61-2.16 26.2 9.45 32.61C327.98 228.28 336 241.63 336 256c0 14.38-8.02 27.72-20.92 34.81-11.61 6.41-15.84 21-9.45 32.61 6.43 11.66 21.05 15.8 32.61 9.45 28.23-15.55 45.77-45 45.77-76.88s-17.54-61.32-45.78-76.86z"></path></svg>
        </button>
        <form className="mb-4" onSubmit={ handleSubmit }>
          <div className="mb-4">
            <input className="appearance-none border-black border-2 py-2 px-3 leading-tight focus:outline-yellow" type="text" name="answer" value={answer} onChange={e => setAnswer(e.target.value)} autoComplete="off" autoFocus required />
          </div>
          <div>
            <button className="bg-black text-white px-4 py-2 focus:outline-yellow">Submit</button>
          </div>
        </form>
        <div className="text-center">
          { answerResult === true && <p className="text-green-600 uppercase font-black text-4xl">Correct</p> }
          { answerResult === false && <p className="text-red-600 uppercase font-black text-4xl">Wrong</p> }
        </div>
      </div>
    </div>
  );
}

export default Spell;