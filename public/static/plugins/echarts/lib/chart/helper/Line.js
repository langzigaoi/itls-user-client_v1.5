
/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

var zrUtil = require("zrender/lib/core/util");

var vector = require("zrender/lib/core/vector");

var symbolUtil = require("../../util/symbol");

var LinePath = require("./LinePath");

var graphic = require("../../util/graphic");

var _number = require("../../util/number");

var round = _number.round;

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

/**
 * @module echarts/chart/helper/Line
 */
var SYMBOL_CATEGORIES = ['fromSymbol', 'toSymbol'];

function makeSymbolTypeKey(symbolCategory) {
  return '_' + symbolCategory + 'Type';
}
/**
 * @inner
 */


function createSymbol(name, lineData, idx) {
  var symbolType = lineData.getItemVisual(idx, name);

  if (!symbolType || symbolType === 'none') {
    return;
  }

  var color = lineData.getItemVisual(idx, 'color');
  var symbolSize = lineData.getItemVisual(idx, name + 'Size');
  var symbolRotate = lineData.getItemVisual(idx, name + 'Rotate');

  if (!zrUtil.isArray(symbolSize)) {
    symbolSize = [symbolSize, symbolSize];
  }

  var symbolPath = symbolUtil.createSymbol(symbolType, -symbolSize[0] / 2, -symbolSize[1] / 2, symbolSize[0], symbolSize[1], color); // rotate by default if symbolRotate is not specified or NaN

  symbolPath.__specifiedRotation = symbolRotate == null || isNaN(symbolRotate) ? void 0 : +symbolRotate * Math.PI / 180 || 0;
  symbolPath.name = name;
  return symbolPath;
}

function createLine(points) {
  var line = new LinePath({
    name: 'line',
    subPixelOptimize: true
  });
  setLinePoints(line.shape, points);
  return line;
}

function setLinePoints(targetShape, points) {
  targetShape.x1 = points[0][0];
  targetShape.y1 = points[0][1];
  targetShape.x2 = points[1][0];
  targetShape.y2 = points[1][1];
  targetShape.percent = 1;
  var cp1 = points[2];

  if (cp1) {
    targetShape.cpx1 = cp1[0];
    targetShape.cpy1 = cp1[1];
  } else {
    targetShape.cpx1 = NaN;
    targetShape.cpy1 = NaN;
  }
}

