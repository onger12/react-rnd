import { useState, useRef, useEffect } from 'react';

export const ProgressBar = ({ videoRef, handleProgressChange, playSecond }) => {
    const [progress, setProgress] = useState(0);
    const [buffered, setBuffered] = useState(0);
    const progressBarRef = useRef(null);

    // Función para manejar el clic en la barra de progreso
    const handleProgressBarClick = (e) => {
      const rect = progressBarRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newTime = (clickX / rect.width) * videoRef.current.duration;
      const flag = handleProgressChange(newTime);
      // videoRef.current.currentTime = newTime;

      if(flag) {
        setProgress((clickX / rect.width) * 100);
      }
    };

    // Actualiza el progreso y el buffer
    const updateProgress = () => {
      const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(currentProgress);

      // const bufferedRanges = videoRef.current.buffered;
      // if (bufferedRanges.length > 0) {
      //   const bufferedEnd = bufferedRanges.end(bufferedRanges.length - 1);
      //   const bufferedProgress = (bufferedEnd / videoRef.current.duration) * 100;
      //   setBuffered(bufferedProgress);
      // }
    };

    useEffect(() => {
      const videoElement = videoRef.current;
      videoElement.addEventListener('timeupdate', updateProgress);
      videoElement.addEventListener('progress', updateProgress);

      return () => {
        videoElement.removeEventListener('timeupdate', updateProgress);
        videoElement.removeEventListener('progress', updateProgress);
      };
    }, []);

    useEffect(() => {
      if(playSecond != null && !Number.isNaN(playSecond / 1)) {
        setBuffered((playSecond / videoRef.current.duration) * 100);
        setProgress((playSecond / videoRef.current.duration) * 100);
      }
    }, [playSecond]);

    return (
      <div 
        ref={progressBarRef} 
        onClick={handleProgressBarClick} 
        className='relative w-full bg-gray-200 mb-3 cursor-pointer'
        style={{ height : '0.7rem' }}
      >
        <div 
          className='absolute h-full bg-gray-700'
          style={{ width: `${buffered}%` }} 
          />
        <div 
          className='absolute h-full bg-primary'
          style={{ width: `${progress}%` }} 
        />
      </div>
    );
};