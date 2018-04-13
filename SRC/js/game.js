var snake, initialSnakeSize, food, squareSize, score, speed, fSpeed, direction, cursors, newDirection, newGridSquare, upButton, downButton, leftButton, rightButton;


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
        game.physics.startSystem(Phaser.Physics.ARCADE);
        snake = [];             // This is a stack to store the snake parts
        initialSnakeSize = 5;   // This is the size of the body of the snake
        food = {};              // Object for the food piece
        squareSize = 50;        // Size of the grid in pixels should be same as image size of snake sprites
        score = 0;              // Stores the score of the player
        direction = 'up';       // Chooses the initial direction of the snake
        speed = 2;
        fSpeed = 175;
        

        // Set up a Phaser controller for keyboard input.
        cursors = game.input.keyboard.createCursorKeys();
        upButton = game.input.keyboard.addKey(Phaser.Keyboard.W);
        downButton = game.input.keyboard.addKey(Phaser.Keyboard.S);
        leftButton = game.input.keyboard.addKey(Phaser.Keyboard.A);
        rightButton = game.input.keyboard.addKey(Phaser.Keyboard.D);

        // Adds background to game
        game.add.sprite(0, 0, 'background');
        // Adds food item to game
        food = game.add.sprite(350, 350, 'food');
        food.anchor.set(0.5);
        game.physics.enable(food, Phaser.Physics.ARCADE);
        //make the player collide with the bounds of the world
        food.body.collideWorldBounds = true;
        // Creates the initial snake based on initialSnakeSize that is set
        for(var i = 0; i < initialSnakeSize; i++) {
            
            if (i == 0) {
                snake[i] = game.add.sprite(0, 500, 'shead');
                snake[i].anchor.setTo(0.5);
                snake[i].x += snake[i].width*0.5;
                snake[i].y += snake[i].height*0.5;
                game.physics.enable(snake[i], Phaser.Physics.ARCADE);
                snake[i].body.collideWorldBounds = true;

                continue;
            }
            else if (i == initialSnakeSize-1) {
                snake[i] = game.add.sprite(0, 500 + i * squareSize, 'stail');
                snake[i].anchor.setTo(0.5);
                snake[i].x += snake[i].width*0.5;
                snake[i].y += snake[i].height*0.5;
                break;
            }
            else {
                snake[i] = game.add.sprite(0, 500 + i * squareSize, 'sbody');  // Parameters are (X coordinate, Y coordinate, image)
                snake[i].anchor.setTo(0.5);
                snake[i].x += snake[i].width*0.5;
                snake[i].y += snake[i].height*0.5;
            }
        
        //make the player collide with the bounds of the world
        
        }
        
    },

    update: function () {

        //--- Rotates snake head in correct direction also stops illegal moves ---
        if (cursors.right.isDown && direction!='left') {
            newDirection = 'right';
            snake[0].angle = 90;
            // *PUT IN FUNCTION
            if (direction == 'up') {
                newGridSquare =  (snake[0].y - (snake[0].y % squareSize))+snake[0].width*0.5;
            }
            else if (direction == 'down') {
                newGridSquare =  (snake[0].y + (squareSize - (snake[0].y % squareSize)))+snake[0].width*0.5;
            }
        }
        else if (cursors.left.isDown && direction!='right') {
            newDirection = 'left';
            snake[0].angle = -90;
            if (direction == 'up') {
                newGridSquare =  (snake[0].y - (snake[0].y % squareSize))+snake[0].width*0.5;
            }
            else if (direction == 'down') {
                newGridSquare =  (snake[0].y + (squareSize - (snake[0].y % squareSize)))+snake[0].width*0.5;
            }
        }
        else if (cursors.up.isDown && direction!='down') {
            newDirection = 'up';
            snake[0].angle = 0;
            if (direction == 'left') {
                newGridSquare =  (snake[0].x - (snake[0].x % squareSize))+snake[0].height*0.5;
            }
            else if (direction == 'right') {
                newGridSquare =  (snake[0].x + (squareSize - (snake[0].x % squareSize)))+snake[0].height*0.5;
            }

        }
        else if (cursors.down.isDown && direction!='up') {
            newDirection = 'down';
            snake[0].angle = 180;
            if (direction == 'left') {
                newGridSquare =  (snake[0].x - (snake[0].x % squareSize))+snake[0].height*0.5;
            }
            else if (direction == 'right') {
                newGridSquare =  (snake[0].x + (squareSize - (snake[0].x % squareSize)))+snake[0].height*0.5;
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

        //movement of pellet
        //move the player up and down based on keyboard arrows
        if (upButton.isDown) {
            food.body.velocity.y = -fSpeed;
        }
        else if (downButton.isDown) {
            food.body.velocity.y = fSpeed;
        }
        else {
            food.body.velocity.y = 0;
        }

        //move the player right and left based on keyboard arrows
        if (leftButton.isDown) {
            food.body.velocity.x = -fSpeed;
        }
        else if (rightButton.isDown) {
            food.body.velocity.x = fSpeed;
        }
        else {
            food.body.velocity.x = 0;
        }
        //if food.collides(snake,)        
    },

    render: function () {
        game.debug.spriteInfo(snake[0], 32, 32);
        game.debug.text(`Direction of head: ${direction} NewDirection: ${newDirection}  NewDirection:${newGridSquare} `, 20, 20, 'yellow', 'Segoe UI');
    }
}

