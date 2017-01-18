import throttle from 'lodash/throttle'
import {getCustomShortScaleFormatter} from '../helpers'

export default class SimpleLine {
  /**
   * @param {number[]} props.x - required
   * @param {number[]} props.y - required
   * @param {Object} props.xScale - default new Plottable.Scales.Linear()
   * @param {Object} props.yScale - default new Plottable.Scales.Linear()
   * @param {Object} props.colorScale - default new Plottable.Scales.Color()
   * @param {number} props.markerSize - default 0
   * @param {Function} props.tooltipFormatter - optional
   * @param {boolean} props.hideXaxis - default false
   * @param {boolean} props.hideYaxis - default false
   * @param {boolean} props.showXgridlines - default false
   * @param {boolean} props.showYgridlines - default false
   * @param {string} props.xLabel - optional
   * @param {string} props.yLabel - optional
   * @param {Function} props.clickHandler - optional
   * @param {Function} props.hoverHandler - optional
   */
  constructor (props) {
    const defaultProps = {
      orientation: 'v',
      showMarkers: false,
      hideXaxis: false,
      hideYaxis: false,
      showXgridlines: false,
      showYgridlines: false
    }
    props = Object.assign(defaultProps, props)

    if (props.x.length !== props.y.length) throw new Error()
    const data = props.y.map((v, i) => ({value: v, label: props.x[i]}))
    this.dataset = new Plottable.Dataset(data)

    const xScale = props.xScale || new Plottable.Scales.Linear()
    const yScale = props.yScale || new Plottable.Scales.Linear()

    this.plot = {
      lines: new Plottable.Plots.Line()
        .addDataset(this.dataset)
        .x(d => d.label, xScale)
        .y(d => d.value, yScale)
        .attr('stroke-width', props.strokeWidth),
      markers: new Plottable.Plots.Scatter()
        .addDataset(this.dataset)
        .attr('opacity', 1)
        .x(d => d.label, xScale)
        .y(d => d.value, yScale)
        .size(props.markerSize)
    }

    if (props.tooltipFormatter) {
      this.plot.markers.attr('data-title', props.tooltipFormatter)
    }

    if (props.clickHandler) {
      new Plottable.Interactions.Click()
        .onClick(point => {
          const target = this.plot.markers.entityNearest(point)
          props.clickHandler(target, this.plot.markers.entities())
        })
        .attachTo(this.plot.markers)
    }

    if (props.hoverHandler) {
      new Plottable.Interactions.Pointer()
        .onPointerMove(point => {
          const target = this.plot.markers.entityNearest(point)
          props.hoverHandler(target, this.plot.markers.entities())
        })
        .onPointerExit(point => {
          props.hoverHandler(null, this.plot.markers.entities())
        })
        .attachTo(this.plot.markers)
    }

    const gridlines = new Plottable.Components.Gridlines(
      (props.showXgridlines && xScale instanceof Plottable.QuantitativeScale) ? xScale : null,
      (props.showYgridlines && yScale instanceof Plottable.QuantitativeScale) ? yScale : null
    )
    const plotArea = new Plottable.Components.Group([gridlines, this.plot.lines, this.plot.markers])

    this.layout = new Plottable.Components.Table([
      [null, null, plotArea],
      [null, null, null],
      [null, null, null]
    ])
    if (!props.hideXaxis) {
      this.xAxis =
          xScale instanceof Plottable.Scales.Time ? new Plottable.Axes.Time(xScale, 'bottom')
        : xScale instanceof Plottable.QuantitativeScale ? new Plottable.Axes.Numeric(xScale, 'bottom').formatter(getCustomShortScaleFormatter())
        : xScale instanceof Plottable.Scales.Category ? new Plottable.Axes.Category(xScale, 'bottom')
        : null
      if (this.xAxis) this.layout.add(this.xAxis, 1, 2)
    }
    if (!props.hideYaxis) {
      this.yAxis =
          yScale instanceof Plottable.Scales.Time ? new Plottable.Axes.Time(yScale, 'left')
        : yScale instanceof Plottable.QuantitativeScale ? new Plottable.Axes.Numeric(yScale, 'left').formatter(getCustomShortScaleFormatter())
        : yScale instanceof Plottable.Scales.Category ? new Plottable.Axes.Category(yScale, 'left')
        : null
      if (this.yAxis) this.layout.add(this.yAxis, 0, 1)
    }
    if (props.xLabel) {
      this.layout.add(new Plottable.Components.AxisLabel(props.xLabel), 2, 2)
    }
    if (props.yLabel) {
      this.layout.add(new Plottable.Components.AxisLabel(props.yLabel, -90), 0, 0)
    }

    this.resizeHandler = throttle(this.resizeHandler, 200).bind(this)
  }

  resizeHandler () {
    this.layout.redraw()
  }

  mount (element) {
    this.layout.renderTo(element)

    if (this.plot.markers.attr('data-title')) {
      $(element).find('.render-area .symbol').tooltip({
        animation: false,
        container: element.parentNode,
        html: true,
        placement (tip, target) {
          var position = $(target).position()
          var width = $(element).width()
          var height = $(element).height()
          var targetWidth = $(target).width()
          var targetHeight = $(target).height()

          // determine position by elimination
          if (position.left + targetWidth <= width * 0.9) return 'right'
          else if (position.left >= width * 0.1) return 'left'
          else if (position.top >= height * 0.4) return 'top'
          else if (position.top + targetHeight <= height * 0.6) return 'bottom'
          else return 'right'
        }
      })
    }

    window.addEventListener('resize', this.resizeHandler)
  }

  unmount () {
    window.removeEventListener('resize', this.resizeHandler)
  }

  update (nextProps) {
    if (nextProps.x.length !== nextProps.y.length) throw new Error()
    const data = nextProps.y.map((v, i) => ({y: v, x: nextProps.x[i]}))
    this.dataset.data(data)
  }
}
