import _get from 'lodash/get'
import _groupBy from 'lodash/groupBy'
import _sum from 'lodash/sum'
import _min from 'lodash/min'
import _max from 'lodash/max'
import _uniq from 'lodash/uniq'

/**
 * @typedef {DataItem[]} RawData
 * @typedef {DataGroup[]} ProcessedData
 *
 * @typedef {Object} DataGroup
 * @property {Object} _group
 * @property {DataItem[]} _items
 * @property {DataSummary[]} _summaries
 *
 * @typedef {Object} DataSummary
 * @property {(string|Function)} type
 * @property {string} labelField
 * @property {string} valueField
 * @property {SeriesItem[]} series
 *
 * @typedef {Object} DataItem
 *
 * @typedef {Object} SeriesItem
 * @property {string} label
 * @property {number} value
 *
 * @callback Transformation
 * @param {ProcessedData} data
 * @return {ProcessedData}
 *
 * @callback FilterFunction
 * @param {Object} datum
 * @return {boolean}
 *
 * @typedef {Object} FilterObject
 * @property {('include'|'exclude')} type
 * @property {string[]} values
 *
 * @callback AggregateFunction
 * @param {number[]} values
 * @return {number}
 *
 * @typedef {('sum'|'avg'|'min'|'max'|'count'|'countd')} AggregateFunctionType
 */

export default class PivotTable {
  /**
   * @param {RawData} [data]
   */
  constructor (data) {
    this.data = data
    this.transformations = []
  }

  /**
   * @param {...Transformation} transformation
   */
  push (...args) {
    this.transformations.push(...args)
  }

  /**
   * @param {RawData} [data]
   * @return {ProcessedData}
   */
  transform (data) {
    data = data || this.data
    let result = [{
      _group: {},
      _items: data,
      _summaries: []
    }]
    this.transformations.forEach(t => {
      result = t(result)
    })
    this.transformations = []
    return result
  }
}

/**

 */

/**
 * @param {string} [field]
 * @param {(FilterFunction|FilterObject)} filter
 * @return {Transformation}
 */
export function filterItems (field, filter) {
  const filterFunc = (function (_field, _filter) {
    if (typeof _field === 'function') return _field
    if (typeof _field !== 'string') throw new TypeError()
    if (typeof _filter === 'object') {
      if (_filter.type === 'include' && _filter.values instanceof Array) {
        return d => _filter.values.indexOf(_get(d, _field)) > -1
      }
      if (_filter.type === 'exclude' && _filter.values instanceof Array) {
        return d => _filter.values.indexOf(_get(d, _field)) < 0
      }
    }
    throw new TypeError()
  })(field, filter)
  return data => data.map(g => Object.assign({}, g, {_items: g._items.filter(filterFunc)}))
}

/**
 * @param {string} [field]
 * @param {(FilterFunction|FilterObject)} filter
 * @return {Transformation}
 */
export function filterGroups (field, filter) {
  const filterFunc = (function (_field, _filter) {
    if (typeof _field === 'function') return _field
    if (typeof _field !== 'string') throw new TypeError()
    if (typeof _filter === 'object') {
      if (_filter.type === 'include' && _filter.values instanceof Array) {
        return g => _filter.values.indexOf(_get(g, _field)) > -1
      }
      if (_filter.type === 'exclude' && _filter.values instanceof Array) {
        return g => _filter.values.indexOf(_get(g, _field)) < 0
      }
    }
    throw new TypeError()
  })(field, filter)
  return data => data.filter(g => filterFunc(g._group))
}

/**
 * @param {string} field
 * @return {Transformation}
 */
export function groupItems (field) {
  if (typeof field !== 'string') throw new TypeError()
  return data => {
    const result = []
    data.forEach(g => {
      const labels = {}
      g._items.forEach(d => {
        const groupValue = _get(d, field)
        labels[groupValue] = groupValue
      })
      const grouped = _groupBy(g._items, d => _get(d, field))
      Object.keys(grouped).forEach(groupKey => {
        const items = grouped[groupKey]
        if (items.length === 0) return
        result.push({
          _group: Object.assign({}, g._group, {[field]: labels[groupKey]}),
          _items: items,
          _summaries: []
        })
      })
    })
    return result
  }
}

/**
 * @param {string} labelField
 * @param {string} labelField
 * @param {(AggregateFunction|AggregateFunctionType)} [type]
 * @return {Transformation}
 */
export function aggregate (labelField, valueField, type = 'sum') {
  if (typeof labelField !== 'string') throw new TypeError()
  if (typeof valueField !== 'string') throw new TypeError()
  const aggregateFunc = (typeof type === 'string' && type in aggregateFunctions)
    ? aggregateFunctions[type] : type
  if (typeof aggregateFunc === 'function') {
    return data => data.map(g => {
      const labels = {}
      g._items.forEach(d => {
        const groupValue = _get(d, labelField)
        labels[groupValue] = groupValue
      })
      const grouped = _groupBy(g._items, d => _get(d, labelField))
      const series = []
      let decimalPlaces = 0
      Object.keys(grouped).forEach(groupKey => {
        const label = labels[groupKey]
        const values = grouped[groupKey]
          .map(d => +_get(d, valueField))
          .filter(d => !isNull(d))
        if (values.length > 0) {
          // cap decimal place of aggregated value to max dp of original data
          decimalPlaces = Math.max(decimalPlaces, getDecimalPlaces(values))
          series.push({label, value: aggregateFunc(values)})
        }
      })
      decimalPlaces = Math.min(decimalPlaces, 10)
      series.forEach(d => {
        d.value = +d.value.toFixed(decimalPlaces)
      })
      g._summaries.push({type, labelField, valueField, decimalPlaces, series})
      return g
    })
  }
  throw new TypeError()
}

const aggregateFunctions = {
  sum (data) {
    return _sum(data)
  },
  avg (data) {
    return _sum(data) / data.length
  },
  min (data) {
    return _min(data)
  },
  max (data) {
    return _max(data)
  },
  count (data) {
    return data.length
  },
  countd (data) {
    return _uniq(data).length
  }
}

function isNull (value) {
  var nullValues = ['na', '-', 's']
  return (!value && value !== 0) ||
    nullValues.indexOf(value.toString().trim().toLowerCase()) > -1
}

function getDecimalPlaces (values) {
  return values.reduce((max, v) => {
    const _v = v.toString()
    const dpIndex = _v.indexOf('.') + 1
    if (dpIndex > 0) return Math.max(_v.length - dpIndex, max)
    return max
  }, 0)
}
