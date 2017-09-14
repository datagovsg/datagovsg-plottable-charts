import SimplePie from './components/SimplePie'
import SimpleBar from './components/SimpleBar'
import GroupedBar from './components/GroupedBar'
import StackedBar from './components/StackedBar'
import MultipleLine from './components/MultipleLine'

import {
  highlightOnHover,
  setupOuterLabel,
  removeInnerPadding,
  downsampleTicks
} from './plugins'

import {
  getScale,
  getCategoryScale,
  getColorScale,
  getCustomShortScaleFormatter,
  DATAGOVSG_COLORS
} from './helpers'

export {SimplePie, SimpleBar, GroupedBar, StackedBar, MultipleLine}

export class DatagovsgSimplePie extends SimplePie {
  constructor (props) {
    super(props)

    highlightOnHover(this)
    setupOuterLabel(this, {labelFormatter: d => d.label})
  }
}

export class DatagovsgSimpleBar extends SimpleBar {
  constructor (props) {
    props = Object.assign({
      scale: getScale(),
      categoryScale: getCategoryScale(),
      color: DATAGOVSG_COLORS[0],
      showGridlines: true
    }, props)

    super(props)

    highlightOnHover(this)

    postprocess(this.xAxis, this.yAxis)
    if (props.data.length > 7) this.xAxis.formatter(() => '')
  }
}

export class DatagovsgHorizontalBar extends SimpleBar {
  constructor (props) {
    props = Object.assign({
      orientation: 'h',
      sorted: 'd',
      scale: getScale(),
      categoryScale: getCategoryScale(),
      color: DATAGOVSG_COLORS[0],
      showGridlines: true
    }, props)

    super(props)

    highlightOnHover(this)

    postprocess(this.yAxis, this.xAxis)
  }
}

export class DatagovsgGroupedBar extends GroupedBar {
  constructor (props) {
    props = Object.assign({
      scale: getScale(),
      categoryScale: getCategoryScale(),
      colorScale: getColorScale(),
      showGridlines: true
    }, props)

    super(props)

    downsampleTicks(this)
    removeInnerPadding(this)

    postprocess(this.xAxis, this.yAxis)
  }
}

export class DatagovsgStackedBar extends StackedBar {
  constructor (props) {
    props = Object.assign({
      scale: getScale(),
      categoryScale: getCategoryScale(),
      colorScale: getColorScale(),
      showGridlines: true
    }, props)

    super(props)

    downsampleTicks(this)
    removeInnerPadding(this)

    postprocess(this.xAxis, this.yAxis)
  }
}

export class DatagovsgLine extends MultipleLine {
  constructor (props) {
    props = Object.assign({
      yScale: getScale(),
      xScale: getCategoryScale(),
      colorScale: getColorScale(),
      showYgridlines: true,
      guideLine: 'v'
    }, props)

    super(props)

    downsampleTicks(this)

    postprocess(this.xAxis, this.yAxis)
  }
}

function postprocess (primaryAxis, secondaryAxis) {
  primaryAxis
    .margin(12)
    .endTickLength(0)
    .tickLabelPadding(5)
  secondaryAxis
    .margin(12)
    .innerTickLength(0)
    .endTickLength(0)
    .tickLabelPadding(3)
    .showEndTickLabels(true)
    .addClass('hide-baseline')
    .formatter(getCustomShortScaleFormatter())
  // hack to show end tick labels
  secondaryAxis._hideOverflowingTickLabels = () => null
}
