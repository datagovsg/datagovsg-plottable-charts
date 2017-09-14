import throttle from 'lodash/throttle'

export default class Chart {
  constructor () {
    this.options = {
      innerRadius: 0,
      strokeWidth: 2,
      markerSize: 0,
      sorted: false,
      orientation: 'v',
      baselineValue: 0,
      hideXaxis: false,
      hideYaxis: false,
      showGridLines: false,
      showXgridlines: false,
      showYgridlines: false,
      guideLine: 'none',
      legendPosition: 'r',
      animated: true
    }
    this.resizeHandler = throttle(this.resizeHandler, 200).bind(this)
    this._onMount = []
    this._onUnmount = []
    this._onUpdate = []
    this._onResize = []
  }

  update (nextProps) {
    this.datasets = nextProps.data.map(s => new Plottable.Dataset(s.items, s.label))
    this.plot.datasets(this.datasets)
    this.options.data = nextProps.data
    this.onUpdate(nextProps)
  }

  _setGridlines (props, scale) {
    if (props.showGridlines) {
      const horizontal = props.orientation === 'h'
      const xScale = horizontal ? scale : null
      const yScale = horizontal ? null : scale
      this.gridlines = new Plottable.Components.Gridlines(xScale, yScale)
    }
  }

  _setAxes (props, scale, categoryScale) {
    const horizontal = props.orientation === 'h'
    if (!props.hideXaxis) {
      if (horizontal) {
        this.xAxis = new Plottable.Axes.Numeric(scale, 'bottom')
      } else {
        this.xAxis = categoryScale instanceof Plottable.Scales.Time
          ? new Plottable.Axes.Time(categoryScale, 'bottom')
          : new Plottable.Axes.Category(categoryScale, 'bottom')
      }
      this.layout.add(this.xAxis, 1, 2)
    }
    if (!props.hideYaxis) {
      if (horizontal) {
        this.yAxis = categoryScale instanceof Plottable.Scales.Time
          ? new Plottable.Axes.Time(categoryScale, 'left')
          : new Plottable.Axes.Category(categoryScale, 'left')
      } else {
        this.yAxis = new Plottable.Axes.Numeric(scale, 'left')
      }
      this.layout.add(this.yAxis, 0, 1)
    }
    if (props.xLabel) {
      this.layout.add(new Plottable.Components.AxisLabel(props.xLabel), 2, 2)
    }
    if (props.yLabel) {
      this.layout.add(new Plottable.Components.AxisLabel(props.yLabel, -90), 0, 0)
    }
  }

  _setLegend (props, colorScale) {
    this.legend = new Plottable.Components.Legend(colorScale)
      .xAlignment('center')
      .yAlignment('center')
    switch (props.legendPosition) {
      case 't':
        this.layout = new Plottable.Components.Table([
          [this.legend.maxEntriesPerRow(Infinity)],
          [this.layout]
        ]).rowPadding(10)
        break
      case 'r':
        this.layout = new Plottable.Components.Table([
          [this.layout, this.legend]
        ]).columnPadding(10)
        break
      case 'b':
        this.layout = new Plottable.Components.Table([
          [this.layout],
          [this.legend.maxEntriesPerRow(Infinity)]
        ]).rowPadding(10)
        break
      case 'l':
        this.layout = new Plottable.Components.Table([
          [this.legend, this.layout]
        ]).columnPadding(10)
        break
    }
  }

  _setInteractions (props) {
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
  }

  resizeHandler () {
    this.layout.redraw()
    this.onResize()
  }

  mount (element) {
    this.layout.renderTo(element)
    window.addEventListener('resize', this.resizeHandler)
    this.onMount(element)
  }

  unmount () {
    this.onUnmount()
    window.removeEventListener('resize', this.resizeHandler)
    this.layout.detach()
  }

  get onMount () {
    return function (element) {
      this._onMount.forEach(cb => {
        cb.call(this, element)
      })
    }
  }

  set onMount (cb) {
    this._onMount.push(cb)
  }

  get onUnmount () {
    return function (element) {
      this._onUnmount.forEach(cb => {
        cb.call(this)
      })
    }
  }

  set onUnmount (cb) {
    this._onUnmount.push(cb)
  }

  get onUpdate () {
    return function (nextProps) {
      Plottable.Utils.DOM.requestAnimationFramePolyfill(() => {
        this._onUpdate.forEach(cb => {
          cb.call(this, nextProps)
        })
      })
    }
  }

  set onUpdate (cb) {
    this._onUpdate.push(cb)
  }

  get onResize () {
    return function () {
      Plottable.Utils.DOM.requestAnimationFramePolyfill(() => {
        this._onResize.forEach(cb => {
          cb.call(this)
        })
      })
    }
  }

  set onResize (cb) {
    this._onResize.push(cb)
  }
}
