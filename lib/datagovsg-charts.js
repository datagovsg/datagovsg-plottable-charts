(function () {
'use strict';

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

var isObject_1 = isObject;

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

var _freeGlobal = freeGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = _freeGlobal || freeSelf || Function('return this')();

var _root = root;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return _root.Date.now();
};

var now_1 = now;

/** Built-in value references. */
var Symbol$1 = _root.Symbol;

var _Symbol = Symbol$1;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag$1),
      tag = value[symToStringTag$1];

  try {
    value[symToStringTag$1] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}

var _getRawTag = getRawTag;

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$1.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString$1.call(value);
}

var _objectToString = objectToString;

/** `Object#toString` result references. */
var nullTag = '[object Null]';
var undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? _getRawTag(value)
    : _objectToString(value);
}

var _baseGetTag = baseGetTag;

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

var isObjectLike_1 = isObjectLike;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike_1(value) && _baseGetTag(value) == symbolTag);
}

var isSymbol_1 = isSymbol;

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol_1(value)) {
    return NAN;
  }
  if (isObject_1(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject_1(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

var toNumber_1 = toNumber;

/** Error message constants. */
var FUNC_ERROR_TEXT$1 = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;
var nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT$1);
  }
  wait = toNumber_1(wait) || 0;
  if (isObject_1(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber_1(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now_1();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now_1());
  }

  function debounced() {
    var time = now_1(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

var debounce_1 = debounce;

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed `func` invocations and a `flush` method to
 * immediately invoke them. Provide `options` to indicate whether `func`
 * should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `func` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the throttled function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // Cancel the trailing throttled invocation.
 * jQuery(window).on('popstate', throttled.cancel);
 */
function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject_1(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce_1(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}

var throttle_1 = throttle;

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};





var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();













var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var Chart = function () {
  function Chart() {
    classCallCheck(this, Chart);

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
    };
    this.resizeHandler = throttle_1(this.resizeHandler, 200).bind(this);
    this._onMount = [];
    this._onUnmount = [];
    this._onUpdate = [];
    this._onResize = [];
  }

  createClass(Chart, [{
    key: 'update',
    value: function update(nextProps) {
      this.datasets = nextProps.data.map(function (s) {
        return new Plottable.Dataset(s.items, s.label);
      });
      this.plot.datasets(this.datasets);
      this.options.data = nextProps.data;
      this.onUpdate(nextProps);
    }
  }, {
    key: '_setGridlines',
    value: function _setGridlines(props, scale) {
      if (props.showGridlines) {
        var horizontal = props.orientation === 'h';
        var xScale = horizontal ? scale : null;
        var yScale = horizontal ? null : scale;
        this.gridlines = new Plottable.Components.Gridlines(xScale, yScale);
      }
    }
  }, {
    key: '_setAxes',
    value: function _setAxes(props, scale, categoryScale) {
      var horizontal = props.orientation === 'h';
      if (!props.hideXaxis) {
        if (horizontal) {
          this.xAxis = new Plottable.Axes.Numeric(scale, 'bottom');
        } else {
          this.xAxis = categoryScale instanceof Plottable.Scales.Time ? new Plottable.Axes.Time(categoryScale, 'bottom') : new Plottable.Axes.Category(categoryScale, 'bottom');
        }
        this.layout.add(this.xAxis, 1, 2);
      }
      if (!props.hideYaxis) {
        if (horizontal) {
          this.yAxis = categoryScale instanceof Plottable.Scales.Time ? new Plottable.Axes.Time(categoryScale, 'left') : new Plottable.Axes.Category(categoryScale, 'left');
        } else {
          this.yAxis = new Plottable.Axes.Numeric(scale, 'left');
        }
        this.layout.add(this.yAxis, 0, 1);
      }
      if (props.xLabel) {
        this.layout.add(new Plottable.Components.AxisLabel(props.xLabel), 2, 2);
      }
      if (props.yLabel) {
        this.layout.add(new Plottable.Components.AxisLabel(props.yLabel, -90), 0, 0);
      }
    }
  }, {
    key: '_setLegend',
    value: function _setLegend(props, colorScale) {
      this.legend = new Plottable.Components.Legend(colorScale).xAlignment('center').yAlignment('center');
      switch (props.legendPosition) {
        case 't':
          this.layout = new Plottable.Components.Table([[this.legend.maxEntriesPerRow(Infinity)], [this.layout]]).rowPadding(10);
          break;
        case 'r':
          this.layout = new Plottable.Components.Table([[this.layout, this.legend]]).columnPadding(10);
          break;
        case 'b':
          this.layout = new Plottable.Components.Table([[this.layout], [this.legend.maxEntriesPerRow(Infinity)]]).rowPadding(10);
          break;
        case 'l':
          this.layout = new Plottable.Components.Table([[this.legend, this.layout]]).columnPadding(10);
          break;
      }
    }
  }, {
    key: '_setInteractions',
    value: function _setInteractions(props) {
      var _this = this;

      if (props.clickHandler) {
        new Plottable.Interactions.Click().onClick(function (point) {
          var target = _this.plot.entitiesAt(point)[0];
          props.clickHandler(target, _this.plot.entities());
        }).attachTo(this.plot);
      }

      if (props.hoverHandler) {
        new Plottable.Interactions.Pointer().onPointerMove(function (point) {
          var target = _this.plot.entitiesAt(point)[0];
          props.hoverHandler(target, _this.plot.entities());
        }).onPointerExit(function (point) {
          props.hoverHandler(null, _this.plot.entities());
        }).attachTo(this.plot);
      }
    }
  }, {
    key: 'resizeHandler',
    value: function resizeHandler() {
      this.layout.redraw();
      this.onResize();
    }
  }, {
    key: 'mount',
    value: function mount(element) {
      this.layout.renderTo(element);
      window.addEventListener('resize', this.resizeHandler);
      this.onMount(element);
    }
  }, {
    key: 'unmount',
    value: function unmount() {
      this.onUnmount();
      window.removeEventListener('resize', this.resizeHandler);
      this.layout.detach();
    }
  }, {
    key: 'onMount',
    get: function get$$1() {
      return function (element) {
        var _this2 = this;

        this._onMount.forEach(function (cb) {
          cb.call(_this2, element);
        });
      };
    },
    set: function set$$1(cb) {
      this._onMount.push(cb);
    }
  }, {
    key: 'onUnmount',
    get: function get$$1() {
      return function (element) {
        var _this3 = this;

        this._onUnmount.forEach(function (cb) {
          cb.call(_this3);
        });
      };
    },
    set: function set$$1(cb) {
      this._onUnmount.push(cb);
    }
  }, {
    key: 'onUpdate',
    get: function get$$1() {
      return function (nextProps) {
        var _this4 = this;

        Plottable.Utils.DOM.requestAnimationFramePolyfill(function () {
          _this4._onUpdate.forEach(function (cb) {
            cb.call(_this4, nextProps);
          });
        });
      };
    },
    set: function set$$1(cb) {
      this._onUpdate.push(cb);
    }
  }, {
    key: 'onResize',
    get: function get$$1() {
      return function () {
        var _this5 = this;

        Plottable.Utils.DOM.requestAnimationFramePolyfill(function () {
          _this5._onResize.forEach(function (cb) {
            cb.call(_this5);
          });
        });
      };
    },
    set: function set$$1(cb) {
      this._onResize.push(cb);
    }
  }]);
  return Chart;
}();

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

var _arrayPush = arrayPush;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike_1(value) && _baseGetTag(value) == argsTag;
}

var _baseIsArguments = baseIsArguments;

/** Used for built-in method references. */
var objectProto$2 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$1 = objectProto$2.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto$2.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = _baseIsArguments(function() { return arguments; }()) ? _baseIsArguments : function(value) {
  return isObjectLike_1(value) && hasOwnProperty$1.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

var isArguments_1 = isArguments;

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

var isArray_1 = isArray;

/** Built-in value references. */
var spreadableSymbol = _Symbol ? _Symbol.isConcatSpreadable : undefined;

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable(value) {
  return isArray_1(value) || isArguments_1(value) ||
    !!(spreadableSymbol && value && value[spreadableSymbol]);
}

var _isFlattenable = isFlattenable;

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1,
      length = array.length;

  predicate || (predicate = _isFlattenable);
  result || (result = []);

  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        _arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

var _baseFlatten = baseFlatten;

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

var _arrayMap = arrayMap;

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

var _listCacheClear = listCacheClear;

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

var eq_1 = eq;

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq_1(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

var _assocIndexOf = assocIndexOf;

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

var _listCacheDelete = listCacheDelete;

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

var _listCacheGet = listCacheGet;

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return _assocIndexOf(this.__data__, key) > -1;
}

var _listCacheHas = listCacheHas;

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

var _listCacheSet = listCacheSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = _listCacheClear;
ListCache.prototype['delete'] = _listCacheDelete;
ListCache.prototype.get = _listCacheGet;
ListCache.prototype.has = _listCacheHas;
ListCache.prototype.set = _listCacheSet;

var _ListCache = ListCache;

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new _ListCache;
  this.size = 0;
}

var _stackClear = stackClear;

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

var _stackDelete = stackDelete;

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

var _stackGet = stackGet;

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

var _stackHas = stackHas;

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]';
var funcTag = '[object Function]';
var genTag = '[object GeneratorFunction]';
var proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject_1(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = _baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

var isFunction_1 = isFunction;

/** Used to detect overreaching core-js shims. */
var coreJsData = _root['__core-js_shared__'];

var _coreJsData = coreJsData;

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(_coreJsData && _coreJsData.keys && _coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

var _isMasked = isMasked;

/** Used for built-in method references. */
var funcProto$1 = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString$1 = funcProto$1.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString$1.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

var _toSource = toSource;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype;
var objectProto$3 = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$2 = objectProto$3.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty$2).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject_1(value) || _isMasked(value)) {
    return false;
  }
  var pattern = isFunction_1(value) ? reIsNative : reIsHostCtor;
  return pattern.test(_toSource(value));
}

var _baseIsNative = baseIsNative;

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

var _getValue = getValue;

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = _getValue(object, key);
  return _baseIsNative(value) ? value : undefined;
}

var _getNative = getNative;

/* Built-in method references that are verified to be native. */
var Map = _getNative(_root, 'Map');

var _Map = Map;

/* Built-in method references that are verified to be native. */
var nativeCreate = _getNative(Object, 'create');

var _nativeCreate = nativeCreate;

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = _nativeCreate ? _nativeCreate(null) : {};
  this.size = 0;
}

var _hashClear = hashClear;

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

var _hashDelete = hashDelete;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto$4 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$3 = objectProto$4.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (_nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty$3.call(data, key) ? data[key] : undefined;
}

var _hashGet = hashGet;

/** Used for built-in method references. */
var objectProto$5 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$4 = objectProto$5.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return _nativeCreate ? (data[key] !== undefined) : hasOwnProperty$4.call(data, key);
}

