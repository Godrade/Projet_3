var canvasE = {
    canvas : document.getElementById("canvas"),
    ctx : canvas.getContext("2d"),
    mouse : {x: 0, y: 0},
    
    initCanvas(){
        this.canvas.addEventListener('mousemove' , (e) =>{
            this.mouse.x = e.offsetX;
            this.mouse.y = e.offsetY;
        }, false);

        this.canvas.addEventListener('touchmove' , (e) =>{
            var oRect = this.canvas.getBoundingClientRect();
            var touch = e.touches[0];
            this.mouse.x = touch.clientX - oRect.left;
            this.mouse.y = touch.clientY - oRect.top;
        }, { passive: true });

        this.ctx.lineWidht = 3;
        this.ctx.lineJoin = "round";
        this.ctx.lineCap = "round";
        this.ctx.strokeStyle = "black";

        this.canvas.addEventListener('mousedown', (e) =>{
            this.ctx.beginPath();
            this.ctx.moveTo(this.mouse.x, this.mouse.y);
            this.canvas.addEventListener('mousemove', onPaint, false);
        }, false);
    
        this.canvas.addEventListener('mouseup', (e) =>{
            reservation.canvasCheck = "OK";
            this.canvas.removeEventListener('mousemove', onPaint, false);
        }, false);

        this.canvas.addEventListener('touchstart', (e) =>{
            this.ctx.moveTo(this.mouse.x, this.mouse.y);
            this.ctx.beginPath();
            this.canvas.addEventListener('touchmove', onPaint, { passive: true });
        }, false);
    
        this.canvas.addEventListener('touchend', (e) =>{
            reservation.canvasCheck = "OK";
            this.canvas.removeEventListener('touchend', onPaint, { passive: true });
        }, false);

        onPaint = () => {
            this.ctx.stroke();
            this.ctx.lineTo(this.mouse.x, this.mouse.y);
        }
    },

    clear(){
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    },
}