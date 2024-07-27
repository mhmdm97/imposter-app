import { useState } from "react"
import { itemLists } from "../constants/constants"

function ConfigurationStep(props){
    const [playerNumber, setPlayerNumber] = useState("")
    const [activeList, setActiveList] = useState(props.itemListIdentifier);
    const updateList = (index) => {
        props.setItemListIdentifier(index)
        setActiveList(index)
    }
    return (
        <div className="config-step">
        <ul className="category-picker">
            {itemLists.map((item, index) => 
                <li className={activeList === index ? "active" : ""} onClick={() => updateList(index)}>{item.title}</li>
            )}
        </ul>
        <form className="form" onSubmit={() => props.UpdatePlayerNumber(playerNumber)}>
            <label>Player Number: </label>
            <input type="number" 
            className="textbox"
            value={playerNumber}
            min={3}
            onChange={e => setPlayerNumber(e.target.value)} />
            <br />
            <button className="button" type="submit">Next</button>
        </form>
        </div>
    )
}

export default ConfigurationStep;