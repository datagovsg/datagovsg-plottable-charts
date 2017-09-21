import {getCustomTimeAxisConfigs} from './helpers'

/*
  to overwrite default highlight color,
  add a css rule on .highlight and mark it !important. Eg.

  .highlight {
    fill: anotherColor!important;
  }
*/
export function highlightOnHover (component, props) {
  new Plottable.Interactions.Pointer()
    .onPointerMove(point => {
      component.plot.entities().forEach(e => {
        e.selection.classed('highlight', false).style('fill', '')
      })
      const target = component.plot.entitiesAt(point)[0]
      if (target) {
        target.selection.classed('highlight', true).style('fill', 'lightgrey')
      }
    })
    .onPointerExit(point => {
      component.plot.entities().forEach(e => {
        e.selection.classed('highlight', false).style('fill', '')
      })
    })
    .attachTo(component.plot)
}

/**
 * @param {Function} props.title - required
 */
export function setupTooltip (component, props) {
  const plot = component.plot.markers || component.plot
  plot.attr('data-title', props.title)

  let $anchor
  const selectors = [
    '.render-area .bar-area rect',
    '.render-area .symbol',
    '.render-area .arc.outline'
  ].join(',')

  component.onMount = function (element) {
    $anchor = $(element).find(selectors)
    $anchor.tooltip({
      animation: false,
      container: element.parentNode,
      html: true,
      placement (tip, target) {
        var {width, height, top, left} = element.getBoundingClientRect()
        var {
          width: targetWidth,
          height: targetHeight,
          top: targetTop,
          left: targetLeft
        } = target.getBoundingClientRect()

        // determine position by elimination
        if (targetLeft + targetWidth - left <= width * 0.7) return 'right'
        else if (targetLeft - left >= width * 0.3) return 'left'
        else if (targetTop - top >= height * 0.4) return 'top'
        else if (targetTop + targetHeight - top <= height * 0.6) return 'bottom'
        else return 'left'
      }
    })
  }

  component.onUnmount = function () {
    $anchor.tooltip('destroy')
  }
}

/**
 * @param {Function} props.title - required
 * @param {Function} props.content - optional
 */
export function setupPopover (component, props) {
  const plot = component.plot.markers || component.plot
  plot.attr('data-title', props.title)
  plot.attr('data-content', props.content)

  let $anchor
  const selectors = [
    '.render-area .bar-area rect',
    '.render-area .symbol',
    '.render-area .arc.outline'
  ].join(',')

  component.onMount = function (element) {
    $anchor = $(element).find(selectors)
    $anchor.popover({
      animation: false,
      container: element.parentNode,
      html: true,
      trigger: 'hover',
      placement (tip, target) {
        var {width, height, top, left} = element.getBoundingClientRect()
        var {
          width: targetWidth,
          height: targetHeight,
          top: targetTop,
          left: targetLeft
        } = target.getBoundingClientRect()

        // determine position by elimination
        if (targetLeft + targetWidth - left <= width * 0.7) return 'right'
        else if (targetLeft - left >= width * 0.3) return 'left'
        else if (targetTop - top >= height * 0.4) return 'top'
        else if (targetTop + targetHeight - top <= height * 0.6) return 'bottom'
        else return 'left'
      }
    })
  }

  component.onUnmount = function () {
    $anchor.popover('destroy')
  }
}

/**
 * @param {Function} props.title - required
 * @param {Function} props.content - optional
 */
