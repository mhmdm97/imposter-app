import { useEffect, useState } from "react"
import { getRandomFromList, getRandomInt } from "../helpers/StaticMethods"
function PlayerRevealStep(props) {
    const [footballerList, setFootballerList] = useState([
        "Lionel Messi",
        "Kylian Mbappé",
        "Robert Lewandowski",
        "Kevin De Bruyne",
        "Erling Haaland",
        "Virgil van Dijk",
        "Trent Alexander-Arnold",
        "Jorginho",
        "Mohamed Salah",
        "Karim Benzema",
        "Casemiro",
        "Thibaut Courtois",
        "João Cancelo",
        "Marquinhos",
        "Luis Suárez",
        "Son Heung-Min",
        "Alisson Becker",
        "Ruben Dias",
        "Joshua Kimmich",
        "Harry Kane",
        "Bruno Fernandes",
        "Raphaël Varane",
        "Romelu Lukaku",
        "Neymar",
        "Bernardo Silva",
        "Sadio Mané",
        "Stefan de Vrij",
        "Ederson Moraes",
        "Nicolo Barella",
        "Fede Valverde",
        "Fabinho",
        "Marc-André ter Stegen",
        "David Alaba",
        "Kalidou Koulibaly",
        "Rodri",
        "Luis Alberto",
        "Marco Reus",
        "Kai Havertz",
        "Diogo Jota",
        "Dušan Vlahović",
        "Lautaro Martínez",
        "Christopher Nkunku"
      ])
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