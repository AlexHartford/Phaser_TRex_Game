import Phaser from "phaser";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";
import TRexGame from "./phaser/game";

export const config = {
  type: Phaser.AUTO,
  parent: "phaser",
  physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 550 },
        debug: false
    }
  },
  width: 800,
  height: 600,
  scene: TRexGame
};

new Phaser.Game(config);

ReactDOM.render(
  <App />,
  document.getElementById("root") || document.createElement("div")
);
