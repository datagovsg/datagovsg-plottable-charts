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
 * @typedef {Object} MultipleLine
 * @property {Object} layout
 * @property {Object} plot.lines
 * @property {Object} plot.markers
 * @property {Object} legend
 * @property {Object} xAxis
 * @property {Object} yAxis
 * @property {Object} xLabel
 * @property {Object} yLabel
 * @property {Object} gridlines
 * @property {Object} guideLine.horizontal
 * @property {Object} guideLine.vertical
 * @property {Function} mount
 * @property {Function} update
 * @property {Function} unmount
 * @property {Object} options
 */

var MultipleLine = function (_Chart) {
  (0, _inherits3.default)(MultipleLine, _Chart);

  /**
   * @param {Object} props
   * @param {string[]} props.labels - required
   * @param {Object[]} props.traces - required
   * @param {number[]} props.traces.x- required
   * @param {number[]} props.traces.y - required
   * @param {Object} props.xScale - default new Plottable.Scales.Linear()
   * @param {Object} props.yScale - default new Plottable.Scales.Linear()
   * @param {Object} props.colorScale - default new Plottable.Scales.Color()
   * @param {number} props.strokeWidth - default 2
   * @param {number} props.markerSize - default 0
   * @param {boolean} props.hideXaxis - default false
   * @param {boolean} props.hideYaxis - default false
   * @param {boolean} props.showXgridlines - default false
   * @param {boolean} props.showYgridlines - default false
   * @param {('v'|'h'|'vh'|'hv'|'none')} props.guideLine - default 'none'
   * @param {('t'|'r'|'b'|'l'|'none')} props.legendPosition - default 'r'
   * @param {string} props.xLabel - optional
   * @param {string} props.yLabel - optional
   * @param {Function} props.clickHandler - optional
   * @param {Function} props.hoverHandler - optional
   *
   * @return {MultipleLine}
   */
  function MultipleLine(props) {
    (0, _classCallCheck3.default)(this, MultipleLine);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MultipleLine.__proto__ || (0, _getPrototypeOf2.default)(MultipleLine)).call(this));

    _this.options = {
      strokeWidth: 2,
      markerSize: 0,
      hideXaxis: false,
      hideYaxis: false,
      showXgridlines: false,
      showYgridlines: false,
      guideLine: 'none',
      legendPosition: 'r'
    };
    props = (0, _assign2.default)(_this.options, props);

    if (props.labels.length !== props.traces.length) throw new Error();
    _this.datasets = props.traces.map(function (t, i) {
      if (t.x.length !== t.y.length) throw new Error();
      var data = t.y.map(function (v, i) {
        return { value: v, label: t.x[i] };
      });
      return new Plottable.Dataset(data, props.labels[i]);
    });

    var xScale = props.xScale || new Plottable.Scales.Linear();
    var yScale = props.yScale || new Plottable.Scales.Linear();
    var colorScale = props.colorScale || new Plottable.Scales.Color();

    _this.plot = {
      lines: new Plottable.Plots.Line().attr('stroke', function (d, i, dataset) {
        return dataset.metadata();
      }, colorScale).x(function (d) {
        return d.label;
      }, xScale).y(function (d) {
        return d.value;
      }, yScale).attr('stroke-width', props.strokeWidth),
      markers: new Plottable.Plots.Scatter().attr('opacity', 1).attr('fill', function (d, i, dataset) {
        return dataset.metadata();
      }, colorScale).x(function (d) {
        return d.label;
      }, xScale).y(function (d) {
        return d.value;
      }, yScale).size(props.markerSize)
    };

    _this.datasets.forEach(function (dataset) {
      _this.plot.lines.addDataset(dataset);
      _this.plot.markers.addDataset(dataset);
    });

    if (props.clickHandler) {
      new Plottable.Interactions.Click().onClick(function (point) {
        var target = _this.plot.markers.entityNearest(point);
        props.clickHandler(target, _this.plot.markers.entities());
      }).attachTo(_this.plot.markers);
    }

    if (props.hoverHandler) {
      new Plottable.Interactions.Pointer().onPointerMove(function (point) {
        var target = _this.plot.markers.entityNearest(point);
        props.hoverHandler(target, _this.plot.markers.entities());
      }).onPointerExit(function (point) {
        props.hoverHandler(null, _this.plot.markers.entities());
      }).attachTo(_this.plot.markers);
    }

    _this.gridlines = new Plottable.Components.Gridlines(props.showXgridlines && xScale instanceof Plottable.QuantitativeScale ? xScale : null, props.showYgridlines && yScale instanceof Plottable.QuantitativeScale ? yScale : null);

    _this.guideLine = { horizontal: null, vertical: null };

    if (['v', 'vh', 'hv'].indexOf(props.guideLine) > -1) {
      _this.guideLine.vertical = new Plottable.Components.GuideLineLayer(Plottable.Components.GuideLineLayer.ORIENTATION_VERTICAL).scale(xScale);
      new Plottable.Interactions.Pointer().onPointerMove(function (point) {
        var target = _this.plot.markers.entityNearest(point);
        if (target) {
          _this.guideLine.vertical.value(target.datum.label);
          _this.guideLine.vertical.content().style('visibility', 'visible');
        } else {
          _this.guideLine.vertical.content().style('visibility', 'hidden');
        }
      }).onPointerExit(function (point) {
        _this.guideLine.vertical.content().style('visibility', 'hidden');
      }).attachTo(_this.plot.markers);
      _this.onMount = function (element) {
        this.guideLine.vertical.content().style('visibility', 'hidden');
      };
    }
    if (['h', 'vh', 'hv'].indexOf(props.guideLine) > -1) {
      _this.guideLine.horizontal = new Plottable.Components.GuideLineLayer(Plottable.Components.GuideLineLayer.ORIENTATION_HORIZONTAL).scale(yScale);
      new Plottable.Interactions.Pointer().onPointerMove(function (point) {
        var target = _this.plot.markers.entityNearest(point);
        if (target) {
          _this.guideLine.horizontal.value(target.datum.value);
          _this.guideLine.horizontal.content().style('visibility', 'visible');
        } else {
          _this.guideLine.horizontal.content().style('visibility', 'hidden');
        }
      }).onPointerExit(function (point) {
        _this.guideLine.horizontal.content().style('visibility', 'hidden');
      }).attachTo(_this.plot.markers);
      _this.onMount = function (element) {
        this.guideLine.horizontal.content().style('visibility', 'hidden');
      };
    }

    var plotArea = new Plottable.Components.Group([_this.gridlines, _this.guideLine.horizontal, _this.guideLine.vertical, _this.plot.lines, _this.plot.markers]);

    _this.legend = new Plottable.Components.Legend(colorScale).xAlignment('center').yAlignment('center');

    var _layout = new Plottable.Components.Table([[null, null, plotArea], [null, null, null], [null, null, null]]);
    if (!props.hideXaxis) {
      if (xScale instanceof Plottable.Scales.Time) {
        _this.xAxis = new Plottable.Axes.Time(xScale, 'bottom');
      } else if (xScale instanceof Plottable.QuantitativeScale) {
        _this.xAxis = new Plottable.Axes.Numeric(xScale, 'bottom').formatter((0, _helpers.getCustomShortScaleFormatter)());
      } else {
        _this.xAxis = new Plottable.Axes.Category(xScale, 'bottom');
      }
      _layout.add(_this.xAxis, 1, 2);
    }
    if (!props.hideYaxis) {
      if (yScale instanceof Plottable.Scales.Time) {
        _this.yAxis = new Plottable.Axes.Time(yScale, 'left');
      } else if (yScale instanceof Plottable.QuantitativeScale) {
        _this.yAxis = new Plottable.Axes.Numeric(yScale, 'left').formatter((0, _helpers.getCustomShortScaleFormatter)());
      } else {
        _this.yAxis = new Plottable.Axes.Category(yScale, 'left');
      }
      _layout.add(_this.yAxis, 0, 1);
    }
    if (props.xLabel) {
      _layout.add(new Plottable.Components.AxisLabel(props.xLabel), 2, 2);
    }
    if (props.yLabel) {
      _layout.add(new Plottable.Components.AxisLabel(props.yLabel, -90), 0, 0);
    }

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

  (0, _createClass3.default)(MultipleLine, [{
    key: 'update',
    value: function update(nextProps) {
      if (nextProps.labels.length !== nextProps.traces.length) throw new Error();
      this.datasets = nextProps.traces.map(function (t, i) {
        if (t.x.length !== t.y.length) throw new Error();
        var data = t.y.map(function (v, i) {
          return { value: v, label: t.x[i] };
        });
        return new Plottable.Dataset(data).metadata(nextProps.labels[i]);
      });
      (0, _assign2.default)(this.options, {
        labels: nextProps.labels,
        traces: nextProps.traces
      });
      this.onUpdate(nextProps);
    }
  }]);
  return MultipleLine;
}(_Chart3.default);

exports.default = MultipleLine;