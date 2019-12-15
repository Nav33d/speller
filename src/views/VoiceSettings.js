import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Store } from '../Store';
import Container from '../components/Container';

const VoiceSettings = () => {
  const {dispatch} = React.useContext(Store);
  const [voices, setVoices] = useState([]);
  const [voice, setVoice] = useState("");
  const [hint, setHint] = useState("word");
  let history = useHistory();

  const voicesHandler = () => {
    setVoices(window.speechSynthesis.getVoices())
  }

  useEffect(() => {
    if (!speechSynthesis.onvoiceschanged) {
      speechSynthesis.onvoiceschanged = voicesHandler;
    } else {
      voicesHandler();
    }
  }, []);

  useEffect(() => {
    if (voices.length) {
      setVoice(voices[0]);
    }
  }, [voices]);

  const voicesList = voices.map((voice, index) => {
    return (
      <option value={index} key={index}>{voice.name}</option>
    );
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: "SET_VOICE",
      payload: voice
    });
    dispatch({
      type: "SET_HINT",
      payload: hint
    });
    history.push("/");
  }

  return (
    <Container>
      <div className="flex flex-col items-center">
        <h2 className="text-4xl font-black mb-8 tracking-wide">Voice Settings</h2>
        <form className="mb-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-lg mb-2">Choose voice</label>
            <select className="w-full border-2 border-black h-10 focus:outline-yellow" onChange={(e) => setVoice(voices[e.target.value])}>
              {voicesList}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-lg mb-2">Choose what should robot voice say</label>
            <select className="w-full border-2 border-black h-10 focus:outline-yellow" onChange={(e) => setHint(e.target.value)}>
              <option value="word">Word</option>
              <option value="meaning">Meaning</option>
            </select>
          </div>
          <div>
            <button className="bg-black hover:bg-gray-900 text-white py-2 px-4 focus:outline-yellow" type="submit">Submit</button>
          </div>
        </form>
      </div>
    </Container>
  );
}

export default VoiceSettings;