'use strict';

var React = require('react');
var styled = require('styled-components');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
}
typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var getLength = function (x, y) { return Math.sqrt(x * x + y * y); };
var getAngle = function (_a, _b) {
    var x1 = _a.x, y1 = _a.y;
    var x2 = _b.x, y2 = _b.y;
    var dot = x1 * x2 + y1 * y2;
    var det = x1 * y2 - y1 * x2;
    var angle = Math.atan2(det, dot) / Math.PI * 180;
    return (angle + 360) % 360;
};
var degToRadian = function (deg) { return deg * Math.PI / 180; };
var cos = function (deg) { return Math.cos(degToRadian(deg)); };
var sin = function (deg) { return Math.sin(degToRadian(deg)); };
var setWidthAndDeltaW = function (width, deltaW, minWidth) {
    var expectedWidth = width + deltaW;
    if (expectedWidth > minWidth) {
        width = expectedWidth;
    }
    else {
        deltaW = minWidth - width;
        width = minWidth;
    }
    return { width: width, deltaW: deltaW };
};
var setHeightAndDeltaH = function (height, deltaH, minHeight) {
    var expectedHeight = height + deltaH;
    if (expectedHeight > minHeight) {
        height = expectedHeight;
    }
    else {
        deltaH = minHeight - height;
        height = minHeight;
    }
    return { height: height, deltaH: deltaH };
};
var getNewStyle = function (type, rect, deltaW, deltaH, ratio, minWidth, minHeight) {
    var width = rect.width, height = rect.height, centerX = rect.centerX, centerY = rect.centerY, rotateAngle = rect.rotateAngle;
    var widthFlag = width < 0 ? -1 : 1;
    var heightFlag = height < 0 ? -1 : 1;
    width = Math.abs(width);
    height = Math.abs(height);
    switch (type) {
        case 'r': {
            var widthAndDeltaW = setWidthAndDeltaW(width, deltaW, minWidth);
            width = widthAndDeltaW.width;
            deltaW = widthAndDeltaW.deltaW;
            if (ratio) {
                deltaH = deltaW / ratio;
                height = width / ratio;
                centerX += deltaW / 2 * cos(rotateAngle) - deltaH / 2 * sin(rotateAngle);
                centerY += deltaW / 2 * sin(rotateAngle) + deltaH / 2 * cos(rotateAngle);
            }
            else {
                centerX += deltaW / 2 * cos(rotateAngle);
                centerY += deltaW / 2 * sin(rotateAngle);
            }
            break;
        }
        case 'tr': {
            deltaH = -deltaH;
            var widthAndDeltaW = setWidthAndDeltaW(width, deltaW, minWidth);
            width = widthAndDeltaW.width;
            deltaW = widthAndDeltaW.deltaW;
            var heightAndDeltaH = setHeightAndDeltaH(height, deltaH, minHeight);
            height = heightAndDeltaH.height;
            deltaH = heightAndDeltaH.deltaH;
            if (ratio) {
                deltaW = deltaH * ratio;
                width = height * ratio;
            }
            centerX += deltaW / 2 * cos(rotateAngle) + deltaH / 2 * sin(rotateAngle);
            centerY += deltaW / 2 * sin(rotateAngle) - deltaH / 2 * cos(rotateAngle);
            break;
        }
        case 'br': {
            var widthAndDeltaW = setWidthAndDeltaW(width, deltaW, minWidth);
            width = widthAndDeltaW.width;
            deltaW = widthAndDeltaW.deltaW;
            var heightAndDeltaH = setHeightAndDeltaH(height, deltaH, minHeight);
            height = heightAndDeltaH.height;
            deltaH = heightAndDeltaH.deltaH;
            if (ratio) {
                deltaW = deltaH * ratio;
                width = height * ratio;
            }
            centerX += deltaW / 2 * cos(rotateAngle) - deltaH / 2 * sin(rotateAngle);
            centerY += deltaW / 2 * sin(rotateAngle) + deltaH / 2 * cos(rotateAngle);
            break;
        }
        case 'b': {
            var heightAndDeltaH = setHeightAndDeltaH(height, deltaH, minHeight);
            height = heightAndDeltaH.height;
            deltaH = heightAndDeltaH.deltaH;
            if (ratio) {
                deltaW = deltaH * ratio;
                width = height * ratio;
                centerX += deltaW / 2 * cos(rotateAngle) - deltaH / 2 * sin(rotateAngle);
                centerY += deltaW / 2 * sin(rotateAngle) + deltaH / 2 * cos(rotateAngle);
            }
            else {
                centerX -= deltaH / 2 * sin(rotateAngle);
                centerY += deltaH / 2 * cos(rotateAngle);
            }
            break;
        }
        case 'bl': {
            deltaW = -deltaW;
            var widthAndDeltaW = setWidthAndDeltaW(width, deltaW, minWidth);
            width = widthAndDeltaW.width;
            deltaW = widthAndDeltaW.deltaW;
            var heightAndDeltaH = setHeightAndDeltaH(height, deltaH, minHeight);
            height = heightAndDeltaH.height;
            deltaH = heightAndDeltaH.deltaH;
            if (ratio) {
                height = width / ratio;
                deltaH = deltaW / ratio;
            }
            centerX -= deltaW / 2 * cos(rotateAngle) + deltaH / 2 * sin(rotateAngle);
            centerY -= deltaW / 2 * sin(rotateAngle) - deltaH / 2 * cos(rotateAngle);
            break;
        }
        case 'l': {
            deltaW = -deltaW;
            var widthAndDeltaW = setWidthAndDeltaW(width, deltaW, minWidth);
            width = widthAndDeltaW.width;
            deltaW = widthAndDeltaW.deltaW;
            if (ratio) {
                height = width / ratio;
                deltaH = deltaW / ratio;
                centerX -= deltaW / 2 * cos(rotateAngle) + deltaH / 2 * sin(rotateAngle);
                centerY -= deltaW / 2 * sin(rotateAngle) - deltaH / 2 * cos(rotateAngle);
            }
            else {
                centerX -= deltaW / 2 * cos(rotateAngle);
                centerY -= deltaW / 2 * sin(rotateAngle);
            }
            break;
        }
        case 'tl': {
            deltaW = -deltaW;
            deltaH = -deltaH;
            var widthAndDeltaW = setWidthAndDeltaW(width, deltaW, minWidth);
            width = widthAndDeltaW.width;
            deltaW = widthAndDeltaW.deltaW;
            var heightAndDeltaH = setHeightAndDeltaH(height, deltaH, minHeight);
            height = heightAndDeltaH.height;
            deltaH = heightAndDeltaH.deltaH;
            if (ratio) {
                width = height * ratio;
                deltaW = deltaH * ratio;
            }
            centerX -= deltaW / 2 * cos(rotateAngle) - deltaH / 2 * sin(rotateAngle);
            centerY -= deltaW / 2 * sin(rotateAngle) + deltaH / 2 * cos(rotateAngle);
            break;
        }
        case 't': {
            deltaH = -deltaH;
            var heightAndDeltaH = setHeightAndDeltaH(height, deltaH, minHeight);
            height = heightAndDeltaH.height;
            deltaH = heightAndDeltaH.deltaH;
            if (ratio) {
                width = height * ratio;
                deltaW = deltaH * ratio;
                centerX += deltaW / 2 * cos(rotateAngle) + deltaH / 2 * sin(rotateAngle);
                centerY += deltaW / 2 * sin(rotateAngle) - deltaH / 2 * cos(rotateAngle);
            }
            else {
                centerX += deltaH / 2 * sin(rotateAngle);
                centerY -= deltaH / 2 * cos(rotateAngle);
            }
            break;
        }
    }
    return {
        position: {
            centerX: centerX,
            centerY: centerY
        },
        size: {
            width: width * widthFlag,
            height: height * heightFlag
        }
    };
};
var cursorStartMap = { n: 0, ne: 1, e: 2, se: 3, s: 4, sw: 5, w: 6, nw: 7 };
var cursorDirectionArray = ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw'];
var cursorMap = { 0: 0, 1: 1, 2: 2, 3: 2, 4: 3, 5: 4, 6: 4, 7: 5, 8: 6, 9: 6, 10: 7, 11: 8 };
var getCursor = function (rotateAngle, d) {
    var increment = cursorMap[Math.floor(rotateAngle / 30)];
    var index = cursorStartMap[d];
    var newIndex = (index + increment) % 8;
    return cursorDirectionArray[newIndex];
};
var centerToTL = function (_a) {
    var centerX = _a.centerX, centerY = _a.centerY, width = _a.width, height = _a.height, rotateAngle = _a.rotateAngle;
    return ({
        top: centerY - height / 2,
        left: centerX - width / 2,
        width: width,
        height: height,
        rotateAngle: rotateAngle
    });
};
var tLToCenter = function (_a) {
    var top = _a.top, left = _a.left, width = _a.width, height = _a.height, rotateAngle = _a.rotateAngle;
    return ({
        position: {
            centerX: left + width / 2,
            centerY: top + height / 2
        },
        size: {
            width: width,
            height: height
        },
        transform: {
            rotateAngle: rotateAngle
        }
    });
};

