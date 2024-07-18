import { useState } from "react"

function ConfigurationStep(props){
    const [playerNumber, setPlayerNumber] = useState("")
    return (
        <form onSubmit={() => props.UpdatePlayerNumber(playerNumber)}>
            <label>Player Number: </label>
            <input type="text" 
            className="textbox"
            value={playerNumber}
            min={3}
            onChange={e => setPlayerNumber(e.target.value)} />
            <br />
            <button className="button" type="submit">Next</button>
        </form>
    )
}

export default ConfigurationStep;