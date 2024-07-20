import { useEffect, useState } from "react"
import { getRandomFromList, getRandomInt } from "../helpers/StaticMethods"
import { playerList } from "../constants/constants"
function PlayerRevealStep(props) {
    const [footballerList] = useState(playerList)
    const [footballer, setFootballer] = useState(null)
    const [imposterNumber] = useState(getRandomInt(props.playerCount) + 1)
    const [playerCounter, setPlayerCounter] = useState(1)
    const [formState, setFormState] = useState(0)
    useEffect(() => {
        setFootballer(getRandomFromList(footballerList))
    }, [footballerList])
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
                            />
                            :
                            <input type="text"
                            className="textbox"
                                value = {footballer}
                                readonly
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
export default PlayerRevealStep