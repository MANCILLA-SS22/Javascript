function GameBoard({onSelectSquare, board}) {
    return (
        <ol id="game-board">
            {
                board.map(function (row, rowIndex) {
                    return (
                        <li key={rowIndex}>
                            <ol>
                                {
                                    row.map(function (playerSymbol, colIndex) {
                                        return (
                                            <li key={colIndex}>
                                                <button onClick={() => onSelectSquare(rowIndex, colIndex)} disabled={playerSymbol !== null}>{playerSymbol}</button>
                                            </li>
                                        )
                                    })
                                }
                            </ol>
                        </li>
                    )
                })
            }
        </ol>
    )
}

export default GameBoard;

/* import { useState } from "react";

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

function GameBoard({ onSelectSquare, activePlayerSymbol }) {
    const [gameBoard, setGameBoard] = useState(initialGameBoard);

    function handleSelectSquare(rowIndex, colIndex) {
        setGameBoard(function (prevGameBoard) {
            const updatedGameBoard = [...prevGameBoard.map((innterArray) => [...innterArray])]; //console.log(updatedGameBoard );
            updatedGameBoard[rowIndex][colIndex] = activePlayerSymbol
            return updatedGameBoard;
        });

        onSelectSquare();
    }

    function render() {
        const res = gameBoard.map(function (row, rowIndex) {
            return (
                <li key={rowIndex}>
                    <ol>
                        {
                            row.map(function (playerSymbol, colIndex) {
                                return (
                                    <li key={colIndex}>
                                        <button onClick={() => handleSelectSquare(rowIndex, colIndex)}>{playerSymbol}</button>
                                    </li>)
                            })
                        }
                    </ol>
                </li>
            )
        });

        return res;
    };

    return (
        <ol id="game-board">
            {render()}
        </ol>
    )
}

export default GameBoard;

//It's strongly recommended that if your state is an object or array, you update that state in an immutable way, which simply means you create a copy of the old
//state, so a new object or a new array first, and you then just change that copy instead of that existing object or array. And the reason for that recommendation
//is that if your state is an object or array you are dealing with a reference value in JavaScript.
//And therefore if you would be updating it like:
//                                                         updatedBoard[rowIndex][colIndex] = "X"
//this you would be updating the old value in-memory immediately, even before this scheduled state update was executed by React. And this can again lead to strange
//bugs or side effects if you have multiple places in your application that are scheduling state updates for the same state.


//The difference between
//                                          const updatedGameBoard = [...preGameBoard.map((innerArray) => [...innerArray])];
//and
//                                          const updatedGameBoard = [...preGameBoard];
//serve different purposes due to how they create a new copy of the game board.
//const updatedGameBoard = [...preGameBoard.map((innerArray) => [...innerArray])]; creates a deep copy of the gameBoard.It creates a new array with a new reference
//for the outer array and all of its inner arrays.This ensures that you are working with a completely independent copy of the gameBoard, and any modifications to
//it won't affect the original gameBoard. This is useful when you want to make changes to the copied data without altering the original data.
//const updatedGameBoard = [...preGameBoard]; creates a shallow copy of the gameBoard.The outer array is copied, but the inner arrays are still references to the
//same arrays as in the original gameBoard.This means that if you make changes to updatedGameBoard, the corresponding inner arrays will still be shared with the
//original gameBoard.If you modify the inner arrays in updatedGameBoard, it will also affect the inner arrays in the original gameBoard.
//In most cases, when you're dealing with nested arrays and want to make sure that you work with a completely independent copy, it's better to use the deep copy
//approach, which is what const updatedGameBoard = [...preGameBoard.map((innerArray) => [...innerArray])]; does.This ensures that any changes you make to
//updatedGameBoard won't affect the original gameBoard. The shallow copy approach, const updatedGameBoard = [...preGameBoard];, is useful when you want to create
//a new array of the same outer array references, and you want changes to the inner arrays in one of the copies to affect the inner arrays in the other copy.
//To understand this, run the following code: If we will change a[1][1] = "X"; it will mutate initialGameBoard but if we will do the same with b[1][1] = "X" it won't.
//                                                            const initialGameBoard = [
//                                                                [null, null, null],
//                                                                [null, null, null],
//                                                                [null, null, null],
//                                                            ];

//                                                            console.log(initialGameBoard);

//                                                            const a = [...initialGameBoard];
//                                                            a[1][1] = "X";
//                                                            console.log(a);

//                                                            const b = [...initialGameBoard.map((innerArray) => [...innerArray])];
//                                                            b[1][2] = "X";
//                                                            console.log(b);
*/