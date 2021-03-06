window.onload = function() {

    let canvasWidth = 900;
    let canvasHeight = 600;
    let blockSize = 30;
    let ctx;
    let delay = 200; //1000 milliseconde = 1sd
    // let xCoord = 0;
    // let yCoord = 0;
    let snakee;
    let applee;
    let widthInBlocks = canvasWidth/blockSize;
    let heightInBlocks = canvasHeight/blockSize;

    init();

    function init () {

        let canvas = document.createElement('canvas');
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.border = "1px solid";
        document.body.appendChild(canvas);
        ctx = canvas.getContext('2d');
        snakee = new Snake([[6, 4], [5, 4], [4, 4], [3, 4], [2, 4]], "right");
        applee = new Apple([10, 10]);

        refreshCanvas();

    }

    function refreshCanvas() { //change la position du rectangle. On l'efface et on en crée un autre qui change de position
        snakee.advance();

        if(snakee.checkCollision()) {
            //GAME OVER
        } else {
            if(snakee.isEatingApple(applee)) {
                // le serpent à manger la pomme
                snakee.eatApple = true;
                do {
                    applee.setNewPosition();
                }
                while (applee.setNewPosition(snakee))
            }
        ctx.clearRect(0, 0, canvasWidth, canvasHeight); //efface l'ancien rectangle à chaque rafraichissement
        snakee.draw();
        applee.draw();
        setTimeout(refreshCanvas, delay);
        }
    }

    function drawBlock(ctx, position) {
        let x = position[0] * blockSize; //position du block * la taille du block en pixel
        let y = position[1] * blockSize;
        ctx.fillRect(x, y, blockSize, blockSize);
    }

    function Snake(body, direction) {
        this.body = body;
        this.direction = direction;
        this.eatApple = false;
        this.draw = function() {
            ctx.save();
            ctx.fillStyle = "#ff0000";
            for(let i=0; i<this.body.length; i++) {
                drawBlock(ctx, this.body[i]);
            }
            ctx.restore();    
        };
        this.advance = function() {
            let nextPosition = this.body[0].slice();
            switch(this.direction) {
                case "left":
                    nextPosition[0] -=1;
                    break;
                case "right":
                    nextPosition[0] += 1;
                    break;
                case "down":
                    nextPosition[1] += 1;
                    break;
                case "up":
                    nextPosition[1] -= 1;
                    break;
                default:
                    throw ("Invalid direction");
            }
            this.body.unshift(nextPosition);
            if(!this.eatApple)
                this.body.pop(); //pop() = supprime le dernier élément d'un array
            else 
                this.eatApple = false;
        };

        this.setDirection = function(newDirection){
            let allowedDirection;
            switch(this.direction){
                case "left":
                case "right":
                    allowedDirection = ["up", "down"];
                    break;
                case "down":
                case "up":
                    allowedDirection = ["left", "right"];
                    break;
                default:
                    throw ("Invalid direction");
            }
            if(allowedDirection.indexOf(newDirection) > -1){
                this.direction = newDirection;
            }
        };

        this.checkCollision = function() {
            let wallCollision = false;
            let snakeCollision = false;
            let head = this.body[0];
            let rest = this.body.slice(1);
            let snakeX = head[0];
            let snakeY = head[1];
            let minX = 0;
            let minY = 0;
            let maxX = widthInBlocks - 1;
            let maxY = heightInBlocks - 1;
            let isNotBetweenHorizontalWalls = snakeX < minX || snakeX > maxX;
            let isNotBetweenVerticalWalls = snakeY < minY || snakeY > maxY;

            if (isNotBetweenHorizontalWalls || isNotBetweenVerticalWalls) {
                wallCollision = true;
            }
            for(let i=0; i<rest.length; i++) {
                if(snakeX === rest[i][0] && snakeY === rest[i][1]) {
                    snakeCollision = true;
                }
            }
            return wallCollision || snakeCollision;

        };

        this.isEatingApple = function(appleToEat) {
            let head = this.body[0];

            if(head[0] === appleToEat.position[0] && head[1] === appleToEat.position[1]) 
                return true;
            else 
                return false;
        };
    }

    function Apple (position){
        this.position = position;
        this.draw = function() {
            ctx.save(); //concerve les caractéristiques du canvas malgrè la création d'un nouveau ctx pour le cercle
            ctx.fillStyle = "#33cc33";
            ctx.beginPath();
            let radius = blockSize/2;
            let x = this.position[0] * blockSize + radius;
            let y = this.position[1] * blockSize + radius;
            ctx.arc(x, y, radius, 0, Math.PI*2, true);
            ctx.fill();
            ctx.restore(); // restaure les caractéristiques du canvas après la création du cercle
        };

        this.setNewPosition = function() {
            let newX = Math.round(Math.random() * (widthInBlocks - 1));
            let newY = Math.round(Math.random() * (heightInBlocks - 1));
            this.position = [newX, newY];
        };

        this.isOnSnake = function(snakeToCheck) {
            let isOnSnake = false;
            for(let i=0; i < snakeToCheck.body.lenght; i++) {
                if (this.position[0] === snakeToCheck.body[i][0] && this.position[0] === snakeToCheck.body[i][1]){
                    isOnSnake = true;
                }
            }
            return isOnSnake;
        };
    }

    document.onkeydown = function handleKeyDown(e) {
        let key = e.keyCode;
        let newDirection;
        switch (key) {
            case 37:
                newDirection = "left";
                break;
            case 38:
                newDirection = "up";
                break;
            case 39:
                newDirection = "right";
                break;
            case 40:
                newDirection = "down";
                break;
            default:
                return;
        };
        snakee.setDirection(newDirection);
    }

}











