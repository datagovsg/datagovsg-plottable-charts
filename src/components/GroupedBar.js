import throttle from 'lodash/throttle'
import {shortScaleFormatter} from './helpers'

const defaultProps = {
  orientation: 'v',
  baselineValue: 0,
  hideXaxis: false,
  hideYaxis: false,
  showXgridlines: false,
  showYgridlines: false,
  legendPosition: 'r',
  animated: true
}

export default class GroupedBar {
  constructor (props) {
    props = Object.assign({}, defaultProps, props)

    if (props.labels.length !== props.traces.length) throw new Error()
    this.datasets = props.traces.map((t, i) => {
      const data = t.values.map((v, i) => ({value: v, label: t.labels[i]}))
      return new Plottable.Dataset(data, props.labels[i])
    })

    const categoryScale = new Plottable.Scales.Category()
    const scale = props.scale || new Plottable.Scales.Linear()
    const colorScale = props.colorScale || new Plottable.Scales.Color()

    const horizontal = props.orientation === 'h'
    const plotType = horizontal
      ? Plottable.Plots.Bar.ORIENTATION_HORIZONTAL
      : Plottable.Plots.Bar.ORIENTATION_VERTICAL
    this.plot = new Plottable.Plots.ClusteredBar(plotType)
      .addClass('grouped-bar-plot')
      .attr('fill', (d, i, dataset) => dataset.metadata(), colorScale)
      .labelsEnabled(false)
      .animated(props.animated)
      .baselineValue(props.baselineValue)
    this.plot[horizontal ? 'x' : 'y'](d => d.value, scale)
    this.plot[horizontal ? 'y' : 'x'](d => d.label, categoryScale)
    this.datasets.forEach(dataset => {
      this.plot.addDataset(dataset)
    })

    if (props.labelFormatter) {
      this.plot.labelFormatter(props.labelFormatter).labelsEnabled(true)
    }

    if (props.clickHandler) {
      new Plottable.Interactions.Click()
        .onClick(point => {
          const target = this.plot.entitiesAt(point)[0]
          props.clickHandler(target, this.plot.entities())
        })
        .attachTo(this.plot)
    }

    if (props.hoverHandler) {
      new Plottable.Interactions.Pointer()
        .onPointerMove(point => {
          const target = this.plot.entitiesAt(point)[0]
          props.hoverHandler(target, this.plot.entities())
        })
        .onPointerExit(point => {
          props.hoverHandler(null, this.plot.entities())
        })
        .attachTo(this.plot)
    }

    this.legend = new Plottable.Components.Legend(colorScale)
      .addClass('grouped-bar-legend')
      .xAlignment('center')
      .yAlignment('center')

    let plotArea
    if (props.showXgridlines || props.showYgridlines) {
      const xScale = (props.showXgridlines && horizontal) ? scale : null
      const yScale = (props.showYgridlines && !horizontal) ? scale : null
      const gridlines = new Plottable.Components.Gridlines(xScale, yScale)
      plotArea = new Plottable.Components.Group([gridlines, this.plot])
    } else {
      plotArea = this.plot
    }

    const _layout = new Plottable.Components.Table([
      [null, plotArea],
      [null, null]
    ])
    if (!props.hideXaxis) {
      const xAxis = horizontal
        ? new Plottable.Axes.Numeric(scale, 'bottom').formatter(shortScaleFormatter)
        : new Plottable.Axes.Category(categoryScale, 'bottom')
      _layout.add(xAxis, 1, 1)
    }
    if (!props.hideYaxis) {
      const yAxis = horizontal
        ? new Plottable.Axes.Category(categoryScale, 'left')
        : new Plottable.Axes.Numeric(scale, 'left').formatter(shortScaleFormatter)
      _layout.add(yAxis, 0, 0)
    }

    if (props.legendPosition === 't') {
      this.layout = new Plottable.Components.Table([
        [this.legend.maxEntriesPerRow(99)],
        [_layout]
      ]).rowPadding(10)
    } else if (props.legendPosition === 'r') {
      this.layout = new Plottable.Components.Table([
        [_layout, this.legend]
      ]).columnPadding(10)
    } else if (props.legendPosition === 'b') {
      this.layout = new Plottable.Components.Table([
        [_layout],
        [this.legend.maxEntriesPerRow(99)]
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
    window.addEventListener('resize', this.resizeHandler)
  }

  unmount () {
    window.removeEventListener('resize', this.resizeHandler)
  }

  update (nextProps) {
    if (nextProps.labels.length !== nextProps.traces.length) throw new Error()
    this.datasets = nextProps.traces.map((t, i) => {
      const data = t.values.map((v, i) => ({value: v, label: t.labels[i]}))
      return new Plottable.Dataset(data).metadata(nextProps.labels[i])
    })
    this.plot.datasets(this.datasets)
    const colorScale = nextProps.colorScale || this.colorScale
    this.plot.attr('fill', (d, i, dataset) => dataset.metadata(), colorScale)
    this.legend.colorScale(colorScale)
  }
}