var StyledRect = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: absolute;\n  border: 1px solid #eb5648;\n\n  .square {\n    position: absolute;\n    width: 7px;\n    height: 7px;\n    background: white;\n    border: 1px solid #eb5648;\n    border-radius: 1px;\n  }\n\n  .resizable-handler {\n    position: absolute;\n    width: 14px;\n    height: 14px;\n    cursor: pointer;\n    z-index: 1;\n\n    &.tl,\n    &.t,\n    &.tr {\n      top: -7px;\n    }\n\n    &.tl,\n    &.l,\n    &.bl {\n      left: -7px;\n    }\n\n    &.bl,\n    &.b,\n    &.br {\n      bottom: -7px;\n    }\n\n    &.br,\n    &.r,\n    &.tr {\n      right: -7px;\n    }\n\n    &.l,\n    &.r {\n      margin-top: -7px;\n    }\n\n    &.t,\n    &.b {\n      margin-left: -7px;\n    }\n  }\n\n  .rotate {\n    position: absolute;\n    left: 50%;\n    top: -26px;\n    width: 18px;\n    height: 18px;\n    margin-left: -9px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    cursor: pointer;\n  }\n\n  .t,\n  .tl,\n  .tr {\n    top: -3px;\n  }\n\n  .b,\n  .bl,\n  .br {\n    bottom: -3px;\n  }\n\n  .r,\n  .tr,\n  .br {\n    right: -3px;\n  }\n\n  .tl,\n  .l,\n  .bl {\n    left: -3px;\n  }\n\n  .l,\n  .r {\n    top: 50%;\n    margin-top: -3px;\n  }\n\n  .t,\n  .b {\n    left: 50%;\n    margin-left: -3px;\n  }\n"], ["\n  position: absolute;\n  border: 1px solid #eb5648;\n\n  .square {\n    position: absolute;\n    width: 7px;\n    height: 7px;\n    background: white;\n    border: 1px solid #eb5648;\n    border-radius: 1px;\n  }\n\n  .resizable-handler {\n    position: absolute;\n    width: 14px;\n    height: 14px;\n    cursor: pointer;\n    z-index: 1;\n\n    &.tl,\n    &.t,\n    &.tr {\n      top: -7px;\n    }\n\n    &.tl,\n    &.l,\n    &.bl {\n      left: -7px;\n    }\n\n    &.bl,\n    &.b,\n    &.br {\n      bottom: -7px;\n    }\n\n    &.br,\n    &.r,\n    &.tr {\n      right: -7px;\n    }\n\n    &.l,\n    &.r {\n      margin-top: -7px;\n    }\n\n    &.t,\n    &.b {\n      margin-left: -7px;\n    }\n  }\n\n  .rotate {\n    position: absolute;\n    left: 50%;\n    top: -26px;\n    width: 18px;\n    height: 18px;\n    margin-left: -9px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    cursor: pointer;\n  }\n\n  .t,\n  .tl,\n  .tr {\n    top: -3px;\n  }\n\n  .b,\n  .bl,\n  .br {\n    bottom: -3px;\n  }\n\n  .r,\n  .tr,\n  .br {\n    right: -3px;\n  }\n\n  .tl,\n  .l,\n  .bl {\n    left: -3px;\n  }\n\n  .l,\n  .r {\n    top: 50%;\n    margin-top: -3px;\n  }\n\n  .t,\n  .b {\n    left: 50%;\n    margin-left: -3px;\n  }\n"])));
var templateObject_1;

