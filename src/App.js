import { useEffect, useState } from "react"
import Confetti from "react-confetti"
import { nanoid } from "nanoid"
import Die from "./components/Die"
import "./App.css"

export default function App() {
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzizes] = useState(false)
  
  useEffect(
    () => {
      const allHeld = dice.every(die => die.isHeld)
      const firstValue = dice[0].value
      const allSameValue = dice.every(die => die.value === firstValue)

      if(allHeld && allSameValue) {
        setTenzizes(true)
      }
    }, [dice])

  function resetGame() {
    if(tenzies) {
      setDice(allNewDice())
      setTenzizes(false)
    }
  }

  function generateNewDie() {
    return {
      value: Math.floor(Math.random()*6 + 1),
      isHeld: false,
      id: nanoid()
    }
  }

  function holdDice(id) {
    setDice(prevDice => {
      return prevDice.map((die) => {
        return die.id === id ? {...die, isHeld: !die.isHeld} : {...die}
      })
    })
  }
  
  function allNewDice() {
    const numbers = []
    for(let i = 0; i < 10; i++) {
      numbers.push(
        generateNewDie()
      )
    }
    return numbers
  }

  function rollDice() {
    setDice(prevDice => {
      return prevDice.map((die) => {
        return !die.isHeld ? generateNewDie() : die
      })
    })
  }

  const diceElements = dice.map((die) => {
    return <Die 
    key={die.id}
    id={die.id}
    value={die.value} 
    isHeld={die.isHeld}
    holdDice={holdDice}
    />
  })

  return(
    <main className="main">
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice__grid">
        {diceElements}
      </div>
      <button className="button" onClick={!tenzies ? rollDice : resetGame}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  )
}