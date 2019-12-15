import React from 'react';
import { defaultWords } from './resources/data/DefaultWords';

export const Store = React.createContext();

const initialState = {
  words: JSON.parse(localStorage.getItem("speller-words")) || defaultWords,
  correct: [],
  wrong: [],
  voice: "",
  hint: "word"
};

function reducer(state, action) {
  let words = [...state.words];

  switch(action.type) {
    case "ADD_WORD":
      words.push(action.payload);
      localStorage.setItem("speller-words", JSON.stringify(words));
      return {
        ...state,
        words: words
      }
    case "REMOVE_WORD":
      words.splice(action.payload, 1);
      localStorage.setItem("speller-words", JSON.stringify(words));
      return {
        ...state,
        words: words
      }
    case "ADD_CORRECT":
      return {
        ...state,
        correct: [...state.correct, action.payload]
      }
    case "RESET_CORRECT":
      return {
        ...state,
        correct: []
      }
    case "ADD_WRONG":
      return {
        ...state,
        wrong: [...state.wrong, action.payload]
      }
    case "RESET_WRONG":
      return {
        ...state,
        wrong: []
      }
    case "SET_VOICE":
      return {
        ...state,
        voice: action.payload
      }
    case "SET_HINT":
      return {
        ...state,
        hint: action.payload
      }
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = {state, dispatch};
  return <Store.Provider value={ value }>{ props.children }</Store.Provider>;
}