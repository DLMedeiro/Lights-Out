# Lights Out

Lights Out is a logic/puzzle game, played on a gird of individual lights, which can either be lit or unlit. The puzzle is won when when all of the lights are turned off.

You can click on a cell to toggle that light — but it also toggles the light above it, to the left of it, to the right of it, and below it. (Cells on an edge or in the corner won’t flip as many lights, since they are missing some neighbors).

When the game is won, the board should be all black, and a “You Won” message will appear.

Check it out at: 
https://dlmedeiro.github.io/Lights-Out/

## Component Design

### App

Renders the Board component.

### Board

Holds the state that represents the in-memory grid of true/false for lights-on/off. This component holds the state for the board and also where the setState calls and functions are located.

### Cell

Renders a __div__, where the CSS classes will indicate whether this cell is lit or unlit. This is what the user clicks on. This calls a function received from the board to update the state.
