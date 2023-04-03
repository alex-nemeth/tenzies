import React, { useState, useEffect } from "react";
import "./App.css";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
    const [dice, setDice] = useState(allNewDice());
    const [tenzies, setTenzies] = useState(false);
    const [count, setCount] = useState(0);
    const [personalBest, setPersonalBest] = useState(
        localStorage.getItem("pb") ? localStorage.getItem("pb") : 999
    );
    const [prevPB, setPrevPB] = useState(
        localStorage.getItem("prevPB") ? localStorage.getItem("prevPB") : 999
    );

    useEffect(() => {
        const heldValue = dice[0].value;
        const allHeld = dice.every((die) => die.isHeld);
        const allSameValue = dice.every((die) => die.value === heldValue);
        if (allHeld && allSameValue) {
            setTenzies(true);
            if (personalBest > count) {
                setPrevPB(personalBest);
                setPersonalBest(count);
                localStorage.setItem("pb", count);
                localStorage.setItem("prevPB", prevPB);
            } else {
                setPrevPB(personalBest);
                localStorage.setItem("prevPB", prevPB);
            }
        }
    }, [dice]);

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid(),
        };
    }

    function allNewDice() {
        const arr = [];
        while (arr.length < 10) arr.push(generateNewDie());
        return arr;
    }

    function rollDice() {
        setDice((prevState) =>
            prevState.map((die) => {
                return die.isHeld ? die : generateNewDie();
            })
        );
        setCount(count + 1);
    }

    function holdDice(id) {
        setDice((prevState) =>
            prevState.map((die) => {
                return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
            })
        );
    }

    function restartGame() {
        setDice(allNewDice());
        setTenzies(false);
        setCount(0);
    }

    const diceArray = dice.map((die, i) => {
        return <Die die={die} key={nanoid()} handleClick={holdDice} />;
    });

    return (
        <main>
            {tenzies && personalBest < prevPB && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">
                {count > 0 && "Rolls: " + count}
                <br />
                {personalBest < 999
                    ? "Personal Best: " + personalBest
                    : count === 0 &&
                      "Roll until all dice are the same. Click each die to freeze it at its current value between rolls."}
                <br />
                {tenzies &&
                    personalBest < prevPB &&
                    "Congratulations! New personal best!"}
            </p>
            <div className="die--container">{diceArray}</div>
            <button
                className="die--reroll"
                onClick={tenzies ? restartGame : rollDice}
            >
                {tenzies ? "Play Again" : "Roll"}
            </button>
            <p></p>
        </main>
    );
}
