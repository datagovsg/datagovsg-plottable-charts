'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _throttle = require('lodash/throttle');

var _throttle2 = _interopRequireDefault(_throttle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Chart = function () {
  function Chart() {
    (0, _classCallCheck3.default)(this, Chart);

    this.resizeHandler = (0, _throttle2.default)(this.resizeHandler, 200).bind(this);
    this._onMount = [];
    this._onUnmount = [];
    this._onUpdate = [];
    this._onResize = [];
  }

  (0, _createClass3.default)(Chart, [{
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