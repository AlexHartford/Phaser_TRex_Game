import Phaser from "phaser";
import dinoImg from "../assets/sprites/dino.png";
import cactusImg from "../assets/sprites/cactus.png";
import birdImg from "../assets/sprites/bird.png";
import dinoSheet from "../assets/sprites/dino-atlas.png"

let gameover = false;
let score = 0;
let highscore = 0;

let floor;
let dino;
let cactus;
let bird;
let scoreboard;
let highscoreboard;

let random;

class TRexGame extends Phaser.Scene {
  constructor() {
    super("TRexGame");
  }

  init() {
    random = Math.random() < 0.5;
  }

  preload() {
    this.load.spritesheet("sheet", dinoSheet, {frameWidth: 75, frameHeight: 50,});
    this.load.image("dino", dinoImg);
    this.load.image("cactus", cactusImg);
    this.load.image("bird", birdImg);

    scoreboard = this.add.text(300, 50, 'Score: ' + score);
    highscoreboard = this.add.text(300, 75, 'High score: ' + highscore);
  }

  create() {
    // const cacti = this.physics.add.staticGroup();
    // cacti.create(350, 600, 'cactus').setScale(2).refreshBody();
    
    floor = this.physics.add.sprite(0, 600, "sheet");
    floor.setFrame(18);
    floor.setCollideWorldBounds(true);

    dino = this.physics.add.sprite(0, 525, "dino");
    dino.setBounce(0.1);
    dino.setCollideWorldBounds(true);

    this.physics.add.collider(dino, floor, function (dino, floor) {
      console.log('Colliding with floor!!');
    });

    cactus = this.physics.add.sprite(850, 525, "cactus");
    // cactus.setCollideWorldBounds(true);
    cactus.setGravityY(-650)

    this.physics.add.collider(dino, cactus, function (dino, cactus) {
      console.log('Colliding with cactus!!');
      gameover = true;
    });

    bird = this.physics.add.sprite(-50, 500, "bird");
    bird.setGravityY(-650)
    // bird.setCollideWorldBounds(false);

    this.physics.add.collider(dino, bird, function (dino, bird) {
      console.log('Colliding with bird!!');
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
      bird.x = 900;
      bird.y = 525;
      gameover = false;
    }

    scoreboard.setText('Score: ' + score++);
    if (random) cactus.x -= 1 + score / 1000;
    if (!random) bird.x -= 1 + score / 1000;

    if (cactus.x <= 25) {
      random = Math.random() < 0.5;
      if (random) cactus.x = -50;
      cactus.x = 900;
    }

    if (bird.x <= 25) {
      random = Math.random() < 0.5;
      if (!random) bird.x = -50;
      bird.x = 900;
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

    if ((cursors.down.isDown) && dino.body.onFloor()) {
      dino.y = 550;
    } else {
      dino.y = 525;
    }

  }
}

export default TRexGame;
