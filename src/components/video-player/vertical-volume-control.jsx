import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const VerticalVolumeControl = ({ currentVolume, handleCurrentVolume }) => {
  
  const [grabbing, setGrabbing] = useState(false);
  
  const barRef = useRef(null);

  const handleVolumeChange = (e) => {
    const bar = barRef.current;
    const rect = bar.getBoundingClientRect();
    const newVolume = 100 - Math.min(Math.max(0, e.clientY - rect.top), rect.height) / rect.height * 100;
    handleCurrentVolume(newVolume, 'vertical dragging');
  };

  const handleDrag = (e) => {
    setGrabbing(true);
    handleVolumeChange(e);
  };
  
  const handleMouseUp = () => {
    setGrabbing(false);
    document.removeEventListener('mousemove', handleDrag);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleMouseDown = (e) => {
    handleVolumeChange(e);
    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', handleMouseUp);
  };

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleDrag);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div className='absolute bottom-100 p-5 centering-overlay-volume-div' onMouseLeave={handleMouseUp}>
      <div
        ref={barRef}
        style={{
          width: '25px',
          height: '150px',
          position: 'relative',
          cursor: grabbing ? 'grabbing' : 'grab'
        }}
        className='bg-gray-200'
        onMouseDown={handleMouseDown}
      >
        <div
          style={{
            width: '100%',
            height: `${currentVolume}%`,
            position: 'absolute',
            bottom: 0,
            left: 0,
          }}
          className={`bg-primary ${currentVolume == 0 || currentVolume == 100 ? '' : 'border-top-2 border-primary'}`}
          initial={{ height: 0 }}
          animate={{ height: `${currentVolume}%` }}
          transition={{ type: 'tween' }}
        />
      </div>
    </div>
  );
};