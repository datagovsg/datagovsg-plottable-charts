const defaultFormatter = Plottable.Formatters.shortScale()

export function shortScaleFormatter (str) {
  return defaultFormatter(str).replace(/\.?0*([KMBTQ]?)$/, '$1')
}
