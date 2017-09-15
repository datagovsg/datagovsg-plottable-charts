import range from 'lodash/range'

export const DATAGOVSG_COLORS =
  ['#C64D26', '#FF7733', '#415961', '#65828A', '#B2D0D8', '#DAE3E8']

export function getScale () {
  return new Plottable.Scales.Linear()
    .tickGenerator(getCustomTickGenerator())
}

export function getCategoryScale (type) {
  return new Plottable.Scales.Category().outerPadding(0.2)
}

export function getColorScale () {
  return new Plottable.Scales.Color().range(DATAGOVSG_COLORS)
}

export function getSingleColorScale (data) {
  return new Plottable.Scales.Color().range(data.map(d => DATAGOVSG_COLORS[0]))
}

export function getTimeScale () {
  return new CustomTimeScale()
}

class CustomTimeScale extends Plottable.Scales.Time {
  _expandSingleValueDomain (singleValueDomain) {
    const _singleValueDomain = singleValueDomain.map(v => v.toDate())
    return super._expandSingleValueDomain(_singleValueDomain)
  }
}

export function getCustomNumberFormatter (isPercentage) {
  if (isPercentage) {
    const defaultFormatter = Plottable.Formatters.general(5)
    return v => defaultFormatter(v) + '%'
  }

  const defaultFormatter = Plottable.Formatters.shortScale()
  return v => {
    let formatted = defaultFormatter(v)
    if (formatted.indexOf('.') > -1) {
      formatted = formatted.replace(/\.?(0*|0{3}\d*)([KMBTQ]?)$/, '$2')
    }
    if (formatted === '-0') formatted = '0'
    return formatted
  }
}

export function getCustomTickGenerator () {
  const targetLineCount = getCustomTickGenerator.targetLineCount || 4
  return function (scale) {
    const [domainMin, domainMax] = scale.domain()
    const domainRange = domainMax - domainMin
    const nearestPower = Math.pow(10, Math.floor(Math.log(domainRange) / Math.LN10))
    let factor = domainRange / nearestPower / targetLineCount
    factor = [2, 1, 0.5, 0.2].filter(v => v <= factor)[0]
    const interval = nearestPower * (factor * 10) / 10
    const firstTick = Math.ceil(domainMin / interval)
    const lastTick = Math.floor(domainMax / interval)
    return range(firstTick, lastTick + 1).map(v => v * interval)
  }
}

export function getCustomTimeAxisConfigs (type) {
  switch (type) {
    case 'year':
    case 'financial_year':
      return yearConfigs()
    case 'half_year':
    case 'financial_half_year':
      return [...halfYearConfigs(), ...yearConfigs()]
    case 'quarter':
    case 'financial_quarter':
      return [...quarterConfigs(), ...yearConfigs()]
    case 'month':
      return [...monthConfigs(), ...yearConfigs()]
    case 'week':
      return [...weekConfigs(), ...yearConfigs()]
    case 'date':
      return [...dateConfigs(), ...monthConfigs(), ...yearConfigs()]
    case 'date_time':
      return [...dateTimeConfigs(), ...dateConfigs(), ...monthConfigs(), ...yearConfigs()]
    case 'time':
      return timeConfigs()
  }
}

const yearSteps = [1, 5, 10, 25, 50, 100, 200, 500, 1000]

function yearConfigs () {
  return yearSteps.map(step => (
    [{
      interval: Plottable.TimeInterval.year,
      step: step,
      formatter: Plottable.Formatters.time('%Y')
    }]
  ))
}

function halfYearConfigs () {
  return [
    [{
      interval: Plottable.TimeInterval.month,
      step: 6,
      formatter (d) {
        const date = new Date(d)
        return 'H' + Math.floor(date.getMonth() / 6) + 1
      }
    }, {
      interval: Plottable.TimeInterval.year,
      step: 1,
      formatter: Plottable.Formatters.time('%Y')
    }]
  ]
}

function quarterConfigs () {
  return [
    [{
      interval: Plottable.TimeInterval.month,
      step: 3,
      formatter (d) {
        const date = new Date(d)
        return 'Q' + Math.floor(date.getMonth() / 3) + 1
      }
    }, {
      interval: Plottable.TimeInterval.year,
      step: 1,
      formatter: Plottable.Formatters.time('%Y')
    }]
  ]
}