var zoomableMap = {
    'n': 't',
    's': 'b',
    'e': 'r',
    'w': 'l',
    'ne': 'tr',
    'nw': 'tl',
    'se': 'br',
    'sw': 'bl'
};
var Rect = function (_a) {
    var styles = _a.styles, zoomable = _a.zoomable, rotatable = _a.rotatable, onResizeStart = _a.onResizeStart, onResize = _a.onResize, onResizeEnd = _a.onResizeEnd, onRotateStart = _a.onRotateStart, onRotate = _a.onRotate, onRotateEnd = _a.onRotateEnd, onDragStart = _a.onDragStart, onDrag = _a.onDrag, onDragEnd = _a.onDragEnd, parentRotateAngle = _a.parentRotateAngle;
    var elementRef = React.useRef(null);
    var _b = React.useState(false), isMouseDown = _b[0], setIsMouseDown = _b[1];
    // Drag
    var startDrag = function (e) {
        var startX = e.clientX, startY = e.clientY;
        onDragStart && onDragStart();
        setIsMouseDown(true);
        var onMove = function (e) {
            if (!isMouseDown)
                return;
            e.stopImmediatePropagation();
            var clientX = e.clientX, clientY = e.clientY;
            var deltaX = clientX - startX;
            var deltaY = clientY - startY;
            onDrag && onDrag(deltaX, deltaY);
            startX = clientX;
            startY = clientY;
        };
        var onUp = function () {
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseup', onUp);
            if (!isMouseDown)
                return;
            setIsMouseDown(false);
            onDragEnd && onDragEnd();
        };
        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onUp);
    };
    // Rotate
    var startRotate = function (e) {
        if (e.button !== 0)
            return;
        var clientX = e.clientX, clientY = e.clientY;
        var startAngle = styles.transform.rotateAngle;
        if (!elementRef.current)
            return;
        var rect = elementRef.current.getBoundingClientRect();
        var center = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
        };
        var startVector = {
            x: clientX - center.x,
            y: clientY - center.y
        };
        onRotateStart && onRotateStart();
        setIsMouseDown(true);
        var onMove = function (e) {
            if (!isMouseDown)
                return;
            e.stopImmediatePropagation();
            var clientX = e.clientX, clientY = e.clientY;
            var rotateVector = {
                x: clientX - center.x,
                y: clientY - center.y
            };
            var angle = getAngle(startVector, rotateVector);
            onRotate && onRotate(angle, startAngle);
        };
        var onUp = function () {
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseup', onUp);
            if (!isMouseDown)
                return;
            setIsMouseDown(false);
            onRotateEnd && onRotateEnd();
        };
        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onUp);
    };
    // Resize
    var startResize = function (e, cursor) {
        if (e.button !== 0)
            return;
        document.body.style.cursor = cursor;
        var _a = styles.position, centerX = _a.centerX, centerY = _a.centerY, _b = styles.size, width = _b.width, height = _b.height, rotateAngle = styles.transform.rotateAngle;
        var startX = e.clientX, startY = e.clientY;
        var rect = { width: width, height: height, centerX: centerX, centerY: centerY, rotateAngle: rotateAngle };
        var type = e.target.getAttribute('class').split(' ')[0];
        onResizeStart && onResizeStart();
        setIsMouseDown(true);
        var onMove = function (e) {
            if (!isMouseDown)
                return;
            e.stopImmediatePropagation();
            var clientX = e.clientX, clientY = e.clientY;
            var deltaX = clientX - startX;
            var deltaY = clientY - startY;
            var alpha = Math.atan2(deltaY, deltaX);
            var deltaL = getLength(deltaX, deltaY);
            var isShiftKey = e.shiftKey;
            onResize && onResize(deltaL, alpha, rect, type, isShiftKey);
        };
        var onUp = function () {
            document.body.style.cursor = 'auto';
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseup', onUp);
            if (!isMouseDown)
                return;
            setIsMouseDown(false);
            onResizeEnd && onResizeEnd();
        };
        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onUp);
    };
    var _c = styles.position, centerX = _c.centerX, centerY = _c.centerY, _d = styles.size, width = _d.width, height = _d.height, rotateAngle = styles.transform.rotateAngle;
    var style = {
        width: Math.abs(width),
        height: Math.abs(height),
        transform: "rotate(".concat(rotateAngle, "deg)"),
        left: centerX - Math.abs(width) / 2,
        top: centerY - Math.abs(height) / 2
    };
    var direction = zoomable.split(',').map(function (d) { return d.trim(); }).filter(function (d) { return d; });
    return (React.createElement(StyledRect, { ref: elementRef, onMouseDown: startDrag, className: "rect single-resizer", style: style },
        rotatable &&
            React.createElement("div", { className: "rotate", onMouseDown: startRotate },
                React.createElement("svg", { width: "14", height: "14", xmlns: "http://www.w3.org/2000/svg" },
                    React.createElement("path", { d: "M10.536 3.464A5 5 0 1 0 11 10l1.424 1.425a7 7 0 1 1-.475-9.374L13.659.34A.2.2 0 0 1 14 .483V5.5a.5.5 0 0 1-.5.5H8.483a.2.2 0 0 1-.142-.341l2.195-2.195z", fill: "#eb5648", fillRule: "nonzero" }))),
        direction.map(function (d) {
            var cursor = "".concat(getCursor(rotateAngle + parentRotateAngle, d), "-resize");
            return (React.createElement("div", { key: d, style: { cursor: cursor }, className: "".concat(zoomableMap[d], " resizable-handler"), onMouseDown: function (e) { return startResize(e, cursor); } }));
        }),
        direction.map(function (d) {
            return (React.createElement("div", { key: d, className: "".concat(zoomableMap[d], " square") }));
        })));
};

