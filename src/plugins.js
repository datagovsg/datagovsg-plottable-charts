/**
 * @param {Function} props.title - required
 */
export function setupTooltip (component, props) {
  const plot = component.plot.markers || component.plot
  plot.attr('data-title', props.title)

  component.mount = function (element) {
    this.layout.renderTo(element)

    $(element).find('.bar-area rect, .render-area .symbol').tooltip({
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
        else return 'right'
      }
    })

    window.addEventListener('resize', this.resizeHandler)
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

  component.mount = function (element) {
    this.layout.renderTo(element)

    $(element).find('.bar-area rect, .render-area .symbol').popover({
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
        else return 'right'
      }
    })

    window.addEventListener('resize', this.resizeHandler)
  }
}

export function removeInnerPadding (component) {
  component.plot._makeInnerScale = function () {
    let innerScale = new Plottable.Scales.Category()
    innerScale._innerPadding = 0
    innerScale._outerPadding = 0
    innerScale.domain(this.datasets().map((d, i) => String(i)))
    let widthProjector = Plottable.Plot._scaledAccessor(this.attr('width'))
    innerScale.range([0, widthProjector(null, 0, null)])
    return innerScale
  }
}
