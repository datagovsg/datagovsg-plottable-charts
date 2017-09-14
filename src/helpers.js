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

export function getCustomTickGenerator (targetLineCount = 5) {
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
  // create all the configs
  const yearSteps = [1, 5, 10, 25, 50, 100, 200, 500, 1000]

  const yearConfigs = yearSteps.map(step => (
    [{
      interval: Plottable.TimeInterval.year,
      step: step,
      formatter: Plottable.Formatters.time('%Y')
    }]
  ))

  const halfYearConfigs = [
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

  const quarterConfigs = [
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

  // use the month steps in the orginal plottable library
  const monthConfigs = [
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

  const weekConfigs = [
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

  const dateConfigs = [
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

  const hourSteps = [1, 3, 6, 12]
  const timeSteps = [1, 5, 10, 15, 30]

  const dateTimeConfigs = []
  hourSteps.forEach(step => {
    // hours
    dateTimeConfigs.push(
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
    dateTimeConfigs.push(
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
    dateTimeConfigs.push(
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

  var timeConfigs = []
  hourSteps.forEach(step => {
    // hours
    timeConfigs.push(
      [{
        interval: Plottable.TimeInterval.hour,
        step: step,
        formatter: Plottable.Formatters.time('%I %p')
      }]
    )
  })
  timeSteps.forEach(step => {
    // minutes
    timeConfigs.push(
      [{
        interval: Plottable.TimeInterval.minute,
        step: step,
        formatter: Plottable.Formatters.time('%I:%M %p')
      }]
    )
    // seconds
    timeConfigs.push(
      [{
        interval: Plottable.TimeInterval.second,
        step: step,
        formatter: Plottable.Formatters.time('%I:%M:%S %p')
      }]
    )
  })

  switch (type) {
    case 'year':
    case 'financial_year':
      return yearConfigs
    case 'half_year':
    case 'financial_half_year':
      return [...halfYearConfigs, ...yearConfigs]
    case 'quarter':
    case 'financial_quarter':
      return [...quarterConfigs, ...yearConfigs]
    case 'month':
      return [...monthConfigs, ...yearConfigs]
    case 'week':
      return [...weekConfigs, ...yearConfigs]
    case 'date':
      return [...dateConfigs, ...monthConfigs, ...yearConfigs]
    case 'date_time':
      return [...dateTimeConfigs, ...dateConfigs, ...monthConfigs, ...yearConfigs]
    case 'time':
      return timeConfigs
  }
}
