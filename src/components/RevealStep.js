import { useState } from "react";
import { motion } from "framer-motion";
import { getRandomFromList, getRandomInt } from "../helpers/StaticMethods";
import { itemLists } from "../constants/constants";

function RevealStep(props) {
    const [item] = useState((getRandomFromList(itemLists[props.listIdentifier].list))); // the selected item from the selected list
    const [imposterNumber] = useState(getRandomInt(props.playerCount) + 1); // the index of the imposter
    const [playerCounter, setPlayerCounter] = useState(1); // the current player
    const [formState, setFormState] = useState(0); // 0 = show reveal button, 1 = show item
    const [isRevealing, setIsRevealing] = useState(false); // animation state

    const handleReveal = () => {
        setIsRevealing(true);
        setTimeout(() => {
            setFormState(1);
            setIsRevealing(false);
        }, 800);
    };

    const handleDone = () => {
        if (playerCounter < props.playerCount) {
            setPlayerCounter(playerCounter + 1);
            setFormState(0);
        } else {
            props.UpdatePlayerNumber(null);
        }
    };

    return (
        <motion.div 
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <motion.div 
                className="player-indicator"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                Player {playerCounter}
            </motion.div>
            
            <div className="card-title">
                {formState === 0 ? "Tap to reveal your word" : "Remember your word!"}
            </div>

            <div className="reveal-content">
                {formState === 0 ? (
                    <motion.button 
                        className="button"
                        onClick={handleReveal}
                        disabled={isRevealing}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        animate={isRevealing ? {
                            opacity: [1, 0],
                            scale: [1, 1.2]
                        } : {}}
                    >
                        {isRevealing ? "Revealing..." : "Reveal Word"}
                    </motion.button>
                ) : (
                    <motion.div
                        className="reveal-text"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {playerCounter === imposterNumber ? (
                            <span className="imposter-text">IMPOSTER</span>
                        ) : (
                            item
                        )}
                    </motion.div>
                )}
            </div>

            {formState === 1 && (
                <motion.button 
                    className="button"
                    onClick={handleDone}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {playerCounter < props.playerCount ? "Next Player" : "Finish Game"}
                </motion.button>
            )}
        </motion.div>
    );
}

export default RevealStep;