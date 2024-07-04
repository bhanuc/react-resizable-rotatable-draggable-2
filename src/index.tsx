import React from 'react';
import Rect from './Rect';
import { centerToTL, tLToCenter, getNewStyle, degToRadian } from './utils';

interface ResizableRectProps {
  left: number;
  top: number;
  width: number;
  height: number;
  rotatable?: boolean;
  rotateAngle?: number;
  parentRotateAngle?: number;
  zoomable?: string;
  minWidth?: number;
  minHeight?: number;
  aspectRatio?: number | boolean;
  onRotateStart?: () => void;
  onRotate?: (rotateAngle: number) => void;
  onRotateEnd?: () => void;
  onResizeStart?: () => void;
  onResize?: (style: any, isShiftKey: boolean, type: string) => void;
  onResizeEnd?: () => void;
  onDragStart?: () => void;
  onDrag?: (deltaX: number, deltaY: number) => void;
  onDragEnd?: () => void;
}

const ResizableRect: React.FC<ResizableRectProps> = ({
  left,
  top,
  width,
  height,
  rotatable = true,
  rotateAngle = 0,
  parentRotateAngle = 0,
  zoomable = '',
  minWidth = 10,
  minHeight = 10,
  aspectRatio,
  onRotateStart,
  onRotate,
  onRotateEnd,
  onResizeStart,
  onResize,
  onResizeEnd,
  onDragStart,
  onDrag,
  onDragEnd
}) => {

  const handleRotate = (angle: number, startAngle: number) => {
    if (!onRotate) return;
    let rotateAngle = Math.round(startAngle + angle);
    if (rotateAngle >= 360) {
      rotateAngle -= 360;
    } else if (rotateAngle < 0) {
      rotateAngle += 360;
    }
    if (rotateAngle > 356 || rotateAngle < 4) {
      rotateAngle = 0;
    } else if (rotateAngle > 86 && rotateAngle < 94) {
      rotateAngle = 90;
    } else if (rotateAngle > 176 && rotateAngle < 184) {
      rotateAngle = 180;
    } else if (rotateAngle > 266 && rotateAngle < 274) {
      rotateAngle = 270;
    }
    onRotate(rotateAngle);
  };

  const handleResize = (length: number, alpha: number, rect: any, type: string, isShiftKey: boolean) => {
    if (!onResize) return;
    const beta = alpha - degToRadian(rotateAngle + parentRotateAngle);
    const deltaW = length * Math.cos(beta);
    const deltaH = length * Math.sin(beta);
    const ratio = (isShiftKey && !aspectRatio ? rect.width / rect.height : aspectRatio as number);
    const {
      position: { centerX, centerY },
      size: { width, height }
    } = getNewStyle(type, { ...rect, rotateAngle }, deltaW, deltaH, ratio, minWidth, minHeight);

    onResize(centerToTL({ centerX, centerY, width, height, rotateAngle }), isShiftKey, type);
  };

  const handleDrag = (deltaX: number, deltaY: number) => {
    onDrag && onDrag(deltaX, deltaY);
  };

  const styles = tLToCenter({ top, left, width, height, rotateAngle });

  return (
    <Rect
      styles={styles}
      zoomable={zoomable}
      rotatable={Boolean(rotatable && onRotate)}
      parentRotateAngle={parentRotateAngle}

      onResizeStart={onResizeStart}
      onResize={handleResize}
      onResizeEnd={onResizeEnd}

      onRotateStart={onRotateStart}
      onRotate={handleRotate}
      onRotateEnd={onRotateEnd}

      onDragStart={onDragStart}
      onDrag={handleDrag}
      onDragEnd={onDragEnd}
    />
  );
};

export default ResizableRect;