var _hashHas = hashHas;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (_nativeCreate && value === undefined) ? HASH_UNDEFINED$1 : value;
  return this;
}

var _hashSet = hashSet;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = _hashClear;
Hash.prototype['delete'] = _hashDelete;
Hash.prototype.get = _hashGet;
Hash.prototype.has = _hashHas;
Hash.prototype.set = _hashSet;

var _Hash = Hash;

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new _Hash,
    'map': new (_Map || _ListCache),
    'string': new _Hash
  };
}

var _mapCacheClear = mapCacheClear;

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

var _isKeyable = isKeyable;

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return _isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

var _getMapData = getMapData;

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = _getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

var _mapCacheDelete = mapCacheDelete;

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return _getMapData(this, key).get(key);
}

var _mapCacheGet = mapCacheGet;

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return _getMapData(this, key).has(key);
}

var _mapCacheHas = mapCacheHas;

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = _getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

var _mapCacheSet = mapCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = _mapCacheClear;
MapCache.prototype['delete'] = _mapCacheDelete;
MapCache.prototype.get = _mapCacheGet;
MapCache.prototype.has = _mapCacheHas;
MapCache.prototype.set = _mapCacheSet;

var _MapCache = MapCache;

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof _ListCache) {
    var pairs = data.__data__;
    if (!_Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new _MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

var _stackSet = stackSet;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new _ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = _stackClear;
Stack.prototype['delete'] = _stackDelete;
Stack.prototype.get = _stackGet;
Stack.prototype.has = _stackHas;
Stack.prototype.set = _stackSet;

var _Stack = Stack;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$2 = '__lodash_hash_undefined__';

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED$2);
  return this;
}

var _setCacheAdd = setCacheAdd;

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

var _setCacheHas = setCacheHas;

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;

  this.__data__ = new _MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = _setCacheAdd;
SetCache.prototype.has = _setCacheHas;

var _SetCache = SetCache;

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

var _arraySome = arraySome;

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

var _cacheHas = cacheHas;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$2 = 1;
var COMPARE_UNORDERED_FLAG$1 = 2;

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$2,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var index = -1,
      result = true,
      seen = (bitmask & COMPARE_UNORDERED_FLAG$1) ? new _SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!_arraySome(other, function(othValue, othIndex) {
            if (!_cacheHas(seen, othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, bitmask, customizer, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

var _equalArrays = equalArrays;

/** Built-in value references. */
var Uint8Array = _root.Uint8Array;

var _Uint8Array = Uint8Array;

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

var _mapToArray = mapToArray;

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

var _setToArray = setToArray;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$3 = 1;
var COMPARE_UNORDERED_FLAG$2 = 2;

/** `Object#toString` result references. */
var boolTag = '[object Boolean]';
var dateTag = '[object Date]';
var errorTag = '[object Error]';
var mapTag = '[object Map]';
var numberTag = '[object Number]';
var regexpTag = '[object RegExp]';
var setTag = '[object Set]';
var stringTag = '[object String]';
var symbolTag$1 = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]';
var dataViewTag = '[object DataView]';

/** Used to convert symbols to primitives and strings. */
var symbolProto = _Symbol ? _Symbol.prototype : undefined;
var symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new _Uint8Array(object), new _Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq_1(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = _mapToArray;

    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG$3;
      convert || (convert = _setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG$2;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = _equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag$1:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

var _equalByTag = equalByTag;

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray_1(object) ? result : _arrayPush(result, symbolsFunc(object));
}

var _baseGetAllKeys = baseGetAllKeys;

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

var _arrayFilter = arrayFilter;

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

var stubArray_1 = stubArray;

/** Used for built-in method references. */
var objectProto$8 = Object.prototype;

/** Built-in value references. */
var propertyIsEnumerable$1 = objectProto$8.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray_1 : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return _arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable$1.call(object, symbol);
  });
};

var _getSymbols = getSymbols;

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

var _baseTimes = baseTimes;

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

var stubFalse_1 = stubFalse;

var isBuffer_1 = createCommonjsModule(function (module, exports) {
/** Detect free variable `exports`. */
var freeExports = 'object' == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? _root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse_1;

module.exports = isBuffer;
});

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

var _isIndex = isIndex;

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER$1 = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER$1;
}

var isLength_1 = isLength;

/** `Object#toString` result references. */
var argsTag$2 = '[object Arguments]';
var arrayTag$1 = '[object Array]';
var boolTag$1 = '[object Boolean]';
var dateTag$1 = '[object Date]';
var errorTag$1 = '[object Error]';
var funcTag$1 = '[object Function]';
var mapTag$1 = '[object Map]';
var numberTag$1 = '[object Number]';
var objectTag$1 = '[object Object]';
var regexpTag$1 = '[object RegExp]';
var setTag$1 = '[object Set]';
var stringTag$1 = '[object String]';
var weakMapTag = '[object WeakMap]';

var arrayBufferTag$1 = '[object ArrayBuffer]';
var dataViewTag$1 = '[object DataView]';
var float32Tag = '[object Float32Array]';
var float64Tag = '[object Float64Array]';
var int8Tag = '[object Int8Array]';
var int16Tag = '[object Int16Array]';
var int32Tag = '[object Int32Array]';
var uint8Tag = '[object Uint8Array]';
var uint8ClampedTag = '[object Uint8ClampedArray]';
var uint16Tag = '[object Uint16Array]';
var uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag$2] = typedArrayTags[arrayTag$1] =
typedArrayTags[arrayBufferTag$1] = typedArrayTags[boolTag$1] =
typedArrayTags[dataViewTag$1] = typedArrayTags[dateTag$1] =
typedArrayTags[errorTag$1] = typedArrayTags[funcTag$1] =
typedArrayTags[mapTag$1] = typedArrayTags[numberTag$1] =
typedArrayTags[objectTag$1] = typedArrayTags[regexpTag$1] =
typedArrayTags[setTag$1] = typedArrayTags[stringTag$1] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike_1(value) &&
    isLength_1(value.length) && !!typedArrayTags[_baseGetTag(value)];
}

var _baseIsTypedArray = baseIsTypedArray;

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

var _baseUnary = baseUnary;

var _nodeUtil = createCommonjsModule(function (module, exports) {
/** Detect free variable `exports`. */
var freeExports = 'object' == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && _freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;
});

/* Node.js helper references. */
var nodeIsTypedArray = _nodeUtil && _nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? _baseUnary(nodeIsTypedArray) : _baseIsTypedArray;

var isTypedArray_1 = isTypedArray;

/** Used for built-in method references. */
var objectProto$9 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$7 = objectProto$9.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray_1(value),
      isArg = !isArr && isArguments_1(value),
      isBuff = !isArr && !isArg && isBuffer_1(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray_1(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? _baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty$7.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           _isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

var _arrayLikeKeys = arrayLikeKeys;

/** Used for built-in method references. */
var objectProto$11 = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$11;

  return value === proto;
}

var _isPrototype = isPrototype;

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

var _overArg = overArg;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = _overArg(Object.keys, Object);

var _nativeKeys = nativeKeys;

/** Used for built-in method references. */
var objectProto$10 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$8 = objectProto$10.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!_isPrototype(object)) {
    return _nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty$8.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

var _baseKeys = baseKeys;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength_1(value.length) && !isFunction_1(value);
}

var isArrayLike_1 = isArrayLike;

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike_1(object) ? _arrayLikeKeys(object) : _baseKeys(object);
}

var keys_1 = keys;

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return _baseGetAllKeys(object, keys_1, _getSymbols);
}

var _getAllKeys = getAllKeys;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$4 = 1;

/** Used for built-in method references. */
var objectProto$7 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$6 = objectProto$7.hasOwnProperty;

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$4,
      objProps = _getAllKeys(object),
      objLength = objProps.length,
      othProps = _getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty$6.call(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

var _equalObjects = equalObjects;

/* Built-in method references that are verified to be native. */
var DataView = _getNative(_root, 'DataView');

var _DataView = DataView;

/* Built-in method references that are verified to be native. */
var Promise$1 = _getNative(_root, 'Promise');

var _Promise = Promise$1;

/* Built-in method references that are verified to be native. */
var Set = _getNative(_root, 'Set');

var _Set = Set;

/* Built-in method references that are verified to be native. */
var WeakMap = _getNative(_root, 'WeakMap');

var _WeakMap = WeakMap;

/** `Object#toString` result references. */
var mapTag$2 = '[object Map]';
var objectTag$2 = '[object Object]';
var promiseTag = '[object Promise]';
var setTag$2 = '[object Set]';
var weakMapTag$1 = '[object WeakMap]';

var dataViewTag$2 = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = _toSource(_DataView);
var mapCtorString = _toSource(_Map);
var promiseCtorString = _toSource(_Promise);
var setCtorString = _toSource(_Set);
var weakMapCtorString = _toSource(_WeakMap);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = _baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((_DataView && getTag(new _DataView(new ArrayBuffer(1))) != dataViewTag$2) ||
    (_Map && getTag(new _Map) != mapTag$2) ||
    (_Promise && getTag(_Promise.resolve()) != promiseTag) ||
    (_Set && getTag(new _Set) != setTag$2) ||
    (_WeakMap && getTag(new _WeakMap) != weakMapTag$1)) {
  getTag = function(value) {
    var result = _baseGetTag(value),
        Ctor = result == objectTag$2 ? value.constructor : undefined,
        ctorString = Ctor ? _toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag$2;
        case mapCtorString: return mapTag$2;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag$2;
        case weakMapCtorString: return weakMapTag$1;
      }
    }
    return result;
  };
}

var _getTag = getTag;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$1 = 1;

/** `Object#toString` result references. */
var argsTag$1 = '[object Arguments]';
var arrayTag = '[object Array]';
var objectTag = '[object Object]';

/** Used for built-in method references. */
var objectProto$6 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$5 = objectProto$6.hasOwnProperty;

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray_1(object),
      othIsArr = isArray_1(other),
      objTag = objIsArr ? arrayTag : _getTag(object),
      othTag = othIsArr ? arrayTag : _getTag(other);

  objTag = objTag == argsTag$1 ? objectTag : objTag;
  othTag = othTag == argsTag$1 ? objectTag : othTag;

  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer_1(object)) {
    if (!isBuffer_1(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new _Stack);
    return (objIsArr || isTypedArray_1(object))
      ? _equalArrays(object, other, bitmask, customizer, equalFunc, stack)
      : _equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG$1)) {
    var objIsWrapped = objIsObj && hasOwnProperty$5.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty$5.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new _Stack);
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new _Stack);
  return _equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

var _baseIsEqualDeep = baseIsEqualDeep;

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObjectLike_1(value) && !isObjectLike_1(other))) {
    return value !== value && other !== other;
  }
  return _baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

var _baseIsEqual = baseIsEqual;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1;
var COMPARE_UNORDERED_FLAG = 2;