export function setupPopoverOnGuideLine (component, props) {
  let $guideLine

  new Plottable.Interactions.Pointer()
    .onPointerMove(point => {
      const target = component.plot.markers.entityNearest(point)
      if (target) {
        $guideLine
          .attr('data-original-title', props.title(target.datum, target.index, target.dataset))
          .attr('data-content', props.content(target.datum, target.index, target.dataset))
          .popover('show')
      } else {
        $guideLine.popover('hide')
      }
    })
    .onPointerExit(point => {
      $guideLine.popover('hide')
    })
    .attachTo(component.plot.markers)

  component.onMount = function (element) {
    if (this.guideLine.vertical) {
      $guideLine = $(element).find('.guide-line-layer.vertical .guide-line')
      $guideLine.popover({
        animation: false,
        container: element.parentNode,
        html: true,
        trigger: 'manual',
        placement (tip, target) {
          var {width, left} = element.getBoundingClientRect()
          var {
            width: targetWidth,
            left: targetLeft
          } = target.getBoundingClientRect()

          return (targetLeft + targetWidth - left <= width * 0.7) ? 'right' : 'left'
        }
      })
    } else if (this.guideLine.horizontal) {
      $guideLine = $(element).find('.guide-line-layer.horizontal .guide-line')
      $guideLine.popover({
        animation: false,
        container: element.parentNode,
        html: true,
        trigger: 'manual',
        placement (tip, target) {
          var {height, top} = element.getBoundingClientRect()
          var {top: targetTop} = target.getBoundingClientRect()

          return (targetTop - top >= height * 0.4) ? 'top' : 'bottom'
        }
      })
    }
  }

  component.onUnmount = function () {
    $guideLine.popover('destroy')
  }
}

/**
 * @param {Function} props.title - required
 * @param {Function} props.content - optional
 */
export function setupShadowWithPopover (component, props) {
  const plotArea = component.plot.parent()
  const scale = component.plot.orientation() === 'vertical'
    ? component.plot.x().scale : component.plot.y().scale

  function getDomain () {
    return scale.domain().map(label => ({label}))
  }
  const dataset = new Plottable.Dataset()

  const shadow = new Plottable.Plots.Rectangle()
    .addClass('shadow')
    .addDataset(dataset)
    .attr('data-title', props.title)
    .attr('data-content', props.content)
    .attr('fill', 'rgba(0, 0, 0, 0.1)')

  if (component.plot.orientation() === 'vertical') {
    shadow
      .x(d => scale.scale(d.label) - scale.stepWidth() / 2)
      .x2(d => scale.scale(d.label) + scale.stepWidth() / 2)
      .y(d => 0)
      .y2(d => shadow.height())
  } else {
    shadow
      .x(d => 0)
      .x2(d => shadow.width())
      .y(d => scale.scale(d.label) - scale.stepWidth() / 2)
      .y2(d => scale.scale(d.label) + scale.stepWidth() / 2)
  }

  plotArea.remove(component.plot)
  plotArea.append(shadow)
  plotArea.append(component.plot)

  new Plottable.Interactions.Pointer()
    .onPointerMove(point => {
      shadow.entities().forEach(e => {
        $(e.selection.node()).css('visibility', 'hidden').popover('hide')
      })
      const target = shadow.entitiesAt(point)[0]
      if (target) {
        $(target.selection.node())
          .css('visibility', 'visible')
          .popover('show')
      }
    })
    .onPointerExit(point => {
      shadow.entities().forEach(e => {
        $(e.selection.node()).css('visibility', 'hidden').popover('hide')
      })
    })
    .attachTo(shadow)

  let $anchor

  component.onMount = function (element) {
    dataset.data(getDomain())
    scale.onUpdate(() => {
      dataset.data(getDomain())
    })
    shadow.renderImmediately()

    $anchor = $(element).find('.shadow .render-area rect')
    $anchor.css('visibility', 'hidden')
    if (this.plot.orientation() === 'vertical') {
      $anchor.popover({
        animation: false,
        container: element.parentNode,
        html: true,
        trigger: 'manual',
        placement (tip, target) {
          var {width, left} = element.getBoundingClientRect()
          var {
            width: targetWidth,
            left: targetLeft
          } = target.getBoundingClientRect()

          return (targetLeft + targetWidth - left <= width * 0.7) ? 'right' : 'left'
        }
      })
    } else {
      $anchor.popover({
        animation: false,
        container: element.parentNode,
        html: true,
        trigger: 'manual',
        placement (tip, target) {
          var {height, top} = element.getBoundingClientRect()
          var {top: targetTop} = target.getBoundingClientRect()

          return (targetTop - top >= height * 0.4) ? 'top' : 'bottom'
        }
      })
    }
  }

  component.onUnmount = function () {
    $anchor.popover('destroy')
  }

  return shadow
}

/**
 * @param {Function} props.labelFormatter - default d => d.label
 */
