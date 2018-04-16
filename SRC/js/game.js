var snake = new Array(snakeSize),
    snakeSize,
    food,
    squareSize,
    score,
    speed,
    fSpeed,
    direction,
    cursors,
    newDirection,
    newYGridPos,
    newXGridPos,
    upButton,
    downButton,
    leftButton,
    rightButton,
    updateDelay,
    gameTimer,
    startTime;


var Game = {

    preload: function () {
        // Here we load all the needed resources for the level.
        // In our case, that's just two squares - one for the snake body and one for the apple.
        game.load.image('background', './assets/images/grid.jpg');
        game.load.image('food', './assets/sprites/pellet-30px.png');
        game.load.image('shead', './assets/sprites/shead-30px.png');
        game.load.image('sbody', './assets/sprites/sbody-30px.png');
        game.load.image('stail', './assets/sprites/stail-30px.png');
        game.load.image('scorner', './assets/sprites/scorner-50px.png');

    },

    init: function() {
        startTime = new Date();
    },

    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        snakeSize = 5;          // This is the size of the body of the snake
        food = {};              // Object for the food piece
        squareSize = 30;        // Size of the grid in pixels should be same as image size of snake sprites
        score = 0;              // Stores the score of the player
        direction = 'up';       // Chooses the initial direction of the snake
        speed = 3;
        fSpeed = 175;
        updateDelay = 0;
        gameTimer = 0;
        for (var i = 0; i < snakeSize; i++) {
            snake[i] = [];
        }

        // Set up a Phaser controller for keyboard input.
        cursors = game.input.keyboard.createCursorKeys();
        upButton = game.input.keyboard.addKey(Phaser.Keyboard.W);
        downButton = game.input.keyboard.addKey(Phaser.Keyboard.S);
        leftButton = game.input.keyboard.addKey(Phaser.Keyboard.A);
        rightButton = game.input.keyboard.addKey(Phaser.Keyboard.D);

        // Adds background to game
        game.add.sprite(0, 0, 'background');
        // Adds food item to game and enables physics on the food for collision detection
        food = game.add.sprite(350, 350, 'food');
        food.anchor.set(0.5);
        game.physics.enable(food, Phaser.Physics.ARCADE);
        // Make the player collide with the bounds of the world
        food.body.collideWorldBounds = true;
        // Creates a group for the snake sprites so that collision detection can work for each piece of the snake
        sGroup = game.add.group();
        // Loops through and creates the initial snake based on snakeSize that is set
        for(var i = 0; i < snakeSize; i++) {
            if (i == 0) {
                snake[i][0] = game.add.sprite(0, 300, 'shead');
                snake[i][0].anchor.setTo(0.5);
                snake[i][0].x += snake[i][0].width*0.5;
                snake[i][0].y += snake[i][0].height*0.5;
                sGroup.add(snake[i][0]);   // ????
                continue;

            }
            else if (i == snakeSize-1) {
                snake[i][0] = game.add.sprite(0, 300 + i * squareSize, 'stail');
                snake[i][0].anchor.setTo(0.5);
                snake[i][0].x += snake[i][0].width*0.5;
                snake[i][0].y += snake[i][0].height*0.5;
                sGroup.add(snake[i][0]); // ?????
                break;
            }
            else {
                snake[i][0] = game.add.sprite(0, 300 + i * squareSize, 'sbody');  // Parameters are (X coordinate, Y coordinate, image)
                snake[i][0].anchor.setTo(0.5);
                snake[i][0].x += snake[i][0].width * 0.5;
                snake[i][0].y += snake[i][0].height * 0.5;
            }
            // This adds each snake to the group for use with collision detection
            sGroup.add(snake[i][0]);
        }
        console.log(snake[0][0]);
        // Make the player collide with the bounds of the world
        game.physics.enable(sGroup, Phaser.Physics.ARCADE);



    },

    update: function () {
        updateDelay++;
        levelTime = this.game.time.elapsedSecondsSince(startTime).toFixed(3);
        // Rotates snake head in correct direction also stops illegal moves
        if (game.input.keyboard.justPressed(Phaser.Keyboard.RIGHT) && direction!='left') {
            newDirection = 'right';
            snake[0][0].angle = 90;
            // if cursors.right.duration < 1{
            //     for (var i = 1; i< 5; i++){
            //             game.add.sprite(snake[0].position.x, snake[0].position.y, 'scorner');
            //         }
            // }
            // *PUT IN FUNCTION
            if (direction == 'up') {
                newYGridPos =  snake[0][0].y - ((snake[0][0].y + snake[0][0].width*0.5) % squareSize);
            }
            else if (direction == 'down') {
                newYGridPos =  snake[0][0].y + (squareSize - ((snake[0][0].y + snake[0][0].width*0.5) % squareSize));
            }
        }// Make the player collide with the bounds of the world// Make the player collide with the bounds of the world
        else if (game.input.keyboard.justPressed(Phaser.Keyboard.LEFT) && direction!='right') {
            newDirection = 'left';
            snake[0][0].angle = -90;
            if (direction == 'up') {
                newYGridPos =  snake[0][0].y - ((snake[0][0].y + snake[0][0].width*0.5) % squareSize);
            }
            else if (direction == 'down') {
                newYGridPos =  snake[0][0].y + (squareSize - ((snake[0][0].y + snake[0][0].width*0.5) % squareSize));
            }
        }
        else if (game.input.keyboard.justPressed(Phaser.Keyboard.UP) && direction!='down') {
            newDirection = 'up';
            snake[0][0].angle = 0;
            if (direction == 'left') {
                newXGridPos =  snake[0][0].x - ((snake[0][0].x + snake[0][0].height*0.5)% squareSize);
            }
            else if (direction == 'right') {
                newXGridPos =  snake[0][0].x + (squareSize - ((snake[0][0].x + snake[0][0].height*0.5) % squareSize));
            }

        }
        else if (game.input.keyboard.justPressed(Phaser.Keyboard.DOWN) && direction!='up') {
            newDirection = 'down';
            snake[0][0].angle = 180;
            if (direction == 'left') {
                newXGridPos =  (snake[0][0].x - ((snake[0][0].x + snake[0][0].height*0.5) % squareSize));
            }
            else if (direction == 'right') {
                newXGridPos =  snake[0][0].x + (squareSize - ((snake[0][0].x + snake[0][0].height*0.5) % squareSize));
            }
        }

        // Checks if the snake heads x and y coordinates have hit the new calculated grid square and changes the direction
        if (snake[0][0].y == newYGridPos || snake[0][0].x == newXGridPos) {
            direction = newDirection;
            newYGridPos = -1;
            newXGridPos = -1;
        }
        if (updateDelay % 10 == 0) {
            // Changes direction in which snake segments move
            if (direction == 'right') {
                for (var i = 0; i < snake.length; i++) {
                    snake[i][0].x += speed;
                }
            }
            else if (direction == 'left') {
                for (var i = 0; i < snake.length; i++) {
                    snake[i][0].x += speed-(speed*2);
                }
            }
            else if (direction == 'up') {
                for (var i = 0; i < snake.length; i++) {
                    snake[i][0].y += speed-(speed*2);
                }

            }
            else if (direction == 'down') {
                for (var i = 0; i < snake.length; i++) {
                    snake[i][0].y += speed;
                }
            }
        }

        // Movement of pellet
        // Move the player up and down based on keyboard arrows
        if (upButton.isDown) {
            food.body.velocity.y = -fSpeed;
        }
        else if (downButton.isDown) {
            food.body.velocity.y = fSpeed;
        }
        else {
            food.body.velocity.y = 0;
        }

        // Move the player right and left based on keyboard arrows
        if (leftButton.isDown) {
            food.body.velocity.x = -fSpeed;
        }
        else if (rightButton.isDown) {
            food.body.velocity.x = fSpeed;
        }
        else {
            food.body.velocity.x = 0;
        }

        if (Game.overlapAtOffset(food, sGroup, 16, -10)){
            p1Win = true;
            newDirection = 'up';
            game.state.start('GameOver');
        }
        Game.wallCollision(snake[0]);
    },

    //checks whether two sprites overlap up to a certain offset
    overlapAtOffsetSprite: function(object1, object2, offsetX, offsetY) {
        //if either of the parameters passed aren't sprites
        if (typeof(object1.body) === "undefined" || typeof(object2.body) === "undefined") {
            return false;
        }
        //creates a new sprite shape from which the overlap will be greater dpeending on the offsets set by the user
        var bounds1 = new Phaser.Rectangle(object1.position.x + object1.body.offset.x -
            object1.anchor.x * object1.width / object1.scale.x +
            offsetX, object1.position.y + object1.body.offset.y -
            object1.anchor.y * object1.height / object1.scale.y +
            offsetY, object1.body.width, object1.body.height);
        //once again a larger shape is created
        var bounds2 = new Phaser.Rectangle(object2.position.x + object2.body.offset.x -
            object2.anchor.x * object2.width / object2.scale.x,
            object2.position.y + object2.body.offset.y -
            object2.anchor.y * object2.height / object1.scale.y,
            object2.body.width, object2.body.height);
        return Phaser.Rectangle.intersects(bounds1, bounds2);
    },
    //this function is used when either of the sprites needed to be checked are a group of sprites
    overlapAtOffset: function(object1, object2, offsetX, offsetY) {
        //if the first parameter is a group rather than a singular sprite then loop check the overlap against every sprite
        if (object1.physicsType == Phaser.GROUP) {
            for (var i = 0; i < object1.children.length; i++) {
                if (Game.overlapAtOffset(object1.children[i], object2, offsetX, offsetY))
                    return true;
            }
            //if the second parameter is a group, then loop
        } else if (object2.physicsType == Phaser.GROUP) {
            for (var i = 0; i < object2.children.length; i++) {
                if (Game.overlapAtOffset(object1, object2.children[i], offsetX, offsetY))
                    return true;
            }
            //otherwise it is singular
        } else {
            return Game.overlapAtOffsetSprite(object1, object2, offsetX, offsetY);
        }
        return false;
    },

    wallCollision: function(head) {

        // Check if the head of the snake is in the boundaries of the game field.

        if(head.x >= 600 || head.x < 0 || head.y >= 450 || head.y < 0){

            // If it's not in, we've hit a wall. Go to game over screen.
            newDirection = 'up';
            p1Win = false;
            game.state.start('GameOver');
        }

    },

    reset: function() {

    },

    render: function() {
        game.debug.spriteInfo(snake[0][0], 32, 32);
        game.debug.text(`Direction of head: ${direction} NewDirection: ${newDirection}  NewGridsquare:${newXGridPos} Ticks:${updateDelay} Timer: ${gameTimer}`, 20, 20, 'yellow', 'Segoe UI');
        game.debug.text(this.game.time.elapsedSecondsSince(startTime).toFixed(3), 750, 50);
    }
}

