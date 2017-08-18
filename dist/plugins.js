'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.highlightOnHover = highlightOnHover;
exports.setupTooltip = setupTooltip;
exports.setupPopover = setupPopover;
exports.setupPopoverOnGuideLine = setupPopoverOnGuideLine;
exports.setupShadowWithPopover = setupShadowWithPopover;
exports.setupOuterLabel = setupOuterLabel;
exports.removeInnerPadding = removeInnerPadding;
exports.downsampleTicks = downsampleTicks;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function highlightOnHover(component, props) {
  new Plottable.Interactions.Pointer().onPointerMove(function (point) {
    component.plot.entities().forEach(function (e) {
      e.selection.classed('highlight', false);
    });
    var target = component.plot.entitiesAt(point)[0];
    if (target) {
      target.selection.classed('highlight', true);
    }
  }).onPointerExit(function (point) {
    component.plot.entities().forEach(function (e) {
      e.selection.classed('highlight', false);
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

  var shadow = new Plottable.Plots.Rectangle().addClass('shadow').addDataset(dataset).attr('data-title', props.title).attr('data-content', props.content);

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
  function _downsample(axis) {
    if (axis instanceof Plottable.Axes.Category) {
      (function () {
        var renderImmediately = axis.renderImmediately;
        axis.renderImmediately = function () {
          var _this = this;

          var minimumSpacing = d3.max(this._scale.domain(), function (v) {
            return _this._measurer.measure(v).width;
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
          var result = _measureTicks.call.apply(_measureTicks, [this].concat((0, _toConsumableArray3.default)(args)));
          this._wrapper.wrap = wrap;
          return result;
        };
      })();
    }
  }

  _downsample(component.xAxis);
  _downsample(component.yAxis);
}