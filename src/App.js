import './App.css';
import { useState } from 'react';
import PlayerRevealStep from './components/PlayerRevealStep';
import ConfigurationStep from './components/ConfigStep';

function App() {
  const [playerCount, setPlayerCount] = useState(null)
  return (
    <div className="App">
      <header className="App-header">
        <h1>Football Imposter</h1>
        <div>
          {playerCount === null ?
            <ConfigurationStep UpdatePlayerNumber={setPlayerCount} />
            :
            <PlayerRevealStep UpdatePlayerNumber={setPlayerCount} playerCount={playerCount} />}
        </div>
      </header>
    </div>
  );
}

export default App;
