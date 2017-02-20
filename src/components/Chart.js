import throttle from 'lodash/throttle'

export default class Chart {
  constructor () {
    this.resizeHandler = throttle(this.resizeHandler, 200).bind(this)
    this._onMount = []
    this._onUnmount = []
    this._onUpdate = []
    this._onResize = []
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
    this.layout.detach()
    window.removeEventListener('resize', this.resizeHandler)
    this.onUnmount()
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
