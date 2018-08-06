var human = (function () {
    function human(Name) {
        this.name = Name || 'hello';
        this.height = 180;
        this.weight = 60;
        this.eyes = 'big';
    };

    human.prototype.getheight = function () {

    }
    human.prototype.getweight = function () {

    }
    console.log(human);
    var a = new human('Tom');
    console.log(a);
    return human;
})();