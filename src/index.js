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
      fill: DATAGOVSG_COLORS[0],
      scale: getScale(),
      categoryScale: getCategoryScale(),
      showXgridlines: true
    }, props)

    super(props)

    highlightOnHover(this)

    // post-process
    this.xAxis
      .tickLabelPadding(5)
    this.yAxis
      .margin(0)
      .innerTickLength(0)
      .endTickLength(0)
      .tickLabelPadding(0)
      .showEndTickLabels(true)
      .addClass('hide-baseline')
      .formatter(getCustomShortScaleFormatter())
    // hack to show end tick labels
    this.xAxis._hideOverflowingTickLabels = () => null
    this.yAxis._hideOverflowingTickLabels = () => null
  }
}

export class DatagovsgHorizontalBar extends SimpleBar {
  constructor (props) {
    props = Object.assign({
      orientation: 'h',
      sorted: 'd',
      fill: DATAGOVSG_COLORS[0],
      scale: getScale(),
      categoryScale: getCategoryScale(),
      showXgridlines: true
    }, props)

    super(props)

    highlightOnHover(this)

    // post-process
    this.xAxis
      .margin(0)
      .innerTickLength(0)
      .endTickLength(0)
      .tickLabelPadding(0)
      .showEndTickLabels(true)
      .addClass('hide-baseline')
      .formatter(getCustomShortScaleFormatter())
    this.yAxis
      .tickLabelPadding(5)
    // hack to show end tick labels
    this.xAxis._hideOverflowingTickLabels = () => null
  }
}

export class DatagovsgGroupedBar extends GroupedBar {
  constructor (props) {
    props = Object.assign({
      scale: getScale(),
      categoryScale: getCategoryScale(),
      colorScale: getColorScale(),
      showYgridlines: true
    }, props)

    super(props)

    downsampleTicks(this)
    removeInnerPadding(this)

    this.xAxis
      .margin(2)
      .tickLabelPadding(0)
    this.yAxis
      .margin(0)
      .innerTickLength(0)
      .endTickLength(0)
      .tickLabelPadding(5)
      .showEndTickLabels(true)
      .addClass('hide-baseline')
      .formatter(getCustomShortScaleFormatter())
    // hack to show end tick labels
    this.xAxis._hideOverflowingTickLabels = () => null
    this.yAxis._hideOverflowingTickLabels = () => null
  }
}

export class DatagovsgStackedBar extends StackedBar {
  constructor (props) {
    props = Object.assign({
      scale: getScale(),
      categoryScale: getCategoryScale(),
      colorScale: getColorScale(),
      showYgridlines: true
    }, props)

    super(props)

    downsampleTicks(this)
    removeInnerPadding(this)

    this.xAxis
      .margin(2)
      .tickLabelPadding(0)
    this.yAxis
      .margin(0)
      .innerTickLength(0)
      .endTickLength(0)
      .tickLabelPadding(5)
      .showEndTickLabels(true)
      .addClass('hide-baseline')
      .formatter(getCustomShortScaleFormatter())
    // hack to show end tick labels
    this.xAxis._hideOverflowingTickLabels = () => null
    this.yAxis._hideOverflowingTickLabels = () => null
  }
}
