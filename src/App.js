import "./App.css";
import React from "react";
import Confetti from "react-confetti";
import Dice from "./components/dice";

function App() {
  const [dices, setDices] = React.useState(NewGame());
  const [game, setGame] = React.useState(false);

  React.useEffect(() => {
    //We take the first value in the array so we can compare it with the others to check if they are all the same and we also check if all dices's held value is true
    const firstDiceValue = dices[0].value;
    const allHeld = dices.every((dice) => dice.held);
    const sameValue = dices.every((dice) => dice.value === firstDiceValue);
    if (allHeld && sameValue) {
      setGame(true);
    }
  }, [dices]);

  function NewGame() {
    const dicesArr = [];
    for (let i = 0; i < 10; i++) {
      dicesArr.push({
        value: randomDiceValue(),
        held: false,
        id: i + 1,
      });
    }
    return dicesArr;
  }

  function randomDiceValue() {
    return Math.trunc(Math.random() * 6 + 1);
  }

  function holdDice(id) {
    setDices((oldDices) => {
      return oldDices.map((dice) => {
        if (dice.id === id) return { ...dice, held: !dice.held };
        else return dice;
      });
    });
  }

  function rollUnheld() {
    if (!game)
      setDices((oldDices) =>
        oldDices.map((dice) =>
          dice.held ? dice : { ...dice, value: randomDiceValue() }
        )
      );
    else {
      setDices(NewGame());
      setGame(false);
    }
  }
  // console.log(dices);

  const dicesElements = dices.map((dice) => (
    <Dice key={dice.id} {...dice} handleHold={holdDice} />
  ));
  return (
    <div className="App">
      <main>
        {game && <Confetti />}
        <h1>Tenzies</h1>
        <p>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dice-container">{dicesElements}</div>
        <button className="roll-dice" onClick={rollUnheld}>
          {game ? "New game" : "Roll dice"}
        </button>
      </main>
    </div>
  );
}

export default App;
