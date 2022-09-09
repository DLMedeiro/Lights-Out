import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  // nrows: number of arrays
  // ncols: number of items in array
  // trueFalse: 0 = false/off, 1 = true/on
  const [board, setBoard] = useState(createBoard());
  /** create a board nrows high/ncols wide, each cell randomly lit or unlit (create array-of-arrays of true/false values) */
  // nrows: number of arrays
  // ncols: number of items in array
  // Creates an array with "nrows" arrays with "ncols" cells in each array identifying if the light is on or off.
  function createBoard() {
    let initialBoard = [];
    for (let y = 0; y < nrows; y++) {
      let innerArray = [];
      for (let x = 0; x < ncols; x++) {
        innerArray.push(Math.random() > chanceLightStartsOn);
        // Math.random() > chanceLightStartsOn --> False if random number is less than the preset start on percentage.  True value = lit cell, connected in tableBoard creation, False = off cell
      }
      initialBoard.push(innerArray);
    }
    return initialBoard;
    // Output used to create initial board on page load
  }

  const [winner, setWinner] = useState(false);

  function flipCellsAround(coord) {
    setBoard((oldBoard) => {
      const [y, x] = coord.split("-").map(Number);

      let test = [];
      setWinner(() => {
        for (let y = 0; y < nrows; y++) {
          for (let x = 0; x < ncols; x++) {
            if (boardCopy[y][x] === true) {
              test.push(1);
            }
          }
        }
        if (test.length < 1) {
          return true;
        }
      });

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // Make a (deep) copy of the oldBoard
      const boardCopy = oldBoard.map((innerArray) => [...innerArray]);
      // Initial oldBoard = board created at beginning of game  [11, 12, 13]
      // [21, 22, 23]
      // [31, 32, 33]
      // [...rows] = [r1c1, r1c2, r1,c3]
      // Function creates copy of initial array

      // flip this cell and the cells around it
      flipCell(y, x, boardCopy);
      flipCell(y, x - 1, boardCopy);
      flipCell(y, x + 1, boardCopy);
      flipCell(y - 1, x, boardCopy);
      flipCell(y + 1, x, boardCopy);

      return boardCopy;
      // return value becomes value in setBoard, and updates the lights
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  // make table board
  let tableBoard = [];
  for (let y = 0; y < nrows; y++) {
    let row = [];
    for (let x = 0; x < ncols; x++) {
      let coord = `${y}-${x}`;
      row.push(
        <Cell
          key={coord}
          isLit={board[y][x]}
          flipCellsAroundMe={() => flipCellsAround(coord)}
        />
      );
    }
    tableBoard.push(<tr key={y}>{row}</tr>);
  }

  if (winner) {
    return (
      <div className="winner">
        <h2>Winner</h2>
      </div>
    );
  }
  return (
    <table className="Board">
      <tbody>{tableBoard}</tbody>
    </table>
  );
}

export default Board;
