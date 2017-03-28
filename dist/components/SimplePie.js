'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _Chart2 = require('./Chart');

var _Chart3 = _interopRequireDefault(_Chart2);

var _sortBy = require('lodash/sortBy');

var _sortBy2 = _interopRequireDefault(_sortBy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @typedef {Object} SimplePie
 * @property {Object} layout
 * @property {Object} plot
 * @property {Object} legend
 * @property {Function} mount
 * @property {Function} update
 * @property {Function} unmount
 * @property {Object} options
 */

var SimplePie = function (_Chart) {
  (0, _inherits3.default)(SimplePie, _Chart);

  /**
   * @param {Object} props
   * @param {string[]} props.labels - required
   * @param {number[]} props.valuess - required
   * @param {boolean} props.sorted - default false
   * @param {Object} props.colorScale - default new Plottable.Scales.Color()
   * @param {number} props.innerRadius - default 0
   * @param {number} props.outerRadius - default min(plot.height, plot.width) / 2
   * @param {Function} props.labelFormatter - optional
   * @param {('t'|'r'|'b'|'l'|'none')} props.legendPosition - default 'r'
   * @param {boolean} props.animated - default true
   * @param {Function} props.clickHandler - optional
   * @param {Function} props.hoverHandler - optional
   *
   * @return {SimplePie}
   */
  function SimplePie(props) {
    (0, _classCallCheck3.default)(this, SimplePie);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SimplePie.__proto__ || (0, _getPrototypeOf2.default)(SimplePie)).call(this));

    _this.options = {
      sorted: false,
      innerRadius: 0,
      legendPosition: 'none',
      animated: true
    };
    props = (0, _assign2.default)(_this.options, props);

    if (props.labels.length !== props.values.length) throw new Error();
    var data = props.values.map(function (v, i) {
      return { value: v, label: props.labels[i] };
    });
    if (props.sorted) data = (0, _sortBy2.default)(data, 'value');
    if (props.sorted === 'd') data.reverse();
    _this.dataset = new Plottable.Dataset(data);

    var total = data.reduce(function (sum, d) {
      return sum + d.value;
    }, 0);
    var scale = new Plottable.Scales.Linear().domain([0, total]);
    var colorScale = props.colorScale || new Plottable.Scales.Color();

    props.outerRadius = props.outerRadius || function (d) {
      return Math.min(_this.plot.width(), _this.plot.height()) / 2;
    };

    _this.plot = new Plottable.Plots.Pie().addClass('simple-pie-plot').addDataset(_this.dataset).sectorValue(function (d) {
      return d.value;
    }, scale).attr('fill', function (d) {
      return d.label;
    }, colorScale).labelsEnabled(false).innerRadius(props.innerRadius).outerRadius(props.outerRadius).animated(props.animated);

    if (props.labelFormatter) {
      _this.plot.labelFormatter(props.labelFormatter).labelsEnabled(true);
    }

    if (props.clickHandler) {
      new Plottable.Interactions.Click().onClick(function (point) {
        var target = _this.plot.entitiesAt(point)[0];
        props.clickHandler(target, _this.plot.entities());
      }).attachTo(_this.plot);
    }

    if (props.hoverHandler) {
      new Plottable.Interactions.Pointer().onPointerMove(function (point) {
        var target = _this.plot.entitiesAt(point)[0];
        props.hoverHandler(target, _this.plot.entities());
      }).onPointerExit(function (point) {
        props.hoverHandler(null, _this.plot.entities());
      }).attachTo(_this.plot);
    }

    _this.legend = new Plottable.Components.Legend(colorScale).xAlignment('center').yAlignment('center');
    if (props.legendPosition === 't') {
      _this.layout = new Plottable.Components.Table([[_this.legend.maxEntriesPerRow(Infinity)], [_this.plot]]).rowPadding(10);
    } else if (props.legendPosition === 'r') {
      _this.layout = new Plottable.Components.Table([[_this.plot, _this.legend]]).columnPadding(10);
    } else if (props.legendPosition === 'b') {
      _this.layout = new Plottable.Components.Table([[_this.plot], [_this.legend.maxEntriesPerRow(Infinity)]]).rowPadding(10);
    } else if (props.legendPosition === 'l') {
      _this.layout = new Plottable.Components.Table([[_this.legend, _this.plot]]).columnPadding(10);
    } else if (props.legendPosition === 'none') {
      _this.layout = _this.plot;
    }
    return _this;
  }

  (0, _createClass3.default)(SimplePie, [{
    key: 'update',
    value: function update(nextProps) {
      if (nextProps.labels.length !== nextProps.values.length) throw new Error();
      var data = nextProps.values.map(function (v, i) {
        return { value: v, label: nextProps.labels[i] };
      });
      if (this.options.sorted) data = (0, _sortBy2.default)(data, 'value');
      if (this.options.sorted === 'd') data.reverse();
      var total = data.reduce(function (sum, d) {
        return sum + d.value;
      }, 0);
      this.plot.sectorValue().scale.domain([0, total]);
      this.dataset.data(data);
      (0, _assign2.default)(this.options, {
        labels: nextProps.labels,
        values: nextProps.values
      });
      this.onUpdate(nextProps);
    }
  }]);
  return SimplePie;
}(_Chart3.default);

exports.default = SimplePie;