import React, { useState, useEffect } from "react";

export default function Die(props) {
    return (
        <div
            className={`die--face ${props.die.isHeld ? "held" : "not-held"}`}
            onClick={() => props.handleClick(props.die.id)}
        >
            <h2 className="die--num">{props.die.value}</h2>
        </div>
    );
}
