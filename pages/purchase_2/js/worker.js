document.write("<script language = javascript scr='/js/human.js`></script>");
var worker = (function (_human) {
    var worker_1 = new _human();

    function worker(name) {
        _human.call(this);
        this.name = name || 'sb.'
        this.job = 'engineer';
        this.workplace = 'Shanghai';

    };
    worker.prototype = worker_1.__proto__;
    worker.prototype.getwork = function () {

    }
    worker.prototype.getworkplace = function () {
        console.log('not bad')
    }
    var a = new worker('sella');
    console.log(a);
    return worker;
})(human);