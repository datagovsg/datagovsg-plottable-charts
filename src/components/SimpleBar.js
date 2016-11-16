import sortBy from 'lodash/sortBy'
import throttle from 'lodash/throttle'
import {shortScaleFormatter} from './helpers'

const defaultProps = {
  orientation: 'v',
  baselineValue: 0,
  showPercent: false,
  hideXaxis: false,
  hideYaxis: false,
  showXgridlines: false,
  showYgridlines: false,
  animated: true
}

export default class SimpleBar {
  constructor (props) {
    props = Object.assign({}, defaultProps, props)

    if (props.labels.length !== props.values.length) throw new Error()
    let data = props.values.map((v, i) => ({value: v, label: props.labels[i]}))
    if (props.sorted) data = sortBy(data, 'value')
    if (props.sorted === 'd') data.reverse()
    this.dataset = new Plottable.Dataset(data)

    const categoryScale = new Plottable.Scales.Category()
    const scale = props.scale || new Plottable.Scales.Linear()
    const colorScale = props.colorScale || new Plottable.Scales.Color()

    const horizontal = props.orientation === 'h'
    const plotType = horizontal
      ? Plottable.Plots.Bar.ORIENTATION_HORIZONTAL
      : Plottable.Plots.Bar.ORIENTATION_VERTICAL
    this.plot = new Plottable.Plots.Bar(plotType)
      .addClass('simple-bar-plot')
      .addDataset(this.dataset)
      .attr('fill', d => d.label, colorScale)
      .labelsEnabled(false)
      .animated(props.animated)
      .baselineValue(props.baselineValue)
    this.plot[horizontal ? 'x' : 'y'](d => d.value, scale)
    this.plot[horizontal ? 'y' : 'x'](d => d.label, categoryScale)

    if (props.labelFormatter) {
      this.plot.labelFormatter(this.props.labelFormatter).labelsEnabled(true)
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

    let plotArea
    if (props.showXgridlines || props.showYgridlines) {
      const xScale = (props.showXgridlines && horizontal) ? scale : null
      const yScale = (props.showYgridlines && !horizontal) ? scale : null
      const gridlines = new Plottable.Components.Gridlines(xScale, yScale)
      plotArea = new Plottable.Components.Group([this.plot, gridlines])
    } else {
      plotArea = this.plot
    }

    this.layout = new Plottable.Components.Table([
      [null, plotArea, null],
      [null, null]
    ])
    if (!horizontal && props.values.length > 7) {
      this.legend = new Plottable.Components.Legend(colorScale)
        .addClass('simple-bar-legend')
        .xAlignment('center')
        .yAlignment('center')
      this.layout.add(this.legend, 0, 2)
    }
    if (!props.hideXaxis) {
      const xAxis = horizontal
        ? new Plottable.Axes.Numeric(scale, 'bottom').formatter(shortScaleFormatter)
        : new Plottable.Axes.Category(categoryScale, 'bottom')
      if (!horizontal && props.values.length > 7) xAxis.formatter(() => '')
      this.layout.add(xAxis, 1, 1)
    }
    if (!props.hideYaxis) {
      const yAxis = horizontal
        ? new Plottable.Axes.Category(categoryScale, 'left')
        : new Plottable.Axes.Numeric(scale, 'left').formatter(shortScaleFormatter)
      this.layout.add(yAxis, 0, 0)
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
    if (nextProps.labels.length !== nextProps.values.length) throw new Error()
    let data = nextProps.values
      .map((v, i) => ({value: v, label: nextProps.labels[i]}))
    if (nextProps.sorted) data = sortBy(data, 'value')
    if (nextProps.sorted === 'd') data.reverse()
    this.dataset.data(data)
    const colorScale = nextProps.colorScale || new Plottable.Scales.Color()
    this.plot.attr('fill', d => d.label, colorScale)
  }
}

SimpleBar.defaultProps = {
  orientation: 'v',
  baselineValue: 0,
  showPercent: false,
  hideXaxis: false,
  hideYaxis: false,
  animated: true
}
