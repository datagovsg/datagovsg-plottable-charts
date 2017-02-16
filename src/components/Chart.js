import throttle from 'lodash/throttle'

export default class Chart {
  constructor () {
    this.resizeHandler = throttle(this.resizeHandler, 200).bind(this)
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
    this._onMount = this._onMount || []
    this._onMount.push(cb)
  }

  get onUnmount () {
    return function (element) {
      this._onUnmount.forEach(cb => {
        cb.call(this, element)
      })
    }
  }

  set onUnmount (cb) {
    this._onUnmount = this._onUnmount || []
    this._onUnmount.push(cb)
  }

  get onUpdate () {
    return function (element) {
      this._onUpdate.forEach(cb => {
        cb.call(this, element)
      })
    }
  }

  set onUpdate (cb) {
    this._onUpdate = this._onUpdate || []
    this._onUpdate.push(cb)
  }

  get onResize () {
    return function (element) {
      this._onResize.forEach(cb => {
        cb.call(this, element)
      })
    }
  }

  set onResize (cb) {
    this._onResize = this._onResize || []
    this._onResize.push(cb)
  }
}
