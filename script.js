// het gameboard
// IIFE module want je hebt maar 1 spelbord nodig
//
const gameBoard = (function () {
  let board = ["", "", "", "", "", "", "", "", ""];

  function getBoard() {
    return board;
  }
  function maakZet(index, symbol) {
    if (board[index] === "") {
      board[index] = symbol;
    } else {
      console.log("Kies een leeg vakje");
    }
    function makeGrid() {
      // bord in de ui zoeken en in var steken
      const bord = document.querySelector(".bord");
      // de tegels maken en op elk een evenlistener laten dragen
      for (let i = 1; i <= 9; i++) {
        const tile = document.createElement("div");
        tile.classList.add("tegel", `tegel${i}`);
        tile.dataset.tegel = i;
        tile.addEventListener("click", (e) => {
          console.log(`Je hebt op tegel ${e.target.dataset.tegel} geklikt`);
        });
        // de nieuwe tegen op het bord plakken
        bord.appendChild(tile);
      }
    }
  }

  return { maakZet, makeGrid };
})();

// Functie om spelers te creëren
// met een factory function want je hebt meerdere spelers nodig
//
const createPlayer = function (name, symbol) {
  return {
    name: name,
    symbol: symbol,
  };
};

// het creëren van 2 spelers via de factory function
const player1 = createPlayer("Jürgen", "X"); // zal na het klikken van btn gebeuren
const player2 = createPlayer("Ángel", "O");

// GameController
//IIFE module want je  hebt maar 1 controller nodig per game.
const GameController = (function () {
  const players = [player1, player2];
  //
  return {};
})();

const playBtn = document.querySelector("#btn-play");
playBtn.addEventListener("click", (e) => {
  gameBoard.makeGrid();
});
