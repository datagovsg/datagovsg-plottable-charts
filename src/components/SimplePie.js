import Chart from './Chart'
import sortBy from 'lodash/sortBy'

/**
 * @typedef {Object} SimplePie
 * @property {Object} layout
 * @property {Object} plot
 * @property {Object} legend
 * @property {Function} mount
 * @property {Function} update
 * @property {Function} unmount
 * @property {Object} options
 */

export default class SimplePie extends Chart {
  /**
   * @param {Object} props
   * @param {string[]} props.labels - required
   * @param {number[]} props.values - required
   * @param {boolean} props.sorted - default false
   * @param {Object} props.colorScale - default new Plottable.Scales.Color()
   * @param {number} props.innerRadius - default 0
   * @param {number} props.outerRadius - default min(plot.height, plot.width) / 2
   * @param {Function} props.labelFormatter - optional
   * @param {('t'|'r'|'b'|'l'|'none')} props.legendPosition - default 'none'
   * @param {boolean} props.animated - default true
   * @param {Function} props.clickHandler - optional
   * @param {Function} props.hoverHandler - optional
   *
   * @return {SimplePie}
   */
  constructor (props) {
    super()
    this.options.legendPosition = 'none'
    props = Object.assign(this.options, props)

    if (props.sorted) props.data = sortBy(props.data, 'value')
    if (props.sorted === 'd') props.data.reverse()
    this.dataset = new Plottable.Dataset(props.data)

    const total = props.data.reduce((sum, d) => sum + d.value, 0)
    const scale = new Plottable.Scales.Linear().domain([0, total])
    const colorScale = props.colorScale || new Plottable.Scales.Color()

    props.outerRadius = props.outerRadius || (d => Math.min(this.plot.width(), this.plot.height()) / 2)

    this.plot = new Plottable.Plots.Pie()
      .addClass('simple-pie-plot')
      .addDataset(this.dataset)
      .sectorValue(d => d.value, scale)
      .attr('fill', d => d.label, colorScale)
      .labelsEnabled(false)
      .innerRadius(props.innerRadius)
      .outerRadius(props.outerRadius)
      .animated(props.animated)

    if (props.labelFormatter) {
      this.plot.labelFormatter(props.labelFormatter).labelsEnabled(true)
    }

    this.layout = this.plot

    this._setLegend(props, colorScale)
    this._setInteractions(props)
  }

  update (nextProps) {
    if (this.options.sorted) nextProps.data = sortBy(nextProps.data, 'value')
    if (this.options.sorted === 'd') nextProps.data.reverse()
    const total = nextProps.data.reduce((sum, d) => sum + d.value, 0)
    this.plot.sectorValue().scale.domain([0, total])
    this.dataset.data(nextProps.data)
    Object.assign(this.options, {data: nextProps.data})
    this.onUpdate(nextProps)
  }
}
