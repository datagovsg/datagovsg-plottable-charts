import range from 'lodash/range'

export const DATAGOVSG_COLORS =
  ['#C64D26', '#FF7733', '#415961', '#65828A', '#B2D0D8', '#DAE3E8']

export function getScale () {
  return new Plottable.Scales.Linear()
    .tickGenerator(getCustomTickGenerator())
}

export function getCategoryScale (type) {
  if (type === 'timeseries') {
    return new Plottable.Scales.Time()
  } else {
    return new Plottable.Scales.Category().outerPadding(0.2)
  }
}

export function getColorScale () {
  return new Plottable.Scales.Color().range(DATAGOVSG_COLORS)
}

export function getTimeScale () {
  const scale = new Plottable.Scales.Time()

  // override to get Plottable to work with Moment object instead of Date object
  scale._expandSingleValueDomain = function (singleValueDomain) {
    const startTime = singleValueDomain[0].toDate().getTime()
    const endTime = singleValueDomain[1].toDate().getTime()
    if (startTime === endTime) {
      const startDate = new Date(startTime)
      startDate.setDate(startDate.getDate() - 1)
      const endDate = new Date(endTime)
      endDate.setDate(endDate.getDate() + 1)
      return [startDate, endDate]
    }
    return singleValueDomain
  }

  return scale
}

export function getCustomShortScaleFormatter () {
  const defaultFormatter = Plottable.Formatters.shortScale()

  return function (str) {
    let formatted = defaultFormatter(str)
    if (formatted.indexOf('.') > -1) {
      formatted = formatted.replace(/\.?(0*|0{3}\d*)([KMBTQ]?)$/, '$2')
    }
    if (formatted === '-0') formatted = '0'
    return formatted
  }
}

export function getCustomTickGenerator () {
  return function (scale) {
    const [domainMin, domainMax] = scale.domain()
    const domainRange = domainMax - domainMin
    const nearestPower = Math.pow(10, Math.floor(Math.log(domainRange) / Math.LN10))
    let factor = domainRange / nearestPower / 4
    factor = [2, 1, 0.5, 0.2].filter(v => v <= factor)[0]
    const interval = nearestPower * (factor * 10) / 10
    const firstTick = Math.ceil(domainMin / interval)
    const lastTick = Math.floor(domainMax / interval)
    return range(firstTick, lastTick + 1).map(v => v * interval)
  }
}
