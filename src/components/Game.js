/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react'
import { NavLink } from 'react-router-dom'

const Game = ({score, myChoice, setScore }) => {

  const [machine, setMachine] = useState('')
  const [playerWin, setPlayerWin] =useState('')

  const [counter, setCounter] = useState(3)

  const newHousePick = () => {
    const choices = ["rock", "paper", "scissors"];
    setMachine(choices[Math.floor(Math.random() * 3)]);
  };

  useEffect(()=> {
    newHousePick()
  }, [])

  const Result = () => {
    if (myChoice === "rock" && machine === "scissors") {
      setPlayerWin("win");
      setScore(score + 1);
    } else if (myChoice === "rock" && machine === "paper") {
      setPlayerWin("lose");
      setScore(score - 1);
    } else if (myChoice === "scissors" && machine === "paper") {
      setPlayerWin("win");
      setScore(score + 1);
    } else if (myChoice === "scissors" && machine === "rock") {
      setPlayerWin("lose");
      setScore(score - 1);
    } else if (myChoice === "paper" && machine === "rock") {
      setPlayerWin("win");
      setScore(score + 1);
    } else if (myChoice === "paper" && machine === "scissors") {
      setPlayerWin("lose");
      setScore(score - 1);
    } else {
      setPlayerWin("draw");
    }
  };

  useEffect(() => {
    const timer =
      counter > 0
        ? setInterval(() => {
            setCounter(counter - 1);
          }, 1000)
        : Result();

    return () => {
      clearInterval(timer);
    };
  }, [counter, machine]);

  return (
    <div className="game">
      <div className="game__you">
        <span className="text">You Picked</span>
        <div
          className={`icon icon--${myChoice} ${
            playerWin === "win" ? `icon icon--${myChoice}--winner` : ""
          }`}
        ></div>
      </div>
      {playerWin === "win" && (
        <div className="game__play">
          <span className="text">You Win</span>
          <NavLink to="/" className="play-again" onClick={() => setMachine()}>
            Play Again
          </NavLink>
        </div>
      )}
      {playerWin === "lose" && (
        <div className="game__play">
          <span className="text">You Lose</span>
          <NavLink to="/" className="play-again" onClick={() => setMachine()}>
            Play Again
          </NavLink>
        </div>
      )}
      {playerWin === "draw" && (
        <div className="game__play">
          <span className="text">Draw</span>
          <NavLink to="/" className="play-again" onClick={() => setMachine()}>
            Play Again
          </NavLink>
        </div>
      )}

      <div className="game__house">
        <span className="text">The House Picked</span>
        {counter === 0 ? (
          <div
            className={`icon icon--${machine} ${
              playerWin === "lose" ? `icon icon--${machine}--winner` : ""
            }`}
          ></div>
        ) : (
          <div className="counter">{counter}</div>
        )}
      </div>
    </div>
  )
}

export default Game

// My Choice: {myChoice} <br/>
// Machine Choice: {machine}<br/>
// Result:



