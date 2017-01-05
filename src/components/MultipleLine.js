import throttle from 'lodash/throttle'
import {getCustomShortScaleFormatter} from '../helpers'

export default class MultipleLine {
  /**
   * @param {string[]} props.labels - required
   * @param {Object[]} props.traces - required
   * @param {string[]} props.traces.labels - required
   * @param {number[]} props.traces.valuess - required
   * @param {Object} props.xScale - default new Plottable.Scales.Linear()
   * @param {Object} props.yScale - default new Plottable.Scales.Linear()
   * @param {Object} props.colorScale - default new Plottable.Scales.Color()
   * @param {boolean} props.showMarkers - default 'h'
   * @param {Function} props.tooltipFormatter - optional
   * @param {boolean} props.hideXaxis - default false
   * @param {boolean} props.hideYaxis - default false
   * @param {boolean} props.showXgridlines - default false
   * @param {boolean} props.showYgridlines - default false
   * @param {('t'|'r'|'b'|'l'|'none')} props.legendPosition - default 'r'
   * @param {string} props.xLabel - optional
   * @param {string} props.yLabel - optional
   * @param {Function} props.clickHandler - optional
   * @param {function} props.hoverHandler - optional
   */
  constructor (props) {
    const defaultProps = {
      orientation: 'v',
      showMarkers: false,
      hideXaxis: false,
      hideYaxis: false,
      showXgridlines: false,
      showYgridlines: false,
      legendPosition: 'r'
    }
    props = Object.assign({}, defaultProps, props)

    if (props.labels.length !== props.traces.length) throw new Error()
    this.datasets = props.traces.map((t, i) => {
      const data = t.y.map((v, i) => ({y: v, x: t.x[i]}))
      return new Plottable.Dataset(data, props.labels[i])
    })

    const xScale = props.xScale || new Plottable.Scales.Linear()
    const yScale = props.yScale || new Plottable.Scales.Linear()
    const colorScale = props.colorScale || new Plottable.Scales.Color()

    this.plot = new Plottable.Plots.Line()
      .addClass('multiple-line-plot')
      .attr('stroke', (d, i, dataset) => dataset.metadata(), colorScale)
      .x(d => d.x, xScale)
      .y(d => d.y, yScale)

    const markers = props.showMarkers ? (
      new Plottable.Plots.Scatter()
        .attr('opacity', 1)
        .attr('fill', (d, i, dataset) => dataset.metadata(), colorScale)
        .x(d => d.x, xScale)
        .y(d => d.y, yScale)
    ) : null

    this.datasets.forEach(dataset => {
      this.plot.addDataset(dataset)
      if (markers) markers.addDataset(dataset)
    })

    if (props.showMarkers && props.tooltipFormatter) {
      markers.attr('data-title', props.tooltipFormatter)
    }

    if (props.clickHandler) {
      new Plottable.Interactions.Click()
        .onClick(point => {
          const target = this.plot.entityNearest(point)
          props.clickHandler(target, this.plot.entities())
        })
        .attachTo(this.plot)
    }

    if (props.hoverHandler) {
      new Plottable.Interactions.Pointer()
        .onPointerMove(point => {
          const target = this.plot.entityNearest(point)
          props.hoverHandler(target, this.plot.entities())
        })
        .onPointerExit(point => {
          props.hoverHandler(null, this.plot.entities())
        })
        .attachTo(this.plot)
    }

    const gridlines = new Plottable.Components.Gridlines(
      (props.showXgridlines && xScale instanceof Plottable.QuantitativeScale) ? xScale : null,
      (props.showYgridlines && yScale instanceof Plottable.QuantitativeScale) ? yScale : null
    )
    const plotArea = new Plottable.Components.Group([gridlines, this.plot, markers])

    this.legend = new Plottable.Components.Legend(colorScale)
      .addClass('multiple-line-legend')
      .xAlignment('center')
      .yAlignment('center')

    const _layout = new Plottable.Components.Table([
      [null, null, plotArea],
      [null, null, null],
      [null, null, null]
    ])
    if (!props.hideXaxis) {
      const xAxis =
          xScale instanceof Plottable.Scales.Time ? new Plottable.Axes.Time(xScale, 'bottom')
        : xScale instanceof Plottable.QuantitativeScale ? new Plottable.Axes.Numeric(xScale, 'bottom').formatter(getCustomShortScaleFormatter())
        : xScale instanceof Plottable.Scales.Category ? new Plottable.Axes.Category(xScale, 'bottom')
        : null
      if (xAxis) _layout.add(xAxis, 1, 2)
    }
    if (!props.hideYaxis) {
      const yAxis =
          yScale instanceof Plottable.Scales.Time ? new Plottable.Axes.Time(yScale, 'left')
        : yScale instanceof Plottable.QuantitativeScale ? new Plottable.Axes.Numeric(yScale, 'left').formatter(getCustomShortScaleFormatter())
        : yScale instanceof Plottable.Scales.Category ? new Plottable.Axes.Category(yScale, 'left')
        : null
      if (yAxis) _layout.add(yAxis, 0, 1)
    }
    if (props.xLabel) {
      _layout.add(new Plottable.Components.AxisLabel(props.xLabel), 2, 2)
    }
    if (props.yLabel) {
      _layout.add(new Plottable.Components.AxisLabel(props.yLabel, -90), 0, 0)
    }

    if (props.legendPosition === 't') {
      this.layout = new Plottable.Components.Table([
        [this.legend.maxEntriesPerRow(Infinity)],
        [_layout]
      ]).rowPadding(10)
    } else if (props.legendPosition === 'r') {
      this.layout = new Plottable.Components.Table([
        [_layout, this.legend]
      ]).columnPadding(10)
    } else if (props.legendPosition === 'b') {
      this.layout = new Plottable.Components.Table([
        [_layout],
        [this.legend.maxEntriesPerRow(Infinity)]
      ]).rowPadding(10)
    } else if (props.legendPosition === 'l') {
      this.layout = new Plottable.Components.Table([
        [this.legend, _layout]
      ]).columnPadding(10)
    } else if (props.legendPosition === 'none') {
      this.layout = _layout
    }

    this.resizeHandler = throttle(this.resizeHandler, 200).bind(this)
  }

