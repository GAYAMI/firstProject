document.write("<script language = javascript scr='/js/worker.js`></script>");
var manager = (function (_worker) {
    var manager_1 = new _worker;
    function manager(name) {
        _worker.call(this);
        this.name = name || 'sb.'
        this.job = 'manager';
        this.leadworkers = new Array();
        leadworkers[0] = 'aaa';
        leadworkers[1] = 'bbb';
        leadworders[3] = 'ccc';
    }
    manager.prototype = manager.__proto__;
    manager.prototype.getleadworkers = function () {

    }
    console.log(manager);
    return manager;
})(worker);