function updateSymbolAndLabelBeforeLineUpdate() {
  var lineGroup = this;
  var symbolFrom = lineGroup.childOfName('fromSymbol');
  var symbolTo = lineGroup.childOfName('toSymbol');
  var label = lineGroup.childOfName('label'); // Quick reject

  if (!symbolFrom && !symbolTo && label.ignore) {
    return;
  }

  var invScale = 1;
  var parentNode = this.parent;

  while (parentNode) {
    if (parentNode.scale) {
      invScale /= parentNode.scale[0];
    }

    parentNode = parentNode.parent;
  }

  var line = lineGroup.childOfName('line'); // If line not changed
  // FIXME Parent scale changed

  if (!this.__dirty && !line.__dirty) {
    return;
  }

  var percent = line.shape.percent;
  var fromPos = line.pointAt(0);
  var toPos = line.pointAt(percent);
  var d = vector.sub([], toPos, fromPos);
  vector.normalize(d, d);

  if (symbolFrom) {
    symbolFrom.attr('position', fromPos); // Fix #12388
    // when symbol is set to be 'arrow' in markLine,
    // symbolRotate value will be ignored, and compulsively use tangent angle.
    // rotate by default if symbol rotation is not specified

    var specifiedRotation = symbolFrom.__specifiedRotation;

    if (specifiedRotation == null) {
      var tangent = line.tangentAt(0);
      symbolFrom.attr('rotation', Math.PI / 2 - Math.atan2(tangent[1], tangent[0]));
    } else {
      symbolFrom.attr('rotation', specifiedRotation);
    }

    symbolFrom.attr('scale', [invScale * percent, invScale * percent]);
  }

  if (symbolTo) {
    symbolTo.attr('position', toPos); // Fix #12388
    // when symbol is set to be 'arrow' in markLine,
    // symbolRotate value will be ignored, and compulsively use tangent angle.
    // rotate by default if symbol rotation is not specified

    var specifiedRotation = symbolTo.__specifiedRotation;

    if (specifiedRotation == null) {
      var tangent = line.tangentAt(1);
      symbolTo.attr('rotation', -Math.PI / 2 - Math.atan2(tangent[1], tangent[0]));
    } else {
      symbolTo.attr('rotation', specifiedRotation);
    }

    symbolTo.attr('scale', [invScale * percent, invScale * percent]);
  }

  if (!label.ignore) {
    label.attr('position', toPos);
    var textPosition;
    var textAlign;
    var textVerticalAlign;
    var textOrigin;
    var distance = label.__labelDistance;
    var distanceX = distance[0] * invScale;
    var distanceY = distance[1] * invScale;
    var halfPercent = percent / 2;
    var tangent = line.tangentAt(halfPercent);
    var n = [tangent[1], -tangent[0]];
    var cp = line.pointAt(halfPercent);

    if (n[1] > 0) {
      n[0] = -n[0];
      n[1] = -n[1];
    }

    var dir = tangent[0] < 0 ? -1 : 1;

    if (label.__position !== 'start' && label.__position !== 'end') {
      var rotation = -Math.atan2(tangent[1], tangent[0]);

      if (toPos[0] < fromPos[0]) {
        rotation = Math.PI + rotation;
      }

      label.attr('rotation', rotation);
    }

    var dy;

    switch (label.__position) {
      case 'insideStartTop':
      case 'insideMiddleTop':
      case 'insideEndTop':
      case 'middle':
        dy = -distanceY;
        textVerticalAlign = 'bottom';
        break;

      case 'insideStartBottom':
      case 'insideMiddleBottom':
      case 'insideEndBottom':
        dy = distanceY;
        textVerticalAlign = 'top';
        break;

      default:
        dy = 0;
        textVerticalAlign = 'middle';
    }

    switch (label.__position) {
      case 'end':
        textPosition = [d[0] * distanceX + toPos[0], d[1] * distanceY + toPos[1]];
        textAlign = d[0] > 0.8 ? 'left' : d[0] < -0.8 ? 'right' : 'center';
        textVerticalAlign = d[1] > 0.8 ? 'top' : d[1] < -0.8 ? 'bottom' : 'middle';
        break;

      case 'start':
        textPosition = [-d[0] * distanceX + fromPos[0], -d[1] * distanceY + fromPos[1]];
        textAlign = d[0] > 0.8 ? 'right' : d[0] < -0.8 ? 'left' : 'center';
        textVerticalAlign = d[1] > 0.8 ? 'bottom' : d[1] < -0.8 ? 'top' : 'middle';
        break;

      case 'insideStartTop':
      case 'insideStart':
      case 'insideStartBottom':
        textPosition = [distanceX * dir + fromPos[0], fromPos[1] + dy];
        textAlign = tangent[0] < 0 ? 'right' : 'left';
        textOrigin = [-distanceX * dir, -dy];
        break;

      case 'insideMiddleTop':
      case 'insideMiddle':
      case 'insideMiddleBottom':
      case 'middle':
        textPosition = [cp[0], cp[1] + dy];
        textAlign = 'center';
        textOrigin = [0, -dy];
        break;

      case 'insideEndTop':
      case 'insideEnd':
      case 'insideEndBottom':
        textPosition = [-distanceX * dir + toPos[0], toPos[1] + dy];
        textAlign = tangent[0] >= 0 ? 'right' : 'left';
        textOrigin = [distanceX * dir, -dy];
        break;
    }

    label.attr({
      style: {
        // Use the user specified text align and baseline first
        textVerticalAlign: label.__verticalAlign || textVerticalAlign,
        textAlign: label.__textAlign || textAlign
      },
      position: textPosition,
      scale: [invScale, invScale],
      origin: textOrigin
    });
  }
}
/**
 * @constructor
 * @extends {module:zrender/graphic/Group}
 * @alias {module:echarts/chart/helper/Line}
 */


function Line(lineData, idx, seriesScope) {
  graphic.Group.call(this);

  this._createLine(lineData, idx, seriesScope);
}

var lineProto = Line.prototype; // Update symbol position and rotation

lineProto.beforeUpdate = updateSymbolAndLabelBeforeLineUpdate;

lineProto._createLine = function (lineData, idx, seriesScope) {
  var seriesModel = lineData.hostModel;
  var linePoints = lineData.getItemLayout(idx);
  var line = createLine(linePoints);
  line.shape.percent = 0;
  graphic.initProps(line, {
    shape: {
      percent: 1
    }
  }, seriesModel, idx);
  this.add(line);
  var label = new graphic.Text({
    name: 'label',
    // FIXME
    // Temporary solution for `focusNodeAdjacency`.
    // line label do not use the opacity of lineStyle.
    lineLabelOriginalOpacity: 1
  });
  this.add(label);
  zrUtil.each(SYMBOL_CATEGORIES, function (symbolCategory) {
    var symbol = createSymbol(symbolCategory, lineData, idx); // symbols must added after line to make sure
    // it will be updated after line#update.
    // Or symbol position and rotation update in line#beforeUpdate will be one frame slow

    this.add(symbol);
    this[makeSymbolTypeKey(symbolCategory)] = lineData.getItemVisual(idx, symbolCategory);
  }, this);

  this._updateCommonStl(lineData, idx, seriesScope);
};

