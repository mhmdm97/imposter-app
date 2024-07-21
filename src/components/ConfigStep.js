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
        <>
        <ul class="category-picker">
            {itemLists.map((item, index) => 
                <li className={activeList === index ? "active" : ""} onClick={() => updateList(index)}>{item.title}</li>
            )}
        </ul>
        <form class="form" onSubmit={() => props.UpdatePlayerNumber(playerNumber)}>
            <label>Player Number: </label>
            <input type="text" 
            className="textbox"
            value={playerNumber}
            min={3}
            onChange={e => setPlayerNumber(e.target.value)} />
            <br />
            <button className="button" type="submit">Next</button>
        </form>
        </>
    )
}

export default ConfigurationStep;