/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;

  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if ((noCustomizer && data[2])
          ? data[1] !== object[data[0]]
          : !(data[0] in object)
        ) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var stack = new _Stack;
      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }
      if (!(result === undefined
            ? _baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack)
            : result
          )) {
        return false;
      }
    }
  }
  return true;
}

var _baseIsMatch = baseIsMatch;

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  return value === value && !isObject_1(value);
}

var _isStrictComparable = isStrictComparable;

/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
function getMatchData(object) {
  var result = keys_1(object),
      length = result.length;

  while (length--) {
    var key = result[length],
        value = object[key];

    result[length] = [key, value, _isStrictComparable(value)];
  }
  return result;
}

var _getMatchData = getMatchData;

/**
 * A specialized version of `matchesProperty` for source values suitable
 * for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function matchesStrictComparable(key, srcValue) {
  return function(object) {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue &&
      (srcValue !== undefined || (key in Object(object)));
  };
}

var _matchesStrictComparable = matchesStrictComparable;

/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatches(source) {
  var matchData = _getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return _matchesStrictComparable(matchData[0][0], matchData[0][1]);
  }
  return function(object) {
    return object === source || _baseIsMatch(object, source, matchData);
  };
}

var _baseMatches = baseMatches;

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
var reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray_1(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol_1(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

var _isKey = isKey;

/** Error message constants. */
var FUNC_ERROR_TEXT$2 = 'Expected a function';

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT$2);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || _MapCache);
  return memoized;
}

// Expose `MapCache`.
memoize.Cache = _MapCache;

var memoize_1 = memoize;

/** Used as the maximum memoize cache size. */
var MAX_MEMOIZE_SIZE = 500;

/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
function memoizeCapped(func) {
  var result = memoize_1(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });

  var cache = result.cache;
  return result;
}

var _memoizeCapped = memoizeCapped;

