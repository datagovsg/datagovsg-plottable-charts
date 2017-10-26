import Chart from './Chart'
import sortBy from 'lodash/sortBy'

/**
 * @typedef {Object} Chart
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
 *
 * @typedef {Object} DataPoint
 * @property {string[]} label - required
 * @property {number[]} value - required
 */

export default class SimpleBar extends Chart {
  /**
   * @param {Object} props
   * @param {DataPoint[]} props.data
   * @param {boolean} props.sorted - default false
   * @param {Object} props.scale - default new Plottable.Scales.Linear()
   * @param {Object} props.categoryScale - default new Plottable.Scales.Category()
   * @param {Object} props.colorScale - default new Plottable.Scales.Color()
   * @param {('h'|'v')} props.orientation - default 'h'
   * @param {number} props.baselineValue - default 0
   * @param {Function} props.labelFormatter - optional
   * @param {boolean} props.showGridlines - default false
   * @param {boolean} props.hideXaxis - default false
   * @param {boolean} props.hideYaxis - default false
   * @param {string} props.xLabel - optional
   * @param {string} props.yLabel - optional
   * @param {('t'|'r'|'b'|'l'|'none')} props.legendPosition - default 'none'
   * @param {boolean} props.animated - default true
   * @param {Function} props.clickHandler - optional
   * @param {Function} props.hoverHandler - optional
   *
   * @return {Chart}
   */
  constructor (props) {
    super()
    this.options.legendPosition = 'none'
    props = Object.assign(this.options, props)

    if (props.sorted) props.data = sortBy(props.data, 'value')
    if (props.sorted === 'd') props.data.reverse()
    this.dataset = new Plottable.Dataset(props.data)

    const scale = props.scale || new Plottable.Scales.Linear()
    const categoryScale = props.categoryScale || new Plottable.Scales.Category()
    const colorScale = props.colorScale || new Plottable.Scales.Color()

    const horizontal = props.orientation === 'h'
    const plotType = horizontal
      ? Plottable.Plots.Bar.ORIENTATION_HORIZONTAL
      : Plottable.Plots.Bar.ORIENTATION_VERTICAL
    this.plot = new Plottable.Plots.Bar(plotType)
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

    this._setGridlines(props, scale)
    const plotArea = this.gridlines
    ? new Plottable.Components.Group([this.gridlines, this.plot])
    : this.plot

    this.layout = new Plottable.Components.Table([
      [null, null, plotArea],
      [null, null, null],
      [null, null, null]
    ])

    this._setAxes(props, scale, categoryScale)
    this._setLegend(props, colorScale)
    this._setInteractions(props)
  }

  update (nextProps) {
    if (this.options.sorted) nextProps.data = sortBy(nextProps.data, 'value')
    if (this.options.sorted === 'd') nextProps.data.reverse()
    this.dataset.data(nextProps.data)
    Object.assign(this.options, {data: nextProps.data})
    this.onUpdate(nextProps)
  }
}
