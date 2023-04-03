import React, { useState, useEffect } from "react";
import "./App.css";
import Die from "./components/Die";
import { nanoid } from "nanoid";

export default function App() {
    const [dice, setDice] = useState([]);

    useEffect(() => {
        allNewDice();
    }, []);

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
        setDice(arr);
    }

    function rollDice() {
        setDice((prevState) =>
            prevState.map((die) => {
                return die.isHeld ? die : generateNewDie();
            })
        );
    }

    function holdDice(id) {
        setDice((prevState) =>
            prevState.map((die) => {
                return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
            })
        );
    }

    const diceArray = dice.map((die, i) => {
        return <Die die={die} key={nanoid()} handleClick={holdDice} />;
    });

    return (
        <main>
            <h1 className="title">Tenzies</h1>
            <p className="instructions">
                Roll until all dice are the same. Click each die to freeze it at
                its current value between rolls.
            </p>
            <div className="die--container">{diceArray}</div>
            <button className="die--reroll" onClick={rollDice}>
                Roll
            </button>
        </main>
    );
}
