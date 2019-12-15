import React from 'react';
import ReactDOM from 'react-dom';
import { 
  BrowserRouter as Router, 
  Switch,
  Route
} from 'react-router-dom';
import './resources/css/app.css'
import Home from './views/Home';
import Words from './views/Words';
import Test from './views/Test';
import Results from './views/Results';
import { StoreProvider } from './Store';
import VoiceSettings from './views/VoiceSettings';

ReactDOM.render(
  <StoreProvider>
    <Router>
      <Switch>
        <Route path="/" exact component={ Home } />
        <Route path="/start" exact component={ Test } />
        <Route path="/results" exact component={ Results } />
        <Route path="/words" exact component={ Words } />
        <Route path="/settings/voice" exact component={ VoiceSettings } />
      </Switch>
    </Router>
  </StoreProvider>, 
  document.getElementById('root')
);
