var GameOver = {

    preload : function() {
        // Load all the needed resources for the game over screen.
        game.load.image('background', './assets/images/background.jpg');
    },
    create: function () {

        // Add menu screen.
        // It will act as a button to start the game.
        this.add.button(0, 0, 'menu', this.startGame, this);

    },
}