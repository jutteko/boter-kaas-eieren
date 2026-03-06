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
          //als er al een O of X staat, melding
          if (geklikteTegel.textContent !== "") {
            console.log("Dit veld is al bezet");
            // anders X of O plaatsen
          } else {
            const actieveSpeler = gameController.getActivePlayer();
            board[e.target.dataset.tegel - 1] = actieveSpeler.symbol;
            geklikteTegel.textContent = actieveSpeler.symbol;
            // checken of er iemand gewonnen heeft
            gameController.checkWin();
            // wissel beurt
            gameController.wisselBeurt();
          }
        });
        // de nieuwe tegels op het bord plakken
        bord.appendChild(tile);
      }
    } else {
      console.log("je hebt al een bord getekend");
    }
  }

  return { makeGrid, getBoard };
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
  const checkWin = function () {
    const possibleWins = [
      [0, 4, 8],
      [0, 1, 2],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [2, 4, 6],
      [3, 4, 5],
      [6, 7, 8],
    ];
    const bord = gameBoard.getBoard();
    possibleWins.forEach((comb) => {
      if (
        (bord[comb[0]] === "X" &&
          bord[comb[1]] === "X" &&
          bord[comb[2]] === "X") ||
        (bord[comb[0]] === "O" &&
          bord[comb[1]] === "O" &&
          bord[comb[2]] === "O")
      ) {
        const tegel1 = document.querySelector(`.tegel${comb[0] + 1}`);
        const tegel2 = document.querySelector(`.tegel${comb[1] + 1}`);
        const tegel3 = document.querySelector(`.tegel${comb[2] + 1}`);
        tegel1.classList.add("gewonnen-tegel");
        tegel2.classList.add("gewonnen-tegel");
        tegel3.classList.add("gewonnen-tegel");
        const scorebord = document.querySelector(".container-onder-bord H2");
        scorebord.textContent = `Congratulations! ${getActivePlayer().name} won!`;
      }
    });
  };

  return { startSpel, getActivePlayer, wisselBeurt, checkWin };
})();
//
//
//
// submit het formulier om te namen <en grid te creëren
const formNames = document.querySelector(".frm-names");
formNames.addEventListener("submit", (e) => {
  e.preventDefault();
  //creëer de 2 spelers
  player1 = createPlayer(e.target.player1.value, "X");
  player2 = createPlayer(e.target.player2.value, "O");
  gameController.startSpel(player1, player2);
  gameBoard.makeGrid();
});
