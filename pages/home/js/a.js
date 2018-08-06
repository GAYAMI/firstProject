var HomeHeader = (function (_Core) {
    // 继承了Core类的原型
    _Core.inherits(HomeHeader, _Core);

    function HomeHeader() {
        // 属性继承
        var _this = _Core.possibleConstructorReturn(this, _Core.apply(this, arguments));  
        _this.paint = new Paint(document.getElementById('canvas_area'));
    };

    return HomeHeader;
})(Core);


window.onload = function () {
    var home = new HomeHeader(document.getElementById('app'));
}


