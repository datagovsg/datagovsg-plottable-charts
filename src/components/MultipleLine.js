import throttle from 'lodash/throttle'
import {getCustomShortScaleFormatter} from '../helpers'

export default class MultipleLine {
  /**
   * @param {string[]} props.labels - required
   * @param {Object[]} props.traces - required
   * @param {number[]} props.traces.x- required
   * @param {number[]} props.traces.y - required
   * @param {Object} props.xScale - default new Plottable.Scales.Linear()
   * @param {Object} props.yScale - default new Plottable.Scales.Linear()
   * @param {Object} props.colorScale - default new Plottable.Scales.Color()
   * @param {number} props.strokeWidth - default 2
   * @param {number} props.markerSize - default 0
   * @param {boolean} props.hideXaxis - default false
   * @param {boolean} props.hideYaxis - default false
   * @param {boolean} props.showXgridlines - default false
   * @param {boolean} props.showYgridlines - default false
   * @param {('v'|'h'|'all'|'none')} props.guideLine - default 'none'
   * @param {('t'|'r'|'b'|'l'|'none')} props.legendPosition - default 'r'
   * @param {string} props.xLabel - optional
   * @param {string} props.yLabel - optional
   * @param {Function} props.clickHandler - optional
   * @param {Function} props.hoverHandler - optional
   */
  constructor (props) {
    const defaultProps = {
      strokeWidth: 2,
      markerSize: 0,
      hideXaxis: false,
      hideYaxis: false,
      showXgridlines: false,
      showYgridlines: false,
      guideLine: 'none',
      legendPosition: 'r'
    }
    props = Object.assign(defaultProps, props)

    if (props.labels.length !== props.traces.length) throw new Error()
    this.datasets = props.traces.map((t, i) => {
      const data = t.y.map((v, i) => ({value: v, label: t.x[i]}))
      return new Plottable.Dataset(data, props.labels[i])
    })

    const xScale = props.xScale || new Plottable.Scales.Linear()
    const yScale = props.yScale || new Plottable.Scales.Linear()
    const colorScale = props.colorScale || new Plottable.Scales.Color()

    this.plot = {
      lines: new Plottable.Plots.Line()
        .attr('stroke', (d, i, dataset) => dataset.metadata(), colorScale)
        .x(d => d.label, xScale)
        .y(d => d.value, yScale)
        .attr('stroke-width', props.strokeWidth),
      markers: new Plottable.Plots.Scatter()
        .attr('opacity', 1)
        .attr('fill', (d, i, dataset) => dataset.metadata(), colorScale)
        .x(d => d.label, xScale)
        .y(d => d.value, yScale)
        .size(props.markerSize)
    }

    this.datasets.forEach(dataset => {
      this.plot.lines.addDataset(dataset)
      this.plot.markers.addDataset(dataset)
    })

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

    this.gridlines = new Plottable.Components.Gridlines(
      (props.showXgridlines && xScale instanceof Plottable.QuantitativeScale) ? xScale : null,
      (props.showYgridlines && yScale instanceof Plottable.QuantitativeScale) ? yScale : null
    )

    this.guideLine = {horizontal: null, vertical: null}

    if (props.guideLine === 'v' || props.guideLine === 'all') {
      this.guideLine.vertical = new Plottable.Components.GuideLineLayer(
        Plottable.Components.GuideLineLayer.ORIENTATION_VERTICAL).scale(xScale)
      new Plottable.Interactions.Pointer()
        .onPointerMove(point => {
          const target = this.plot.markers.entityNearest(point)
          if (target) this.guideLine.vertical.value(target.datum.label)
          else this.guideLine.vertical.pixelPosition(-999)
        })
        .onPointerExit(point => {
          this.guideLine.vertical.pixelPosition(-999)
        })
        .attachTo(this.plot.markers)
    }
    if (props.guideLine === 'h' || props.guideLine === 'all') {
      this.guideLine.horizontal = new Plottable.Components.GuideLineLayer(
        Plottable.Components.GuideLineLayer.ORIENTATION_HORIZONTAL).scale(yScale)
      new Plottable.Interactions.Pointer()
        .onPointerMove(point => {
          const target = this.plot.markers.entityNearest(point)
          if (target) this.guideLine.horizontal.value(target.datum.value)
          else this.guideLine.horizontal.pixelPosition(-999)
        })
        .onPointerExit(point => {
          this.guideLine.horizontal.pixelPosition(-999)
        })
        .attachTo(this.plot.markers)
    }

    const plotArea = new Plottable.Components.Group([
      this.gridlines,
      this.guideLine.horizontal,
      this.guideLine.vertical,
      this.plot.lines,
      this.plot.markers
    ])

    this.legend = new Plottable.Components.Legend(colorScale)
      .xAlignment('center')
      .yAlignment('center')

    const _layout = new Plottable.Components.Table([
      [null, null, plotArea],
      [null, null, null],
      [null, null, null]
    ])
    if (!props.hideXaxis) {
      if (xScale instanceof Plottable.Scales.Time) {
        this.xAxis = new Plottable.Axes.Time(xScale, 'bottom')
      } else if (xScale instanceof Plottable.QuantitativeScale) {
        this.xAxis = new Plottable.Axes.Numeric(xScale, 'bottom')
          .formatter(getCustomShortScaleFormatter())
      } else {
        this.xAxis = new Plottable.Axes.Category(xScale, 'bottom')
      }
      _layout.add(this.xAxis, 1, 2)
    }
    if (!props.hideYaxis) {
      if (yScale instanceof Plottable.Scales.Time) {
        this.yAxis = new Plottable.Axes.Time(yScale, 'left')
      } else if (yScale instanceof Plottable.QuantitativeScale) {
        this.yAxis = new Plottable.Axes.Numeric(yScale, 'left')
          .formatter(getCustomShortScaleFormatter())
      } else {
        this.yAxis = new Plottable.Axes.Category(yScale, 'left')
      }
      _layout.add(this.yAxis, 0, 1)
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
    this.plot.lines.attr('stroke', (d, i, dataset) => dataset.metadata(), colorScale)
    this.plot.markers.attr('fill', (d, i, dataset) => dataset.metadata(), colorScale)
    this.legend.colorScale(colorScale)
  }
}
