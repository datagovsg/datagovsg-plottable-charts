import Chart from './Chart'

/**
 * @typedef {Object} StackedBar
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

export default class StackedBar extends Chart {
  /**
   * @param {Object} props
   * @param {string[]} props.labels - required
   * @param {Object[]} props.traces - required
   * @param {string[]} props.traces.labels - required
   * @param {number[]} props.traces.values - required
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
   * @param {('t'|'r'|'b'|'l'|'none')} props.legendPosition - default 'r'
   * @param {boolean} props.animated - default true
   * @param {Function} props.clickHandler - optional
   * @param {Function} props.hoverHandler - optional
   *
   * @return {StackedBar}
   */
  constructor (props) {
    super()
    props = Object.assign(this.options, props)

    const scale = props.scale || new Plottable.Scales.Linear()
    const categoryScale = props.categoryScale || new Plottable.Scales.Category()
    const colorScale = props.colorScale || new Plottable.Scales.Color()

    const horizontal = props.orientation === 'h'
    const plotType = horizontal
      ? Plottable.Plots.Bar.ORIENTATION_HORIZONTAL
      : Plottable.Plots.Bar.ORIENTATION_VERTICAL
    this.plot = new Plottable.Plots.StackedBar(plotType)
      .attr('fill', (d, i, dataset) => dataset.metadata(), colorScale)
      .labelsEnabled(false)
      .animated(props.animated)
      .baselineValue(props.baselineValue)
    this.plot[horizontal ? 'x' : 'y'](d => d.value, scale)
    this.plot[horizontal ? 'y' : 'x'](d => d.label, categoryScale)

    if (props.data) {
      this.datasets = props.data.map(s => new Plottable.Dataset(s.series, s.label))
      this.datasets.forEach(dataset => {
        this.plot.addDataset(dataset)
      })
    }

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
}
