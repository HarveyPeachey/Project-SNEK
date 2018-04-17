    var snake = new Array(),
    snakeSize,
    food,
    squareSize,
    score,
    speed,
    fSpeed,
    direction,
    cursors,
    upButton,
    downButton,
    leftButton,
    rightButton,
    updateDelay,
    gameTimer,
    buffer,
    startTime,
    lossSound,
    snakeCorners;


var Game = {

    preload: function () {
        // Here we load all the needed resources for the level.
        // In our case, that's just two squares - one for the snake body and one for the apple.
        game.load.image('banner', './assets/images/banner.jpg');
        game.load.image('background', './assets/images/backgroundgrid.jpg');
        game.load.image('food', './assets/sprites/pellet-30px.png');
        game.load.image('shead', './assets/sprites/shead-30px.png');
        game.load.image('sbody', './assets/sprites/sbody-30px.png');
        game.load.image('stail', './assets/sprites/stail-30px.png');
        game.load.image('scorner', './assets/sprites/scorner-30px.png');
        game.load.audio('lSound', './assets/music/lose.wav');

    },

    init: function() {
        startTime = new Date();
    },

    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        snakeSize = 10;          // This is the size of the body of the snake
        snakeCorners = [];
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
        //cursors = game.input.keyboard.createCursorKeys();
        upButton = game.input.keyboard.addKey(Phaser.Keyboard.W);
        downButton = game.input.keyboard.addKey(Phaser.Keyboard.S);
        leftButton = game.input.keyboard.addKey(Phaser.Keyboard.A);
        rightButton = game.input.keyboard.addKey(Phaser.Keyboard.D);
        pauseButton = game.input.keyboard.addKey(Phaser.Keyboard.P);

        // Adds background to game
        game.add.sprite(0, 0, 'background');
        // Adds food item to game and enables physics on the food for collision detection
        food = game.add.sprite(350, 350, 'food');
        food.anchor.set(0.5);
        game.physics.enable(food, Phaser.Physics.ARCADE);
        // Make the player collide with the bounds of the world
        food.body.collideWorldBounds = true;
        banner = game.add.sprite(0, 0, 'banner');
        game.physics.enable(banner, Phaser.Physics.ARCADE);
        banner.body.immovable = true;
        // Creates a group for the snake sprites so that collision detection can work for each piece of the snake
        sGroup = game.add.group();
        cGroup = game.add.group();
        // Loops through and creates the initial snake based on snakeSize that is set
        for(var i = 0; i < snakeSize; i++) {
            if (i == 0) {
                snake[i][0] = game.add.sprite(0, 300, 'shead');
                snake[i][0].anchor.setTo(0.5);
                snake[i][0].x += snake[i][0].width*0.5;
                snake[i][0].y += snake[i][0].height*0.5;
                snake[i][1] = 'up';
                sGroup.add(snake[i][0]);   // ????
                continue;

            }
            else if (i == snakeSize-1) {
                snake[i][0] = game.add.sprite(0, 300 + i * squareSize, 'stail');
                snake[i][0].anchor.setTo(0.5);
                snake[i][0].x += snake[i][0].width*0.5;
                snake[i][0].y += snake[i][0].height*0.5;
                snake[i][1] = 'up';
                sGroup.add(snake[i][0]); // ?????
                break;
            }
            else {
                snake[i][0] = game.add.sprite(0, 300 + i * squareSize, 'sbody');  // Parameters are (X coordinate, Y coordinate, image)
                snake[i][0].anchor.setTo(0.5);
                snake[i][0].x += snake[i][0].width * 0.5;
                snake[i][0].y += snake[i][0].height * 0.5;
                snake[i][1] = 'up';
            }
            // This adds each snake to the group for use with collision detection
            sGroup.add(snake[i][0]);
            if (i != 1)
                cGroup.add(snake[i][0]);
           // var pausetxt = game.add.text(400, 36, "Mute Music", { font: '15px Arial', fill: '#FFFF00' });
          //  pausetxt.anchor.set(0.5);
        }
        //console.log(snake[0][0]);
        // Make the player collide with the bounds of the world
        game.physics.enable(sGroup, Phaser.Physics.ARCADE);
        game.physics.enable(cGroup, Phaser.Physics.ARCADE);
        game.add.text(150, 36, "Player 1 Score:"+p1score.toString(), { font: '15px Arial', fill: '#FFFF00' });
        game.add.text(320, 36, "Player 2 Score:"+p2score.toString(), { font: '15px Arial', fill: '#FFFF00' });
        // Make the player collide with the bounds of the world
        game.physics.enable(sGroup, Phaser.Physics.ARCADE);
        game.physics.enable(cGroup, Phaser.Physics.ARCADE);
        game.add.text(150, 36, "Player 1 Score:"+p1score.toString(), { font: '15px Arial', fill: '#FFFF00' });
        game.add.text(320, 36, "Player 2 Score:"+p2score.toString(), { font: '15px Arial', fill: '#FFFF00' });
        // Create a label to use as a button
        pause_label = game.add.text(28, 10, 'Pause', { font: '15px Arial', fill: '#FFFF00' });
        pause_label.inputEnabled = true;
        pause_label.events.onInputUp.add(function () {
        // When the paus button is pressed, we pause the game
        game.paused = true;
        });
        // Add a input listener that can help us return from being paused
        game.input.onDown.add(unpause, self);

        // And finally the method that handels the pause menu
        function unpause(event){
            // Unpause the game
            game.paused = false;
        }
        var pausetxt = game.add.text(510, 47, "Mute Music", { font: '15px Arial', fill: '#FFFF00' });
        pausetxt.anchor.set(0.5);
        pausetxt.inputEnabled = true;
        pausetxt.events.onInputDown.add(down, this);
        var playtxt = game.add.text(-11, -11, "Mute Music", { font: '15px Arial', fill: '#FFFF00' });
        playtxt.anchor.set(0.5);
        playtxt.inputEnabled = true;
  
        playtxt.events.onInputDown.add(pown, this);
        function down(item) {
           
        music.pause();
                
        pausetxt.x = -11;
        pausetxt.y = -11;
        playtxt.x = 510;
        playtxt.y = 47
          
       }



        function pown(item) {
            
        music.play();
                
        pausetxt.x = 510;
        pausetxt.y = 47;
        playtxt.x = -11;
        playtxt.y = -11;
        }

    },

    update: function () {
        // game.input.keyboard.onPressCallback = function(pauseButton){
        //     game.paused = true;
        //     speed = 0;
        //     fSpeed = 0;
        //     console.log("p");
        // }
        // if (game.keyboard.Key.lastKey == "pauseButton){
        //     console.log("test");
        //     speed = 0;
        //     fspeed = 0;
        //     game.paused = true;

        // }
        // game.input.onDown.add(unpause, self);

        // function unpause(event){
        // // Only act if paused
        //     if(game.paused){
        //         // Calculate the corners of the menu
            
        //     }
        // }
        game.physics.arcade.collide(food, banner);
        //updateDelay++;
        levelTime = this.game.time.elapsedSecondsSince(startTime).toFixed(3);
        /*  --------------------------------------------SNAKE INPUT-------------------------------------------- */

        // Rotates snake head in correct direction also stops illegal moves
        if (game.input.keyboard.justPressed(Phaser.Keyboard.RIGHT) && snake[0][1]!='left' && snake[0][1]!='right') {
            buffer = snake[0][1];
            snake[0][2] = 'right';
            snake[0][0].angle = 90;
            if (snake[0][1] == 'up') {
                snake[0][3] =  snake[0][0].y - ((snake[0][0].y + snake[0][0].width*0.5) % squareSize);
            }
            else if (snake[0][1] == 'down') {
                snake[0][3] =  snake[0][0].y + (squareSize - ((snake[0][0].y + snake[0][0].width*0.5) % squareSize));
            }
        }
        else if (game.input.keyboard.justPressed(Phaser.Keyboard.LEFT) && snake[0][1]!='right' && snake[0][1]!='left') {
            buffer = snake[0][1];
            snake[0][2] = 'left';
            snake[0][0].angle = -90;
            if (snake[0][1] == 'up') {
                snake[0][3] =  snake[0][0].y - ((snake[0][0].y + snake[0][0].width*0.5) % squareSize);
            }
            else if (snake[0][1] == 'down') {
                snake[0][3] =  snake[0][0].y + (squareSize - ((snake[0][0].y + snake[0][0].width*0.5) % squareSize));
            }
        }
        else if (game.input.keyboard.justPressed(Phaser.Keyboard.UP) && snake[0][1]!='down' && snake[0][1]!='up') {
            buffer = snake[0][1];
            snake[0][2] = 'up';
            snake[0][0].angle = 0;
            if (snake[0][1] == 'left') {
                snake[0][4] =  snake[0][0].x - ((snake[0][0].x + snake[0][0].height*0.5)% squareSize);
            }
            else if (snake[0][1] == 'right') {
                snake[0][4] =  snake[0][0].x + (squareSize - ((snake[0][0].x + snake[0][0].height*0.5) % squareSize));
            }

        }
        else if (game.input.keyboard.justPressed(Phaser.Keyboard.DOWN) && snake[0][1]!='up' && snake[0][1]!='down') {
            buffer = snake[0][1];
            snake[0][2] = 'down';
            snake[0][0].angle = 180;
            if (snake[0][1] == 'left') {
                snake[0][4] =  (snake[0][0].x - ((snake[0][0].x + snake[0][0].height*0.5) % squareSize));
            }
            else if (snake[0][1] == 'right') {
                snake[0][4] =  snake[0][0].x + (squareSize - ((snake[0][0].x + snake[0][0].height*0.5) % squareSize));
            }
        }

        /*  --------------------------------------------SNAKE MOVEMENT-------------------------------------------- */

        // Checks if the snake heads x and y coordinates have hit the new calculated grid square and changes the direction

        for (var i = 0; i < snake.length; i++) {
            if (snake[i][0].y == snake[i][3] || snake[i][0].x == snake[i][4]) {
                if (snake[i][0] == snake[0][0]) {
                    if (snake[0][1] == 'up' && snake[0][2] == 'right' || (snake[0][1] == 'left' && snake[0][2] == 'down')) {
                        snakeCorners.push(game.add.sprite(snake[0][0].x, snake[0][0].y, 'scorner'));
                        snakeCorners[snakeCorners.length-1].anchor.setTo(0.5);
                        snakeCorners[snakeCorners.length-1].angle = 90;
                    }
                    else if ((snake[0][1] == 'right' && snake[0][2] == 'down') || (snake[0][1] == 'up' && snake[0][2] == 'left')) {
                        snakeCorners.push(game.add.sprite(snake[0][0].x, snake[0][0].y, 'scorner'));
                        snakeCorners[snakeCorners.length-1].anchor.setTo(0.5);
                        snakeCorners[snakeCorners.length-1].angle = 180;
                    }
                    else if ((snake[0][1] == 'left' && snake[0][2] == 'up') || (snake[0][1] == 'down' && snake[0][2] == 'right')) {
                        snakeCorners.push(game.add.sprite(snake[0][0].x, snake[0][0].y, 'scorner'));
                        snakeCorners[snakeCorners.length-1].anchor.setTo(0.5);
                    }
                    else if ((snake[0][1] == 'down' && snake[0][2] == 'left') || (snake[0][1] == 'right' && snake[0][2] == 'up')) {
                        snakeCorners.push(game.add.sprite(snake[0][0].x, snake[0][0].y, 'scorner'));
                        snakeCorners[snakeCorners.length-1].anchor.setTo(0.5);
                        snakeCorners[snakeCorners.length-1].angle = -90;
                    }
                }
                snake[i][1] = snake[i][2];
                if (i < snake.length-1) {
                    snake[i+1][2] = snake[i][2];
                    snake[i+1][3] = snake[i][3];
                    snake[i+1][4] = snake[i][4];
                }
                snake[i][3] = -1;
                snake[i][4] = -1;
            }

        }
        // if (updateDelay % 60 == 0) {
            // Changes direction in which snake segments move
            for (var i = 0; i < snake.length; i++) {
                if (snake[i][1] == 'right') {
                    snake[i][0].angle = 90;
                    snake[i][0].x += speed;
                }
                else if (snake[i][1] == 'left') { 
                    snake[i][0].angle = -90;
                    snake[i][0].x += speed-(speed*2);
                }
                else if (snake[i][1] == 'up') {
                    snake[i][0].angle = 0;
                    snake[i][0].y += speed-(speed*2);
                }
                else if (snake[i][1] == 'down') {
                    snake[i][0].angle = 180;
                    snake[i][0].y += speed;
                }
            }
        // }
        if(snakeCorners.length > 0) {
            if (snake[snake.length-1][0].x == snakeCorners[0].x && snake[snake.length-1][0].y == snakeCorners[0].y) {
                snakeCorners[0].destroy();
                snakeCorners.shift();
            }
        }

        /*  --------------------------------------------PELLET MOVEMENT-------------------------------------------- */

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

        if (Game.overlapAtOffset(food, sGroup, 0, 0)){
            p1Win = true;
            p1score += 3;

            lossSound = game.add.audio('lSound');
            lossSound.play();
            game.state.start('GameOver');
                pausetxt.x = -1;
        pausetxt.y = -1;
        }

        if (Game.overlapAtOffset(snake[0][0], cGroup, 0, 0)){
            p1Win = false;
            p2score += 3;

            lossSound = game.add.audio('lSound');
            lossSound.play();
            game.state.start('GameOver');
                pausetxt.x = -1;
        pausetxt.y = -1;
        }
        Game.wallCollision(snake[0][0]);
    },
    /*  --------------------------------------------COLLISION BETWEEN SPRITE BODIES-------------------------------------------- */

    //checks whether two sprites overlap up to a certain offset
       overlapAtOffsetSprite: function(object1, object2, offsetX, offsetY) {
        //var graphics = game.add.graphics(0, 0);
        //if either of the parameters passed aren't sprites
        if (typeof(object1.body) === "undefined" || typeof(object2.body) === "undefined") {
            return false;
        }
        //creates a new sprite shape from which the overlap will be greater dpeending on the offsets set by the user
        var bounds1 = new Phaser.Rectangle((object1.position.x + object1.body.offset.x - 0.2 * object1.width / object1.scale.x + offsetX),(object1.position.y + object1.body.offset.y - 0 * object1.height / object1.scale.y + offsetY),(object1.body.width*0.4), (object1.body.height*0.4));
        //graphics.lineStyle(10, 0xFF0000, 0.8);
        //graphics.beginFill(0xFF700B, 1);
        //graphics.drawRect((object1.position.x + object1.body.offset.x - 0.2 * object1.width / object1.scale.x + offsetX),(object1.position.y + object1.body.offset.y - 0 * object1.height / object1.scale.y + offsetY),(object1.body.width*0.4), (object1.body.height*0.4));
        //graphics.drawRect((object2.position.x + object2.body.offset.x - 0.2 * object2.width / object2.scale.x),(object2.position.y + object2.body.offset.y - 0 * object2.height / object2.scale.y),(object2.body.width*0.6), (object2.body.height*0.6));
        //once again a larger shape is created
        var bounds2 = new Phaser.Rectangle(object2.position.x + object2.body.offset.x -
            0.2 * object2.width / object2.scale.x,
            object2.position.y + object2.body.offset.y -
            0 * object2.height / object1.scale.y,
            object2.body.width*0.6, object2.body.height*0.6);
        //game.draw
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

        if(head.x >= 600 || head.x < 0 || head.y >= 450 || head.y < 70){

            // If it's not in, we've hit a wall. Go to game over screen.
            snake[0][2] = 'up';
            p1Win = false;
            p2score += 3;
            lossSound = game.add.audio('lSound');
            lossSound.play();
            game.state.start('GameOver');
        }

    },

    reset: function() {

    },

    render: function() {
        // game.debug.spriteInfo(snake[0][0], 32, 32);
        // game.debug.text(`Direction of head: ${direction} NewDirection: ${newDirection}  NewGridsquare:${newXGridPos} Ticks:${updateDelay} Timer: ${gameTimer}`, 20, 20, 'yellow', 'Segoe UI');
        game.debug.text("Time: " + this.game.time.elapsedSecondsSince(startTime).toFixed(3).toString(), 10, 50, '#FFFF00' , '15px Arial');
        // var graphics = game.add.graphics(0, 0);
        // // set a fill
        // graphics.beginFill(0x00a651);
        // graphics.drawRect(0, 0, 600, 60);
        // game.add.text(50, 20, this.game.time.elapsedSecondsSince(startTime).toFixed(3), { font: '24px Arial', fill: '#000' });
    }
}