/** Used to match property names within property paths. */
var reLeadingDot = /^\./;
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = _memoizeCapped(function(string) {
  var result = [];
  if (reLeadingDot.test(string)) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

var _stringToPath = stringToPath;

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto$1 = _Symbol ? _Symbol.prototype : undefined;
var symbolToString = symbolProto$1 ? symbolProto$1.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray_1(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return _arrayMap(value, baseToString) + '';
  }
  if (isSymbol_1(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

var _baseToString = baseToString;

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : _baseToString(value);
}

var toString_1 = toString;

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value, object) {
  if (isArray_1(value)) {
    return value;
  }
  return _isKey(value, object) ? [value] : _stringToPath(toString_1(value));
}

var _castPath = castPath;

/** Used as references for various `Number` constants. */
var INFINITY$1 = 1 / 0;

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol_1(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY$1) ? '-0' : result;
}

var _toKey = toKey;

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = _castPath(path, object);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[_toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

var _baseGet = baseGet;

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get$1(object, path, defaultValue) {
  var result = object == null ? undefined : _baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

var get_1 = get$1;

/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}

var _baseHasIn = baseHasIn;

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath(object, path, hasFunc) {
  path = _castPath(path, object);

  var index = -1,
      length = path.length,
      result = false;

  while (++index < length) {
    var key = _toKey(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return !!length && isLength_1(length) && _isIndex(key, length) &&
    (isArray_1(object) || isArguments_1(object));
}

var _hasPath = hasPath;

/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b');
 * // => true
 *
 * _.hasIn(object, ['a', 'b']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */
function hasIn(object, path) {
  return object != null && _hasPath(object, path, _baseHasIn);
}

var hasIn_1 = hasIn;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$5 = 1;
var COMPARE_UNORDERED_FLAG$3 = 2;

/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatchesProperty(path, srcValue) {
  if (_isKey(path) && _isStrictComparable(srcValue)) {
    return _matchesStrictComparable(_toKey(path), srcValue);
  }
  return function(object) {
    var objValue = get_1(object, path);
    return (objValue === undefined && objValue === srcValue)
      ? hasIn_1(object, path)
      : _baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG$5 | COMPARE_UNORDERED_FLAG$3);
  };
}

var _baseMatchesProperty = baseMatchesProperty;

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

var identity_1 = identity;

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

var _baseProperty = baseProperty;

/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyDeep(path) {
  return function(object) {
    return _baseGet(object, path);
  };
}

var _basePropertyDeep = basePropertyDeep;

/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ];
 *
 * _.map(objects, _.property('a.b'));
 * // => [2, 1]
 *
 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
 * // => [1, 2]
 */
function property(path) {
  return _isKey(path) ? _baseProperty(_toKey(path)) : _basePropertyDeep(path);
}

var property_1 = property;

/**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */
function baseIteratee(value) {
  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
  if (typeof value == 'function') {
    return value;
  }
  if (value == null) {
    return identity_1;
  }
  if (typeof value == 'object') {
    return isArray_1(value)
      ? _baseMatchesProperty(value[0], value[1])
      : _baseMatches(value);
  }
  return property_1(value);
}

var _baseIteratee = baseIteratee;

/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

var _createBaseFor = createBaseFor;

/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = _createBaseFor();

var _baseFor = baseFor;

/**
 * The base implementation of `_.forOwn` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return object && _baseFor(object, iteratee, keys_1);
}

var _baseForOwn = baseForOwn;

/**
 * Creates a `baseEach` or `baseEachRight` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseEach(eachFunc, fromRight) {
  return function(collection, iteratee) {
    if (collection == null) {
      return collection;
    }
    if (!isArrayLike_1(collection)) {
      return eachFunc(collection, iteratee);
    }
    var length = collection.length,
        index = fromRight ? length : -1,
        iterable = Object(collection);

    while ((fromRight ? index-- : ++index < length)) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}

var _createBaseEach = createBaseEach;

/**
 * The base implementation of `_.forEach` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 */
var baseEach = _createBaseEach(_baseForOwn);

var _baseEach = baseEach;

/**
 * The base implementation of `_.map` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function baseMap(collection, iteratee) {
  var index = -1,
      result = isArrayLike_1(collection) ? Array(collection.length) : [];

  _baseEach(collection, function(value, key, collection) {
    result[++index] = iteratee(value, key, collection);
  });
  return result;
}

var _baseMap = baseMap;

/**
 * The base implementation of `_.sortBy` which uses `comparer` to define the
 * sort order of `array` and replaces criteria objects with their corresponding
 * values.
 *
 * @private
 * @param {Array} array The array to sort.
 * @param {Function} comparer The function to define sort order.
 * @returns {Array} Returns `array`.
 */
function baseSortBy(array, comparer) {
  var length = array.length;

  array.sort(comparer);
  while (length--) {
    array[length] = array[length].value;
  }
  return array;
}

var _baseSortBy = baseSortBy;

/**
 * Compares values to sort them in ascending order.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {number} Returns the sort order indicator for `value`.
 */
function compareAscending(value, other) {
  if (value !== other) {
    var valIsDefined = value !== undefined,
        valIsNull = value === null,
        valIsReflexive = value === value,
        valIsSymbol = isSymbol_1(value);

    var othIsDefined = other !== undefined,
        othIsNull = other === null,
        othIsReflexive = other === other,
        othIsSymbol = isSymbol_1(other);

    if ((!othIsNull && !othIsSymbol && !valIsSymbol && value > other) ||
        (valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol) ||
        (valIsNull && othIsDefined && othIsReflexive) ||
        (!valIsDefined && othIsReflexive) ||
        !valIsReflexive) {
      return 1;
    }
    if ((!valIsNull && !valIsSymbol && !othIsSymbol && value < other) ||
        (othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol) ||
        (othIsNull && valIsDefined && valIsReflexive) ||
        (!othIsDefined && valIsReflexive) ||
        !othIsReflexive) {
      return -1;
    }
  }
  return 0;
}

var _compareAscending = compareAscending;

/**
 * Used by `_.orderBy` to compare multiple properties of a value to another
 * and stable sort them.
 *
 * If `orders` is unspecified, all values are sorted in ascending order. Otherwise,
 * specify an order of "desc" for descending or "asc" for ascending sort order
 * of corresponding values.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {boolean[]|string[]} orders The order to sort by for each property.
 * @returns {number} Returns the sort order indicator for `object`.
 */
function compareMultiple(object, other, orders) {
  var index = -1,
      objCriteria = object.criteria,
      othCriteria = other.criteria,
      length = objCriteria.length,
      ordersLength = orders.length;

  while (++index < length) {
    var result = _compareAscending(objCriteria[index], othCriteria[index]);
    if (result) {
      if (index >= ordersLength) {
        return result;
      }
      var order = orders[index];
      return result * (order == 'desc' ? -1 : 1);
    }
  }
  // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
  // that causes it, under certain circumstances, to provide the same value for
  // `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
  // for more details.
  //
  // This also ensures a stable sort in V8 and other engines.
  // See https://bugs.chromium.org/p/v8/issues/detail?id=90 for more details.
  return object.index - other.index;
}

var _compareMultiple = compareMultiple;

/**
 * The base implementation of `_.orderBy` without param guards.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
 * @param {string[]} orders The sort orders of `iteratees`.
 * @returns {Array} Returns the new sorted array.
 */
function baseOrderBy(collection, iteratees, orders) {
  var index = -1;
  iteratees = _arrayMap(iteratees.length ? iteratees : [identity_1], _baseUnary(_baseIteratee));

  var result = _baseMap(collection, function(value, key, collection) {
    var criteria = _arrayMap(iteratees, function(iteratee) {
      return iteratee(value);
    });
    return { 'criteria': criteria, 'index': ++index, 'value': value };
  });

  return _baseSortBy(result, function(object, other) {
    return _compareMultiple(object, other, orders);
  });
}

var _baseOrderBy = baseOrderBy;

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

var _apply = apply;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax$1 = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest(func, start, transform) {
  start = nativeMax$1(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax$1(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return _apply(func, this, otherArgs);
  };
}

var _overRest = overRest;

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

var constant_1 = constant;

var defineProperty$1 = (function() {
  try {
    var func = _getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

var _defineProperty = defineProperty$1;

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString = !_defineProperty ? identity_1 : function(func, string) {
  return _defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant_1(string),
    'writable': true
  });
};

var _baseSetToString = baseSetToString;

/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800;
var HOT_SPAN = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeNow = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut(func) {
  var count = 0,
      lastCalled = 0;

  return function() {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

var _shortOut = shortOut;

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString = _shortOut(_baseSetToString);

var _setToString = setToString;

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  return _setToString(_overRest(func, start, identity_1), func + '');
}

var _baseRest = baseRest;

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject_1(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike_1(object) && _isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq_1(object[index], value);
  }
  return false;
}

var _isIterateeCall = isIterateeCall;

/**
 * Creates an array of elements, sorted in ascending order by the results of
 * running each element in a collection thru each iteratee. This method
 * performs a stable sort, that is, it preserves the original sort order of
 * equal elements. The iteratees are invoked with one argument: (value).
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {...(Function|Function[])} [iteratees=[_.identity]]
 *  The iteratees to sort by.
 * @returns {Array} Returns the new sorted array.
 * @example
 *
 * var users = [
 *   { 'user': 'fred',   'age': 48 },
 *   { 'user': 'barney', 'age': 36 },
 *   { 'user': 'fred',   'age': 40 },
 *   { 'user': 'barney', 'age': 34 }
 * ];
 *
 * _.sortBy(users, [function(o) { return o.user; }]);
 * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
 *
 * _.sortBy(users, ['user', 'age']);
 * // => objects for [['barney', 34], ['barney', 36], ['fred', 40], ['fred', 48]]
 */
var sortBy = _baseRest(function(collection, iteratees) {
  if (collection == null) {
    return [];
  }
  var length = iteratees.length;
  if (length > 1 && _isIterateeCall(collection, iteratees[0], iteratees[1])) {
    iteratees = [];
  } else if (length > 2 && _isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
    iteratees = [iteratees[0]];
  }
  return _baseOrderBy(collection, _baseFlatten(iteratees, 1), []);
});

var sortBy_1 = sortBy;

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

var SimplePie = function (_Chart) {
  inherits(SimplePie, _Chart);

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
  function SimplePie(props) {
    classCallCheck(this, SimplePie);

    var _this = possibleConstructorReturn(this, (SimplePie.__proto__ || Object.getPrototypeOf(SimplePie)).call(this));

    _this.options.legendPosition = 'none';
    props = Object.assign(_this.options, props);

    if (props.sorted) props.data = sortBy_1(props.data, 'value');
    if (props.sorted === 'd') props.data.reverse();
    _this.dataset = new Plottable.Dataset(props.data);

    var total = props.data.reduce(function (sum, d) {
      return sum + d.value;
    }, 0);
    var scale = new Plottable.Scales.Linear().domain([0, total]);
    var colorScale = props.colorScale || new Plottable.Scales.Color();

    props.outerRadius = props.outerRadius || function (d) {
      return Math.min(_this.plot.width(), _this.plot.height()) / 2;
    };

    _this.plot = new Plottable.Plots.Pie().addClass('simple-pie-plot').addDataset(_this.dataset).sectorValue(function (d) {
      return d.value;
    }, scale).attr('fill', function (d) {
      return d.label;
    }, colorScale).labelsEnabled(false).innerRadius(props.innerRadius).outerRadius(props.outerRadius).animated(props.animated);

    if (props.labelFormatter) {
      _this.plot.labelFormatter(props.labelFormatter).labelsEnabled(true);
    }

    _this.layout = _this.plot;

    _this._setLegend(props, colorScale);
    _this._setInteractions(props);
    return _this;
  }

  createClass(SimplePie, [{
    key: 'update',
    value: function update(nextProps) {
      if (this.options.sorted) nextProps.data = sortBy_1(nextProps.data, 'value');
      if (this.options.sorted === 'd') nextProps.data.reverse();
      var total = nextProps.data.reduce(function (sum, d) {
        return sum + d.value;
      }, 0);
      this.plot.sectorValue().scale.domain([0, total]);
      this.dataset.data(nextProps.data);
      Object.assign(this.options, { data: nextProps.data });
      this.onUpdate(nextProps);
    }
  }]);
  return SimplePie;
}(Chart);

/**
 * @typedef {Object} SimpleBar
 * @property {Object} layout
 * @property {Object} plot
 * @property {Object} legend
 * @property {Object} xAxis
 * @property {Object} yAxis
 * @property {Object} xLabel
 * @property {Object} yLabel
 * @property {Object} gridlines
 * @property {Function} mount
 * @property {Function} update
 * @property {Function} unmount
 * @property {Object} options
 */

var SimpleBar = function (_Chart) {
  inherits(SimpleBar, _Chart);

  /**
   * @param {Object} props
   * @param {string[]} props.labels - required
   * @param {number[]} props.values - required
   * @param {boolean} props.sorted - default false
   * @param {Object} props.scale - default new Plottable.Scales.Linear()
   * @param {Object} props.categoryScale - default new Plottable.Scales.Category()
   * @param {Object} props.colorScale - default new Plottable.Scales.Color()
   * @param {('h'|'v')} props.orientation - default 'h'
   * @param {number} props.baselineValue - default 0
   * @param {Function} props.labelFormatter - optional
   * @param {boolean} props.showGridlines - default false
   * @param {boolean} props.hideXaxis - default false
   * @param {boolean} props.hideYaxis - default false
   * @param {string} props.xLabel - optional
   * @param {string} props.yLabel - optional
   * @param {('t'|'r'|'b'|'l'|'none')} props.legendPosition - default 'none'
   * @param {boolean} props.animated - default true
   * @param {Function} props.clickHandler - optional
   * @param {Function} props.hoverHandler - optional
   *
   * @return {SimpleBar}
   */
  function SimpleBar(props) {
    classCallCheck(this, SimpleBar);

    var _this = possibleConstructorReturn(this, (SimpleBar.__proto__ || Object.getPrototypeOf(SimpleBar)).call(this));

    _this.options.legendPosition = 'none';
    props = Object.assign(_this.options, props);

    if (props.sorted) props.data = sortBy_1(props.data, 'value');
    if (props.sorted === 'd') props.data.reverse();
    _this.dataset = new Plottable.Dataset(props.data);

    var scale = props.scale || new Plottable.Scales.Linear();
    var categoryScale = props.categoryScale || new Plottable.Scales.Category();
    var colorScale = props.colorScale || new Plottable.Scales.Color();

    var horizontal = props.orientation === 'h';
    var plotType = horizontal ? Plottable.Plots.Bar.ORIENTATION_HORIZONTAL : Plottable.Plots.Bar.ORIENTATION_VERTICAL;
    _this.plot = new Plottable.Plots.Bar(plotType).addDataset(_this.dataset).attr('fill', function (d) {
      return d.label;
    }, colorScale).labelsEnabled(false).animated(props.animated).baselineValue(props.baselineValue);
    _this.plot[horizontal ? 'x' : 'y'](function (d) {
      return d.value;
    }, scale);
    _this.plot[horizontal ? 'y' : 'x'](function (d) {
      return d.label;
    }, categoryScale);

    if (props.labelFormatter) {
      _this.plot.labelFormatter(_this.props.labelFormatter).labelsEnabled(true);
    }

    _this._setGridlines(props, scale);
    var plotArea = _this.gridlines ? new Plottable.Components.Group([_this.gridlines, _this.plot]) : _this.plot;

    _this.layout = new Plottable.Components.Table([[null, null, plotArea], [null, null, null], [null, null, null]]);

    _this._setAxes(props, scale, categoryScale);
    _this._setLegend(props, colorScale);
    _this._setInteractions(props);
    return _this;
  }

  createClass(SimpleBar, [{
    key: 'update',
    value: function update(nextProps) {
      if (this.options.sorted) nextProps.data = sortBy_1(nextProps.data, 'value');
      if (this.options.sorted === 'd') nextProps.data.reverse();
      this.dataset.data(nextProps.data);
      Object.assign(this.options, { data: nextProps.data });
      this.onUpdate(nextProps);
    }
  }]);
  return SimpleBar;
}(Chart);

/**
 * @typedef {Object} GroupedBar
 * @property {Object} layout
 * @property {Object} plot
 * @property {Object} legend
 * @property {Object} xAxis
 * @property {Object} yAxis
 * @property {Object} xLabel
 * @property {Object} yLabel
 * @property {Object} gridlines
 * @property {Function} mount
 * @property {Function} update
 * @property {Function} unmount
 * @property {Object} options
 */

var GroupedBar = function (_Chart) {
  inherits(GroupedBar, _Chart);

  /**
   * @param {Object} props
   * @param {string[]} props.labels - required
   * @param {Object[]} props.traces - required
   * @param {string[]} props.traces.labels - required
   * @param {number[]} props.traces.values - required
   * @param {Object} props.scale - default new Plottable.Scales.Linear()
   * @param {Object} props.categoryScale - default new Plottable.Scales.Category()
   * @param {Object} props.colorScale - default new Plottable.Scales.Color()
   * @param {('h'|'v')} props.orientation - default 'h'
   * @param {number} props.baselineValue - default 0
   * @param {Function} props.labelFormatter - optional
   * @param {boolean} props.showGridlines - default false
   * @param {boolean} props.hideXaxis - default false
   * @param {boolean} props.hideYaxis - default false
   * @param {string} props.xLabel - optional
   * @param {string} props.yLabel - optional
   * @param {('t'|'r'|'b'|'l'|'none')} props.legendPosition - default 'r'
   * @param {boolean} props.animated - default true
   * @param {Function} props.clickHandler - optional
   * @param {Function} props.hoverHandler - optional
   *
   * @return {GroupedBar}
   */
  function GroupedBar(props) {
    classCallCheck(this, GroupedBar);

    var _this = possibleConstructorReturn(this, (GroupedBar.__proto__ || Object.getPrototypeOf(GroupedBar)).call(this));

    props = Object.assign(_this.options, props);

    _this.datasets = props.data.map(function (t) {
      return new Plottable.Dataset(t.series, t.label);
    });

    var scale = props.scale || new Plottable.Scales.Linear();
    var categoryScale = props.categoryScale || new Plottable.Scales.Category();
    var colorScale = props.colorScale || new Plottable.Scales.Color();

    var horizontal = props.orientation === 'h';
    var plotType = horizontal ? Plottable.Plots.Bar.ORIENTATION_HORIZONTAL : Plottable.Plots.Bar.ORIENTATION_VERTICAL;
    _this.plot = new Plottable.Plots.ClusteredBar(plotType).attr('fill', function (d, i, dataset) {
      return dataset.metadata();
    }, colorScale).labelsEnabled(false).animated(props.animated).baselineValue(props.baselineValue);
    _this.plot[horizontal ? 'x' : 'y'](function (d) {
      return d.value;
    }, scale);
    _this.plot[horizontal ? 'y' : 'x'](function (d) {
      return d.label;
    }, categoryScale);
    _this.datasets.forEach(function (dataset) {
      _this.plot.addDataset(dataset);
    });

    if (props.labelFormatter) {
      _this.plot.labelFormatter(props.labelFormatter).labelsEnabled(true);
    }

    _this._setGridlines(props, scale);
    var plotArea = _this.gridlines ? new Plottable.Components.Group([_this.gridlines, _this.plot]) : _this.plot;

    _this.layout = new Plottable.Components.Table([[null, null, plotArea], [null, null, null], [null, null, null]]);

    _this._setAxes(props, scale, categoryScale);
    _this._setLegend(props, colorScale);
    _this._setInteractions(props);
    return _this;
  }

  return GroupedBar;
}(Chart);

/**
 * @typedef {Object} StackedBar
 * @property {Object} layout
 * @property {Object} plot
 * @property {Object} legend
 * @property {Object} xAxis
 * @property {Object} yAxis
 * @property {Object} xLabel
 * @property {Object} yLabel
 * @property {Object} gridlines
 * @property {Function} mount
 * @property {Function} update
 * @property {Function} unmount
 * @property {Object} options
 */

var StackedBar = function (_Chart) {
  inherits(StackedBar, _Chart);

  /**
   * @param {Object} props
   * @param {string[]} props.labels - required
   * @param {Object[]} props.traces - required
   * @param {string[]} props.traces.labels - required
   * @param {number[]} props.traces.values - required
   * @param {Object} props.scale - default new Plottable.Scales.Linear()
   * @param {Object} props.categoryScale - default new Plottable.Scales.Category()
   * @param {Object} props.colorScale - default new Plottable.Scales.Color()
   * @param {('h'|'v')} props.orientation - default 'h'
   * @param {number} props.baselineValue - default 0
   * @param {Function} props.labelFormatter - optional
   * @param {boolean} props.showGridlines - default false
   * @param {boolean} props.hideXaxis - default false
   * @param {boolean} props.hideYaxis - default false
   * @param {string} props.xLabel - optional
   * @param {string} props.yLabel - optional
   * @param {('t'|'r'|'b'|'l'|'none')} props.legendPosition - default 'r'
   * @param {boolean} props.animated - default true
   * @param {Function} props.clickHandler - optional
   * @param {Function} props.hoverHandler - optional
   *
   * @return {StackedBar}
   */
  function StackedBar(props) {
    classCallCheck(this, StackedBar);

    var _this = possibleConstructorReturn(this, (StackedBar.__proto__ || Object.getPrototypeOf(StackedBar)).call(this));

    props = Object.assign(_this.options, props);

    _this.datasets = props.data.map(function (t) {
      return new Plottable.Dataset(t.series, t.label);
    });

    var scale = props.scale || new Plottable.Scales.Linear();
    var categoryScale = props.categoryScale || new Plottable.Scales.Category();
    var colorScale = props.colorScale || new Plottable.Scales.Color();

    var horizontal = props.orientation === 'h';
    var plotType = horizontal ? Plottable.Plots.Bar.ORIENTATION_HORIZONTAL : Plottable.Plots.Bar.ORIENTATION_VERTICAL;
    _this.plot = new Plottable.Plots.StackedBar(plotType).attr('fill', function (d, i, dataset) {
      return dataset.metadata();
    }, colorScale).labelsEnabled(false).animated(props.animated).baselineValue(props.baselineValue);
    _this.plot[horizontal ? 'x' : 'y'](function (d) {
      return d.value;
    }, scale);
    _this.plot[horizontal ? 'y' : 'x'](function (d) {
      return d.label;
    }, categoryScale);
    _this.datasets.forEach(function (dataset) {
      _this.plot.addDataset(dataset);
    });

    if (props.labelFormatter) {
      _this.plot.labelFormatter(_this.props.labelFormatter).labelsEnabled(true);
    }

    _this._setGridlines(props, scale);
    var plotArea = _this.gridlines ? new Plottable.Components.Group([_this.gridlines, _this.plot]) : _this.plot;

    _this.layout = new Plottable.Components.Table([[null, null, plotArea], [null, null, null], [null, null, null]]);

    _this._setAxes(props, scale, categoryScale);
    _this._setLegend(props, colorScale);
    _this._setInteractions(props);
    return _this;
  }

  return StackedBar;
}(Chart);

/**
 * @typedef {Object} MultipleLine
 * @property {Object} layout
 * @property {Object} plot.lines
 * @property {Object} plot.markers
 * @property {Object} legend
 * @property {Object} xAxis
 * @property {Object} yAxis
 * @property {Object} xLabel
 * @property {Object} yLabel
 * @property {Object} gridlines
 * @property {Object} guideLine.horizontal
 * @property {Object} guideLine.vertical
 * @property {Function} mount
 * @property {Function} update
 * @property {Function} unmount
 * @property {Object} options
 */

var MultipleLine = function (_Chart) {
  inherits(MultipleLine, _Chart);

  /**
   * @param {Object} props
   * @param {string[]} props.labels - required
   * @param {Object[]} props.traces - required
   * @param {number[]} props.traces.x - required
   * @param {number[]} props.traces.y - required
   * @param {Object} props.xScale - default new Plottable.Scales.Linear()
   * @param {Object} props.yScale - default new Plottable.Scales.Linear()
   * @param {Object} props.colorScale - default new Plottable.Scales.Color()
   * @param {number} props.strokeWidth - default 2
   * @param {number} props.markerSize - default 0
   * @param {boolean} props.showXgridlines - default false
   * @param {boolean} props.showYgridlines - default false
   * @param {boolean} props.hideXaxis - default false
   * @param {boolean} props.hideYaxis - default false
   * @param {string} props.xLabel - optional
   * @param {string} props.yLabel - optional
   * @param {('v'|'h'|'vh'|'hv'|'none')} props.guideLine - default 'none'
   * @param {('t'|'r'|'b'|'l'|'none')} props.legendPosition - default 'r'
   * @param {Function} props.clickHandler - optional
   * @param {Function} props.hoverHandler - optional
   *
   * @return {MultipleLine}
   */
  function MultipleLine(props) {
    classCallCheck(this, MultipleLine);

    var _this = possibleConstructorReturn(this, (MultipleLine.__proto__ || Object.getPrototypeOf(MultipleLine)).call(this));

    props = Object.assign(_this.options, props);

    _this.datasets = props.data.map(function (t) {
      return new Plottable.Dataset(t.series, t.label);
    });

    var scale = props.yScale || new Plottable.Scales.Linear();
    var categoryScale = props.xScale || new Plottable.Scales.Linear();
    var colorScale = props.colorScale || new Plottable.Scales.Color();

    _this.plot = {
      lines: new Plottable.Plots.Line().attr('stroke', function (d, i, dataset) {
        return dataset.metadata();
      }, colorScale).x(function (d) {
        return d.label;
      }, categoryScale).y(function (d) {
        return d.value;
      }, scale).attr('stroke-width', props.strokeWidth),
      markers: new Plottable.Plots.Scatter().attr('opacity', 1).attr('fill', function (d, i, dataset) {
        return dataset.metadata();
      }, colorScale).x(function (d) {
        return d.label;
      }, categoryScale).y(function (d) {
        return d.value;
      }, scale).size(props.markerSize)
    };

    _this.datasets.forEach(function (dataset) {
      _this.plot.lines.addDataset(dataset);
      _this.plot.markers.addDataset(dataset);
    });

    if (props.clickHandler) {
      new Plottable.Interactions.Click().onClick(function (point) {
        var target = _this.plot.markers.entityNearest(point);
        props.clickHandler(target, _this.plot.markers.entities());
      }).attachTo(_this.plot.markers);
    }

    if (props.hoverHandler) {
      new Plottable.Interactions.Pointer().onPointerMove(function (point) {
        var target = _this.plot.markers.entityNearest(point);
        props.hoverHandler(target, _this.plot.markers.entities());
      }).onPointerExit(function (point) {
        props.hoverHandler(null, _this.plot.markers.entities());
      }).attachTo(_this.plot.markers);
    }

    _this.gridlines = new Plottable.Components.Gridlines(props.showXgridlines && categoryScale instanceof Plottable.QuantitativeScale ? categoryScale : null, props.showYgridlines && scale instanceof Plottable.QuantitativeScale ? scale : null);

    _this.guideLine = { horizontal: null, vertical: null };

    if (['v', 'vh', 'hv'].indexOf(props.guideLine) > -1) {
      _this.guideLine.vertical = new Plottable.Components.GuideLineLayer(Plottable.Components.GuideLineLayer.ORIENTATION_VERTICAL).scale(categoryScale);
      new Plottable.Interactions.Pointer().onPointerMove(function (point) {
        var target = _this.plot.markers.entityNearest(point);
        if (target) {
          _this.guideLine.vertical.value(target.datum.label);
          _this.guideLine.vertical.content().style('visibility', 'visible');
        } else {
          _this.guideLine.vertical.content().style('visibility', 'hidden');
        }
      }).onPointerExit(function (point) {
        _this.guideLine.vertical.content().style('visibility', 'hidden');
      }).attachTo(_this.plot.markers);
      _this.onMount = function (element) {
        this.guideLine.vertical.content().style('visibility', 'hidden');
      };
    }
    if (['h', 'vh', 'hv'].indexOf(props.guideLine) > -1) {
      _this.guideLine.horizontal = new Plottable.Components.GuideLineLayer(Plottable.Components.GuideLineLayer.ORIENTATION_HORIZONTAL).scale(scale);
      new Plottable.Interactions.Pointer().onPointerMove(function (point) {
        var target = _this.plot.markers.entityNearest(point);
        if (target) {
          _this.guideLine.horizontal.value(target.datum.value);
          _this.guideLine.horizontal.content().style('visibility', 'visible');
        } else {
          _this.guideLine.horizontal.content().style('visibility', 'hidden');
        }
      }).onPointerExit(function (point) {
        _this.guideLine.horizontal.content().style('visibility', 'hidden');
      }).attachTo(_this.plot.markers);
      _this.onMount = function (element) {
        this.guideLine.horizontal.content().style('visibility', 'hidden');
      };
    }

    var plotArea = new Plottable.Components.Group([_this.gridlines, _this.guideLine.horizontal, _this.guideLine.vertical, _this.plot.lines, _this.plot.markers]);

    _this.layout = new Plottable.Components.Table([[null, null, plotArea], [null, null, null], [null, null, null]]);
    if (!props.hideXaxis) {
      if (categoryScale instanceof Plottable.Scales.Time) {
        _this.xAxis = new Plottable.Axes.Time(categoryScale, 'bottom');
      } else if (categoryScale instanceof Plottable.QuantitativeScale) {
        _this.xAxis = new Plottable.Axes.Numeric(categoryScale, 'bottom');
      } else {
        _this.xAxis = new Plottable.Axes.Category(categoryScale, 'bottom');
      }
      _this.layout.add(_this.xAxis, 1, 2);
    }
    if (!props.hideYaxis) {
      if (scale instanceof Plottable.Scales.Time) {
        _this.yAxis = new Plottable.Axes.Time(scale, 'left');
      } else if (scale instanceof Plottable.QuantitativeScale) {
        _this.yAxis = new Plottable.Axes.Numeric(scale, 'left');
      } else {
        _this.yAxis = new Plottable.Axes.Category(scale, 'left');
      }
      _this.layout.add(_this.yAxis, 0, 1);
    }
    if (props.xLabel) {
      _this.layout.add(new Plottable.Components.AxisLabel(props.xLabel), 2, 2);
    }
    if (props.yLabel) {
      _this.layout.add(new Plottable.Components.AxisLabel(props.yLabel, -90), 0, 0);
    }

    _this._setLegend(props, colorScale);
    return _this;
  }

  return MultipleLine;
}(Chart);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeCeil = Math.ceil;
var nativeMax$2 = Math.max;

/**
 * The base implementation of `_.range` and `_.rangeRight` which doesn't
 * coerce arguments.
 *
 * @private
 * @param {number} start The start of the range.
 * @param {number} end The end of the range.
 * @param {number} step The value to increment or decrement by.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Array} Returns the range of numbers.
 */
function baseRange(start, end, step, fromRight) {
  var index = -1,
      length = nativeMax$2(nativeCeil((end - start) / (step || 1)), 0),
      result = Array(length);

  while (length--) {
    result[fromRight ? length : ++index] = start;
    start += step;
  }
  return result;
}

var _baseRange = baseRange;

/** Used as references for various `Number` constants. */
var INFINITY$2 = 1 / 0;
var MAX_INTEGER = 1.7976931348623157e+308;

/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber_1(value);
  if (value === INFINITY$2 || value === -INFINITY$2) {
    var sign = (value < 0 ? -1 : 1);
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}

var toFinite_1 = toFinite;

/**
 * Creates a `_.range` or `_.rangeRight` function.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new range function.
 */
function createRange(fromRight) {
  return function(start, end, step) {
    if (step && typeof step != 'number' && _isIterateeCall(start, end, step)) {
      end = step = undefined;
    }
    // Ensure the sign of `-0` is preserved.
    start = toFinite_1(start);
    if (end === undefined) {
      end = start;
      start = 0;
    } else {
      end = toFinite_1(end);
    }
    step = step === undefined ? (start < end ? 1 : -1) : toFinite_1(step);
    return _baseRange(start, end, step, fromRight);
  };
}

var _createRange = createRange;

/**
 * Creates an array of numbers (positive and/or negative) progressing from
 * `start` up to, but not including, `end`. A step of `-1` is used if a negative
 * `start` is specified without an `end` or `step`. If `end` is not specified,
 * it's set to `start` with `start` then set to `0`.
 *
 * **Note:** JavaScript follows the IEEE-754 standard for resolving
 * floating-point values which can produce unexpected results.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {number} [start=0] The start of the range.
 * @param {number} end The end of the range.
 * @param {number} [step=1] The value to increment or decrement by.
 * @returns {Array} Returns the range of numbers.
 * @see _.inRange, _.rangeRight
 * @example
 *
 * _.range(4);
 * // => [0, 1, 2, 3]
 *
 * _.range(-4);
 * // => [0, -1, -2, -3]
 *
 * _.range(1, 5);
 * // => [1, 2, 3, 4]
 *
 * _.range(0, 20, 5);
 * // => [0, 5, 10, 15]
 *
 * _.range(0, -4, -1);
 * // => [0, -1, -2, -3]
 *
 * _.range(1, 4, 0);
 * // => [1, 1, 1]
 *
 * _.range(0);
 * // => []
 */
var range = _createRange();

var range_1 = range;

var DATAGOVSG_COLORS = ['#C64D26', '#FF7733', '#415961', '#65828A', '#B2D0D8', '#DAE3E8'];

function getScale() {
  return new Plottable.Scales.Linear().tickGenerator(getCustomTickGenerator());
}

function getCategoryScale(type) {
  return new Plottable.Scales.Category().outerPadding(0.2);
}

function getColorScale() {
  return new Plottable.Scales.Color().range(DATAGOVSG_COLORS);
}

function getSingleColorScale() {
  var scale = new Plottable.Scales.Color().range([DATAGOVSG_COLORS[0]]);
  scale.scale = function (value) {
    return this._d3Scale(value);
  };
  return scale;
}

function getTimeScale() {
  return new CustomTimeScale();
}

var CustomTimeScale = function (_Plottable$Scales$Tim) {
  inherits(CustomTimeScale, _Plottable$Scales$Tim);

  function CustomTimeScale() {
    classCallCheck(this, CustomTimeScale);
    return possibleConstructorReturn(this, (CustomTimeScale.__proto__ || Object.getPrototypeOf(CustomTimeScale)).apply(this, arguments));
  }

  createClass(CustomTimeScale, [{
    key: '_expandSingleValueDomain',
    value: function _expandSingleValueDomain(singleValueDomain) {
      var _singleValueDomain = singleValueDomain.map(function (v) {
        return v.toDate();
      });
      return get(CustomTimeScale.prototype.__proto__ || Object.getPrototypeOf(CustomTimeScale.prototype), '_expandSingleValueDomain', this).call(this, _singleValueDomain);
    }
  }]);
  return CustomTimeScale;
}(Plottable.Scales.Time);

function getCustomNumberFormatter(isPercentage) {
  if (isPercentage) {
    var _defaultFormatter = Plottable.Formatters.general(5);
    return function (v) {
      return _defaultFormatter(v) + '%';
    };
  }

  var defaultFormatter = Plottable.Formatters.shortScale();
  return function (v) {
    var formatted = defaultFormatter(v);
    if (formatted.indexOf('.') > -1) {
      formatted = formatted.replace(/\.?(0*|0{3}\d*)([KMBTQ]?)$/, '$2');
    }
    if (formatted === '-0') formatted = '0';
    return formatted;
  };
}

function getCustomTickGenerator() {
  var targetLineCount = getCustomTickGenerator.targetLineCount || 4;
  return function (scale) {
    var _scale$domain = scale.domain(),
        _scale$domain2 = slicedToArray(_scale$domain, 2),
        domainMin = _scale$domain2[0],
        domainMax = _scale$domain2[1];

    var domainRange = domainMax - domainMin;
    var nearestPower = Math.pow(10, Math.floor(Math.log(domainRange) / Math.LN10));
    var factor = domainRange / nearestPower / targetLineCount;
    factor = [2, 1, 0.5, 0.2].filter(function (v) {
      return v <= factor;
    })[0];
    var interval = nearestPower * (factor * 10) / 10;
    var firstTick = Math.ceil(domainMin / interval);
    var lastTick = Math.floor(domainMax / interval);
    return range_1(firstTick, lastTick + 1).map(function (v) {
      return v * interval;
    });
  };
}

function getCustomTimeAxisConfigs(type) {
  switch (type) {
    case 'year':
    case 'financial_year':
      return yearConfigs();
    case 'half_year':
    case 'financial_half_year':
      return [].concat(toConsumableArray(halfYearConfigs()), toConsumableArray(yearConfigs()));
    case 'quarter':
    case 'financial_quarter':
      return [].concat(toConsumableArray(quarterConfigs()), toConsumableArray(yearConfigs()));
    case 'month':
      return [].concat(toConsumableArray(monthConfigs()), toConsumableArray(yearConfigs()));
    case 'week':
      return [].concat(toConsumableArray(weekConfigs()), toConsumableArray(yearConfigs()));
    case 'date':
      return [].concat(toConsumableArray(dateConfigs()), toConsumableArray(monthConfigs()), toConsumableArray(yearConfigs()));
    case 'date_time':
      return [].concat(toConsumableArray(dateTimeConfigs()), toConsumableArray(dateConfigs()), toConsumableArray(monthConfigs()), toConsumableArray(yearConfigs()));
    case 'time':
      return timeConfigs();
  }
}

var yearSteps = [1, 5, 10, 25, 50, 100, 200, 500, 1000];

function yearConfigs() {
  return yearSteps.map(function (step) {
    return [{
      interval: Plottable.TimeInterval.year,
      step: step,
      formatter: Plottable.Formatters.time('%Y')
    }];
  });
}

function halfYearConfigs() {
  return [[{
    interval: Plottable.TimeInterval.month,
    step: 6,
    formatter: function formatter(d) {
      var date = new Date(d);
      return 'H' + Math.floor(date.getMonth() / 6) + 1;
    }
  }, {
    interval: Plottable.TimeInterval.year,
    step: 1,
    formatter: Plottable.Formatters.time('%Y')
  }]];
}

function quarterConfigs() {
  return [[{
    interval: Plottable.TimeInterval.month,
    step: 3,
    formatter: function formatter(d) {
      var date = new Date(d);
      return 'Q' + Math.floor(date.getMonth() / 3) + 1;
    }
  }, {
    interval: Plottable.TimeInterval.year,
    step: 1,
    formatter: Plottable.Formatters.time('%Y')
  }]];
}

// use the month steps in the orginal plottable library
function monthConfigs() {
  return [[{
    interval: Plottable.TimeInterval.month,
    step: 1,
    // full month name
    formatter: Plottable.Formatters.time('%B')
  }, {
    interval: Plottable.TimeInterval.year,
    step: 1,
    formatter: Plottable.Formatters.time('%Y')
  }], [{
    interval: Plottable.TimeInterval.month,
    step: 1,
    // short month name
    formatter: Plottable.Formatters.time('%b')
  }, {
    interval: Plottable.TimeInterval.year,
    step: 1,
    formatter: Plottable.Formatters.time('%Y')
  }], [{
    interval: Plottable.TimeInterval.month,
    step: 1,
    // month in numbers
    formatter: Plottable.Formatters.time('%m')
  }, {
    interval: Plottable.TimeInterval.year,
    step: 1,
    formatter: Plottable.Formatters.time('%Y')
  }], [{
    interval: Plottable.TimeInterval.month,
    step: 1,
    // month in numbers
    formatter: Plottable.Formatters.time('%-m')
  }, {
    interval: Plottable.TimeInterval.year,
    step: 1,
    formatter: Plottable.Formatters.time('%Y')
  }]];
}

function weekConfigs() {
  return [[{
    interval: Plottable.TimeInterval.week,
    step: 1,
    formatter: function formatter(date) {
      // same as the formatter in d3 but start from W1 instead of W0
      // week starts on monday
      return 'W' + d3.time.mondayOfYear(date) + 1;
    }
  }, {
    interval: Plottable.TimeInterval.year,
    step: 1,
    formatter: Plottable.Formatters.time('%Y')
  }]];
}

function dateConfigs() {
  return [[{
    interval: Plottable.TimeInterval.day,
    step: 1,
    formatter: Plottable.Formatters.time('%e')
  }, {
    interval: Plottable.TimeInterval.year,
    step: 1,
    formatter: Plottable.Formatters.time('%Y')
  }]];
}

var hourSteps = [1, 3, 6, 12];
var timeSteps = [1, 5, 10, 15, 30];

function dateTimeConfigs() {
  var configs = [];

  hourSteps.forEach(function (step) {
    // hours
    configs.push([{
      interval: Plottable.TimeInterval.hour,
      step: step,
      formatter: Plottable.Formatters.time('%I %p')
    }, { interval: Plottable.TimeInterval.day,
      step: 1,
      formatter: Plottable.Formatters.time('%B %e, %Y')
    }]);
  });
  timeSteps.forEach(function (step) {
    // minutes
    configs.push([{
      interval: Plottable.TimeInterval.minute,
      step: step,
      formatter: Plottable.Formatters.time('%I:%M %p')
    }, { interval: Plottable.TimeInterval.day,
      step: 1,
      formatter: Plottable.Formatters.time('%B %e, %Y')
    }]);
    // seconds
    configs.push([{
      interval: Plottable.TimeInterval.second,
      step: step,
      formatter: Plottable.Formatters.time('%I:%M:%S %p')
    }, { interval: Plottable.TimeInterval.day,
      step: 1,
      formatter: Plottable.Formatters.time('%B %e, %Y')
    }]);
  });

  return configs;
}

function timeConfigs() {
  var configs = [];

  hourSteps.forEach(function (step) {
    // hours
    configs.push([{
      interval: Plottable.TimeInterval.hour,
      step: step,
      formatter: Plottable.Formatters.time('%I %p')
    }]);
  });

  timeSteps.forEach(function (step) {
    // minutes
    configs.push([{
      interval: Plottable.TimeInterval.minute,
      step: step,
      formatter: Plottable.Formatters.time('%I:%M %p')
    }]);
    // seconds
    configs.push([{
      interval: Plottable.TimeInterval.second,
      step: step,
      formatter: Plottable.Formatters.time('%I:%M:%S %p')
    }]);
  });

  return configs;
}



var helpers = Object.freeze({
	DATAGOVSG_COLORS: DATAGOVSG_COLORS,
	getScale: getScale,
	getCategoryScale: getCategoryScale,
	getColorScale: getColorScale,
	getSingleColorScale: getSingleColorScale,
	getTimeScale: getTimeScale,
	getCustomNumberFormatter: getCustomNumberFormatter,
	getCustomTickGenerator: getCustomTickGenerator,
	getCustomTimeAxisConfigs: getCustomTimeAxisConfigs
});

/*
  to overwrite default highlight color,
  add a css rule on .highlight and mark it !important. Eg.

  .highlight {
    fill: anotherColor!important;
  }
*/
function highlightOnHover(component, props) {
  new Plottable.Interactions.Pointer().onPointerMove(function (point) {
    component.plot.entities().forEach(function (e) {
      e.selection.classed('highlight', false).style('fill', '');
    });
    var target = component.plot.entitiesAt(point)[0];
    if (target) {
      target.selection.classed('highlight', true).style('fill', 'lightgrey');
    }
  }).onPointerExit(function (point) {
    component.plot.entities().forEach(function (e) {
      e.selection.classed('highlight', false).style('fill', '');
    });
  }).attachTo(component.plot);
}

/**
 * @param {Function} props.title - required
 */
function setupTooltip(component, props) {
  var plot = component.plot.markers || component.plot;
  plot.attr('data-title', props.title);

  var $anchor = void 0;
  var selectors = ['.render-area .bar-area rect', '.render-area .symbol', '.render-area .arc.outline'].join(',');

  component.onMount = function (element) {
    $anchor = $(element).find(selectors);
    $anchor.tooltip({
      animation: false,
      container: element.parentNode,
      html: true,
      placement: function placement(tip, target) {
        var _element$getBoundingC = element.getBoundingClientRect(),
            width = _element$getBoundingC.width,
            height = _element$getBoundingC.height,
            top = _element$getBoundingC.top,
            left = _element$getBoundingC.left;

        var _target$getBoundingCl = target.getBoundingClientRect(),
            targetWidth = _target$getBoundingCl.width,
            targetHeight = _target$getBoundingCl.height,
            targetTop = _target$getBoundingCl.top,
            targetLeft = _target$getBoundingCl.left;

        // determine position by elimination


        if (targetLeft + targetWidth - left <= width * 0.7) return 'right';else if (targetLeft - left >= width * 0.3) return 'left';else if (targetTop - top >= height * 0.4) return 'top';else if (targetTop + targetHeight - top <= height * 0.6) return 'bottom';else return 'left';
      }
    });
  };

  component.onUnmount = function () {
    $anchor.tooltip('destroy');
  };
}

/**
 * @param {Function} props.title - required
 * @param {Function} props.content - optional
 */
function setupPopover(component, props) {
  var plot = component.plot.markers || component.plot;
  plot.attr('data-title', props.title);
  plot.attr('data-content', props.content);

  var $anchor = void 0;
  var selectors = ['.render-area .bar-area rect', '.render-area .symbol', '.render-area .arc.outline'].join(',');

  component.onMount = function (element) {
    $anchor = $(element).find(selectors);
    $anchor.popover({
      animation: false,
      container: element.parentNode,
      html: true,
      trigger: 'hover',
      placement: function placement(tip, target) {
        var _element$getBoundingC2 = element.getBoundingClientRect(),
            width = _element$getBoundingC2.width,
            height = _element$getBoundingC2.height,
            top = _element$getBoundingC2.top,
            left = _element$getBoundingC2.left;

        var _target$getBoundingCl2 = target.getBoundingClientRect(),
            targetWidth = _target$getBoundingCl2.width,
            targetHeight = _target$getBoundingCl2.height,
            targetTop = _target$getBoundingCl2.top,
            targetLeft = _target$getBoundingCl2.left;

        // determine position by elimination


        if (targetLeft + targetWidth - left <= width * 0.7) return 'right';else if (targetLeft - left >= width * 0.3) return 'left';else if (targetTop - top >= height * 0.4) return 'top';else if (targetTop + targetHeight - top <= height * 0.6) return 'bottom';else return 'left';
      }
    });
  };

  component.onUnmount = function () {
    $anchor.popover('destroy');
  };
}

/**
 * @param {Function} props.title - required
 * @param {Function} props.content - optional
 */
function setupPopoverOnGuideLine(component, props) {
  var $guideLine = void 0;

  new Plottable.Interactions.Pointer().onPointerMove(function (point) {
    var target = component.plot.markers.entityNearest(point);
    if (target) {
      $guideLine.attr('data-original-title', props.title(target.datum, target.index, target.dataset)).attr('data-content', props.content(target.datum, target.index, target.dataset)).popover('show');
    } else {
      $guideLine.popover('hide');
    }
  }).onPointerExit(function (point) {
    $guideLine.popover('hide');
  }).attachTo(component.plot.markers);

  component.onMount = function (element) {
    if (this.guideLine.vertical) {
      $guideLine = $(element).find('.guide-line-layer.vertical .guide-line');
      $guideLine.popover({
        animation: false,
        container: element.parentNode,
        html: true,
        trigger: 'manual',
        placement: function placement(tip, target) {
          var _element$getBoundingC3 = element.getBoundingClientRect(),
              width = _element$getBoundingC3.width,
              left = _element$getBoundingC3.left;

          var _target$getBoundingCl3 = target.getBoundingClientRect(),
              targetWidth = _target$getBoundingCl3.width,
              targetLeft = _target$getBoundingCl3.left;

          return targetLeft + targetWidth - left <= width * 0.7 ? 'right' : 'left';
        }
      });
    } else if (this.guideLine.horizontal) {
      $guideLine = $(element).find('.guide-line-layer.horizontal .guide-line');
      $guideLine.popover({
        animation: false,
        container: element.parentNode,
        html: true,
        trigger: 'manual',
        placement: function placement(tip, target) {
          var _element$getBoundingC4 = element.getBoundingClientRect(),
              height = _element$getBoundingC4.height,
              top = _element$getBoundingC4.top;

          var _target$getBoundingCl4 = target.getBoundingClientRect(),
              targetTop = _target$getBoundingCl4.top;

          return targetTop - top >= height * 0.4 ? 'top' : 'bottom';
        }
      });
    }
  };

  component.onUnmount = function () {
    $guideLine.popover('destroy');
  };
}

/**
 * @param {Function} props.title - required
 * @param {Function} props.content - optional
 */
function setupShadowWithPopover(component, props) {
  var plotArea = component.plot.parent();
  var scale = component.plot.orientation() === 'vertical' ? component.plot.x().scale : component.plot.y().scale;

  function getDomain() {
    return scale.domain().map(function (label) {
      return { label: label };
    });
  }
  var dataset = new Plottable.Dataset();

  var shadow = new Plottable.Plots.Rectangle().addClass('shadow').addDataset(dataset).attr('data-title', props.title).attr('data-content', props.content).attr('fill', 'rgba(0, 0, 0, 0.1)');

  if (component.plot.orientation() === 'vertical') {
    shadow.x(function (d) {
      return scale.scale(d.label) - scale.stepWidth() / 2;
    }).x2(function (d) {
      return scale.scale(d.label) + scale.stepWidth() / 2;
    }).y(function (d) {
      return 0;
    }).y2(function (d) {
      return shadow.height();
    });
  } else {
    shadow.x(function (d) {
      return 0;
    }).x2(function (d) {
      return shadow.width();
    }).y(function (d) {
      return scale.scale(d.label) - scale.stepWidth() / 2;
    }).y2(function (d) {
      return scale.scale(d.label) + scale.stepWidth() / 2;
    });
  }

  plotArea.remove(component.plot);
  plotArea.append(shadow);
  plotArea.append(component.plot);

  new Plottable.Interactions.Pointer().onPointerMove(function (point) {
    shadow.entities().forEach(function (e) {
      $(e.selection.node()).css('visibility', 'hidden').popover('hide');
    });
    var target = shadow.entitiesAt(point)[0];
    if (target) {
      $(target.selection.node()).css('visibility', 'visible').popover('show');
    }
  }).onPointerExit(function (point) {
    shadow.entities().forEach(function (e) {
      $(e.selection.node()).css('visibility', 'hidden').popover('hide');
    });
  }).attachTo(shadow);

  var $anchor = void 0;

  component.onMount = function (element) {
    dataset.data(getDomain());
    scale.onUpdate(function () {
      dataset.data(getDomain());
    });
    shadow.renderImmediately();

    $anchor = $(element).find('.shadow .render-area rect');
    $anchor.css('visibility', 'hidden');
    if (this.plot.orientation() === 'vertical') {
      $anchor.popover({
        animation: false,
        container: element.parentNode,
        html: true,
        trigger: 'manual',
        placement: function placement(tip, target) {
          var _element$getBoundingC5 = element.getBoundingClientRect(),
              width = _element$getBoundingC5.width,
              left = _element$getBoundingC5.left;

          var _target$getBoundingCl5 = target.getBoundingClientRect(),
              targetWidth = _target$getBoundingCl5.width,
              targetLeft = _target$getBoundingCl5.left;

          return targetLeft + targetWidth - left <= width * 0.7 ? 'right' : 'left';
        }
      });
    } else {
      $anchor.popover({
        animation: false,
        container: element.parentNode,
        html: true,
        trigger: 'manual',
        placement: function placement(tip, target) {
          var _element$getBoundingC6 = element.getBoundingClientRect(),
              height = _element$getBoundingC6.height,
              top = _element$getBoundingC6.top;

          var _target$getBoundingCl6 = target.getBoundingClientRect(),
              targetTop = _target$getBoundingCl6.top;

          return targetTop - top >= height * 0.4 ? 'top' : 'bottom';
        }
      });
    }
  };

  component.onUnmount = function () {
    $anchor.popover('destroy');
  };

  return shadow;
}

/**
 * @param {Function} props.labelFormatter - default d => d.label
 */
function setupOuterLabel(component) {
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { labelFormatter: function labelFormatter(d) {
      return d.label;
    } };

  component.plot.outerRadius(function (d) {
    var maxRadius = Math.min(component.plot.width(), component.plot.height()) / 2;
    return maxRadius * 0.8;
  });

  component.plot._clipPathEnabled = false;

  function eraseLabel() {
    component.plot.background().select('.label-area').remove();
  }

  function drawLabel() {
    var radius = Math.min(component.plot.width(), component.plot.height()) / 2;
    var innerArc = d3.svg.arc().innerRadius(0).outerRadius(radius * 0.8);
    var outerArc = d3.svg.arc().innerRadius(radius * 0.8).outerRadius(radius);
    var pieFunction = d3.layout.pie().sort(null) // disable sorting
    .value(function (d) {
      return d.value;
    });

    var data = pieFunction(component.dataset.data()).map(function (d, i) {
      var midAngle = 0.5 * d.startAngle + 0.5 * d.endAngle;
      var rightHalf = midAngle < Math.PI;
      var point1 = innerArc.centroid(d);
      var point2 = outerArc.centroid(d);
      var point3 = [(rightHalf ? 1 : -1) * radius * 0.95, point2[1]];
      var point4 = [(rightHalf ? 1 : -1) * radius, point2[1]];
      return {
        text: props.labelFormatter(d.data, i),
        textAnchor: rightHalf ? 'start' : 'end',
        textOffset: point4,
        polyline: [point1, point2, point3]
      };
    });

    var origin = [component.plot.width() / 2, component.plot.height() / 2];

    eraseLabel();

    var labelArea = component.plot.background().insert('g').classed('label-area', true).attr('transform', 'translate(' + origin.join(',') + ')');

    var labels = labelArea.selectAll('g').data(data).enter().append('g').classed('label', true);

    labels.append('text').text(function (d) {
      return d.text;
    }).attr('dy', '0.35em').attr('transform', function (d) {
      return 'translate(' + d.textOffset.join(',') + ')';
    }).style('text-anchor', function (d) {
      return d.textAnchor;
    });

    labels.append('polyline').attr('points', function (d) {
      return d.polyline;
    });
  }

  component.onMount = function (element) {
    drawLabel();
  };

  component.onUpdate = function (nextProps) {
    drawLabel();
  };

  component.onResize = function () {
    drawLabel();
  };

  component.onUnmount = function () {
    eraseLabel();
  };
}

function customizeTimeAxis(component, type) {
  var axis = component.xAxis;
  if (axis instanceof Plottable.Axes.Time) {
    axis.axisConfigurations(getCustomTimeAxisConfigs(type));
    if (type === 'year' || type === 'financial_year') {
      axis.tierLabelPositions(axis.tierLabelPositions().map(function (v) {
        return 'center';
      }));
    }
  }
}

/*
  FIXME
  Very very hackish stuff
  Might break when upgrading to Plottable 3.0
*/

function removeInnerPadding(component) {
  var _makeInnerScale = component.plot._makeInnerScale;
  component.plot._makeInnerScale = function () {
    return _makeInnerScale.call(this).innerPadding(0).outerPadding(0);
  };
}

function downsampleTicks(component) {
  var axis = component.xAxis;
  if (axis instanceof Plottable.Axes.Category) {
    var renderImmediately = axis.renderImmediately;
    axis.renderImmediately = function () {
      var _this = this;

      var minimumSpacing = d3.max(this._scale.domain(), function (v) {
        return _this._measurer.measure(v.toString()).width;
      }) * 1.5;
      var downsampleRatio = Math.ceil(minimumSpacing / this._scale.stepWidth());
      var domain = this._scale.domain;
      var stepWidth = this._scale.stepWidth;
      this._scale.domain = function () {
        return domain.call(this).filter(function (v, i) {
          return i % downsampleRatio === 0;
        });
      };
      this._scale.stepWidth = function () {
        return stepWidth.call(this) * downsampleRatio;
      };
      renderImmediately.call(this);
      this._scale.domain = domain;
      this._scale.stepWidth = stepWidth;
    };

    var _measureTicks = axis._measureTicks;
    axis._measureTicks = function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var wrap = this._wrapper.wrap;
      this._wrapper.wrap = function () {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        var result = wrap.call.apply(wrap, [this].concat(args));
        result.wrappedText = result.originalText;
        return result;
      };
      var result = _measureTicks.call.apply(_measureTicks, [this].concat(toConsumableArray(args)));
      this._wrapper.wrap = wrap;
      return result;
    };
  }
}



var plugins = Object.freeze({
	highlightOnHover: highlightOnHover,
	setupTooltip: setupTooltip,
	setupPopover: setupPopover,
	setupPopoverOnGuideLine: setupPopoverOnGuideLine,
	setupShadowWithPopover: setupShadowWithPopover,
	setupOuterLabel: setupOuterLabel,
	customizeTimeAxis: customizeTimeAxis,
	removeInnerPadding: removeInnerPadding,
	downsampleTicks: downsampleTicks
});

var DatagovsgSimplePie = function (_SimplePie) {
  inherits(DatagovsgSimplePie, _SimplePie);

  function DatagovsgSimplePie(props) {
    classCallCheck(this, DatagovsgSimplePie);

    props = Object.assign({
      colorScale: getColorScale()
    }, props);

    var _this = possibleConstructorReturn(this, (DatagovsgSimplePie.__proto__ || Object.getPrototypeOf(DatagovsgSimplePie)).call(this, props));

    highlightOnHover(_this);
    setupOuterLabel(_this, { labelFormatter: function labelFormatter(d) {
        return d.label;
      } });
    return _this;
  }

  return DatagovsgSimplePie;
}(SimplePie);

var DatagovsgSimpleBar = function (_SimpleBar) {
  inherits(DatagovsgSimpleBar, _SimpleBar);

  function DatagovsgSimpleBar(props) {
    classCallCheck(this, DatagovsgSimpleBar);

    props = Object.assign({
      scale: getScale(),
      categoryScale: props.isTimeSeries ? getTimeScale() : getCategoryScale(),
      colorScale: getSingleColorScale(),
      showGridlines: true
    }, props);

    var _this2 = possibleConstructorReturn(this, (DatagovsgSimpleBar.__proto__ || Object.getPrototypeOf(DatagovsgSimpleBar)).call(this, props));

    highlightOnHover(_this2);
    downsampleTicks(_this2);
    customizeTimeAxis(_this2, props.isTimeSeries);

    postprocess(_this2.xAxis, _this2.yAxis, props);
    return _this2;
  }

  return DatagovsgSimpleBar;
}(SimpleBar);

var DatagovsgHorizontalBar = function (_SimpleBar2) {
  inherits(DatagovsgHorizontalBar, _SimpleBar2);

  function DatagovsgHorizontalBar(props) {
    classCallCheck(this, DatagovsgHorizontalBar);

    props = Object.assign({
      orientation: 'h',
      sorted: 'd',
      scale: getScale(),
      categoryScale: getCategoryScale(),
      colorScale: getSingleColorScale(),
      showGridlines: true
    }, props);

    var _this3 = possibleConstructorReturn(this, (DatagovsgHorizontalBar.__proto__ || Object.getPrototypeOf(DatagovsgHorizontalBar)).call(this, props));

    highlightOnHover(_this3, props.isTimeSeries);

    postprocess(_this3.yAxis, _this3.xAxis, props);
    _this3.xAxis.tickLabelPadding(0);
    return _this3;
  }

  return DatagovsgHorizontalBar;
}(SimpleBar);

var DatagovsgGroupedBar = function (_GroupedBar) {
  inherits(DatagovsgGroupedBar, _GroupedBar);

  function DatagovsgGroupedBar(props) {
    classCallCheck(this, DatagovsgGroupedBar);

    props = Object.assign({
      scale: getScale(),
      categoryScale: props.isTimeSeries ? getTimeScale() : getCategoryScale(),
      colorScale: getColorScale(),
      showGridlines: true
    }, props);

    var _this4 = possibleConstructorReturn(this, (DatagovsgGroupedBar.__proto__ || Object.getPrototypeOf(DatagovsgGroupedBar)).call(this, props));

    downsampleTicks(_this4);
    removeInnerPadding(_this4);
    customizeTimeAxis(_this4, props.isTimeSeries);

    postprocess(_this4.xAxis, _this4.yAxis, props);
    return _this4;
  }

  return DatagovsgGroupedBar;
}(GroupedBar);

var DatagovsgStackedBar = function (_StackedBar) {
  inherits(DatagovsgStackedBar, _StackedBar);

  function DatagovsgStackedBar(props) {
    classCallCheck(this, DatagovsgStackedBar);

    props = Object.assign({
      scale: getScale(),
      categoryScale: props.isTimeSeries ? getTimeScale() : getCategoryScale(),
      colorScale: getColorScale(),
      showGridlines: true
    }, props);

    var _this5 = possibleConstructorReturn(this, (DatagovsgStackedBar.__proto__ || Object.getPrototypeOf(DatagovsgStackedBar)).call(this, props));

    downsampleTicks(_this5);
    removeInnerPadding(_this5);
    customizeTimeAxis(_this5, props.isTimeSeries);

    postprocess(_this5.xAxis, _this5.yAxis, props);
    return _this5;
  }

  return DatagovsgStackedBar;
}(StackedBar);

var DatagovsgLine = function (_MultipleLine) {
  inherits(DatagovsgLine, _MultipleLine);

  function DatagovsgLine(props) {
    classCallCheck(this, DatagovsgLine);

    props = Object.assign({
      yScale: getScale(),
      xScale: props.isTimeSeries ? getTimeScale() : getCategoryScale(),
      colorScale: getColorScale(),
      showYgridlines: true,
      guideLine: 'v'
    }, props);

    var _this6 = possibleConstructorReturn(this, (DatagovsgLine.__proto__ || Object.getPrototypeOf(DatagovsgLine)).call(this, props));

    downsampleTicks(_this6);
    customizeTimeAxis(_this6, props.isTimeSeries);

    postprocess(_this6.xAxis, _this6.yAxis, props);
    return _this6;
  }

  return DatagovsgLine;
}(MultipleLine);

function postprocess(primaryAxis, secondaryAxis) {
  var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  primaryAxis.margin(12).innerTickLength(5).endTickLength(0).tickLabelPadding(5);
  secondaryAxis.margin(12).innerTickLength(0).endTickLength(0).tickLabelPadding(5).showEndTickLabels(true).addClass('hide-baseline').formatter(getCustomNumberFormatter(props.isPercentage));
  // hack to show end tick labels
  secondaryAxis._hideOverflowingTickLabels = function () {
    return null;
  };
}



var DatagovsgCharts = Object.freeze({
	SimplePie: SimplePie,
	SimpleBar: SimpleBar,
	GroupedBar: GroupedBar,
	StackedBar: StackedBar,
	MultipleLine: MultipleLine,
	DatagovsgSimplePie: DatagovsgSimplePie,
	DatagovsgSimpleBar: DatagovsgSimpleBar,
	DatagovsgHorizontalBar: DatagovsgHorizontalBar,
	DatagovsgGroupedBar: DatagovsgGroupedBar,
	DatagovsgStackedBar: DatagovsgStackedBar,
	DatagovsgLine: DatagovsgLine
});

window.DatagovsgCharts = _extends({}, DatagovsgCharts, { plugins: plugins, helpers: helpers });

}());
