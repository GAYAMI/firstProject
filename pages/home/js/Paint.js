var Paint = (function (_Core) {
    // 继承了Core类的原型
    _Core.inherits(Paint, _Core);

    function Paint() {
        // 属性继承
        var _this = _Core.possibleConstructorReturn(this, _Core.apply(this, arguments));
        _this.addEventListener('finished', function (msg) {
            console.log(msg)
        })
    };

    Paint.prototype.template = function () {
        return `
            <canvas id="Paint_canvas" width="500" height="400"></canvas>
            <canvas id="canvas_" width="500" height="400"></canvas>
        `
    }

    Paint.prototype.mount = function () {
        this.canvasEl = document.getElementById('Paint_canvas');
        this.canvasPaint = document.getElementById('canvas_');
        // step1. 获取canvasapi
        this.canvasAPI = this.initCanvas(this.canvasEl);
        this.canvasPaintAPI = this.initCanvas(this.canvasPaint);
        // step2. 添加鼠标拖动事件
        this.handlerMouseInit();
    }  

    /** 
     * 1. mousedown  mousemove   mouseup
     */
    Paint.prototype.handlerMouseInit = function () {
        this.startPos = { x: 0, y: 0 };
        this.isMove = false;
        // 保存画笔步
        this.paintCaches = [];
        this.canvasEl.addEventListener('mousedown', this.handlerMousedown.bind(this));

        this.canvasEl.addEventListener('mousemove', this.handlerMousemove.bind(this));

        this.canvasEl.addEventListener('mouseup', this.handlerMouseup.bind(this));
    }

    Paint.prototype.handlerMousedown = function (e) {
        this.startPos = [e.offsetX, e.offsetY];
        this.isMove = true;
        this.canvasAPI.beginPath();
        this.canvasPaintAPI.beginPath();
        this.canvasAPI.moveTo(this.startPos[0], this.startPos[1]);
        this.paintCaches.push(this.startPos);
    }

    Paint.prototype.handlerMousemove = function (e) {
        if (!this.isMove) return;
        var currentPos = [e.offsetX, e.offsetY];
        this.canvasAPI.lineTo(currentPos[0], currentPos[1]);
        this.canvasPaintAPI.lineTo(currentPos[0], currentPos[1]);
        // {currentPint: 1, pos: currentPos}
        this.canvasAPI.stroke();
        this.canvasPaintAPI.stroke();
    }

    Paint.prototype.handlerMouseup = function (e) {
        this.isMove = false;
        this.emit('finished', 'i am finished !!');
    }

    /**
     * 
     * @param {any} canvasEl
     * @return {CanvasAPI}
     */
    Paint.prototype.initCanvas = function (canvasEl) {
        //1. getContext('2d') 获取画布环境
        return canvasEl.getContext('2d');
    }
    return Paint;
})(Core);



// 


