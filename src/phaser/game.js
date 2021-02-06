import Phaser from "phaser";
import dinoImg from "../assets/sprites/dino.png";
import cactusImg from "../assets/sprites/cactus.png";

let gameover = false;
let score = 0;
let highscore = 0;

let dino;
let cactus;
let scoreboard;
let highscoreboard;

class TRexGame extends Phaser.Scene {
  constructor() {
    super("TRexGame");
  }

  init() {

  }

  preload() {
    this.load.image("dino", dinoImg);
    this.load.image("cactus", cactusImg);

    scoreboard = this.add.text(300, 50, 'Score: ' + score);
    highscoreboard = this.add.text(300, 75, 'High score: ' + highscore);
  }

  create() {
    // const cacti = this.physics.add.staticGroup();
    // cacti.create(350, 600, 'cactus').setScale(2).refreshBody();

    dino = this.physics.add.sprite(0, 600, "dino");
    dino.setBounce(0.1);
    dino.setCollideWorldBounds(true);

    cactus = this.physics.add.sprite(800, 600, "cactus");
    cactus.setCollideWorldBounds(true);

    this.physics.add.collider(dino, cactus, function (dino, cactus) {
      console.log('Colliding with cactus!!');
      gameover = true;
    });
  }

  update() {
    if (gameover == true) {
      if (highscore < score) highscore = score;
      highscoreboard.setText('High score: ' + highscore);
      score = 0;
      // this.scene.pause();
      cactus.x = 900;
      gameover = false;
    }

    scoreboard.setText('Score: ' + score++);
    cactus.x -= 1;

    if (cactus.x <= 25) {
      cactus.x = 900;
    }

    const cursors = this.input.keyboard.createCursorKeys();

    // if (cursors.left.isDown) {
    //   dino.setVelocityX(-160);

    //   // dino.anims.play('left', true);
    // }
    // else if (cursors.right.isDown) {
    //   dino.setVelocityX(160);

    //   // dino.anims.play('right', true);
    // }
    // else {
    //   dino.setVelocityX(0);

    //   // dino.anims.play('turn');
    // }

    if ((cursors.up.isDown || cursors.space.isDown) && dino.body.onFloor()) {
      dino.setVelocityY(-350);
    }

  }
}

export default TRexGame;
