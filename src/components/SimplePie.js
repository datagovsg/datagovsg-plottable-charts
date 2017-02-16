import Chart from './Chart'
import sortBy from 'lodash/sortBy'

export default class SimplePie extends Chart {
  /**
   * @param {string[]} props.labels - required
   * @param {number[]} props.valuess - required
   * @param {boolean} props.sorted - default false
   * @param {Object} props.colorScale - default new Plottable.Scales.Color()
   * @param {number} props.innerRadius - default 0
   * @param {number} props.outerRadius - default min(plot.height, plot.width) / 2
   * @param {Function} props.labelFormatter - optional
   * @param {('t'|'r'|'b'|'l'|'none')} props.legendPosition - default 'r'
   * @param {boolean} props.animated - default true
   * @param {Function} props.clickHandler - optional
   * @param {function} props.hoverHandler - optional
   */
  constructor (props) {
    super()
    this.options = {
      sorted: false,
      innerRadius: 0,
      legendPosition: 'none',
      animated: true
    }
    props = Object.assign(this.options, props)

    if (props.labels.length !== props.values.length) throw new Error()
    let data = props.values.map((v, i) => ({value: v, label: props.labels[i]}))
    if (props.sorted) data = sortBy(data, 'value')
    if (props.sorted === 'd') data.reverse()
    this.dataset = new Plottable.Dataset(data)

    const total = data.reduce((sum, d) => sum + d.value, 0)
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
      .xAlignment('center')
      .yAlignment('center')
    if (props.legendPosition === 't') {
      this.layout = new Plottable.Components.Table([
        [this.legend.maxEntriesPerRow(Infinity)],
        [this.plot]
      ]).rowPadding(10)
    } else if (props.legendPosition === 'r') {
      this.layout = new Plottable.Components.Table([
        [this.plot, this.legend]
      ]).columnPadding(10)
    } else if (props.legendPosition === 'b') {
      this.layout = new Plottable.Components.Table([
        [this.plot],
        [this.legend.maxEntriesPerRow(Infinity)]
      ]).rowPadding(10)
    } else if (props.legendPosition === 'l') {
      this.layout = new Plottable.Components.Table([
        [this.legend, this.plot]
      ]).columnPadding(10)
    } else if (props.legendPosition === 'none') {
      this.layout = this.plot
    }
  }

  update (nextProps) {
    if (nextProps.labels.length !== nextProps.values.length) throw new Error()
    let data = nextProps.values
      .map((v, i) => ({value: v, label: nextProps.labels[i]}))
    if (this.options.sorted) data = sortBy(data, 'value')
    if (this.options.sorted === 'd') data.reverse()
    const total = data.reduce((sum, d) => sum + d.value, 0)
    this.plot.sectorValue().scale.domain([0, total])
    this.dataset.data(data)
    Object.assign(this.options, {
      labels: nextProps.labels,
      values: nextProps.values
    })
    this.onUpdate(nextProps)
  }
}
