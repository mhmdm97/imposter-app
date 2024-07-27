import { useState } from "react"
import { getRandomFromList, getRandomInt } from "../helpers/StaticMethods"
import { itemLists } from "../constants/constants"

//main component to sequentially reveal the item to each player, while hiding the item to one player
function RevealStep(props) {
    const [item] = useState((getRandomFromList(itemLists[props.listIdentifier].list))) //the selected item from the seleced list
    const [imposterNumber] = useState(getRandomInt(props.playerCount) + 1) //the index of the imposter (the player that doesn't know the item)
    const [playerCounter, setPlayerCounter] = useState(1) //the current player selecter
    const [formState, setFormState] = useState(0) //sets the view to either show the item to the player or the reveal button
    
        return (
            <div>
                {formState === 0 ?
                    <button className="button" onClick={() => setFormState(1)} style={{marginTop: 40}}>Reveal</button>
                    :
                    <div>
                        {playerCounter === imposterNumber ?
                            <input type="text"
                            className="textbox"
                                value = "Imposter"
                                readonly
                                disabled
                            />
                            :
                            <input type="text"
                            className="textbox"
                                value = {item}
                                readonly
                                disabled
                            />
                        }
                        <br />
                        <button className="button" onClick={() => {
                            if(playerCounter < props.playerCount){
                                setPlayerCounter(playerCounter + 1)
                                setFormState(0)
                            }
                            else
                                props.UpdatePlayerNumber(null)
                        }}>Done</button>

                    </div>
                }
            </div>
        )
}
export default RevealStep