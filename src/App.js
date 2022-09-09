import React from "react";
import Board from "./Board";
import "./App.css";

/** Simple app that just shows the LightsOut game. */

function App() {
  return (
    <div className="App">
      <h1>Welcome to Lights Out</h1>
      <div className="instructions">
        <h3>Object of the Game: </h3>
        <p>
          Turn off all the lights. When the game is won, the board should be all
          black, and a “You Won” message will appear.
        </p>

        <h3>How to play:</h3>
        <p>Click on a cell to toggle that light on or off.</p>

        <h3>The catch:</h3>
        <p>
          Each time a light is turned on or off, the light above it, to the left
          of it, to the right of it, and below it will also change state
        </p>
      </div>
      <Board nrows={3} ncols={3} chanceLightStartsOn={0.5} />
      {/* Boards will win with 3, 5, 7, 9 */}
    </div>
  );
}

export default App;
