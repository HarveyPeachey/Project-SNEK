var GameOver = {

    preload : function() {
        // Load the needed image for this game screen.
        	if (p1Win == true)
        		game.load.image('gameOver', './assets/images/gameOver600x450.png');
        	else
        		game.load.image('gameOver2', './assets/images/gameOver2600x450.png');
    },

    create : function() {

        // Create button to start game like in Menu.
        	if (p1Win == true)
        		this.add.button(0, 0, 'gameOver', this.startGame, this);
        	else
        		this.add.button(0, 0, 'gameOver2', this.startGame, this);

    },

    startGame: function () {

        // Change the state back to Game.
        this.state.start('Game');
    }
}