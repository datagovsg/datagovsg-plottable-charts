import _get from 'lodash/get'
import _groupBy from 'lodash/groupBy'
import _sum from 'lodash/sum'
import _min from 'lodash/min'
import _max from 'lodash/max'
import _uniq from 'lodash/uniq'

export default class PivotTable {
  constructor (data) {
    this.data = data
    this.transformations = []
  }

  push (fn) {
    this.transformations.push(fn)
  }

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
    this.transformation = []
    return result
  }
}

export function filterItems (field, filter) {
  const filterFunc = (function (field, filter) {
    if (typeof field === 'function') return items => items.filter(field)
    if (typeof field !== 'string') throw new TypeError()
    if (typeof filter === 'object') {
      if (filter.type === 'include' && filter.values instanceof Array) {
        return items => items.filter(d => filter.values.indexOf(_get(d, field)) > -1)
      }
      if (filter.type === 'exclude' && filter.values instanceof Array) {
        return items => items.filter(d => filter.values.indexOf(_get(d, field)) < 0)
      }
    }
    throw new TypeError()
  })(field, filter)
  return data => data.map(g => Object.assign({}, g, {_items: filterFunc(g._items)}))
}

export function groupItems (field) {
  if (typeof field !== 'string') throw new TypeError()
  return data => {
    const result = []
    data.forEach(g => {
      const grouped = _groupBy(g._items, d => _get(d, field))
      Object.keys(grouped).forEach(groupValue => {
        const items = grouped[groupValue]
        if (items.length === 0) return
        result.push({
          _group: Object.assign({}, g._group, {[field]: groupValue}),
          _items: items,
          _summaries: []
        })
      })
    })
    return result
  }
}

export function aggregate (labelField, valueField, type) {
  if (typeof labelField !== 'string') throw new TypeError()
  if (typeof valueField !== 'string') throw new TypeError()
  const aggregateFunc = (typeof type === 'string' && type in aggregateFunctions)
    ? aggregateFunctions[type] : type
  if (typeof aggregateFunc === 'function') {
    return data => data.map(g => {
      const grouped = _groupBy(g._items, labelField)
      let series = []
      Object.keys(grouped).forEach(label => {
        const values = grouped[label]
          .map(d => +_get(d, valueField))
          .filter(d => !isNull(d))
        if (values.length > 0) {
          // cap decimal place of aggregated value to max dp of original data
          let dpCap
          values.forEach(v => {
            v = v.toString()
            const dpIndex = v.indexOf('.') + 1
            if (dpIndex > 0) {
              dpCap = Math.max(v.length - dpIndex, dpCap)
            }
          })
          dpCap = Math.min(dpCap, 10)
          series.push({label, value: +aggregateFunc(values).toFixed(dpCap)})
        }
      })
      g._summaries.push({type, labelField, valueField, series})
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