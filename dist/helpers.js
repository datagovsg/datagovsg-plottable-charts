'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

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