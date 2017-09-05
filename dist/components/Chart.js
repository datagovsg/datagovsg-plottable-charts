'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _throttle = require('lodash/throttle');

var _throttle2 = _interopRequireDefault(_throttle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Chart = function () {
  function Chart() {
    _classCallCheck(this, Chart);

    this.resizeHandler = (0, _throttle2.default)(this.resizeHandler, 200).bind(this);
    this._onMount = [];
    this._onUnmount = [];
    this._onUpdate = [];
    this._onResize = [];
  }

  _createClass(Chart, [{
    key: 'resizeHandler',
    value: function resizeHandler() {
      this.layout.redraw();
      this.onResize();
    }
  }, {
    key: 'mount',
    value: function mount(element) {
      this.layout.renderTo(element);
      window.addEventListener('resize', this.resizeHandler);
      this.onMount(element);
    }
  }, {
    key: 'unmount',
    value: function unmount() {
      this.onUnmount();
      window.removeEventListener('resize', this.resizeHandler);
      this.layout.detach();
    }
  }, {
    key: 'onMount',
    get: function get() {
      return function (element) {
        var _this = this;

        this._onMount.forEach(function (cb) {
          cb.call(_this, element);
        });
      };
    },
    set: function set(cb) {
      this._onMount.push(cb);
    }
  }, {
    key: 'onUnmount',
    get: function get() {
      return function (element) {
        var _this2 = this;

        this._onUnmount.forEach(function (cb) {
          cb.call(_this2);
        });
      };
    },
    set: function set(cb) {
      this._onUnmount.push(cb);
    }
  }, {
    key: 'onUpdate',
    get: function get() {
      return function (nextProps) {
        var _this3 = this;

        Plottable.Utils.DOM.requestAnimationFramePolyfill(function () {
          _this3._onUpdate.forEach(function (cb) {
            cb.call(_this3, nextProps);
          });
        });
      };
    },
    set: function set(cb) {
      this._onUpdate.push(cb);
    }
  }, {
    key: 'onResize',
    get: function get() {
      return function () {
        var _this4 = this;

        Plottable.Utils.DOM.requestAnimationFramePolyfill(function () {
          _this4._onResize.forEach(function (cb) {
            cb.call(_this4);
          });
        });
      };
    },
    set: function set(cb) {
      this._onResize.push(cb);
    }
  }]);

  return Chart;
}();

exports.default = Chart;