var ResizableRect = function (_a) {
    var left = _a.left, top = _a.top, width = _a.width, height = _a.height, _b = _a.rotatable, rotatable = _b === void 0 ? true : _b, _c = _a.rotateAngle, rotateAngle = _c === void 0 ? 0 : _c, _d = _a.parentRotateAngle, parentRotateAngle = _d === void 0 ? 0 : _d, _e = _a.zoomable, zoomable = _e === void 0 ? '' : _e, _f = _a.minWidth, minWidth = _f === void 0 ? 10 : _f, _g = _a.minHeight, minHeight = _g === void 0 ? 10 : _g, aspectRatio = _a.aspectRatio, onRotateStart = _a.onRotateStart, onRotate = _a.onRotate, onRotateEnd = _a.onRotateEnd, onResizeStart = _a.onResizeStart, onResize = _a.onResize, onResizeEnd = _a.onResizeEnd, onDragStart = _a.onDragStart, onDrag = _a.onDrag, onDragEnd = _a.onDragEnd;
    var handleRotate = function (angle, startAngle) {
        if (!onRotate)
            return;
        var rotateAngle = Math.round(startAngle + angle);
        if (rotateAngle >= 360) {
            rotateAngle -= 360;
        }
        else if (rotateAngle < 0) {
            rotateAngle += 360;
        }
        if (rotateAngle > 356 || rotateAngle < 4) {
            rotateAngle = 0;
        }
        else if (rotateAngle > 86 && rotateAngle < 94) {
            rotateAngle = 90;
        }
        else if (rotateAngle > 176 && rotateAngle < 184) {
            rotateAngle = 180;
        }
        else if (rotateAngle > 266 && rotateAngle < 274) {
            rotateAngle = 270;
        }
        onRotate(rotateAngle);
    };
    var handleResize = function (length, alpha, rect, type, isShiftKey) {
        if (!onResize)
            return;
        var beta = alpha - degToRadian(rotateAngle + parentRotateAngle);
        var deltaW = length * Math.cos(beta);
        var deltaH = length * Math.sin(beta);
        var ratio = (isShiftKey && !aspectRatio ? rect.width / rect.height : aspectRatio);
        var _a = getNewStyle(type, __assign(__assign({}, rect), { rotateAngle: rotateAngle }), deltaW, deltaH, ratio, minWidth, minHeight), _b = _a.position, centerX = _b.centerX, centerY = _b.centerY, _c = _a.size, width = _c.width, height = _c.height;
        onResize(centerToTL({ centerX: centerX, centerY: centerY, width: width, height: height, rotateAngle: rotateAngle }), isShiftKey, type);
    };
    var handleDrag = function (deltaX, deltaY) {
        onDrag && onDrag(deltaX, deltaY);
    };
    var styles = tLToCenter({ top: top, left: left, width: width, height: height, rotateAngle: rotateAngle });
    return (React.createElement(Rect, { styles: styles, zoomable: zoomable, rotatable: Boolean(rotatable && onRotate), parentRotateAngle: parentRotateAngle, onResizeStart: onResizeStart, onResize: handleResize, onResizeEnd: onResizeEnd, onRotateStart: onRotateStart, onRotate: handleRotate, onRotateEnd: onRotateEnd, onDragStart: onDragStart, onDrag: handleDrag, onDragEnd: onDragEnd }));
};

module.exports = ResizableRect;
//# sourceMappingURL=index.js.map
