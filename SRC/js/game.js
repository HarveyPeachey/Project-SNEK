var snake, initialSnakeSize, food, squareSize, score, speed, direction, cursors, newDirection;


var Game = {

    preload: function () {
        // Here we load all the needed resources for the level.
        // In our case, that's just two squares - one for the snake body and one for the apple.
        game.load.image('background', './assets/images/background.jpg');
        game.load.image('food', './assets/sprites/pellet.png');
        game.load.image('shead', './assets/sprites/shead.png');
        game.load.image('sbody', './assets/sprites/sbody.png');
        game.load.image('stail', './assets/sprites/stail.png');

    },

    create: function () {

        snake = [];             // This is a stack to store the snake parts
        initialSnakeSize = 4;   // This is the size of the body of the snake
        food = {};              // Object for the food piece
        squareSize = 73;        // Size of the grid in pixels should be same as image size of snake sprites
        score = 0;              // Stores the score of the player
        direction = 'right';    // Chooses the initial direction of the snake


        // Set up a Phaser controller for keyboard input.
        cursors = game.input.keyboard.createCursorKeys();


        game.add.sprite(0, 0, 'background');
        var nom = game.add.sprite(300, 150, 'food');
        nom.scale.setTo(0.1, 0.1);


        for(var i = 0; i < initialSnakeSize; i++) {
            if (i == 0) {
                snake[i-1] = game.add.sprite(150, 150, 'shead');
                continue;
            }
            else if (i == initialSnakeSize-1) {
                snake[i-1] = game.add.sprite(150, 150 + i * squareSize, 'stail');
                break;
            }
            else {
                snake[i-1] = game.add.sprite(150, 150 + i * squareSize, 'sbody');  // Parameters are (X coordinate, Y coordinate, image)
            }
        }
    }

    update: function () {
        if (cursors.right.isDown && direction!='left')
        {
            newDirection = 'right';
        }
        else if (cursors.left.isDown && direction!='right')
        {
            newDirection = 'left';
        }
        else if (cursors.up.isDown && direction!='down')
        {
            newDirection = 'up';
        }
        else if (cursors.down.isDown && direction!='up')
        {
            newDirection = 'down';
        }
    }

}

