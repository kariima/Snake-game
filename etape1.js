window.onload = function() {

    let canvasWidth = 900;
    let canvasHeight = 600;
    let blockSize = 30;
    let ctx;
    let delay = 100; //1000 milliseconde = 1sd
    let xCoord = 0;
    let yCoord = 0;
    let snakee;

    init();

    function init () {

        let canvas = document.createElement('canvas');
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.border = "1px solid";
        document.body.appendChild(canvas);
        ctx = canvas.getContext('2d');
        snakee = new Snake([[6, 4], [5, 4], [4, 4]]);

        refreshCanvas();

    }

    function refreshCanvas() { //change la position du rectangle. On l'efface et on en crée un autre qui change de position

        xCoord += 2;
        yCoord += 2;
        ctx.clearRect(0, 0, canvasWidth, canvasHeight); //efface l'ancien rectangle à chaque rafraichissement
        ctx.fillStyle = "#ff0000";
        ctx.fillRect(xCoord, yCoord, 100, 50); // création rectangle x:30 = distance horizontale; y:30 = distance verticale largeur=100 hauteur=50
        //setTimeout(refreshCanvas, delay);
    }

    function Snake(body) {
        this.body = body;
        this.draw = function() {
            ctx.save();
            ctx.fillStyle = "#ff0000";
            for(let i=0; i<this.body.length; i++) {
                drawBlock(ctx, this.body[i])
            }
            ctx.restor();    
        };
    }

}









