import React, { useState } from 'react';
import { Store } from '../Store';
import Container from '../components/Container';

const Words = () => {
  const {state, dispatch} = React.useContext(Store);
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");

  const removeWord = (e, index) => {
    return dispatch({
      type: "REMOVE_WORD",
      payload: index
    });
  }

  const words = state.words.map((word, index) => {
    return (
      <li className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-4" key={index}>
        <div className="flex justify-between border border-yellow-300 p-2 mx-2">
          <span className="mr-2">{word.word}</span>
          <button onClick={(e) => removeWord(e, index)}>&times;</button>
        </div>
      </li>
    );
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_WORD",
      payload: {word: word, meaning: meaning}
    });
    setWord("");
    setMeaning("");
  }

  return (
    <Container>
      <div className="flex flex-col items-center">
        <h2 className="text-4xl font-black mb-8 tracking-wide">Manage Words</h2>
        <form className="w-1/3" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-lg mb-2">Add a word</label>
            <input className="appearance-none border-2 border-black w-full py-2 px-3 leading-tight focus:outline-yellow" type="text" name="word" autoComplete="off" value={word} onChange={(e) => setWord(e.target.value)} required/>
          </div>
          <div className="mb-4">
            <label className="block text-lg mb-2">Meaning</label>
            <textarea className="appearance-none border-2 border-black w-full py-2 px-3 leading-tight focus:outline-yellow" type="text" name="word" autoComplete="off" value={meaning} onChange={(e) => setMeaning(e.target.value)}></textarea>
          </div>
          <div>
            <button className="bg-black hover:bg-gray-900 text-white py-2 px-4 focus:outline-yellow" type="submit">Submit</button>
          </div>
        </form>
        <hr className="w-full border-gray-100 mb-8 mt-8" />
        <ul className="w-full flex flex-wrap justify-center">{words}</ul>
      </div>
    </Container>
  );
}

export default Words;