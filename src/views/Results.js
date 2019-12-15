import React from 'react'
import { useHistory } from 'react-router-dom';
import { Store } from '../Store';
import Container from '../components/Container';

const Results = () => {
  const { state, dispatch } = React.useContext(Store);
  let history = useHistory();

  const playAgain = () => {
    dispatch({ type: "RESET_CORRECT" });
    dispatch({ type: "RESET_WRONG" });
    history.push("/start");
  }

  return (
    <Container>
      <div className="flex flex-col items-center">
        <h2 className="text-4xl font-black mb-8 tracking-wide">Results</h2>
        <div className="w-24 flex justify-between mb-4">
          <span>Correct</span>
          <span className="font-bold">{ state.correct.length }</span>
        </div>
        <div className="w-24 flex justify-between mb-4">
          <span>Wrong</span>
          <span className="font-bold">{ state.wrong.length }</span>
        </div>
        <div className="mt-4">
          <button className="tracking-wide bg-black text-white px-4 py-2 text-xl mb-4 focus:outline-yellow" onClick={playAgain}>Play again</button>
        </div>
      </div>
    </Container>
  );
}

export default Results;