import { useEffect, useState } from "react"
import { getRandomFromList, getRandomInt } from "../helpers/StaticMethods"
import { itemLists } from "../constants/constants"
function RevealStep(props) {
    const [itemList] = useState(itemLists[props.listIdentifier].list)
    const [item, setItem] = useState(null)
    const [imposterNumber] = useState(getRandomInt(props.playerCount) + 1)
    const [playerCounter, setPlayerCounter] = useState(1)
    const [formState, setFormState] = useState(0)
    useEffect(() => {
        setItem(getRandomFromList(itemList))
    }, [itemList])
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