lineProto.updateData = function (lineData, idx, seriesScope) {
  var seriesModel = lineData.hostModel;
  var line = this.childOfName('line');
  var linePoints = lineData.getItemLayout(idx);
  var target = {
    shape: {}
  };
  setLinePoints(target.shape, linePoints);
  graphic.updateProps(line, target, seriesModel, idx);
  zrUtil.each(SYMBOL_CATEGORIES, function (symbolCategory) {
    var symbolType = lineData.getItemVisual(idx, symbolCategory);
    var key = makeSymbolTypeKey(symbolCategory); // Symbol changed

    if (this[key] !== symbolType) {
      this.remove(this.childOfName(symbolCategory));
      var symbol = createSymbol(symbolCategory, lineData, idx);
      this.add(symbol);
    }

    this[key] = symbolType;
  }, this);

  this._updateCommonStl(lineData, idx, seriesScope);
};

lineProto._updateCommonStl = function (lineData, idx, seriesScope) {
  var seriesModel = lineData.hostModel;
  var line = this.childOfName('line');
  var lineStyle = seriesScope && seriesScope.lineStyle;
  var hoverLineStyle = seriesScope && seriesScope.hoverLineStyle;
  var labelModel = seriesScope && seriesScope.labelModel;
  var hoverLabelModel = seriesScope && seriesScope.hoverLabelModel; // Optimization for large dataset

  if (!seriesScope || lineData.hasItemOption) {
    var itemModel = lineData.getItemModel(idx);
    lineStyle = itemModel.getModel('lineStyle').getLineStyle();
    hoverLineStyle = itemModel.getModel('emphasis.lineStyle').getLineStyle();
    labelModel = itemModel.getModel('label');
    hoverLabelModel = itemModel.getModel('emphasis.label');
  }

  var visualColor = lineData.getItemVisual(idx, 'color');
  var visualOpacity = zrUtil.retrieve3(lineData.getItemVisual(idx, 'opacity'), lineStyle.opacity, 1);
  line.useStyle(zrUtil.defaults({
    strokeNoScale: true,
    fill: 'none',
    stroke: visualColor,
    opacity: visualOpacity
  }, lineStyle));
  line.hoverStyle = hoverLineStyle; // Update symbol

  zrUtil.each(SYMBOL_CATEGORIES, function (symbolCategory) {
    var symbol = this.childOfName(symbolCategory);

    if (symbol) {
      symbol.setColor(visualColor);
      symbol.setStyle({
        opacity: visualOpacity
      });
    }
  }, this);
  var showLabel = labelModel.getShallow('show');
  var hoverShowLabel = hoverLabelModel.getShallow('show');
  var label = this.childOfName('label');
  var defaultLabelColor;
  var baseText; // FIXME: the logic below probably should be merged to `graphic.setLabelStyle`.

  if (showLabel || hoverShowLabel) {
    defaultLabelColor = visualColor || '#000';
    baseText = seriesModel.getFormattedLabel(idx, 'normal', lineData.dataType);

    if (baseText == null) {
      var rawVal = seriesModel.getRawValue(idx);
      baseText = rawVal == null ? lineData.getName(idx) : isFinite(rawVal) ? round(rawVal) : rawVal;
    }
  }

  var normalText = showLabel ? baseText : null;
  var emphasisText = hoverShowLabel ? zrUtil.retrieve2(seriesModel.getFormattedLabel(idx, 'emphasis', lineData.dataType), baseText) : null;
  var labelStyle = label.style; // Always set `textStyle` even if `normalStyle.text` is null, because default
  // values have to be set on `normalStyle`.

  if (normalText != null || emphasisText != null) {
    graphic.setTextStyle(label.style, labelModel, {
      text: normalText
    }, {
      autoColor: defaultLabelColor
    });
    label.__textAlign = labelStyle.textAlign;
    label.__verticalAlign = labelStyle.textVerticalAlign; // 'start', 'middle', 'end'

    label.__position = labelModel.get('position') || 'middle';
    var distance = labelModel.get('distance');

    if (!zrUtil.isArray(distance)) {
      distance = [distance, distance];
    }

    label.__labelDistance = distance;
  }

  if (emphasisText != null) {
    // Only these properties supported in this emphasis style here.
    label.hoverStyle = {
      text: emphasisText,
      textFill: hoverLabelModel.getTextColor(true),
      // For merging hover style to normal style, do not use
      // `hoverLabelModel.getFont()` here.
      fontStyle: hoverLabelModel.getShallow('fontStyle'),
      fontWeight: hoverLabelModel.getShallow('fontWeight'),
      fontSize: hoverLabelModel.getShallow('fontSize'),
      fontFamily: hoverLabelModel.getShallow('fontFamily')
    };
  } else {
    label.hoverStyle = {
      text: null
    };
  }

  label.ignore = !showLabel && !hoverShowLabel;
  graphic.setHoverStyle(this);
};

lineProto.highlight = function () {
  this.trigger('emphasis');
};

lineProto.downplay = function () {
  this.trigger('normal');
};

lineProto.updateLayout = function (lineData, idx) {
  this.setLinePoints(lineData.getItemLayout(idx));
};

lineProto.setLinePoints = function (points) {
  var linePath = this.childOfName('line');
  setLinePoints(linePath.shape, points);
  linePath.dirty();
};

zrUtil.inherits(Line, graphic.Group);
var _default = Line;
module.exports = _default;
