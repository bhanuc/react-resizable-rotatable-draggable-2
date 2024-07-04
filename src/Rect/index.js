// import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { getLength, getAngle, getCursor } from '../utils'
import StyledRect from './StyledRect'

const zoomableMap = {
  'n': 't',
  's': 'b',
  'e': 'r',
  'w': 'l',
  'ne': 'tr',
  'nw': 'tl',
  'se': 'br',
  'sw': 'bl'
}



const Rect = ({
  styles,
  zoomable,
  rotatable,
  onResizeStart,
  onResize,
  onResizeEnd,
  onRotateStart,
  onRotate,
  onRotateEnd,
  onDragStart,
  onDrag,
  onDragEnd,
  parentRotateAngle
}) => {
  const elementRef = useRef(null);
  const [isMouseDown, setIsMouseDown] = useState(false);

  // Drag
  const startDrag = (e) => {
    let { clientX: startX, clientY: startY } = e;
    onDragStart && onDragStart();
    setIsMouseDown(true);

    const onMove = (e) => {
      if (!isMouseDown) return;
      e.stopImmediatePropagation();
      const { clientX, clientY } = e;
      const deltaX = clientX - startX;
      const deltaY = clientY - startY;
      onDrag(deltaX, deltaY);
      startX = clientX;
      startY = clientY;
    };

    const onUp = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      if (!isMouseDown) return;
      setIsMouseDown(false);
      onDragEnd && onDragEnd();
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  };

  // Rotate
  const startRotate = (e) => {
    if (e.button !== 0) return;
    const { clientX, clientY } = e;
    const { transform: { rotateAngle: startAngle } } = styles;
    const rect = elementRef.current.getBoundingClientRect();
    const center = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };
    const startVector = {
      x: clientX - center.x,
      y: clientY - center.y
    };
    onRotateStart && onRotateStart();
    setIsMouseDown(true);

    const onMove = (e) => {
      if (!isMouseDown) return;
      e.stopImmediatePropagation();
      const { clientX, clientY } = e;
      const rotateVector = {
        x: clientX - center.x,
        y: clientY - center.y
      };
      const angle = getAngle(startVector, rotateVector);
      onRotate(angle, startAngle);
    };

    const onUp = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      if (!isMouseDown) return;
      setIsMouseDown(false);
      onRotateEnd && onRotateEnd();
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  };

  // Resize
  const startResize = (e, cursor) => {
    if (e.button !== 0) return;
    document.body.style.cursor = cursor;
    const { position: { centerX, centerY }, size: { width, height }, transform: { rotateAngle } } = styles;
    const { clientX: startX, clientY: startY } = e;
    const rect = { width, height, centerX, centerY, rotateAngle };
    const type = e.target.getAttribute('class').split(' ')[0];
    onResizeStart && onResizeStart();
    setIsMouseDown(true);

    const onMove = (e) => {
      if (!isMouseDown) return;
      e.stopImmediatePropagation();
      const { clientX, clientY } = e;
      const deltaX = clientX - startX;
      const deltaY = clientY - startY;
      const alpha = Math.atan2(deltaY, deltaX);
      const deltaL = getLength(deltaX, deltaY);
      const isShiftKey = e.shiftKey;
      onResize(deltaL, alpha, rect, type, isShiftKey);
    };

    const onUp = () => {
      document.body.style.cursor = 'auto';
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      if (!isMouseDown) return;
      setIsMouseDown(false);
      onResizeEnd && onResizeEnd();
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  };

  const {
    position: { centerX, centerY },
    size: { width, height },
    transform: { rotateAngle }
  } = styles;
  const style = {
    width: Math.abs(width),
    height: Math.abs(height),
    transform: `rotate(${rotateAngle}deg)`,
    left: centerX - Math.abs(width) / 2,
    top: centerY - Math.abs(height) / 2
  };
  const direction = zoomable.split(',').map(d => d.trim()).filter(d => d);

  return (
    <StyledRect
      ref={elementRef}
      onMouseDown={startDrag}
      className="rect single-resizer"
      style={style}
    >
      {
        rotatable &&
        <div className="rotate" onMouseDown={startRotate}>
          <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.536 3.464A5 5 0 1 0 11 10l1.424 1.425a7 7 0 1 1-.475-9.374L13.659.34A.2.2 0 0 1 14 .483V5.5a.5.5 0 0 1-.5.5H8.483a.2.2 0 0 1-.142-.341l2.195-2.195z"
              fill="#eb5648"
              fillRule="nonzero"
            />
          </svg>
        </div>
      }
      {
        direction.map(d => {
          const cursor = `${getCursor(rotateAngle + parentRotateAngle, d)}-resize`;
          return (
            <div key={d} style={{ cursor }} className={`${zoomableMap[d]} resizable-handler`} onMouseDown={(e) => startResize(e, cursor)} />
          );
        })
      }
      {
        direction.map(d => {
          return (
            <div key={d} className={`${zoomableMap[d]} square`} />
          );
        })
      }
    </StyledRect>
  );
};


export default Rect;

