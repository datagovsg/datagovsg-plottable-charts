import throttle from 'lodash/throttle'
import {getCustomShortScaleFormatter} from '../helpers'

const defaultProps = {
  orientation: 'v',
  showPoints: false,
  hideXaxis: false,
  hideYaxis: false,
  showXgridlines: false,
  showYgridlines: false
}

export default class SimpleLine {
  constructor (props) {
    props = Object.assign({}, defaultProps, props)

    if (props.x.length !== props.y.length) throw new Error()
    const data = props.y.map((v, i) => ({y: v, x: props.x[i]}))
    this.dataset = new Plottable.Dataset(data)

    const xScale = props.xScale || new Plottable.Scales.Linear()
    const yScale = props.yScale || new Plottable.Scales.Linear()

    this.plot = new Plottable.Plots.Line()
      .addClass('simple-line-plot')
      .addDataset(this.dataset)
      .x(d => d.x, xScale)
      .y(d => d.y, yScale)

    const markers = props.showPoints ? (
      new Plottable.Plots.Scatter()
        .addDataset(this.dataset)
        .attr('opacity', 1)
        .x(d => d.x, xScale)
        .y(d => d.y, yScale)
    ) : null

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

    this.layout = new Plottable.Components.Table([
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
      if (xAxis) this.layout.add(xAxis, 1, 2)
    }
    if (!props.hideYaxis) {
      const yAxis =
          yScale instanceof Plottable.Scales.Time ? new Plottable.Axes.Time(yScale, 'left')
        : yScale instanceof Plottable.QuantitativeScale ? new Plottable.Axes.Numeric(yScale, 'left').formatter(getCustomShortScaleFormatter())
        : yScale instanceof Plottable.Scales.Category ? new Plottable.Axes.Category(yScale, 'left')
        : null
      if (yAxis) this.layout.add(yAxis, 0, 1)
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

    const tooltipAnchorSelection = this.plot.foreground()
      .append('circle')
      .attr({r: 3, opacity: 0})
    const tooltipAnchor = $(tooltipAnchorSelection.node())
    tooltipAnchor.tooltip({
      animation: false,
      container: 'body',
      placement: 'right',
      title: 'text',
      trigger: 'manual'
    })
    new Plottable.Interactions.Pointer()
      .onPointerMove(point => {
        const target = this.plot.entityNearest(point)
        if (target) {
          tooltipAnchorSelection.attr({
            cx: target.position.x,
            cy: target.position.y,
            'data-original-title': [target.datum.x, target.datum.y].join(' ')
          })
          tooltipAnchor.tooltip('show')
        }
      })
      .onPointerExit(point => {
        tooltipAnchor.tooltip('hide')
      })
      .attachTo(this.plot)

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
