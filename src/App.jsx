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

    /**
     * Challenge: Update the `holdDice` function to flip
     * the `isHeld` property on the object in the array
     * that was clicked, based on the `id` prop passed
     * into the function.
     *
     * Hint: as usual, there's > 1 way to accomplish this.
     * I'll be using `dice.map()` and checking for the `id`
     * of the die to determine which one to flip `isHeld` on,
     * but you can do whichever way makes the most sense to you.
     */

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
        setDice((prevState) =>
            prevState.map((die) => {
                if (die.id == id) die.isHeld = !die.isHeld;
                return die;
            })
        );
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
