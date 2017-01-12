import sortBy from 'lodash/sortBy'
import throttle from 'lodash/throttle'
import {getCustomShortScaleFormatter} from '../helpers'

export default class SimpleBar {
  /**
   * @param {string[]} props.labels - required
   * @param {number[]} props.values - required
   * @param {boolean} props.sorted - default false
   * @param {Object} props.scale - default new Plottable.Scales.Linear()
   * @param {Object} props.colorScale - default new Plottable.Scales.Color()
   * @param {('h'|'v')} props.orientation - default 'h'
   * @param {number} props.baselineValue - default 0
   * @param {Function} props.labelFormatter - optional
   * @param {Function} props.tooltipFormatter - optional
   * @param {boolean} props.hideXaxis - default false
   * @param {boolean} props.hideYaxis - default false
   * @param {boolean} props.showXgridlines - default false
   * @param {boolean} props.showYgridlines - default false
   * @param {string} props.xLabel - optional
   * @param {string} props.yLabel - optional
   * @param {boolean} props.animated - default true
   * @param {Function} props.clickHandler - optional
   * @param {function} props.hoverHandler - optional
   */
  constructor (props) {
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
    props = Object.assign(defaultProps, props)

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

    let plotArea
    if (props.showXgridlines || props.showYgridlines) {
      const xScale = (props.showXgridlines && horizontal) ? scale : null
      const yScale = (props.showYgridlines && !horizontal) ? scale : null
      const gridlines = new Plottable.Components.Gridlines(xScale, yScale)
      plotArea = new Plottable.Components.Group([this.plot, gridlines])
    } else {
      plotArea = this.plot
    }

    const _layout = new Plottable.Components.Table([
      [null, null, plotArea],
      [null, null, null],
      [null, null, null]
    ])
    if (!props.hideXaxis) {
      this.xAxis = horizontal
        ? new Plottable.Axes.Numeric(scale, 'bottom').formatter(getCustomShortScaleFormatter())
        : new Plottable.Axes.Category(categoryScale, 'bottom')
      if (!horizontal && props.values.length > 7) this.xAxis.formatter(() => '')
      this.layout.add(this.xAxis, 1, 2)
    }
    if (!props.hideYaxis) {
      this.yAxis = horizontal
        ? new Plottable.Axes.Category(categoryScale, 'left')
        : new Plottable.Axes.Numeric(scale, 'left').formatter(getCustomShortScaleFormatter())
      this.layout.add(this.yAxis, 0, 1)
    }
    if (props.xLabel) {
      _layout.add(new Plottable.Components.AxisLabel(props.xLabel), 2, 2)
    }
    if (props.yLabel) {
      _layout.add(new Plottable.Components.AxisLabel(props.yLabel, -90), 0, 0)
    }

    if (!horizontal && props.values.length > 7) {
      this.legend = new Plottable.Components.Legend(colorScale)
        .xAlignment('center')
        .yAlignment('center')
      this.layout = new Plottable.Components.Table([
        [_layout, this.legend]
      ]).columnPadding(10)
    } else {
      this.layout = _layout
    }

    this.resizeHandler = throttle(this.resizeHandler, 200).bind(this)
  }

  resizeHandler () {
    this.layout.redraw()
  }

  mount (element) {
    this.layout.renderTo(element)

    if (this.tooltipEnabled) {
      $(element).find('.bar-area rect').tooltip({
        animation: false,
        container: element,
        html: true,
        placement (tip, target) {
          var position = $(target).position()

          var width = element.width()
          var height = element.height()
          var targetHeight = $(target).attr('height') ? +$(target).attr('height') : 0
          var targetWidth = $(target).attr('width') ? +$(target).attr('width') : 0

          // determine position by elimination
          if (position.left + targetWidth <= width * 0.9) return 'right'
          else if (position.left >= width * 0.1) return 'left'
          else if (position.top >= height * 0.4) return 'top'
          else if (position.top + targetHeight <= height * 0.6) return 'bottom'
          else return 'right'
        }
      })
    }

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