// use the month steps in the orginal plottable library
function monthConfigs () {
  return [
    [{
      interval: Plottable.TimeInterval.month,
      step: 1,
      // full month name
      formatter: Plottable.Formatters.time('%B')
    }, {
      interval: Plottable.TimeInterval.year,
      step: 1,
      formatter: Plottable.Formatters.time('%Y')
    }],
    [{
      interval: Plottable.TimeInterval.month,
      step: 1,
      // short month name
      formatter: Plottable.Formatters.time('%b')
    }, {
      interval: Plottable.TimeInterval.year,
      step: 1,
      formatter: Plottable.Formatters.time('%Y')
    }],
    [{
      interval: Plottable.TimeInterval.month,
      step: 1,
      // month in numbers
      formatter: Plottable.Formatters.time('%m')
    }, {
      interval: Plottable.TimeInterval.year,
      step: 1,
      formatter: Plottable.Formatters.time('%Y')
    }],
    [{
      interval: Plottable.TimeInterval.month,
      step: 1,
      // month in numbers
      formatter: Plottable.Formatters.time('%-m')
    }, {
      interval: Plottable.TimeInterval.year,
      step: 1,
      formatter: Plottable.Formatters.time('%Y')
    }]
  ]
}

function weekConfigs () {
  return [
    [{
      interval: Plottable.TimeInterval.week,
      step: 1,
      formatter (date) {
        // same as the formatter in d3 but start from W1 instead of W0
        // week starts on monday
        return 'W' + d3.time.mondayOfYear(date) + 1
      }
    }, {
      interval: Plottable.TimeInterval.year,
      step: 1,
      formatter: Plottable.Formatters.time('%Y')
    }]
  ]
}

function dateConfigs () {
  return [
    [{
      interval: Plottable.TimeInterval.day,
      step: 1,
      formatter: Plottable.Formatters.time('%e')
    }, {
      interval: Plottable.TimeInterval.year,
      step: 1,
      formatter: Plottable.Formatters.time('%Y')
    }]
  ]
}

const hourSteps = [1, 3, 6, 12]
const timeSteps = [1, 5, 10, 15, 30]

function dateTimeConfigs () {
  const configs = []

  hourSteps.forEach(step => {
    // hours
    configs.push(
      [{
        interval: Plottable.TimeInterval.hour,
        step: step,
        formatter: Plottable.Formatters.time('%I %p')
      }, { interval: Plottable.TimeInterval.day,
        step: 1,
        formatter: Plottable.Formatters.time('%B %e, %Y')
      }]
    )
  })
  timeSteps.forEach(step => {
    // minutes
    configs.push(
      [{
        interval: Plottable.TimeInterval.minute,
        step: step,
        formatter: Plottable.Formatters.time('%I:%M %p')
      }, { interval: Plottable.TimeInterval.day,
        step: 1,
        formatter: Plottable.Formatters.time('%B %e, %Y')
      }]
    )
    // seconds
    configs.push(
      [{
        interval: Plottable.TimeInterval.second,
        step: step,
        formatter: Plottable.Formatters.time('%I:%M:%S %p')
      }, { interval: Plottable.TimeInterval.day,
        step: 1,
        formatter: Plottable.Formatters.time('%B %e, %Y')
      }]
    )
  })

  return configs
}

function timeConfigs () {
  const configs = []

  hourSteps.forEach(step => {
    // hours
    configs.push(
      [{
        interval: Plottable.TimeInterval.hour,
        step: step,
        formatter: Plottable.Formatters.time('%I %p')
      }]
    )
  })

  timeSteps.forEach(step => {
    // minutes
    configs.push(
      [{
        interval: Plottable.TimeInterval.minute,
        step: step,
        formatter: Plottable.Formatters.time('%I:%M %p')
      }]
    )
    // seconds
    configs.push(
      [{
        interval: Plottable.TimeInterval.second,
        step: step,
        formatter: Plottable.Formatters.time('%I:%M:%S %p')
      }]
    )
  })

  return configs
}
