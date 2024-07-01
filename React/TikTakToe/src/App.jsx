import { useState } from 'react';
import GameBoard from './components/GameBoard.jsx';
import Player from './components/Player.jsx';
import Log from './components/Log.jsx';
import { WINNING_COMBINATIONS } from './winning-combinations.js';
import GameOver from './components/GameOver.jsx';

const PLAYERS = { X: "Player 1", O: "Player 2" }
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS);

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = (gameTurns.length === 9 && !winner); //if (gameTurns.length === 9 && !winner) hasDraw = true;

  // ---------------------------------------------------------------------------------------------------------------------------------------------------------------------

  function deriveActivePlayer(gameTurns) {
    let currentPlayer = "X";
    if (gameTurns.length > 0 && gameTurns[0].player === "X") currentPlayer = "O";

    return currentPlayer;
  }

  function deriveGameBoard(gameTurns) {
    let gameBoard = INITIAL_GAME_BOARD.map(event => [...event]);             //Metodo 1
    // let gameBoard = INITIAL_GAME_BOARD.map(event => event.slice());       //Metodo 2
    // let gameBoard = INITIAL_GAME_BOARD.map(event => Array.from(event));   //Metodo 3
    // let gameBoard = [...INITIAL_GAME_BOARD.map(event => [...event])];     //Metodo 4

    for (const event of gameTurns) {
      const { square, player } = event;
      const { row, col } = square;
      gameBoard[row][col] = player;
    }

    return gameBoard;
  }

  function deriveWinner(gameBoard, players){
    let winner;
    for (const combination of WINNING_COMBINATIONS) {
      const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
      const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
      const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];
      if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) winner = players[firstSquareSymbol]; // "firstSquareSymbol" is either "X" or "O".
    }

    return winner;
  }

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns(function (prevTurns) {
      const currentPlayer = deriveActivePlayer(prevTurns);

      let obj = {
        square: { row: rowIndex, col: colIndex },
        player: currentPlayer
      }

      return [obj, ...prevTurns]
    });
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      };
    });
  }

  function handleResart(){
    setGameTurns([]);
  }

  // ---------------------------------------------------------------------------------------------------------------------------------------------------------------------

  return (
    <>
      <main>
        <div id="game-container">
          <ol id="players" className='highlight-player'>
            <Player initialName={PLAYERS.X} symbol="X" isActive={activePlayer === "X"} onChange={handlePlayerNameChange} />
            <Player initialName={PLAYERS.O} symbol="O" isActive={activePlayer === "O"} onChange={handlePlayerNameChange} />
          </ol>
          {
            (winner || hasDraw) && (<GameOver winner={winner} onRestart={handleResart} />)
          }
          <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
        </div>
        <Log turns={gameTurns} />
      </main>
    </>
  );
}

export default App;


/* import { useState } from 'react';
import GameBoard from './components/GameBoard.jsx';
import Player from './components/Player.jsx';
import Log from './components/Log.jsx';

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [activePlayer, setActivePlayer] = useState("X");

  function handleSelectSquare(rowIndex, colIndex){
    setActivePlayer(curActivePlayer => curActivePlayer === "X" ? "O" : "X");
    
    setGameTurns(function (prevTurns){
      let currentPlayer = "X";
      if(prevTurns.length > 0 && prevTurns[0].player === "X") currentPlayer = "O";

      let obj = {
        square: { row: rowIndex, col: colIndex },
        player: currentPlayer
      }

      return [ obj, ...prevTurns ]
    });
  }

  return (
    <>
      <main>
        <div id="game-container">
          <ol id="players" className='highlight-player'>
            <Player initialName="Player 1" symbol="X" isActive={activePlayer === "X"}/>
            <Player initialName="Player 2" symbol="O" isActive={activePlayer === "O"}/>
          </ol>
          <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns} activePlayerSymbol={activePlayer} />
        </div>
        <Log turns={gameTurns}/>
      </main>
    </>
  );
}

export default App;
 */