export const getLength = (x: number, y: number): number => Math.sqrt(x * x + y * y);

interface Vector {
  x: number;
  y: number;
}

export const getAngle = ({ x: x1, y: y1 }: Vector, { x: x2, y: y2 }: Vector): number => {
  const dot = x1 * x2 + y1 * y2;
  const det = x1 * y2 - y1 * x2;
  const angle = Math.atan2(det, dot) / Math.PI * 180;
  return (angle + 360) % 360;
}

export const degToRadian = (deg: number): number => deg * Math.PI / 180;

const cos = (deg: number): number => Math.cos(degToRadian(deg));
const sin = (deg: number): number => Math.sin(degToRadian(deg));

interface Dimension {
  width: number;
  deltaW: number;
}

interface DimensionHeight {
  height: number;
  deltaH: number;
}

const setWidthAndDeltaW = (width: number, deltaW: number, minWidth: number): Dimension => {
  const expectedWidth = width + deltaW;
  if (expectedWidth > minWidth) {
    width = expectedWidth;
  } else {
    deltaW = minWidth - width;
    width = minWidth;
  }
  return { width, deltaW };
}

const setHeightAndDeltaH = (height: number, deltaH: number, minHeight: number): DimensionHeight => {
  const expectedHeight = height + deltaH;
  if (expectedHeight > minHeight) {
    height = expectedHeight;
  } else {
    deltaH = minHeight - height;
    height = minHeight;
  }
  return { height, deltaH };
}

interface Rect {
  width: number;
  height: number;
  centerX: number;
  centerY: number;
  rotateAngle: number;
}

interface NewStyle {
  position: {
    centerX: number;
    centerY: number;
  };
  size: {
    width: number;
    height: number;
  };
}

