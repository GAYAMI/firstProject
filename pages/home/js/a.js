var HomeHeader = (function (_Core) {
    // �̳���Core���ԭ��
    _Core.inherits(HomeHeader, _Core);

    function HomeHeader() {
        // ���Լ̳�
        var _this = _Core.possibleConstructorReturn(this, _Core.apply(this, arguments));  
        _this.paint = new Paint(document.getElementById('canvas_area'));
    };

    return HomeHeader;
})(Core);


window.onload = function () {
    var home = new HomeHeader(document.getElementById('app'));
}


