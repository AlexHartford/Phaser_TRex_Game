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
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]
        ];

        this.player = 1;

        this.add.text(50, 50, 'Player: ' + this.player);

        for (let i = 0; i < this.board.length; i++) {
            this.btn = new Button(this, 100 + i * 100, 100, i.toString(), { fill: '#0f0' }, () => this.movePiece(i));
            this.add.existing(this.btn);

            for (let j = 0; j < this.board[i].length; j++) {
                this.add.text(100 + i * 100, 150 + j * 100, this.board[i][j]);
            }
        }
    }

    movePiece(col) {
        this.add.displayList.removeAll();

        this.board[col][this.getBottomPosition(col)] = this.player;
        
        if (this.checkWin()) {
            this.resetBoard();
        }

        console.table(this.board);

        for (let i = 0; i < this.board.length; i++) {
            this.btn = new Button(this, 100 + i * 100, 100, i.toString(), { fill: '#0f0 ' }, () => this.movePiece(i));
            this.add.existing(this.btn);

            for (let j = 0; j < this.board[i].length; j++) {
                this.add.text(100 + i * 100, 150 + j * 100, this.board[i][j]);
            }
        }

        this.rotatePlayerplayer();
        this.add.text(50, 50, 'Player: ' + this.player);
    }

    // Look at a column, determine where the piece should fall
    getBottomPosition(col) {
        return this.board[col].lastIndexOf(0);
    }

    rotatePlayerplayer() {
        this.player = this.player == 1 ? 2 : 1;
    }

    checkWin() {

        // The length of the outer (i) array -> 7
        const width = this.board.length;
        // The length of the inner (j) array -> 7
        const height = this.board[0].length;

        // Check the vertical direction
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height - 3; j++) {
                if (this.board[i][j] == this.player && 
                    this.board[i][j + 1] == this.player && 
                    this.board[i][j + 2] == this.player && 
                    this.board[i][j + 3] == this.player) {
                        alert('Player ' + this.player + ' won vertically!');
                        return true;
                }
            }
        }

        // Check the horizontal direction
        for (let j = 0; j < height; j++) {
            for (let i = 0; i < width - 3; i++) {
                if (this.board[i][j] == this.player && 
                    this.board[i + 1][j] == this.player && 
                    this.board[i + 2][j] == this.player && 
                    this.board[i + 3][j] == this.player) {
                        alert('Player ' + this.player + ' won horizontally!');
                        return true;
                }
            }
        }

        // Check the upward diagonal direction
        for (let i = 3; i < width; i++) {
            for (let j = 0; j < height - 3; j++) {
                if (this.board[i][j] == this.player && 
                    this.board[i - 1][j + 1] == this.player && 
                    this.board[i - 2][j + 2] == this.player && 
                    this.board[i - 3][j + 3] == this.player) {
                        alert('Player ' + this.player + ' won diagonally!');
                        return true;
                }
            }
        }

        // Check the downward diagonal direction
        for (let i = 3; i < width; i++) {
            for (let j = 3; j < height; j++) {
                if (this.board[i][j] == this.player && 
                    this.board[i - 1][j - 1] == this.player && 
                    this.board[i - 2][j - 2] == this.player && 
                    this.board[i - 3][j - 3] == this.player) {
                        alert('Player ' + this.player + ' won diagonally!');
                        return true;
                }
            }
        }

        return false;
    }

    resetBoard() {
        this.board = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]
        ];
    }

    update() {
    }
}

export default ConnectFour;