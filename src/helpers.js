import range from 'lodash/range'

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
