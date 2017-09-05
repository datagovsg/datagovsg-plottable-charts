'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Chart2 = require('./Chart');

var _Chart3 = _interopRequireDefault(_Chart2);

var _sortBy = require('lodash/sortBy');

var _sortBy2 = _interopRequireDefault(_sortBy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
  _inherits(SimplePie, _Chart);

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
    _classCallCheck(this, SimplePie);

    var _this = _possibleConstructorReturn(this, (SimplePie.__proto__ || Object.getPrototypeOf(SimplePie)).call(this));

    _this.options = {
      sorted: false,
      innerRadius: 0,
      legendPosition: 'none',
      animated: true
    };
    props = Object.assign(_this.options, props);

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

  _createClass(SimplePie, [{
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
      Object.assign(this.options, {
        labels: nextProps.labels,
        values: nextProps.values
      });
      this.onUpdate(nextProps);
    }
  }]);

  return SimplePie;
}(_Chart3.default);

exports.default = SimplePie;