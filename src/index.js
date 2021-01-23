import Phaser from "phaser";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";
import TRexGame from "./phaser/scene";

//console.log(App);

export const config = {
  type: Phaser.AUTO,
  parent: "phaser",
  width: 800,
  height: 600,
  scene: TRexGame
};

const game = new Phaser.Game(config);

ReactDOM.render(
  <App />,
  document.getElementById("root") || document.createElement("div")
);