export const getNewStyle = (
  type: string,
  rect: Rect,
  deltaW: number,
  deltaH: number,
  ratio: number,
  minWidth: number,
  minHeight: number
): NewStyle => {
  let { width, height, centerX, centerY, rotateAngle } = rect;
  const widthFlag = width < 0 ? -1 : 1;
  const heightFlag = height < 0 ? -1 : 1;
  width = Math.abs(width);
  height = Math.abs(height);
  switch (type) {
    case 'r': {
      const widthAndDeltaW = setWidthAndDeltaW(width, deltaW, minWidth);
      width = widthAndDeltaW.width;
      deltaW = widthAndDeltaW.deltaW;
      if (ratio) {
        deltaH = deltaW / ratio;
        height = width / ratio;
        centerX += deltaW / 2 * cos(rotateAngle) - deltaH / 2 * sin(rotateAngle);
        centerY += deltaW / 2 * sin(rotateAngle) + deltaH / 2 * cos(rotateAngle);
      } else {
        centerX += deltaW / 2 * cos(rotateAngle);
        centerY += deltaW / 2 * sin(rotateAngle);
      }
      break;
    }
    case 'tr': {
      deltaH = -deltaH;
      const widthAndDeltaW = setWidthAndDeltaW(width, deltaW, minWidth);
      width = widthAndDeltaW.width;
      deltaW = widthAndDeltaW.deltaW;
      const heightAndDeltaH = setHeightAndDeltaH(height, deltaH, minHeight);
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
      const widthAndDeltaW = setWidthAndDeltaW(width, deltaW, minWidth);
      width = widthAndDeltaW.width;
      deltaW = widthAndDeltaW.deltaW;
      const heightAndDeltaH = setHeightAndDeltaH(height, deltaH, minHeight);
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
      const heightAndDeltaH = setHeightAndDeltaH(height, deltaH, minHeight);
      height = heightAndDeltaH.height;
      deltaH = heightAndDeltaH.deltaH;
      if (ratio) {
        deltaW = deltaH * ratio;
        width = height * ratio;
        centerX += deltaW / 2 * cos(rotateAngle) - deltaH / 2 * sin(rotateAngle);
        centerY += deltaW / 2 * sin(rotateAngle) + deltaH / 2 * cos(rotateAngle);
      } else {
        centerX -= deltaH / 2 * sin(rotateAngle);
        centerY += deltaH / 2 * cos(rotateAngle);
      }
      break;
    }
    case 'bl': {
      deltaW = -deltaW;
      const widthAndDeltaW = setWidthAndDeltaW(width, deltaW, minWidth);
      width = widthAndDeltaW.width;
      deltaW = widthAndDeltaW.deltaW;
      const heightAndDeltaH = setHeightAndDeltaH(height, deltaH, minHeight);
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
      const widthAndDeltaW = setWidthAndDeltaW(width, deltaW, minWidth);
      width = widthAndDeltaW.width;
      deltaW = widthAndDeltaW.deltaW;
      if (ratio) {
        height = width / ratio;
        deltaH = deltaW / ratio;
        centerX -= deltaW / 2 * cos(rotateAngle) + deltaH / 2 * sin(rotateAngle);
        centerY -= deltaW / 2 * sin(rotateAngle) - deltaH / 2 * cos(rotateAngle);
      } else {
        centerX -= deltaW / 2 * cos(rotateAngle);
        centerY -= deltaW / 2 * sin(rotateAngle);
      }
      break;
    }
    case 'tl': {
      deltaW = -deltaW;
      deltaH = -deltaH;
      const widthAndDeltaW = setWidthAndDeltaW(width, deltaW, minWidth);
      width = widthAndDeltaW.width;
      deltaW = widthAndDeltaW.deltaW;
      const heightAndDeltaH = setHeightAndDeltaH(height, deltaH, minHeight);
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
      const heightAndDeltaH = setHeightAndDeltaH(height, deltaH, minHeight);
      height = heightAndDeltaH.height;
      deltaH = heightAndDeltaH.deltaH;
      if (ratio) {
        width = height * ratio;
        deltaW = deltaH * ratio;
        centerX += deltaW / 2 * cos(rotateAngle) + deltaH / 2 * sin(rotateAngle);
        centerY += deltaW / 2 * sin(rotateAngle) - deltaH / 2 * cos(rotateAngle);
      } else {
        centerX += deltaH / 2 * sin(rotateAngle);
        centerY -= deltaH / 2 * cos(rotateAngle);
      }
      break;
    }
  }

  return {
    position: {
      centerX,
      centerY
    },
    size: {
      width: width * widthFlag,
      height: height * heightFlag
    }
  };
}

const cursorStartMap: Record<string, number> = { n: 0, ne: 1, e: 2, se: 3, s: 4, sw: 5, w: 6, nw: 7 };
const cursorDirectionArray: string[] = ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw'];
const cursorMap: Record<number, number> = { 0: 0, 1: 1, 2: 2, 3: 2, 4: 3, 5: 4, 6: 4, 7: 5, 8: 6, 9: 6, 10: 7, 11: 8 };

export const getCursor = (rotateAngle: number, d: string): string => {
  const increment = cursorMap[Math.floor(rotateAngle / 30)];
  const index = cursorStartMap[d];
  const newIndex = (index + increment) % 8;
  return cursorDirectionArray[newIndex];
}

interface TL {
  centerX: number;
  centerY: number;
  width: number;
  height: number;
  rotateAngle: number;
}

interface Center {
  top: number;
  left: number;
  width: number;
  height: number;
  rotateAngle: number;
}

export const centerToTL = ({ centerX, centerY, width, height, rotateAngle }: TL) => ({
  top: centerY - height / 2,
  left: centerX - width / 2,
  width,
  height,
  rotateAngle
});

export const tLToCenter = ({ top, left, width, height, rotateAngle }: Center) => ({
  position: {
    centerX: left + width / 2,
    centerY: top + height / 2
  },
  size: {
    width,
    height
  },
  transform: {
    rotateAngle
  }
});


