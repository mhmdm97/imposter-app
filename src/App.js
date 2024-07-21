import './App.css';
import { useState } from 'react';
import RevealStep from './components/RevealStep';
import ConfigurationStep from './components/ConfigStep';

function App() {
  const [playerCount, setPlayerCount] = useState(null)
  const [itemListIdentifier, setItemListIdentifier] = useState(0);
  return (
    <div className="App">

      <header className="App-header">
        <h1>Imposter App</h1>
        <div>
          {playerCount === null ?
            <ConfigurationStep setItemListIdentifier={setItemListIdentifier} UpdatePlayerNumber={setPlayerCount} />
            :
            <RevealStep UpdatePlayerNumber={setPlayerCount} playerCount={playerCount} listIdentifier={itemListIdentifier} />}
        </div>
      </header>
    </div>
  );
}

export default App;