  resizeHandler () {
    this.layout.redraw()
  }

  mount (element) {
    this.layout.renderTo(element)

    $(element).find('.render-area .symbol').tooltip({
      animation: false,
      container: element,
      html: true,
      placement (tip, target) {
        var position = $(target).position()

        var width = element.width()
        var height = element.height()
        var targetHeight = $(target).attr('height') ? +$(target).attr('height') : 0
        var targetWidth = $(target).attr('width') ? +$(target).attr('width') : 0

        // determine position by elimination
        if (position.left + targetWidth <= width * 0.9) return 'right'
        else if (position.left >= width * 0.1) return 'left'
        else if (position.top >= height * 0.4) return 'top'
        else if (position.top + targetHeight <= height * 0.6) return 'bottom'
        else return 'right'
      }
    })

    window.addEventListener('resize', this.resizeHandler)
  }

  unmount () {
    window.removeEventListener('resize', this.resizeHandler)
  }

  update (nextProps) {
    if (nextProps.labels.length !== nextProps.traces.length) throw new Error()
    this.datasets = nextProps.trace.map((t, i) => {
      const data = t.y.map((v, i) => ({y: v, x: t.x[i]}))
      return new Plottable.Dataset(data).metadata(nextProps.labels[i])
    })
    const colorScale = nextProps.colorScale || new Plottable.Scales.Color()
    this.plot.attr('stroke', (d, i, dataset) => dataset.metadata(), colorScale)
    this.legend.colorScale(colorScale)
  }
}
