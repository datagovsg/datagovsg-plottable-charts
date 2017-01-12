import throttle from 'lodash/throttle'

export default class SimplePie {
  /**
   * @param {string[]} props.labels - required
   * @param {number[]} props.valuess - required
   * @param {Object} props.colorScale - default new Plottable.Scales.Color()
   * @param {number} props.innerRadius - default 0
   * @param {Function} props.labelFormatter - optional
   * @param {Function} props.tooltipFormatter - optional
   * @param {string} props.hideLabel - default false
   * @param {boolean} props.animated - default true
   * @param {Function} props.clickHandler - optional
   * @param {function} props.hoverHandler - optional
   */
  constructor (props) {
    const defaultProps = {
      innerRadius: 0,
      hideLegend: false,
      animated: true
    }
    props = Object.assign(defaultProps, props)

    if (props.labels.length !== props.values.length) throw new Error()
    const data = props.values.map((v, i) => ({value: v, label: props.labels[i]}))
    this.dataset = new Plottable.Dataset(data)

    const scale = new Plottable.Scales.Linear()
    const colorScale = props.colorScale || new Plottable.Scales.Color()

    this.plot = new Plottable.Plots.Pie()
      .addClass('simple-pie-plot')
      .addDataset(this.dataset)
      .sectorValue(d => d.value, scale)
      .attr('fill', d => d.label, colorScale)
      .labelsEnabled(false)
      .innerRadius(props.innerRadius)
      .animated(props.animated)

    if (props.labelFormatter) {
      this.plot.labelFormatter(props.labelFormatter).labelsEnabled(true)
    }

    if (props.tooltipFormatter) {
      this.plot.attr('data-title', props.tooltipFormatter)
      this.tooltipEnabled = true
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

    this.legend = props.hideLegend ? null : (
      new Plottable.Components.Legend(colorScale)
        .addClass('simple-pie-legend')
        .xAlignment('center')
        .yAlignment('center')
    )

    this.layout = new Plottable.Components.Table([
      [this.plot, null],
      [null]
    ]).rowPadding(20)

    this.resizeHandler = throttle(this.resizeHandler, 200).bind(this)
  }

  resizeHandler () {
    this.relayout()
    this.layout.redraw()
  }

  mount (element) {
    this.relayout = () => {
      if (!this.legend) return
      if (this.layout.has(this.legend)) this.layout.remove(this.legend)
      const width = element.width.baseVal.value
      const height = element.height.baseVal.value
      if (width < height * 1.5) {
        this.layout.add(this.legend, 1, 0)
      } else {
        this.layout.add(this.legend, 0, 1)
      }
    }
    this.relayout()
    this.layout.renderTo(element)

    if (this.plot.labelsEnabled) {
      const tooltipAnchorSelection = this.plot.foreground()
        .append('circle')
        .attr({r: 3, opacity: 0})
      const tooltipAnchor = $(tooltipAnchorSelection.node())
      tooltipAnchor.tooltip({
        animation: false,
        container: 'body',
        placement: 'top',
        title: 'text',
        trigger: 'manual'
      })
      new Plottable.Interactions.Pointer()
        .onPointerMove(point => {
          const target = this.plot.entitiesAt(point)[0]
          if (target) {
            const textLabel = this.plot.content()
              .selectAll('.label-area > g').filter((d, i) => i === target.index)
            if (textLabel.size() && textLabel.style('visibility') !== 'hidden') {
              tooltipAnchor.tooltip('hide')
              return
            }
            tooltipAnchorSelection.attr({
              cx: target.position.x,
              cy: target.position.y,
              'data-original-title': 'Value: ' + this.plot.labelFormatter()(target.datum.value)
            })
            tooltipAnchor.tooltip('show')
          }
        })
        .onPointerExit(point => {
          tooltipAnchor.tooltip('hide')
        })
        .attachTo(this.plot)
    }

    window.addEventListener('resize', this.resizeHandler)
  }

  unmount () {
    window.removeEventListener('resize', this.resizeHandler)
  }

  update (nextProps) {
    if (nextProps.labels.length !== nextProps.values.length) throw new Error()
    const data = nextProps.values
      .map((v, i) => ({value: v, label: nextProps.labels[i]}))
    this.dataset.data(data)
    const colorScale = nextProps.colorScale || new Plottable.Scales.Color()
    this.plot.attr('fill', d => d.label, colorScale)
    this.legend.colorScale(colorScale)
  }
}
