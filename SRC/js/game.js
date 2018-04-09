var snake, initialSnakeSize, food, squareSize, score, speed, direction, cursors, newDirection, newGridSquare;


var Game = {

    preload: function () {
        // Here we load all the needed resources for the level.
        // In our case, that's just two squares - one for the snake body and one for the apple.
        game.load.image('background', './assets/images/background.jpg');
        game.load.image('food', './assets/sprites/pellet-50px.png');
        game.load.image('shead', './assets/sprites/shead-50px.png');
        game.load.image('sbody', './assets/sprites/sbody-50px.png');
        game.load.image('stail', './assets/sprites/stail-50px.png');

    },

    create: function () {

        snake = [];             // This is a stack to store the snake parts
        initialSnakeSize = 2;   // This is the size of the body of the snake
        food = {};              // Object for the food piece
        squareSize = 50;        // Size of the grid in pixels should be same as image size of snake sprites
        score = 0;              // Stores the score of the player
        direction = 'up';       // Chooses the initial direction of the snake
        speed = 2;


        // Set up a Phaser controller for keyboard input.
        cursors = game.input.keyboard.createCursorKeys();

        // Adds background to game
        game.add.sprite(0, 0, 'background');
        // Adds food item to game
        food = game.add.sprite(0, 0, 'food');


        // Creates the initial snake based on initialSnakeSize that is set
        for(var i = 0; i < initialSnakeSize; i++) {
            if (i == 0) {
                snake[i] = game.add.sprite(150, 500, 'shead');
                snake[i].anchor.setTo(0.5);
                continue;
            }
            else if (i == initialSnakeSize-1) {
                snake[i] = game.add.sprite(150, 500 + i * squareSize, 'stail');
                snake[i].anchor.setTo(0.5);
                break;
            }
            else {
                snake[i] = game.add.sprite(150, 500 + i * squareSize, 'sbody');  // Parameters are (X coordinate, Y coordinate, image)
                snake[i].anchor.setTo(0.5);
            }
        }
    },

    update: function () {

        //--- Rotates snake head in correct direction also stops illegal moves ---
        if (cursors.right.isDown && direction!='left') {
            newDirection = 'right';
            snake[0].angle = 90;
            // *PUT IN FUNCTION
            if (direction == 'up') {
                newGridSquare =  snake[0].y - (snake[0].y % squareSize);
            }
            else if (direction == 'down') {
                newGridSquare =  snake[0].y + (squareSize - (snake[0].y % squareSize));
            }
        }
        else if (cursors.left.isDown && direction!='right') {
            newDirection = 'left';
            snake[0].angle = -90;
            if (direction == 'up') {
                newGridSquare =  snake[0].y - (snake[0].y % squareSize);
            }
            else if (direction == 'down') {
                newGridSquare =  snake[0].y + (squareSize - (snake[0].y % squareSize));
            }
        }
        else if (cursors.up.isDown && direction!='down') {
            newDirection = 'up';
            snake[0].angle = 0;
            if (direction == 'left') {
                newGridSquare =  snake[0].x - (snake[0].x % squareSize);
            }
            else if (direction == 'right') {
                newGridSquare =  snake[0].x + (squareSize - (snake[0].x % squareSize));
            }

        }
        else if (cursors.down.isDown && direction!='up') {
            newDirection = 'down';
            snake[0].angle = 180;
            if (direction == 'left') {
                newGridSquare =  snake[0].x - (snake[0].x % squareSize);
            }
            else if (direction == 'right') {
                newGridSquare =  snake[0].x + (squareSize - (snake[0].x % squareSize));
            }
        }

        if (snake[0].y == newGridSquare || snake[0].x == newGridSquare) {
            direction = newDirection;
        }

        //--- Changes direction in which snake segments move ---

        if (direction == 'right') {
            for (var i = 0; i < snake.length; i++) {
                snake[i].x += speed;
            }
        }
        else if (direction == 'left') {
            for (var i = 0; i < snake.length; i++) {
                snake[i].x += speed-(speed*2);
            }
        }
        else if (direction == 'up') {
            for (var i = 0; i < snake.length; i++) {
                snake[i].y += speed-(speed*2);
            }
        }
        else if (direction == 'down') {
            for (var i = 0; i < snake.length; i++) {
                snake[i].y += speed;
            }
        }
    },

    render: function () {
        game.debug.spriteInfo(snake[0], 32, 32);
        game.debug.text(`Direction of head: ${direction} NewDirection: ${newDirection}  NewDirection:${newGridSquare} `, 20, 20, 'yellow', 'Segoe UI');
    }
}

