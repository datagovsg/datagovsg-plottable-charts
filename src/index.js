import SimplePie from './components/SimplePie'
import SimpleBar from './components/SimpleBar'
import GroupedBar from './components/GroupedBar'
import StackedBar from './components/StackedBar'
import MultipleLine from './components/MultipleLine'

import {
  setupOuterLabel,
  removeInnerPadding,
  downsampleTicks,
  customizeTimeAxis
} from './plugins'

import {
  getScale,
  getCategoryScale,
  getTimeScale,
  getColorScale,
  getSingleColorScale,
  getCustomNumberFormatter
} from './helpers'

export {SimplePie, SimpleBar, GroupedBar, StackedBar, MultipleLine}

export class DatagovsgSimplePie extends SimplePie {
  constructor (props) {
    props = Object.assign({
      colorScale: getColorScale()
    }, props)

    super(props)

    setupOuterLabel(this, {labelFormatter: d => d.label})
  }
}

export class DatagovsgSimpleBar extends SimpleBar {
  /**
   * @param {(boolean|string)} props.isTimeSeries - default false
   * @param {boolean} props.isPercentage - default false
   */
  constructor (props) {
    props = Object.assign({
      scale: getScale(),
      categoryScale: props.isTimeSeries ? getTimeScale() : getCategoryScale(),
      colorScale: getSingleColorScale(),
      showGridlines: true
    }, props)

    super(props)

    downsampleTicks(this)
    customizeTimeAxis(this, props.isTimeSeries)

    postprocess(this.xAxis, this.yAxis, props)
  }
}

export class DatagovsgHorizontalBar extends SimpleBar {
  /**
   * @param {boolean} props.isPercentage - default false
   */
  constructor (props) {
    props = Object.assign({
      orientation: 'h',
      sorted: 'd',
      scale: getScale(),
      categoryScale: getCategoryScale(),
      colorScale: getSingleColorScale(),
      showGridlines: true
    }, props)

    super(props)

    postprocess(this.yAxis, this.xAxis, props)
    this.xAxis.tickLabelPadding(0)
  }
}

export class DatagovsgGroupedBar extends GroupedBar {
  /**
   * @param {(boolean|string)} props.isTimeSeries - default false
   * @param {boolean} props.isPercentage - default false
   */
  constructor (props) {
    props = Object.assign({
      scale: getScale(),
      categoryScale: props.isTimeSeries ? getTimeScale() : getCategoryScale(),
      colorScale: getColorScale(),
      showGridlines: true
    }, props)

    super(props)

    downsampleTicks(this)
    removeInnerPadding(this)
    customizeTimeAxis(this, props.isTimeSeries)

    postprocess(this.xAxis, this.yAxis, props)
  }
}

export class DatagovsgStackedBar extends StackedBar {
  /**
   * @param {(boolean|string)} props.isTimeSeries - default false
   * @param {boolean} props.isPercentage - default false
   */
  constructor (props) {
    props = Object.assign({
      scale: getScale(),
      categoryScale: props.isTimeSeries ? getTimeScale() : getCategoryScale(),
      colorScale: getColorScale(),
      showGridlines: true
    }, props)

    super(props)

    downsampleTicks(this)
    removeInnerPadding(this)
    customizeTimeAxis(this, props.isTimeSeries)

    postprocess(this.xAxis, this.yAxis, props)
  }
}

export class DatagovsgLine extends MultipleLine {
  /**
   * @param {(boolean|string)} props.isTimeSeries - default false
   * @param {boolean} props.isPercentage - default false
   */
  constructor (props) {
    props = Object.assign({
      yScale: getScale(),
      xScale: props.isTimeSeries ? getTimeScale() : getCategoryScale(),
      colorScale: getColorScale(),
      showYgridlines: true,
      guideLine: 'v'
    }, props)

    super(props)

    downsampleTicks(this)
    customizeTimeAxis(this, props.isTimeSeries)

    postprocess(this.xAxis, this.yAxis, props)
  }
}

function postprocess (primaryAxis, secondaryAxis, props = {}) {
  primaryAxis
    .margin(12)
    .innerTickLength(5)
    .endTickLength(5)
    .tickLabelPadding(5)
  secondaryAxis
    .margin(12)
    .innerTickLength(0)
    .endTickLength(0)
    .tickLabelPadding(5)
    .showEndTickLabels(true)
    .addClass('hide-baseline')
    .formatter(getCustomNumberFormatter(props.isPercentage))
  // hack to show end tick labels
  secondaryAxis._hideOverflowingTickLabels = () => null
}
