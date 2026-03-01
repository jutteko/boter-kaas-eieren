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
            board[e.target.dataset.tegel - 1] = "X";
            geklikteTegel.textContent = "X";
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
const GameController = (function () {
  const players = [player1, player2];
  //
  return {};
})();

//het klikken op 'Play'
const playBtn = document.querySelector("#btn-play");
playBtn.addEventListener("click", (e) => {
  e.preventDefault();
  gameBoard.makeGrid();
});

// submit het formulier om te namen te creëren
const formNames = document.querySelector(".frm-names");
formNames.addEventListener("submit", (e) => {
  e.defaultPrevented();
  //creëer de 2 spelers
  const player1 = createPlayer(e.target.player1.value, "X");
  const player2 = createPlayer(e.target.player2.value, "O");
});
