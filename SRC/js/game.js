var snake, snakeSize, food, squareSize, score, speed, fSpeed, direction, cursors, newDirection, newGridSquare, upButton, downButton, leftButton, rightButton;


var Game = {

    preload: function () {
        // Here we load all the needed resources for the level.
        // In our case, that's just two squares - one for the snake body and one for the apple.
        game.load.image('background', './assets/images/background.jpg');
        game.load.image('food', './assets/sprites/pellet-50px.png');
        game.load.image('shead', './assets/sprites/shead-50px.png');
        game.load.image('sbody', './assets/sprites/sbody-50px.png');
        game.load.image('stail', './assets/sprites/stail-50px.png');
        game.load.image('scorner', './assets/sprites/scorner-50px.png');

    },

    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        snake = [];             // This is a stack to store the snake parts
        snakeSize = 5;   // This is the size of the body of the snake
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
        sGroup = game.add.group();
        // Creates the initial snake based on snakeSize that is set
        for(var i = 0; i < snakeSize; i++) {
            if (i == 0) {
                snake[i] = game.add.sprite(0, 500, 'shead');
                snake[i].anchor.setTo(0.5);
                snake[i].x += snake[i].width*0.5;
                snake[i].y += snake[i].height*0.5;
                sGroup.add(snake[i]);              
                continue;

            }
            else if (i == snakeSize-1) {
                snake[i] = game.add.sprite(0, 500 + i * squareSize, 'stail');
                snake[i].anchor.setTo(0.5);
                snake[i].x += snake[i].width*0.5;
                snake[i].y += snake[i].height*0.5;
                sGroup.add(snake[i]); 
                break;
            }
            else {
                snake[i] = game.add.sprite(0, 500 + i * squareSize, 'sbody');  // Parameters are (X coordinate, Y coordinate, image)
                snake[i].anchor.setTo(0.5);
                snake[i].x += snake[i].width*0.5;
                snake[i].y += snake[i].height*0.5;
            }
        sGroup.add(snake[i]); 
        //make the player collide with the bounds of the world
        }
        game.physics.enable(sGroup, Phaser.Physics.ARCADE);
        

        
    },

    update: function () {
        //--- Rotates snake head in correct direction also stops illegal moves ---
        if (cursors.right.isDown && direction!='left') {
            newDirection = 'right';
            snake[0].angle = 90;
            // if cursors.right.duration < 1{
            //     for (var i = 1; i< 5; i++){
            //             game.add.sprite(snake[0].position.x, snake[0].position.y, 'scorner');
            //         }
            // }
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
        if (Game.overlapAtOffset(food, sGroup, 16, -10))
            alert("testing border hit");
            //game.state.start('GameOver');
    },
        
        
    overlapAtOffsetSprite: function(object1, object2, offsetX, offsetY) {
        if (typeof(object1.body) === "undefined" || typeof(object2.body) === "undefined") {
            return false;
        }

        var bounds1 = new Phaser.Rectangle(object1.position.x + object1.body.offset.x -
            object1.anchor.x * object1.width / object1.scale.x +
            offsetX, object1.position.y + object1.body.offset.y -
            object1.anchor.y * object1.height / object1.scale.y +
            offsetY, object1.body.width, object1.body.height);
        var bounds2 = new Phaser.Rectangle(object2.position.x + object2.body.offset.x -
            object2.anchor.x * object2.width / object2.scale.x,
            object2.position.y + object2.body.offset.y -
            object2.anchor.y * object2.height / object1.scale.y,
            object2.body.width, object2.body.height);
        return Phaser.Rectangle.intersects(bounds1, bounds2);
    },
    overlapAtOffset: function(object1, object2, offsetX, offsetY) {
        if (object1.physicsType == Phaser.GROUP) {
            for (var i = 0; i < object1.children.length; i++) {
                if (Game.overlapAtOffset(object1.children[i], object2, offsetX, offsetY))
                    return true;
            }
        } else if (object2.physicsType == Phaser.GROUP) {
            for (var i = 0; i < object2.children.length; i++) {
                if (Game.overlapAtOffset(object1, object2.children[i], offsetX, offsetY))
                    return true;
            }
        } else {
            return Game.overlapAtOffsetSprite(object1, object2, offsetX, offsetY);
        }
        return false;
    },

    render: function () {
        game.debug.spriteInfo(snake[0], 32, 32);
        game.debug.text(`Direction of head: ${direction} NewDirection: ${newDirection}  NewDirection:${newGridSquare} `, 20, 20, 'yellow', 'Segoe UI');
    }
}

