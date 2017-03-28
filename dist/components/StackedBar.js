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

var _helpers = require('../helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @typedef {Object} StackedBar
 * @property {Object} layout
 * @property {Object} plot
 * @property {Object} legend
 * @property {Object} xAxis
 * @property {Object} yAxis
 * @property {Object} xLabel
 * @property {Object} yLabel
 * @property {Object} gridlines
 * @property {Function} mount
 * @property {Function} update
 * @property {Function} unmount
 * @property {Object} options
 */

var StackedBar = function (_Chart) {
  (0, _inherits3.default)(StackedBar, _Chart);

  /**
   * @param {Object} props
   * @param {string[]} props.labels - required
   * @param {Object[]} props.traces - required
   * @param {string[]} props.traces.labels - required
   * @param {number[]} props.traces.valuess - required
   * @param {Object} props.scale - default new Plottable.Scales.Linear()
   * @param {Object} props.categoryScale - default new Plottable.Scales.Category()
   * @param {Object} props.colorScale - default new Plottable.Scales.Color()
   * @param {('h'|'v')} props.orientation - default 'h'
   * @param {number} props.baselineValue - default 0
   * @param {Function} props.labelFormatter - optional
   * @param {boolean} props.hideXaxis - default false
   * @param {boolean} props.hideYaxis - default false
   * @param {boolean} props.showXgridlines - default false
   * @param {boolean} props.showYgridlines - default false
   * @param {('t'|'r'|'b'|'l'|'none')} props.legendPosition - default 'r'
   * @param {string} props.xLabel - optional
   * @param {string} props.yLabel - optional
   * @param {boolean} props.animated - default true
   * @param {Function} props.clickHandler - optional
   * @param {Function} props.hoverHandler - optional
   *
   * @return {StackedBar}
   */
  function StackedBar(props) {
    (0, _classCallCheck3.default)(this, StackedBar);

    var _this = (0, _possibleConstructorReturn3.default)(this, (StackedBar.__proto__ || (0, _getPrototypeOf2.default)(StackedBar)).call(this));

    _this.options = {
      orientation: 'v',
      baselineValue: 0,
      hideXaxis: false,
      hideYaxis: false,
      showXgridlines: false,
      showYgridlines: false,
      legendPosition: 'r',
      animated: true
    };
    props = (0, _assign2.default)(_this.options, props);

    if (props.labels.length !== props.traces.length) throw new Error();
    _this.datasets = props.traces.map(function (t, i) {
      if (t.labels.length !== t.values.length) throw new Error();
      var data = t.values.map(function (v, i) {
        return { value: v, label: t.labels[i] };
      });
      return new Plottable.Dataset(data).metadata(props.labels[i]);
    });

    var scale = props.scale || new Plottable.Scales.Linear();
    var categoryScale = props.categoryScale || new Plottable.Scales.Category();
    var colorScale = props.colorScale || new Plottable.Scales.Color();

    var horizontal = props.orientation === 'h';
    var plotType = horizontal ? Plottable.Plots.Bar.ORIENTATION_HORIZONTAL : Plottable.Plots.Bar.ORIENTATION_VERTICAL;
    _this.plot = new Plottable.Plots.StackedBar(plotType).attr('fill', function (d, i, dataset) {
      return dataset.metadata();
    }, colorScale).labelsEnabled(false).animated(props.animated).baselineValue(props.baselineValue);
    _this.plot[horizontal ? 'x' : 'y'](function (d) {
      return d.value;
    }, scale);
    _this.plot[horizontal ? 'y' : 'x'](function (d) {
      return d.label;
    }, categoryScale);
    _this.datasets.forEach(function (dataset) {
      _this.plot.addDataset(dataset);
    });

    if (props.labelFormatter) {
      _this.plot.labelFormatter(_this.props.labelFormatter).labelsEnabled(true);
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

    var plotArea = void 0;
    if (props.showXgridlines || props.showYgridlines) {
      var xScale = props.showXgridlines && horizontal ? scale : null;
      var yScale = props.showYgridlines && !horizontal ? scale : null;
      _this.gridlines = new Plottable.Components.Gridlines(xScale, yScale);
      plotArea = new Plottable.Components.Group([_this.plot, _this.gridlines]);
    } else {
      plotArea = _this.plot;
    }

    var _layout = new Plottable.Components.Table([[null, null, plotArea], [null, null, null], [null, null, null]]);
    if (!props.hideXaxis) {
      if (horizontal) {
        _this.xAxis = new Plottable.Axes.Numeric(scale, 'bottom').formatter((0, _helpers.getCustomShortScaleFormatter)());
      } else {
        _this.xAxis = categoryScale instanceof Plottable.Scales.Time ? new Plottable.Axes.Time(categoryScale, 'bottom') : new Plottable.Axes.Category(categoryScale, 'bottom');
      }
      _layout.add(_this.xAxis, 1, 2);
    }
    if (!props.hideYaxis) {
      if (horizontal) {
        _this.yAxis = categoryScale instanceof Plottable.Scales.Time ? new Plottable.Axes.Time(categoryScale, 'left') : new Plottable.Axes.Category(categoryScale, 'left');
      } else {
        _this.yAxis = new Plottable.Axes.Numeric(scale, 'left').formatter((0, _helpers.getCustomShortScaleFormatter)());
      }
      _layout.add(_this.yAxis, 0, 1);
    }
    if (props.xLabel) {
      _layout.add(new Plottable.Components.AxisLabel(props.xLabel), 2, 2);
    }
    if (props.yLabel) {
      _layout.add(new Plottable.Components.AxisLabel(props.yLabel, -90), 0, 0);
    }

    _this.legend = new Plottable.Components.Legend(colorScale).xAlignment('center').yAlignment('center');
    if (props.legendPosition === 't') {
      _this.layout = new Plottable.Components.Table([[_this.legend.maxEntriesPerRow(Infinity)], [_layout]]).rowPadding(10);
    } else if (props.legendPosition === 'r') {
      _this.layout = new Plottable.Components.Table([[_layout, _this.legend]]).columnPadding(10);
    } else if (props.legendPosition === 'b') {
      _this.layout = new Plottable.Components.Table([[_layout], [_this.legend.maxEntriesPerRow(Infinity)]]).rowPadding(10);
    } else if (props.legendPosition === 'l') {
      _this.layout = new Plottable.Components.Table([[_this.legend, _layout]]).columnPadding(10);
    } else if (props.legendPosition === 'none') {
      _this.layout = _layout;
    }
    return _this;
  }

  (0, _createClass3.default)(StackedBar, [{
    key: 'update',
    value: function update(nextProps) {
      if (nextProps.labels.length !== nextProps.traces.length) throw new Error();
      this.datasets = nextProps.traces.map(function (t, i) {
        if (t.labels.length !== t.values.length) throw new Error();
        var data = t.values.map(function (v, i) {
          return { value: v, label: t.labels[i] };
        });
        return new Plottable.Dataset(data).metadata(nextProps.labels[i]);
      });
      this.plot.datasets(this.datasets);
      var colorScale = nextProps.colorScale || new Plottable.Scales.Color();
      this.plot.attr('fill', function (d, i, dataset) {
        return dataset.metadata();
      }, colorScale);
      this.legend.colorScale(colorScale);
      (0, _assign2.default)(this.options, {
        labels: nextProps.labels,
        traces: nextProps.traces,
        colorScale: nextProps.colorScale
      });
      this.onUpdate(nextProps);
    }
  }]);
  return StackedBar;
}(_Chart3.default);

exports.default = StackedBar;