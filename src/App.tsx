import './App.css';
import { useState } from 'react';
import { motion } from 'framer-motion';
import RevealStep from './components/RevealStep';
import ConfigurationStep from './components/ConfigStep';

function App() {
  const [playerCount, setPlayerCount] = useState<number | null>(null);
  const [itemListIdentifier, setItemListIdentifier] = useState<number>(0);

  return (
    <div className='App'>
      <div className='background-elements'>
        <div className='background-shapes'>
          <motion.div
            className='shape shape-1'
            animate={{
              x: [0, 30, -10, 20, 0],
              y: [0, -20, 10, -15, 0],
              rotate: [0, 45, -30, 60, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className='shape shape-2'
            animate={{
              x: [0, -25, 15, -30, 0],
              y: [0, 20, -25, 10, 0],
              rotate: [0, -60, 30, -45, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className='shape shape-3'
            animate={{
              x: [0, 20, -15, 25, 0],
              y: [0, -15, 20, -10, 0],
              rotate: [0, 30, -45, 90, 0],
              scale: [1, 1.1, 0.9, 1.05, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />

          {/* Additional floating elements for more dynamic background */}
          <motion.div
            className='shape'
            style={{
              width: '200px',
              height: '200px',
              top: '60%',
              left: '10%',
              background:
                'radial-gradient(circle, rgba(16, 185, 129, 0.2), rgba(16, 185, 129, 0.05), transparent)',
              borderRadius: '50%',
            }}
            animate={{
              x: [0, 40, -20, 0],
              y: [0, -30, 15, 0],
              scale: [1, 1.2, 0.8, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />

          <motion.div
            className='shape'
            style={{
              width: '150px',
              height: '150px',
              top: '10%',
              right: '30%',
              background:
                'radial-gradient(circle, rgba(245, 158, 11, 0.2), rgba(245, 158, 11, 0.05), transparent)',
              borderRadius: '50%',
            }}
            animate={{
              x: [0, -30, 25, 0],
              y: [0, 35, -20, 0],
              rotate: [0, 180, -90, 0],
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />
        </div>
      </div>

      <header className='App-header'>
        <motion.h1
          className='app-title'
          initial={{ opacity: 0, y: -30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.8,
            ease: 'easeOut',
            type: 'spring',
            stiffness: 100,
          }}
        >
          🕵️ Imposter Game
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            ease: 'easeOut',
            type: 'spring',
            stiffness: 80,
          }}
          className='container'
        >
          {playerCount === null ? (
            <ConfigurationStep
              setItemListIdentifier={setItemListIdentifier}
              itemListIdentifier={itemListIdentifier}
              UpdatePlayerNumber={setPlayerCount}
            />
          ) : (
            <RevealStep
              UpdatePlayerNumber={setPlayerCount}
              playerCount={playerCount}
              listIdentifier={itemListIdentifier}
            />
          )}
        </motion.div>
      </header>
    </div>
  );
}

export default App;
