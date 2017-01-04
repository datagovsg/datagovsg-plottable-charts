import moment from 'moment'

export function getCustomShortScaleFormatter () {
  const defaultFormatter = Plottable.Formatters.shortScale()

  return function (str) {
    return defaultFormatter(str).replace(/\.?0*([KMBTQ]?)$/, '$1')
  }
}

export function getCustomTimeAxis (scale, position, type) {
  // need to override this function  to convert moment object to Date object to get the time
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

  const axis = new Plottable.Axes.Time(scale, position)

  // Set up the time axis tiers
  let newConfigs = []

  // create all the configs

  var yearSteps = [1, 5, 10, 25, 50, 100, 200, 500, 1000]
  var yearConfigs = yearSteps.map(step => {
    return [
      {
        interval: Plottable.TimeInterval.year,
        step: step,
        formatter: Plottable.Formatters.time('%Y')
      }
    ]
  })

  var halfYearConfigs = [
    [
      {
        interval: Plottable.TimeInterval.month,
        step: 6,
        formatter (d) {
          return 'H' + Math.floor(moment(d).month() / 6 + 1)
        }
      },
      {
        interval: Plottable.TimeInterval.year,
        step: 1,
        formatter: Plottable.Formatters.time('%Y')
      }
    ]
  ]

  var quarterConfigs = [
    [
      {
        interval: Plottable.TimeInterval.month,
        step: 3,
        formatter (d) {
          return 'Q' + moment(d).quarter()
        }
      },
      {
        interval: Plottable.TimeInterval.year,
        step: 1,
        formatter: Plottable.Formatters.time('%Y')
      }
    ]
  ]

  // use the month steps in the orginal plottable library
  var monthConfigs = [
    [
      {
        interval: Plottable.TimeInterval.month,
        step: 1,
        // full month name
        formatter: Plottable.Formatters.time('%B')
      },
      {
        interval: Plottable.TimeInterval.year,
        step: 1,
        formatter: Plottable.Formatters.time('%Y')
      }
    ],
    [
      {
        interval: Plottable.TimeInterval.month,
        step: 1,
        // short month name
        formatter: Plottable.Formatters.time('%b')
      },
      {
        interval: Plottable.TimeInterval.year,
        step: 1,
        formatter: Plottable.Formatters.time('%Y')
      }
    ],
    [
      {
        interval: Plottable.TimeInterval.month,
        step: 1,
        // month in numbers
        formatter: Plottable.Formatters.time('%m')
      },
      {
        interval: Plottable.TimeInterval.year,
        step: 1,
        formatter: Plottable.Formatters.time('%Y')
      }
    ],
    [
      {
        interval: Plottable.TimeInterval.month,
        step: 1,
        // month in numbers
        formatter: Plottable.Formatters.time('%-m')
      },
      {
        interval: Plottable.TimeInterval.year,
        step: 1,
        formatter: Plottable.Formatters.time('%Y')
      }
    ]
  ]

  var weekConfigs = [
    [
      {
        interval: Plottable.TimeInterval.week,
        step: 1,
        formatter (date) {
          // same as the formatter in d3 but start from W1 instead of W0
          // week starts on monday
          var day = d3.time.year(date).getDay()
          return 'W' + Math.floor((d3.time.dayOfYear(date) + (day + 6) % 7) / 7 + 1)
        }
      },
      {
        interval: Plottable.TimeInterval.year,
        step: 1,
        formatter: Plottable.Formatters.time('%Y')
      }
    ]
  ]

  var dateConfigs = [
    [
      {
        interval: Plottable.TimeInterval.day,
        step: 1,
        formatter: Plottable.Formatters.time('%e')
      },
      {
        interval: Plottable.TimeInterval.year,
        step: 1,
        formatter: Plottable.Formatters.time('%Y')
      }
    ]
  ]

  var dateTimeConfigs = []
  var hourSteps = [1, 3, 6, 12]
  var timeSteps = [1, 5, 10, 15, 30]
  hourSteps.forEach(step => {
    // hours
    dateTimeConfigs.push([
      {
        interval: Plottable.TimeInterval.hour,
        step: step,
        formatter: Plottable.Formatters.time('%I %p')
      },
      { interval: Plottable.TimeInterval.day,
        step: 1,
        formatter: Plottable.Formatters.time('%B %e, %Y')
      }
    ])
  })
  timeSteps.forEach(step => {
    // minutes
    dateTimeConfigs.push([
      {
        interval: Plottable.TimeInterval.minute,
        step: step,
        formatter: Plottable.Formatters.time('%I:%M %p')
      },
      { interval: Plottable.TimeInterval.day,
        step: 1,
        formatter: Plottable.Formatters.time('%B %e, %Y')
      }
    ])
    // seconds
    dateTimeConfigs.push([
      {
        interval: Plottable.TimeInterval.second,
        step: step,
        formatter: Plottable.Formatters.time('%I:%M:%S %p')
      },
      { interval: Plottable.TimeInterval.day,
        step: 1,
        formatter: Plottable.Formatters.time('%B %e, %Y')
      }
    ])
  })

  var timeConfigs = []
  hourSteps.forEach(step => {
    // hours
    timeConfigs.push([
      {
        interval: Plottable.TimeInterval.hour,
        step: step,
        formatter: Plottable.Formatters.time('%I %p')
      }
    ])
  })
  timeSteps.forEach(step => {
    // minutes
    timeConfigs.push([
      {
        interval: Plottable.TimeInterval.minute,
        step: step,
        formatter: Plottable.Formatters.time('%I:%M %p')
      }
    ])
    // seconds
    timeConfigs.push([
      {
        interval: Plottable.TimeInterval.second,
        step: step,
        formatter: Plottable.Formatters.time('%I:%M:%S %p')
      }
    ])
  })

  switch (type) {
    case 'year':
    case 'financial_year':
      newConfigs = yearConfigs
      // fix the alignment of the tick marks for year for now
      var tierLabelPositions = newConfigs.map(position => 'center')
      axis.tierLabelPositions(tierLabelPositions)

      // if (graphType === 'column') {
      //   scale.padProportion(0)
      //
      //   // same as the original but adjust the text anchord
      //   axis._renderTierLabels = function (container, config, index) {
      //     var _this = this
      //     var tickPos = this._getTickValuesForConfiguration(config)
      //     var labelPos = tickPos
      //
      //     var tickLabels = container.selectAll('.' + Plottable.Axis.TICK_LABEL_CLASS).data(labelPos, function (d) { return String(d.valueOf()) })
      //     var tickLabelsEnter = tickLabels.enter().append('g').classed(Plottable.Axis.TICK_LABEL_CLASS, true)
      //     tickLabelsEnter.append('text')
      //     var xTranslate = (this._tierLabelPositions[index] === 'center' || config.step === 1) ? 0 : this.tickLabelPadding()
      //     var yTranslate
      //     if (this.orientation() === 'bottom') {
      //       yTranslate = d3.sum(this._tierHeights.slice(0, index + 1)) - this.tickLabelPadding()
      //     } else {
      //       if (this._tierLabelPositions[index] === 'center') {
      //         yTranslate = this.height() - d3.sum(this._tierHeights.slice(0, index)) - this.tickLabelPadding() - this._maxLabelTickLength()
      //       } else {
      //         yTranslate = this.height() - d3.sum(this._tierHeights.slice(0, index)) - this.tickLabelPadding()
      //       }
      //     }
      //     var textSelection = tickLabels.selectAll('text')
      //     if (textSelection.size() > 0) {
      //       Plottable.Utils.DOM.translate(textSelection, xTranslate, yTranslate)
      //     }
      //     tickLabels.exit().remove()
      //     tickLabels.attr('transform', function (d) { return 'translate(' + _this._scale.scale(d) + ',0)' })
      //     var anchor = config.step === 1 ? 'middle' : 'end'
      //     tickLabels.selectAll('text').text(config.formatter).style('text-anchor', anchor)
      //   }
      //
      //   // same as the original but don't draw the tick marks
      //   axis._renderTickMarks = function (tickValues, index) {
      //     tickValues = _.uniq(tickValues)
      //     tickValues.unshift(this._scale.domainMin())
      //
      //     var tickMarks = this._tierMarkContainers[index].selectAll('.' + Plottable.Axis.TICK_MARK_CLASS).data(tickValues)
      //     tickMarks.enter().append('line').classed(Plottable.Axis.TICK_MARK_CLASS, true)
      //     var attr = this._generateTickMarkAttrHash()
      //     var offset = this._tierHeights.slice(0, index).reduce(function (translate, height) { return translate + height }, 0)
      //     var _this = this
      //     attr['y1'] = offset
      //     attr['y2'] = offset + this._tierHeights[index]
      //     var scalingfunction = function (d, i) {
      //       var newDate = new Date(_this._scale.domainMin().getTime())
      //       if (i > 0) newDate.setFullYear(d.getFullYear())
      //       return _this._scale.scale(newDate)
      //     }
      //
      //     attr['x1'] = scalingfunction
      //     attr['x2'] = scalingfunction
      //
      //     tickMarks.attr(attr)
      //
      //     d3.select(tickMarks[0][0]).attr(attr)
      //     d3.select(tickMarks[0][tickMarks.size() - 1]).attr(attr)
      //     // Add end-tick classes to first and last tick for CSS customization purposes
      //     d3.select(tickMarks[0][0]).classed(Plottable.Axis.END_TICK_MARK_CLASS, true)
      //     d3.select(tickMarks[0][tickMarks.size() - 1]).classed(Plottable.Axis.END_TICK_MARK_CLASS, true)
      //     tickMarks.exit().remove()
      //   }
      // }

      break
    case 'half_year':
    case 'financial_half_year':
      newConfigs = newConfigs.concat(halfYearConfigs, yearConfigs)
      break
    case 'quarter':
    case 'financial_quarter':
      newConfigs = newConfigs.concat(quarterConfigs, yearConfigs)
      break
    case 'month':
      newConfigs = newConfigs.concat(monthConfigs, yearConfigs)
      break
    case 'week':
      newConfigs = newConfigs.concat(weekConfigs, yearConfigs)
      break
    case 'date':
      newConfigs = newConfigs.concat(dateConfigs, monthConfigs, yearConfigs)
      break
    case 'date_time':
      newConfigs = newConfigs.concat(dateTimeConfigs, dateConfigs, monthConfigs, yearConfigs)
      break
    case 'time':
      newConfigs = timeConfigs
      break
    default:
      newConfigs = axis.axisConfigurations()
      break
  }

  axis.axisConfigurations(newConfigs)
  return axis
}
