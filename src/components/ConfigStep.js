import { useState } from "react";
import { motion } from "framer-motion";
import { itemLists } from "../constants/constants";

function ConfigurationStep(props) {
    const [playerNumber, setPlayerNumber] = useState("");
    const [activeList, setActiveList] = useState(props.itemListIdentifier);
    
    const updateList = (index) => {
        props.setItemListIdentifier(index);
        setActiveList(index);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (playerNumber >= 3) {
            props.UpdatePlayerNumber(playerNumber);
        }
    };
    
    return (
        <div className="config-step">
            <motion.p 
                className="game-instructions"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                Choose a category and set the number of players (minimum 3). 
                One random player will be the imposter and won't know the secret word!
            </motion.p>
            
            <motion.ul 
                className="category-picker"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                {itemLists.map((item, index) => (
                    <motion.li
                        key={index}
                        className={activeList === index ? "active" : ""}
                        onClick={() => updateList(index)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {item.title}
                    </motion.li>
                ))}
            </motion.ul>
            
            <motion.form 
                className="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onSubmit={handleSubmit}
            >
                <div className="form-row">
                    <label>Number of Players</label>
                    <input 
                        type="number" 
                        className="textbox"
                        value={playerNumber}
                        min={3}
                        placeholder="Enter number (min. 3)"
                        onChange={e => setPlayerNumber(e.target.value)} 
                        required
                    />
                </div>
                
                <motion.button 
                    className="button"
                    type="submit"
                    disabled={playerNumber < 3}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Start Game
                </motion.button>
            </motion.form>
        </div>
    );
}

export default ConfigurationStep;