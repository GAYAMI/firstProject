
/**
 * @author: wukangjun
 * @date: 2018.7.10
 * */
var Core = (function () {

    /**
     * ����̳и����ԭ����
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
     * �������Եĸ�������
     * @param {any} self
     * @param {any} parent
     */
    var possibleConstructorReturn = function (self, parent) {
        return parent && typeof parent === 'function' ? parent : self;
    };

    /**
     * ����Ľ���Ƕ��(һ�㸲��)
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
     * ajax����ʽ
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
     * ��������ת���ַ�(?name=12&age=121)
     * @param {Object} params={name: 12, age: 12}
     * @return {String} ?name=12&age=10&heigh=100
     */
    function paramsToString(params) {
        // params �Ƿ��Ƕ��� ���� return
        var str = '?';
        for (var key in params) {
            str += (key + '=' + params[key] + '&');
        }
        // ȥ�����һ��&����
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
        xhr.send(opts.data ? JSON.stringify(opts.data) : null);  //���͵���̨
        return xhr;
    }


    /**
     * �¼�������
     * addEventListener  removeEventListener 
     * */
    var Emmiter = (function () {
        function Emmiter() {
            this.listeners = {};
        };

        /**
         * ��Ӷ���
         * @param {String} type: ѡ������Ҫѡ��Ķ�������
         * @param {Function} fn: �൱�ڸ��㷴��
         */
        Emmiter.prototype.addEventListener = function (type, fn) {
            // �ӿ��в�ѯ�Ƿ��е�ǰ��type
            if (!this.listeners[type]) {
                this.listeners[type] = [];
            }
            this.listeners[type].push(fn);
        }

        /**
         * ���������Ҫ����!!!
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
         * ɾ�������͵����ж���
         * @param {any} type
         */
        Emmiter.prototype.removeEventListenerAll = function (type) {
            this.listeners[type].length = 0;
        }

        /**
         * ��ӷ���
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


//  1. ����ԭ�����̳�
// 2. ajaxʵ��
// 3. canvas��������
// 4. ��̨��ʵ��
