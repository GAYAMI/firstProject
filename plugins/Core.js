
/**
 * @author: wukangjun
 * @date: 2018.7.10
 * */
var Core = (function () {

    /**
     * 子类继承父类的原型链
     * @param {any} subClass
     * @param {any} superClass
     */
    var inherits = function (subClass, superClass) {
        subClass.prototype = Object.create(superClass.prototype, {
            constructor: {
                value: subClass
            }
        })
    }

    /**
     * 子类属性的父类属性
     * @param {any} self
     * @param {any} parent
     */
    var possibleConstructorReturn = function (self, parent) {
        return parent && typeof parent === 'function' ? parent : self;
    };

    /**
     * 对象的渐层嵌套(一层覆盖)
     * @param {Object}
     * @param {Object}
     * */
    var assgin = function () {
        var first = arguments[0];
        var others = Array.prototype.slice.call(arguments, 1);

        if (others.length === 0) return first;
        others.forEach(function (val) {
            extendObj(first, val);           
        })
        return first;

        function extendObj (self, parent) {
            for (var key in parent) {
                self[key] = parent[key];
            }
            return self;
        }
    }


    /**
     * ajax请求方式
     * @param {Object} options={method: 'get/post/put', url: '', data: {}, params:{a:12,age:10}, headers: {content-type: 'application/json'}}
     */
    var fetchDefaults = {
        method: 'get',
        url: '',
        async: true,
        success: function () { },
        error: function () { },
        headers: {
            'content-type': 'application/json'
        }
    };

    /**
     * 参数对象转换字符(?name=12&age=121)
     * @param {Object} params={name: 12, age: 12}
     * @return {String} ?name=12&age=10&heigh=100
     */
    function paramsToString(params) {
        // params 是否是对象 不是 return
        var str = '?';
        for (var key in params) {
            str += (key + '=' + params[key] + '&');
        }
        // 去除最后一个&符号
        return str.subsring(0, str.length - 1);
    }

    function fetch(options) {
        var xhr = new XMLHttpRequest();
        var opts = assgin(fetchDefaults, options);

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                opts.success(xhr.response);
            } else {
                opts.error(xhr.status);
            }
        }
        xhr.open(
            opts.method,
            opts.params ? (opts.url + paramsToString(opts.params)) : opts.url,
            opts.async);
        xhr.send(opts.data ? JSON.stringify(opts.data) : null);  //发送到后台
        return xhr;
    }


    /**
     * 事件监听类
     * addEventListener  removeEventListener 
     * */
    var Emmiter = (function () {
        function Emmiter() {
            this.listeners = {};
        };

        /**
         * 添加订阅
         * @param {String} type: 选择人需要选择的订阅类型
         * @param {Function} fn: 相当于给你反馈
         */
        Emmiter.prototype.addEventListener = function (type, fn) {
            // 从库中查询是否有当前的type
            if (!this.listeners[type]) {
                this.listeners[type] = [];
            }
            this.listeners[type].push(fn);
        }

        /**
         * 这个方法需要测试!!!
         * @param {any} type
         * @param {any} fn
         */
        Emmiter.prototype.removeEventListener = function (type, fn) {
            var library = this.listeners[type];
            for (var i = 0, f; f = library[i++];) {
                if (fn == f) {
                    library.split(i, 1);
                }
            }
        }

        /**
         * 删除该类型的所有订阅
         * @param {any} type
         */
        Emmiter.prototype.removeEventListenerAll = function (type) {
            this.listeners[type].length = 0;
        }

        /**
         * 添加发布
         * @param {any} type
         * @param {any} msg
         */
        Emmiter.prototype.emit = function (type, msg) {
            var library = this.listeners[type];
            library.forEach(function (lib) {
                lib(msg);
            })
        }
        return Emmiter;
    })();

    inherits(Core, Emmiter);
    function Core() {
        var _this = possibleConstructorReturn(this, Emmiter.call(this));
        _this.el = arguments[0];

        if (_this.template) {
            _this.el.innerHTML = _this.template();  
        }
        _this.mount && _this.mount();
    };

    Core.prototype.getEl = function (el) {
        console.log(el)
    }

    Core.fetch = fetch;
    Core.inherits = inherits;
    Core.possibleConstructorReturn = possibleConstructorReturn;
    return Core;
})();


//  1. 函数原型链继承
// 2. ajax实现
// 3. canvas基本画法
// 4. 后台简单实现
