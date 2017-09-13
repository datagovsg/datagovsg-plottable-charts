import Chart from './Chart'
import sortBy from 'lodash/sortBy'

/**
 * @typedef {Object} SimpleBar
 * @property {Object} layout
 * @property {Object} plot
 * @property {Object} legend
 * @property {Object} xAxis
 * @property {Object} yAxis
 * @property {Object} xLabel
 * @property {Object} yLabel
 * @property {Object} gridlines
 * @property {Function} mount
 * @property {Function} update
 * @property {Function} unmount
 * @property {Object} options
 */

export default class SimpleBar extends Chart {
  /**
   * @param {Object} props
   * @param {string[]} props.labels - required
   * @param {number[]} props.values - required
   * @param {boolean} props.sorted - default false
   * @param {Object} props.scale - default new Plottable.Scales.Linear()
   * @param {Object} props.categoryScale - default new Plottable.Scales.Category()
   * @param {String} props.fill - optional
   * @param {('h'|'v')} props.orientation - default 'h'
   * @param {number} props.baselineValue - default 0
   * @param {Function} props.labelFormatter - optional
   * @param {boolean} props.hideXaxis - default false
   * @param {boolean} props.hideYaxis - default false
   * @param {boolean} props.showXgridlines - default false
   * @param {boolean} props.showYgridlines - default false
   * @param {('t'|'r'|'b'|'l'|'none')} props.legendPosition - default 'r'
   * @param {string} props.xLabel - optional
   * @param {string} props.yLabel - optional
   * @param {boolean} props.animated - default true
   * @param {Function} props.clickHandler - optional
   * @param {Function} props.hoverHandler - optional
   *
   * @return {SimpleBar}
   */
  constructor (props) {
    super()
    this.options = {
      sorted: false,
      orientation: 'v',
      baselineValue: 0,
      hideXaxis: false,
      hideYaxis: false,
      showXgridlines: false,
      showYgridlines: false,
      legendPosition: 'none',
      animated: true
    }
    props = Object.assign(this.options, props)

    if (props.sorted) props.data = sortBy(props.data, 'value')
    if (props.sorted === 'd') props.data.reverse()
    this.dataset = new Plottable.Dataset(props.data)

    const scale = props.scale || new Plottable.Scales.Linear()
    const categoryScale = props.categoryScale || new Plottable.Scales.Category()

    const horizontal = props.orientation === 'h'
    const plotType = horizontal
      ? Plottable.Plots.Bar.ORIENTATION_HORIZONTAL
      : Plottable.Plots.Bar.ORIENTATION_VERTICAL
    this.plot = new Plottable.Plots.Bar(plotType)
      .addDataset(this.dataset)
      .attr('fill', props.fill)
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
      this.gridlines = new Plottable.Components.Gridlines(xScale, yScale)
      plotArea = new Plottable.Components.Group([this.gridlines, this.plot])
    } else {
      plotArea = this.plot
    }

    const _layout = new Plottable.Components.Table([
      [null, null, plotArea],
      [null, null, null],
      [null, null, null]
    ])
    if (!props.hideXaxis) {
      if (horizontal) {
        this.xAxis = new Plottable.Axes.Numeric(scale, 'bottom')
      } else {
        this.xAxis = categoryScale instanceof Plottable.Scales.Time
          ? new Plottable.Axes.Time(categoryScale, 'bottom')
          : new Plottable.Axes.Category(categoryScale, 'bottom')
      }
      if (!horizontal && props.values.length > 7) this.xAxis.formatter(() => '')
      _layout.add(this.xAxis, 1, 2)
    }
    if (!props.hideYaxis) {
      if (horizontal) {
        this.yAxis = categoryScale instanceof Plottable.Scales.Time
          ? new Plottable.Axes.Time(categoryScale, 'left')
          : new Plottable.Axes.Category(categoryScale, 'left')
      } else {
        this.yAxis = new Plottable.Axes.Numeric(scale, 'left')
      }
      _layout.add(this.yAxis, 0, 1)
    }
    if (props.xLabel) {
      _layout.add(new Plottable.Components.AxisLabel(props.xLabel), 2, 2)
    }
    if (props.yLabel) {
      _layout.add(new Plottable.Components.AxisLabel(props.yLabel, -90), 0, 0)
    }

    this.layout = _layout
  }

  update (nextProps) {
    if (this.options.sorted) nextProps.data = sortBy(nextProps.data, 'value')
    if (this.options.sorted === 'd') nextProps.data.reverse()
    this.dataset.data(nextProps.data)
    Object.assign(this.options, {data: nextProps.data})
    this.onUpdate(nextProps)
  }
}
