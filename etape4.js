window.onload = function() {

    let canvasWidth = 900;
    let canvasHeight = 600;
    let blockSize = 30;
    let ctx;
    let delay = 100; //1000 milliseconde = 1sd
    // let xCoord = 0;
    // let yCoord = 0;
    let snakee;
    let applee;

    init();

    function init () {

        let canvas = document.createElement('canvas');
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.border = "1px solid";
        document.body.appendChild(canvas);
        ctx = canvas.getContext('2d');
        snakee = new Snake([[6, 4], [5, 4], [4, 4]], "right");
        applee = new Apple([10, 10]);

        refreshCanvas();

    }

    function refreshCanvas() { //change la position du rectangle. On l'efface et on en crée un autre qui change de position

        ctx.clearRect(0, 0, canvasWidth, canvasHeight); //efface l'ancien rectangle à chaque rafraichissement
        snakee.advance();
        snakee.draw();
        applee.draw();
        setTimeout(refreshCanvas, delay);
    }

    function drawBlock(ctx, position) {
        let x = position[0] * blockSize; //position du block * la taille du block en pixel
        let y = position[1] * blockSize;
        ctx.fillRect(x, y, blockSize, blockSize);
    }

    function Snake(body, direction) {
        this.body = body;
        this.direction = direction;
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
            this.body.pop(); //pop() = supprime le dernier élément d'un array
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
    }

    function Apple (position){
        this.position = position;
        this.draw = function() {
            ctx.save(); //concerve les caractéristiques du canvas malgrè la création d'un nouveau ctx pour le cercle
            ctx.fillStyle = "#33cc33";
            ctx.beginPath();
            let radius = blockSize/2;
            let x = position[0] * blockSize + radius;
            let y = position[1] * blockSize + radius;
            ctx.arc(x, y, radius, 0, Math.PI*2, true);
            ctx.fill();
            ctx.restore(); // restaure les caractéristiques du canvas après la création du cercle
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











