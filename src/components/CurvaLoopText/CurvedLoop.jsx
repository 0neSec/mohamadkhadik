import { useRef, useEffect, useState, useMemo, useId } from 'react';

const CurvedLoop = ({
  marqueeText = '',
  speed = 2,
  className,
  curveAmount = 510,
  direction = 'left',
  interactive = true,
  height = 'medium',
  repeatCount = 4,
}) => {
  const text = useMemo(() => {
    const hasTrailing = /\s|\u00A0$/.test(marqueeText);
    return (hasTrailing ? marqueeText.replace(/\s+$/, '') : marqueeText) + '\u00A0';
  }, [marqueeText]);

  const measureRef = useRef(null);
  const textPathRef = useRef(null);
  const pathRef = useRef(null);
  const [spacing, setSpacing] = useState(0);
  const [offset, setOffset] = useState(0);
  const uid = useId();
  const pathId = `curve-${uid}`;
  
  const startY = 90;
  const endY = 90;
  const controlY = startY + curveAmount;
  
  const pathD = curveAmount === 0 
    ? `M-100,${startY} L1540,${endY}`
    : `M-100,${startY} Q720,${controlY} 1540,${endY}`;

  const dragRef = useRef(false);
  const lastXRef = useRef(0);
  const dirRef = useRef(direction);
  const velRef = useRef(0);

  const textLength = spacing;
  const totalText = textLength
    ? Array(repeatCount)
        .fill(text)
        .join('')
    : text;
  const ready = spacing > 0;

  const heightConfig = {
    small: { 
      viewBox: "0 0 1440 170",
      svgClass: "h-20 md:h-24" 
    },
    medium: { 
      viewBox: "0 0 1440 250",
      svgClass: "h-28 md:h-36" 
    },
    large: { 
      viewBox: "0 0 1440 330",
      svgClass: "h-36 md:h-52" 
    }
  };

  const { viewBox, svgClass } = heightConfig[height] || heightConfig.medium;

  useEffect(() => {
    if (measureRef.current) {
      const length = measureRef.current.getComputedTextLength();
      setSpacing(length);
    }
  }, [text, className]);

  useEffect(() => {
    if (!spacing) return;
    if (textPathRef.current) {
      const initial = -spacing;
      textPathRef.current.setAttribute('startOffset', initial + 'px');
      setOffset(initial);
    }
  }, [spacing]);

  useEffect(() => {
    if (!spacing || !ready) return;
    
    let frame = 0;
    let lastTime = 0;
    
    const animate = (currentTime) => {
      if (!lastTime) lastTime = currentTime;
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;
      
      if (!dragRef.current && textPathRef.current) {
        const delta = (dirRef.current === 'right' ? speed : -speed) * (deltaTime / 16);
        const currentOffset = parseFloat(textPathRef.current.getAttribute('startOffset') || '0');
        let newOffset = currentOffset + delta;
        
        if (newOffset <= -spacing) newOffset += spacing;
        if (newOffset > 0) newOffset -= spacing;
        
        textPathRef.current.setAttribute('startOffset', newOffset + 'px');
        setOffset(newOffset);
      }
      
      frame = requestAnimationFrame(animate);
    };
    
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [spacing, speed, ready]);

  const onPointerDown = e => {
    if (!interactive) return;
    dragRef.current = true;
    lastXRef.current = e.clientX;
    velRef.current = 0;
    e.target.setPointerCapture(e.pointerId);
    e.preventDefault();
  };

  const onPointerMove = e => {
    if (!interactive || !dragRef.current || !textPathRef.current) return;
    
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    velRef.current = dx * 0.5;
    
    const currentOffset = parseFloat(textPathRef.current.getAttribute('startOffset') || '0');
    let newOffset = currentOffset + dx;
    
    if (newOffset <= -spacing) newOffset += spacing;
    if (newOffset > 0) newOffset -= spacing;
    
    textPathRef.current.setAttribute('startOffset', newOffset + 'px');
    setOffset(newOffset);
  };

  const endDrag = () => {
    if (!interactive) return;
    dragRef.current = false;
    
    if (Math.abs(velRef.current) > 0.1) {
      dirRef.current = velRef.current > 0 ? 'right' : 'left';
    }
  };

  const cursorStyle = interactive ? (dragRef.current ? 'grabbing' : 'grab') : 'auto';

  return (
    <div
      className={`relative ${svgClass} w-full flex items-center justify-center z-50`} // z-50 sudah ada di sini
      style={{ 
        visibility: ready ? 'visible' : 'hidden', 
        cursor: cursorStyle,
        userSelect: 'none',
        position: 'relative',
        zIndex: 50 // Tambahkan juga style inline untuk memastikan
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
    >
      <svg
        className="select-none w-full overflow-visible block"
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid meet"
        style={{ position: 'relative', zIndex: 50 }}
      >
        {/* Hidden text for measurement */}
        <text 
          ref={measureRef} 
          xmlSpace="preserve" 
          className={`fill-white ${className ?? ''}`}
          style={{ 
            visibility: 'hidden', 
            opacity: 0, 
            pointerEvents: 'none',
            position: 'absolute' 
          }}
        >
          {text}
        </text>
        
        {/* Definition for the path */}
        <defs>
          <path 
            ref={pathRef} 
            id={pathId} 
            d={pathD} 
            fill="none" 
            stroke="transparent" 
          />
        </defs>
        
        {/* Visible animated text */}
        {ready && (
          <text 
            xmlSpace="preserve" 
            className={`fill-white ${className ?? ''} select-none`}
            style={{ zIndex: 50 }}
          >
            <textPath 
              ref={textPathRef}
              href={`#${pathId}`}
              startOffset={offset + 'px'}
              xmlSpace="preserve"
              className="select-none"
            >
              {totalText}
            </textPath>
          </text>
        )}
        
        {/* Optional: Add a subtle glow effect */}
        {ready && (
          <text 
            xmlSpace="preserve" 
            className={`fill-white/20 ${className ?? ''} select-none blur-[2px]`}
            style={{ zIndex: 49 }}
          >
            <textPath 
              href={`#${pathId}`}
              startOffset={(offset + 5) + 'px'}
              xmlSpace="preserve"
              className="select-none"
            >
              {totalText}
            </textPath>
          </text>
        )}
      </svg>
    </div>
  );
};

export default CurvedLoop;