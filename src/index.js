import Phaser from "phaser";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";
import TRexGame from "./phaser/game";
import ConnectFourGame from "./phaser/connectfour";

export const dinoConfig = {
  type: Phaser.AUTO,
  parent: "phaser",
  physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 650 },
        debug: false
    }
  },
  width: 800,
  height: 600,
  scene: TRexGame
};

export const connectFourConfig = {
  type: Phaser.AUTO,
  parent: "phaser",
  physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 650 },
        debug: false
    }
  },
  width: 800,
  height: 1000,
  scene: ConnectFourGame
};

// new Phaser.Game(dinoConfig);
new Phaser.Game(connectFourConfig);

ReactDOM.render(
  <App />,
  document.getElementById("root") || document.createElement("div")
);
