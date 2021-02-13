import Phaser from "phaser";
import { Button } from './objects/button.js';
import red from "../assets/connectfour/red.png";
import yellow from "../assets/connectfour/yellow.png";

let redSprite;
let yellowSprite;

class ConnectFour extends Phaser.Scene {
    constructor() {
        super("ConnectFour");
    }

    init() {
    }

    preload() {
        redSprite = this.load.image("red", red);
        yellowSprite = this.load.image("yellow", yellow);
    }

    create() {
        // 0 if no piece. 1 if red piece. 2 if yellow piece.
        this.board = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]
        ];

        this.turn = 1;

        this.add.text(50, 50, 'Player: ' + this.turn);

        for (let i = 0; i < this.board.length; i++) {
            this.btn = new Button(this, 100 + i * 100, 100, i.toString(), { fill: '#0f0 ' }, () => this.movePiece(i));
            this.add.existing(this.btn);

            for (let j = 0; j < this.board[i].length; j++) {
                this.add.text(100 + i * 100, 150 + j * 100, this.board[i][j]);
            }
        }
    }

    movePiece(col) {
        this.add.displayList.removeAll();

        this.board[col][this.getBottomPosition(col)] = this.turn;
        console.table(this.board);
        
        for (let i = 0; i < this.board.length; i++) {
            this.btn = new Button(this, 100 + i * 100, 100, i.toString(), { fill: '#0f0 ' }, () => this.movePiece(i));
            this.add.existing(this.btn);

            for (let j = 0; j < this.board[i].length; j++) {
                this.add.text(100 + i * 100, 150 + j * 100, this.board[i][j]);
            }
        }

        this.rotatePlayerTurn();
        this.add.text(50, 50, 'Player: ' + this.turn);
    }

    // Look at a column, determine where the piece should fall
    getBottomPosition(col) {
        return this.board[col].lastIndexOf(0);
    }

    rotatePlayerTurn() {
        this.turn = this.turn == 1 ? 2 : 1;
    }

    checkWin() {
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                
            }
        }
    }

    update() {
    }
}

export default ConnectFour;