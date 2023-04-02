import React, { useState, useEffect } from "react";
import "./App.css";
import Die from "./components/Die";

export default function App() {
    const [dice, setDice] = useState([]);

    useEffect(() => {
        allNewDice();
    }, []);

    const diceArray = dice.map((die, i) => {
        return <Die value={die} key={i} />;
    });

    function allNewDice() {
        const arr = [];
        while (arr.length < 10) arr.push(Math.ceil(Math.random() * 6));
        setDice(arr);
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
