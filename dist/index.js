'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DatagovsgStackedBar = exports.DatagovsgGroupedBar = exports.DatagovsgHorizontalBar = exports.DatagovsgSimpleBar = exports.DatagovsgSimplePie = exports.MultipleLine = exports.StackedBar = exports.GroupedBar = exports.SimpleBar = exports.SimplePie = undefined;

var _SimplePie2 = require('./components/SimplePie');

var _SimplePie3 = _interopRequireDefault(_SimplePie2);

var _SimpleBar3 = require('./components/SimpleBar');

var _SimpleBar4 = _interopRequireDefault(_SimpleBar3);

var _GroupedBar2 = require('./components/GroupedBar');

var _GroupedBar3 = _interopRequireDefault(_GroupedBar2);

var _StackedBar2 = require('./components/StackedBar');

var _StackedBar3 = _interopRequireDefault(_StackedBar2);

var _MultipleLine = require('./components/MultipleLine');

var _MultipleLine2 = _interopRequireDefault(_MultipleLine);

var _plugins = require('./plugins');

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.SimplePie = _SimplePie3.default;
exports.SimpleBar = _SimpleBar4.default;
exports.GroupedBar = _GroupedBar3.default;
exports.StackedBar = _StackedBar3.default;
exports.MultipleLine = _MultipleLine2.default;

var DatagovsgSimplePie = exports.DatagovsgSimplePie = function (_SimplePie) {
  _inherits(DatagovsgSimplePie, _SimplePie);

  function DatagovsgSimplePie(props) {
    _classCallCheck(this, DatagovsgSimplePie);

    var _this = _possibleConstructorReturn(this, (DatagovsgSimplePie.__proto__ || Object.getPrototypeOf(DatagovsgSimplePie)).call(this, props));

    (0, _plugins.highlightOnHover)(_this);
    (0, _plugins.setupOuterLabel)(_this, { labelFormatter: function labelFormatter(d) {
        return d.label;
      } });
    return _this;
  }

  return DatagovsgSimplePie;
}(_SimplePie3.default);

var DatagovsgSimpleBar = exports.DatagovsgSimpleBar = function (_SimpleBar) {
  _inherits(DatagovsgSimpleBar, _SimpleBar);

  function DatagovsgSimpleBar(props) {
    _classCallCheck(this, DatagovsgSimpleBar);

    props = Object.assign({
      fill: _helpers.DATAGOVSG_COLORS[0],
      scale: (0, _helpers.getScale)(),
      categoryScale: (0, _helpers.getCategoryScale)(),
      showXgridlines: true
    }, props);

    var _this2 = _possibleConstructorReturn(this, (DatagovsgSimpleBar.__proto__ || Object.getPrototypeOf(DatagovsgSimpleBar)).call(this, props));

    (0, _plugins.highlightOnHover)(_this2);

    // post-process
    _this2.xAxis.tickLabelPadding(5);
    _this2.yAxis.margin(0).innerTickLength(0).endTickLength(0).tickLabelPadding(0).showEndTickLabels(true).addClass('hide-baseline').formatter((0, _helpers.getCustomShortScaleFormatter)());
    // hack to show end tick labels
    _this2.xAxis._hideOverflowingTickLabels = function () {
      return null;
    };
    _this2.yAxis._hideOverflowingTickLabels = function () {
      return null;
    };
    return _this2;
  }

  return DatagovsgSimpleBar;
}(_SimpleBar4.default);

var DatagovsgHorizontalBar = exports.DatagovsgHorizontalBar = function (_SimpleBar2) {
  _inherits(DatagovsgHorizontalBar, _SimpleBar2);

  function DatagovsgHorizontalBar(props) {
    _classCallCheck(this, DatagovsgHorizontalBar);

    props = Object.assign({
      orientation: 'h',
      sorted: 'd',
      fill: _helpers.DATAGOVSG_COLORS[0],
      scale: (0, _helpers.getScale)(),
      categoryScale: (0, _helpers.getCategoryScale)(),
      showXgridlines: true
    }, props);

    var _this3 = _possibleConstructorReturn(this, (DatagovsgHorizontalBar.__proto__ || Object.getPrototypeOf(DatagovsgHorizontalBar)).call(this, props));

    (0, _plugins.highlightOnHover)(_this3);

    // post-process
    _this3.xAxis.margin(0).innerTickLength(0).endTickLength(0).tickLabelPadding(0).showEndTickLabels(true).addClass('hide-baseline').formatter((0, _helpers.getCustomShortScaleFormatter)());
    _this3.yAxis.tickLabelPadding(5);
    // hack to show end tick labels
    _this3.xAxis._hideOverflowingTickLabels = function () {
      return null;
    };
    return _this3;
  }

  return DatagovsgHorizontalBar;
}(_SimpleBar4.default);

var DatagovsgGroupedBar = exports.DatagovsgGroupedBar = function (_GroupedBar) {
  _inherits(DatagovsgGroupedBar, _GroupedBar);

  function DatagovsgGroupedBar(props) {
    _classCallCheck(this, DatagovsgGroupedBar);

    props = Object.assign({
      scale: (0, _helpers.getScale)(),
      categoryScale: (0, _helpers.getCategoryScale)(),
      colorScale: (0, _helpers.getColorScale)(),
      showYgridlines: true
    }, props);

    var _this4 = _possibleConstructorReturn(this, (DatagovsgGroupedBar.__proto__ || Object.getPrototypeOf(DatagovsgGroupedBar)).call(this, props));

    (0, _plugins.downsampleTicks)(_this4);
    (0, _plugins.removeInnerPadding)(_this4);

    _this4.xAxis.margin(2).tickLabelPadding(0);
    _this4.yAxis.margin(0).innerTickLength(0).endTickLength(0).tickLabelPadding(5).showEndTickLabels(true).addClass('hide-baseline').formatter((0, _helpers.getCustomShortScaleFormatter)());
    // hack to show end tick labels
    _this4.xAxis._hideOverflowingTickLabels = function () {
      return null;
    };
    _this4.yAxis._hideOverflowingTickLabels = function () {
      return null;
    };
    return _this4;
  }

  return DatagovsgGroupedBar;
}(_GroupedBar3.default);

var DatagovsgStackedBar = exports.DatagovsgStackedBar = function (_StackedBar) {
  _inherits(DatagovsgStackedBar, _StackedBar);

  function DatagovsgStackedBar(props) {
    _classCallCheck(this, DatagovsgStackedBar);

    props = Object.assign({
      scale: (0, _helpers.getScale)(),
      categoryScale: (0, _helpers.getCategoryScale)(),
      colorScale: (0, _helpers.getColorScale)(),
      showYgridlines: true
    }, props);

    var _this5 = _possibleConstructorReturn(this, (DatagovsgStackedBar.__proto__ || Object.getPrototypeOf(DatagovsgStackedBar)).call(this, props));

    (0, _plugins.downsampleTicks)(_this5);
    (0, _plugins.removeInnerPadding)(_this5);

    _this5.xAxis.margin(2).tickLabelPadding(0);
    _this5.yAxis.margin(0).innerTickLength(0).endTickLength(0).tickLabelPadding(5).showEndTickLabels(true).addClass('hide-baseline').formatter((0, _helpers.getCustomShortScaleFormatter)());
    // hack to show end tick labels
    _this5.xAxis._hideOverflowingTickLabels = function () {
      return null;
    };
    _this5.yAxis._hideOverflowingTickLabels = function () {
      return null;
    };
    return _this5;
  }

  return DatagovsgStackedBar;
}(_StackedBar3.default);