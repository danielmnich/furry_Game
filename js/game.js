var Fury = require('./furry');
var Coin = require('./coin');




function Game() {
    this.sound1 = document.querySelector('#sound1');
    this.coinSound =document.querySelector('#sound2');
    this.gameOverSound = document.querySelector('#sound3');
    this.board = document.querySelectorAll('#board div');
    this.furry = new Fury();
    this.coin = new Coin();
    this.score = 0;
    this.index = function (x, y) {
        return x + (y * 10);
    };
    this.showFurry = function () {
        this.hideVisibleFurry();
        this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');
    };
    this.showCoin = function () {
        this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
    };
    this.startGame = function () {
        var self = this;
        this.idSetinterval = setInterval(function () {
            self.moveFurry()
        }, 250);
        this.sound1.play();
    };

    this.moveFurry = function () {

        if (this.furry.direction === 'right') {
            this.furry.x = this.furry.x + 1;
        }
        else if (this.furry.direction === 'down') {
            this.furry.y = this.furry.y - 1;
        }
        else if (this.furry.direction === 'left') {
            this.furry.x = this.furry.x - 1;
        }
        else if (this.furry.direction === 'up') {
            this.furry.y = this.furry.y + 1;
        }
        this.gameOver();
        this.showFurry();
        this.checkCoinCollision()
    };

    this.hideVisibleFurry = function () {
        var is = document.querySelector(".furry");
        if(is !== null) {
            is.classList.remove("furry");
        }
    };

    this.turnFurry = function (event) {
        switch (event.which) {
            case 37:
                this.furry.direction = 'left';
                break;
            case 39:
                this.furry.direction = 'right';
                break;
            case 40:
                this.furry.direction = 'up';
                break;
            case 38:
                this.furry.direction = 'down';
                break;

        }

    };
    this.checkCoinCollision = function () {
        if(this.furry.x === this.coin.x && this.furry.y ===this.coin.y) {
            var coinDiv = document.querySelector('.coin');
            var dupa = document.querySelector('#score strong');
            coinDiv.classList.remove('coin');
            this.score = this.score + 1;
            dupa.innerText = this.score;
            this.coin = new Coin();
            this.showCoin();
            this.coinSound.play();
        }
    };
    this.gameOver = function () {
        if(this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
            clearInterval(this.idSetinterval);
            this.hideVisibleFurry();
            this.sound1.pause();
            this.gameOverSound.play();

        }
    }

}


module.exports = Game;