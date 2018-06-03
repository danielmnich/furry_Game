
var Game = require('./game');

var game = new Game();
game.showCoin();
game.showFurry();
game.startGame();

document.addEventListener('keydown', function (event) {
    game.turnFurry(event);
});





