let player1 = "";
let player2 = "";
// het gameboard
// IIFE module want je hebt maar 1 spelbord nodig
// ** bord maken
// ** bord samenstellen en tonen in html
// ** vakjes aanklikbaar maken
const gameBoard = (function () {
  let board = ["", "", "", "", "", "", "", "", ""];

  function getBoard() {
    return board;
  }
  function makeGrid() {
    // bord in de ui zoeken en in var steken
    const bord = document.querySelector(".bord");
    // de tegels maken en op elk een evenlistener laten dragen
    // als het bord al geen kinderen heeft
    if (bord.children.length === 0) {
      for (let i = 1; i <= 9; i++) {
        const tile = document.createElement("div");
        tile.classList.add("tegel", `tegel${i}`);
        tile.dataset.tegel = i;
        tile.addEventListener("click", (e) => {
          const geklikteTegel = document.querySelector(
            `.tegel${e.target.dataset.tegel}`,
          );
          console.log(geklikteTegel);
          if (geklikteTegel.textContent !== "") {
            console.log("Dit veld is al bezet");
          } else {
            console.log(`de index is ${gameController.getActivePlayer()}`);
            board[e.target.dataset.tegel - 1] =
              getComputedStyle[activePlayerIndex].symbol;
            geklikteTegel.textContent =
              getComputedStyle[activePlayerIndex].symbol;
            gameController.wisselBeurt();
          }
        });
        // de nieuwe tegeld op het bord plakken
        bord.appendChild(tile);
      }
    } else {
      console.log("je hebt al een bord getekend");
    }
  }

  return { makeGrid };
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

// GameController
//IIFE module want je  hebt maar 1 controller nodig per game.
const gameController = (function () {
  let players = [];
  let activePlayerIndex = 0;

  const startSpel = function (p1, p2) {
    players = [p1, p2];
    activePlayerIndex = 0;
  };

  const getActivePlayer = function () {
    return players[activePlayerIndex];
  };

  const wisselBeurt = function () {
    activePlayerIndex = activePlayerIndex === 0 ? 1 : 0;
  };

  return { startSpel, getActivePlayer, wisselBeurt };
})();

// submit het formulier om te namen <en grid te creëren
const formNames = document.querySelector(".frm-names");
formNames.addEventListener("submit", (e) => {
  e.preventDefault();
  //creëer de 2 spelers
  player1 = createPlayer(e.target.player1.value, "X");
  player2 = createPlayer(e.target.player2.value, "O");
  gameBoard.startSpel(player1, player2);
  gameBoard.makeGrid();
});
