import React, { useState, useEffect } from "react";
import "./App.css";
import Die from "./components/Die";
import { nanoid } from "nanoid";

export default function App() {
    const [dice, setDice] = useState([]);

    useEffect(() => {
        allNewDice();
    }, []);

    const diceArray = dice.map((die, i) => {
        return <Die die={die} key={nanoid()} handleClick={holdDice} />;
    });

    function allNewDice() {
        const arr = [];
        while (arr.length < 10)
            arr.push({
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: nanoid(),
            });
        setDice(arr);
    }

    function holdDice(id) {
        console.log(id);
    }

    return (
        <main>
            <div className="die--container">{diceArray}</div>
            <button className="die--reroll" onClick={allNewDice}>
                Roll
            </button>
        </main>
    );
}
