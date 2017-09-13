'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DATAGOVSG_COLORS = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.getScale = getScale;
exports.getCategoryScale = getCategoryScale;
exports.getColorScale = getColorScale;
exports.getTimeScale = getTimeScale;
exports.getCustomShortScaleFormatter = getCustomShortScaleFormatter;
exports.getCustomTickGenerator = getCustomTickGenerator;

var _range = require('lodash/range');

var _range2 = _interopRequireDefault(_range);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DATAGOVSG_COLORS = exports.DATAGOVSG_COLORS = ['#C64D26', '#FF7733', '#415961', '#65828A', '#B2D0D8', '#DAE3E8'];

function getScale() {
  return new Plottable.Scales.Linear().tickGenerator(getCustomTickGenerator());
}

function getCategoryScale(type) {
  if (type === 'timeseries') {
    return new Plottable.Scales.Time();
  } else {
    return new Plottable.Scales.Category().outerPadding(0.2);
  }
}

function getColorScale() {
  return new Plottable.Scales.Color().range(DATAGOVSG_COLORS);
}

function getTimeScale() {
  var scale = new Plottable.Scales.Time();

  // override to get Plottable to work with Moment object instead of Date object
  scale._expandSingleValueDomain = function (singleValueDomain) {
    var startTime = singleValueDomain[0].toDate().getTime();
    var endTime = singleValueDomain[1].toDate().getTime();
    if (startTime === endTime) {
      var startDate = new Date(startTime);
      startDate.setDate(startDate.getDate() - 1);
      var endDate = new Date(endTime);
      endDate.setDate(endDate.getDate() + 1);
      return [startDate, endDate];
    }
    return singleValueDomain;
  };

  return scale;
}

function getCustomShortScaleFormatter() {
  var defaultFormatter = Plottable.Formatters.shortScale();

  return function (str) {
    var formatted = defaultFormatter(str);
    if (formatted.indexOf('.') > -1) {
      formatted = formatted.replace(/\.?(0*|0{3}\d*)([KMBTQ]?)$/, '$2');
    }
    if (formatted === '-0') formatted = '0';
    return formatted;
  };
}

function getCustomTickGenerator() {
  return function (scale) {
    var _scale$domain = scale.domain(),
        _scale$domain2 = _slicedToArray(_scale$domain, 2),
        domainMin = _scale$domain2[0],
        domainMax = _scale$domain2[1];

    var domainRange = domainMax - domainMin;
    var nearestPower = Math.pow(10, Math.floor(Math.log(domainRange) / Math.LN10));
    var factor = domainRange / nearestPower / 4;
    factor = [2, 1, 0.5, 0.2].filter(function (v) {
      return v <= factor;
    })[0];
    var interval = nearestPower * (factor * 10) / 10;
    var firstTick = Math.ceil(domainMin / interval);
    var lastTick = Math.floor(domainMax / interval);
    return (0, _range2.default)(firstTick, lastTick + 1).map(function (v) {
      return v * interval;
    });
  };
}