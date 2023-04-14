import View from "./view.js";
import Store from "./store.js";

const players = [
  {
    id: 1,
    name: "Player 1",
    iconClass: "fa-x",
    colorClass: "turquoise",
  },
  {
    id: 2,
    name: "Player 2",
    iconClass: "fa-o",
    colorClass: "yellow",
  },
];

function init() {
  const view = new View();
  const store = new Store("ttt-storage-key", players);
  //current tab state change
  store.addEventListener("statechange", () => {
    view.render(store.game, store.stats);
  });
  //diferent tab state change
  window.addEventListener("storage", () => {
    console.log("changed");
    view.render(store.game, store.stats);
  });
  //first load of the document
  view.render(store.game, store.stats);

  view.bindGameResetEvent((event) => {
    store.reset();
  });
  view.bindNewRoundEvent((event) => {
    store.newRound();
  });
  view.bindPlayerMoveEvent((square) => {
    const exsistingMove = store.game.moves.find(
      (move) => move.squareId === +square.id
    );
    if (exsistingMove) return;

    //Advance to the next state by pushing a move to the moves array
    store.playerMove(+square.id);
  });
}

window.addEventListener("load", init);
