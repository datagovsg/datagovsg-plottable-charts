'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.filterItems = filterItems;
exports.groupItems = groupItems;
exports.aggregate = aggregate;

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

var _groupBy2 = require('lodash/groupBy');

var _groupBy3 = _interopRequireDefault(_groupBy2);

var _sum2 = require('lodash/sum');

var _sum3 = _interopRequireDefault(_sum2);

var _min2 = require('lodash/min');

var _min3 = _interopRequireDefault(_min2);

var _max2 = require('lodash/max');

var _max3 = _interopRequireDefault(_max2);

var _uniq2 = require('lodash/uniq');

var _uniq3 = _interopRequireDefault(_uniq2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PivotTable = function () {
  function PivotTable(data) {
    _classCallCheck(this, PivotTable);

    this.data = data;
    this.transformations = [];
  }

  _createClass(PivotTable, [{
    key: 'push',
    value: function push(fn) {
      this.transformations.push(fn);
    }
  }, {
    key: 'transform',
    value: function transform(data) {
      data = data || this.data;
      var result = [{
        _group: {},
        _items: data,
        _summaries: []
      }];
      this.transformations.forEach(function (t) {
        result = t(result);
      });
      this.transformation = [];
      return result;
    }
  }]);

  return PivotTable;
}();

exports.default = PivotTable;
function filterItems(field, filter) {
  var filterFunc = function (field, filter) {
    if (typeof field === 'function') return function (items) {
      return items.filter(field);
    };
    if (typeof field !== 'string') throw new TypeError();
    if ((typeof filter === 'undefined' ? 'undefined' : _typeof(filter)) === 'object') {
      if (filter.type === 'include' && filter.values instanceof Array) {
        return function (items) {
          return items.filter(function (d) {
            return filter.values.indexOf((0, _get3.default)(d, field)) > -1;
          });
        };
      }
      if (filter.type === 'exclude' && filter.values instanceof Array) {
        return function (items) {
          return items.filter(function (d) {
            return filter.values.indexOf((0, _get3.default)(d, field)) < 0;
          });
        };
      }
    }
    throw new TypeError();
  }(field, filter);
  return function (data) {
    return data.map(function (g) {
      return Object.assign({}, g, { _items: filterFunc(g._items) });
    });
  };
}

function groupItems(field) {
  if (typeof field !== 'string') throw new TypeError();
  return function (data) {
    var result = [];
    data.forEach(function (g) {
      var grouped = (0, _groupBy3.default)(g._items, function (d) {
        return (0, _get3.default)(d, field);
      });
      Object.keys(grouped).forEach(function (groupValue) {
        var items = grouped[groupValue];
        if (items.length === 0) return;
        result.push({
          _group: Object.assign({}, g._group, _defineProperty({}, field, groupValue)),
          _items: items,
          _summaries: []
        });
      });
    });
    return result;
  };
}

function aggregate(labelField, valueField, type) {
  if (typeof labelField !== 'string') throw new TypeError();
  if (typeof valueField !== 'string') throw new TypeError();
  var aggregateFunc = typeof type === 'string' && type in aggregateFunctions ? aggregateFunctions[type] : type;
  if (typeof aggregateFunc === 'function') {
    return function (data) {
      return data.map(function (g) {
        var grouped = (0, _groupBy3.default)(g._items, labelField);
        var series = [];
        Object.keys(grouped).forEach(function (label) {
          var values = grouped[label].map(function (d) {
            return +(0, _get3.default)(d, valueField);
          }).filter(function (d) {
            return !isNull(d);
          });
          if (values.length > 0) {
            // cap decimal place of aggregated value to max dp of original data
            var dpCap = void 0;
            values.forEach(function (v) {
              v = v.toString();
              var dpIndex = v.indexOf('.') + 1;
              if (dpIndex > 0) {
                dpCap = Math.max(v.length - dpIndex, dpCap);
              }
            });
            dpCap = Math.min(dpCap, 10);
            series.push({ label: label, value: +aggregateFunc(values).toFixed(dpCap) });
          }
        });
        g._summaries.push({ type: type, labelField: labelField, valueField: valueField, series: series });
        return g;
      });
    };
  }
  throw new TypeError();
}

var aggregateFunctions = {
  sum: function sum(data) {
    return (0, _sum3.default)(data);
  },
  avg: function avg(data) {
    return (0, _sum3.default)(data) / data.length;
  },
  min: function min(data) {
    return (0, _min3.default)(data);
  },
  max: function max(data) {
    return (0, _max3.default)(data);
  },
  count: function count(data) {
    return data.length;
  },
  countd: function countd(data) {
    return (0, _uniq3.default)(data).length;
  }
};

function isNull(value) {
  var nullValues = ['na', '-', 's'];
  return !value && value !== 0 || nullValues.indexOf(value.toString().trim().toLowerCase()) > -1;
}