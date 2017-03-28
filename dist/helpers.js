'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.getCustomShortScaleFormatter = getCustomShortScaleFormatter;
exports.getCustomTickGenerator = getCustomTickGenerator;

var _range = require('lodash/range');

var _range2 = _interopRequireDefault(_range);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
        _scale$domain2 = (0, _slicedToArray3.default)(_scale$domain, 2),
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