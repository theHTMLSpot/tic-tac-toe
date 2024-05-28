import { useState, useEffect } from "react";

function Board() {
    const [isXTurn, setIsXTurn] = useState(true);
    const [spots, setSpots] = useState([null, null, null, null, null, null, null, null, null]);
    const [winner, setWinner] = useState(null);
    const [oWins, setOWins] = useState(0);
    const [xWins, setXWins] = useState(0);
    const [draws, setDraws] = useState(0);

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    function handleDraw() {
        if (winner !== null) {
            return;    
        }
        if (spots.every(spot => spot !== null)) {
            setDraws(draws + 1);
            alert('Draw!');
            resetBoard();
        }
    }

    function handleWin(newSpots) {
        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (newSpots[a] && newSpots[a] === newSpots[b] && newSpots[a] === newSpots[c]) {
                setWinner(newSpots[a]);
                alert(`${newSpots[a]} wins!`);
                if (newSpots[a] === "x") {
                    setXWins(xWins + 1);
                } else {
                    setOWins(oWins + 1);
                }
                resetBoard();
                return;
            }
        }
    }

    function resetBoard() {
        setSpots([null, null, null, null, null, null, null, null, null]);
        setWinner(null);
        setIsXTurn(true);
    }

    const handleTurn = (spot) => {
        if (spots[spot] !== null || winner !== null) {
            alert('Invalid move');
            return;
        }

        const newSpots = [...spots];
        newSpots[spot] = isXTurn ? "x" : "o";
        setSpots(newSpots);
        setIsXTurn(!isXTurn);
        handleWin(newSpots);
        handleDraw();
    }

    return (
        <div>
            <div className="board">
                {spots.map((spot, index) => (
                    <div key={index} className="board-spot" onClick={() => handleTurn(index)}>
                        <h3 className={`x ${spot === "x" ? '' : 'hidden'}`}>x</h3>
                        <h3 className={`o ${spot === "o" ? '' : 'hidden'}`}>o</h3>
                    </div>
                ))}
            </div>
            <div className="scoreboard">
                <p>X Wins: {xWins}</p>
                <p>Draws: {draws}</p>
                <p>O Wins: {oWins}</p>
            </div>
        </div>
    );
}

export default Board;