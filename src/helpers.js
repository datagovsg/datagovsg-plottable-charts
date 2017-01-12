export function getCustomShortScaleFormatter () {
  const defaultFormatter = Plottable.Formatters.shortScale()

  return function (str) {
    return defaultFormatter(str).replace(/\.?0*([KMBTQ]?)$/, ' $1')
  }
}
