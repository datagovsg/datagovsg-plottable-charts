'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Chart2 = require('./Chart');

var _Chart3 = _interopRequireDefault(_Chart2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @typedef {Object} GroupedBar
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

var GroupedBar = function (_Chart) {
  _inherits(GroupedBar, _Chart);

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
   * @param {('t'|'r'|'b'|'l'|'none')} props.legendPosition - default 'none'
   * @param {string} props.xLabel - optional
   * @param {string} props.yLabel - optional
   * @param {boolean} props.animated - default true
   * @param {Function} props.clickHandler - optional
   * @param {Function} props.hoverHandler - optional
   *
   * @return {GroupedBar}
   */
  function GroupedBar(props) {
    _classCallCheck(this, GroupedBar);

    var _this = _possibleConstructorReturn(this, (GroupedBar.__proto__ || Object.getPrototypeOf(GroupedBar)).call(this));

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
    props = Object.assign(_this.options, props);

    _this.datasets = props.data.map(function (t) {
      return new Plottable.Dataset(t.series, t.label);
    });

    var scale = props.scale || new Plottable.Scales.Linear();
    var categoryScale = props.categoryScale || new Plottable.Scales.Category();
    var colorScale = props.colorScale || new Plottable.Scales.Color();

    var horizontal = props.orientation === 'h';
    var plotType = horizontal ? Plottable.Plots.Bar.ORIENTATION_HORIZONTAL : Plottable.Plots.Bar.ORIENTATION_VERTICAL;
    _this.plot = new Plottable.Plots.ClusteredBar(plotType).attr('fill', function (d, i, dataset) {
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

    var plotArea = void 0;
    if (props.showXgridlines || props.showYgridlines) {
      var xScale = props.showXgridlines && horizontal ? scale : null;
      var yScale = props.showYgridlines && !horizontal ? scale : null;
      _this.gridlines = new Plottable.Components.Gridlines(xScale, yScale);
      plotArea = new Plottable.Components.Group([_this.gridlines, _this.plot]);
    } else {
      plotArea = _this.plot;
    }

    var _layout = new Plottable.Components.Table([[null, null, plotArea], [null, null, null], [null, null, null]]);
    if (!props.hideXaxis) {
      if (horizontal) {
        _this.xAxis = new Plottable.Axes.Numeric(scale, 'bottom');
      } else {
        _this.xAxis = categoryScale instanceof Plottable.Scales.Time ? new Plottable.Axes.Time(categoryScale, 'bottom') : new Plottable.Axes.Category(categoryScale, 'bottom');
      }
      _layout.add(_this.xAxis, 1, 2);
    }
    if (!props.hideYaxis) {
      if (horizontal) {
        _this.yAxis = categoryScale instanceof Plottable.Scales.Time ? new Plottable.Axes.Time(categoryScale, 'left') : new Plottable.Axes.Category(categoryScale, 'left');
      } else {
        _this.yAxis = new Plottable.Axes.Numeric(scale, 'left');
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

  _createClass(GroupedBar, [{
    key: 'update',
    value: function update(nextProps) {
      this.datasets = nextProps.data.map(function (t) {
        return new Plottable.Dataset(t.items, t.label);
      });
      this.plot.datasets(this.datasets);
      if (nextProps.colorScale) {
        this.plot.attr('fill', function (d, i, dataset) {
          return dataset.metadata();
        }, nextProps.colorScale);
        this.legend.colorScale(nextProps.colorScale);
      }
      Object.assign(this.options, {
        data: nextProps.data,
        colorScale: nextProps.colorScale });
      this.onUpdate(nextProps);
    }
  }]);

  return GroupedBar;
}(_Chart3.default);

exports.default = GroupedBar;