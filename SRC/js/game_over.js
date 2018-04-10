var text

var GameOver = {

    preload : function() {
        // Load all the needed resources for the game over screen.
        game.load.image('background', './assets/images/background.jpg');
    },

    create: function () {
    	text = "the snake has won";
    	game.add.text(500, 300, text);
    }
}