export function setupOuterLabel (component, props = {labelFormatter: d => d.label}) {
  component.plot.outerRadius(d => {
    const maxRadius = Math.min(component.plot.width(), component.plot.height()) / 2
    return maxRadius * 0.8
  })

  component.plot._clipPathEnabled = false

  function eraseLabel () {
    component.plot.background().select('.label-area').remove()
  }

  function drawLabel () {
    const radius = Math.min(component.plot.width(), component.plot.height()) / 2
    const innerArc = d3.svg.arc()
      .innerRadius(0)
      .outerRadius(radius * 0.8)
    const outerArc = d3.svg.arc()
      .innerRadius(radius * 0.8)
      .outerRadius(radius)
    const pieFunction = d3.layout.pie()
      .sort(null) // disable sorting
      .value(d => d.value)

    const data = pieFunction(component.dataset.data()).map((d, i) => {
      const midAngle = 0.5 * d.startAngle + 0.5 * d.endAngle
      const rightHalf = midAngle < Math.PI
      const point1 = innerArc.centroid(d)
      const point2 = outerArc.centroid(d)
      const point3 = [(rightHalf ? 1 : -1) * radius * 0.95, point2[1]]
      const point4 = [(rightHalf ? 1 : -1) * radius, point2[1]]
      return {
        text: props.labelFormatter(d.data, i),
        textAnchor: rightHalf ? 'start' : 'end',
        textOffset: point4,
        polyline: [point1, point2, point3]
      }
    })

    let origin = [component.plot.width() / 2, component.plot.height() / 2]

    eraseLabel()

    const labelArea = component.plot.background()
      .insert('g')
      .classed('label-area', true)
      .attr('transform', 'translate(' + origin.join(',') + ')')

    const labels = labelArea
      .selectAll('g')
      .data(data).enter()
      .append('g')
      .classed('label', true)

    labels.append('text')
      .text(d => d.text)
      .attr('dy', '0.35em')
      .attr('transform', d => 'translate(' + d.textOffset.join(',') + ')')
      .style('text-anchor', d => d.textAnchor)

    labels.append('polyline')
      .attr('points', d => d.polyline)
  }

  component.onMount = function (element) {
    drawLabel()
  }

  component.onUpdate = function (nextProps) {
    drawLabel()
  }

  component.onResize = function () {
    drawLabel()
  }

  component.onUnmount = function () {
    eraseLabel()
  }
}

export function customizeTimeAxis (component, type) {
  const axis = component.xAxis
  if (axis instanceof Plottable.Axes.Time) {
    axis.axisConfigurations(getCustomTimeAxisConfigs(type))
    if (type === 'year' || type === 'financial_year') {
      axis.tierLabelPositions(axis.tierLabelPositions().map(v => 'center'))
    }
  }
}

/*
  FIXME
  Very very hackish stuff
  Might break when upgrading to Plottable 3.0
*/

export function removeInnerPadding (component) {
  const _makeInnerScale = component.plot._makeInnerScale
  component.plot._makeInnerScale = function () {
    return _makeInnerScale.call(this)
      .innerPadding(0).outerPadding(0)
  }
}

export function downsampleTicks (component) {
  const axis = component.xAxis
  if (axis instanceof Plottable.Axes.Category) {
    const renderImmediately = axis.renderImmediately
    axis.renderImmediately = function () {
      const minimumSpacing = d3.max(this._scale.domain(),
        v => this._measurer.measure(v.toString()).width) * 1.5
      const downsampleRatio = Math.ceil(minimumSpacing / this._scale.stepWidth())
      const domain = this._scale.domain
      const stepWidth = this._scale.stepWidth
      this._scale.domain = function () {
        return domain.call(this)
          .filter((v, i) => i % downsampleRatio === 0)
      }
      this._scale.stepWidth = function () {
        return stepWidth.call(this) * downsampleRatio
      }
      renderImmediately.call(this)
      this._scale.domain = domain
      this._scale.stepWidth = stepWidth
    }

    const _measureTicks = axis._measureTicks
    axis._measureTicks = function (...args) {
      const wrap = this._wrapper.wrap
      this._wrapper.wrap = function (...args) {
        const result = wrap.call(this, ...args)
        result.wrappedText = result.originalText
        return result
      }
      const result = _measureTicks.call(this, ...args)
      this._wrapper.wrap = wrap
      return result
    }
  }
}
