import { useEffect, useRef, useState } from 'react';

import { motion } from "framer-motion"

import { Controls } from './';

export const VideoPlayer = ({ currentVideo, handleExpandedView, playingOnMount = false, handleSendLastProgress }) => {

  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(100);
  const [currentRate, setCurrentRate] = useState(1);
  const [isHovering, setIsHovering] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [playing, setPlaying] = useState(playingOnMount);
  const [currentVolume, setCurrentVolume] = useState(70);
  const [mouseInactive, setMouseInactive] = useState(false);
  const [alreadyPlayed, setAlreadyPlayed] = useState(false);

  // refs
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const inactivityTimeout = useRef(null);

  // handlers
  const handleToggleCurrentVolume = (e) => {
    if(e?.target?.className?.includes('icon-volume-identifier')) {
      setCurrentVolume(currentVolume == 0 ? 100 : 0);
    }

  }
  const handleCurrentVolume = (newVolume, fuente) => {
    setCurrentVolume(newVolume);
  };
  const handleForwardTenSecs = () => {
    const video = videoRef.current;
    if(video.currentTime + 10 > currentVideo?.playSecond) return false;
    video.currentTime = Math.min(video.currentTime + 10, videoRef?.current?.duration);
  };
  const handleBackwardTenSecs = () => {
    const video = videoRef.current;
    video.currentTime = Math.max(video.currentTime - 10, 0);
  };
  const handlePlay = () => {
    if(!videoLoaded) {
      return
    }

    if (playing) {
      videoRef.current?.pause();
      setPlaying(false);
    } else {
      videoRef.current?.play();
      setPlaying(true);
      setAlreadyPlayed(true);
    }
  }
  const handleProgressChange = (newProgress) => {
    if(newProgress > currentVideo?.playSecond) return false;

    videoRef.current.currentTime = newProgress;
    return true;
  };
  const handleSpeedChange = (rate) => {
    videoRef.current.playbackRate = rate;
    setCurrentRate(rate);
  }
  const handleFullScreen = () => {
    if (!fullScreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      } else if (containerRef.current.mozRequestFullScreen) {
        containerRef.current.mozRequestFullScreen();
      } else if (containerRef.current.webkitRequestFullscreen) {
        containerRef.current.webkitRequestFullscreen();
      } else if (containerRef.current.msRequestFullscreen) {
        containerRef.current.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  };
  const handleInactivity = () => {
    if(isHovering) {
      setMouseInactive(true);
    }
  };
  const resetInactivityTimer = () => {
    clearTimeout(inactivityTimeout.current);
    if(isHovering) {
      setMouseInactive(false);
    }
    inactivityTimeout.current = setTimeout(() => {
      handleInactivity();
    }, 3000); // 3 segundos de inactividad
  };
  
  // effects
  useEffect(() => {
    videoRef.current.volume = currentVolume != null ? currentVolume / 100 : 0;
  }, [currentVolume]);

  useEffect(() => {
    const handleFullScreenChange = () => {
      setFullScreen(
        document.fullscreenElement === videoRef.current ||
        document.webkitFullscreenElement === videoRef.current ||
        document.mozFullScreenElement === videoRef.current ||
        document.msFullscreenElement === videoRef.current
      );
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullScreenChange);
    document.addEventListener('mozfullscreenchange', handleFullScreenChange);
    document.addEventListener('MSFullscreenChange', handleFullScreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullScreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullScreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullScreenChange);
    };
  }, []);

  useEffect(() => {
    if(!currentVideo) return;
    const handleLoadedMetadata = () => {
      if(currentVideo?.playSecond) {
        videoRef.current.currentTime = currentVideo?.playSecond;
        setCurrentTime(currentVideo?.playSecond)
      }
    };
    const handleTimeUpdate = () => {
      const newProgress = videoRef?.current?.currentTime;
      setCurrentTime(newProgress);
      if(Math.floor(newProgress) % 10 == 0) {
        handleSendLastProgress({ progress : Math.floor(newProgress), videoId : currentVideo?.videoId });
      }
    };
    const handleSeeking = () => {
      setLoading(true);
    };
    const handleSeeked = () => {
      setLoading(false);
    };
    const handleWaiting = () => {
      setLoading(true);
    };
    const handleCanPlay = () => {
      setLoading(false);
      setVideoLoaded(true);
    };

    videoRef?.current?.addEventListener('loadedmetadata', handleLoadedMetadata);
    videoRef?.current?.addEventListener('timeupdate', handleTimeUpdate);
    videoRef?.current?.addEventListener('seeking', handleSeeking);
    videoRef?.current?.addEventListener('seeked', handleSeeked);
    videoRef?.current?.addEventListener('waiting', handleWaiting);
    videoRef?.current?.addEventListener('canplay', handleCanPlay);

    return () => {
      videoRef?.current?.removeEventListener('loadedmetadata', handleLoadedMetadata);
      videoRef?.current?.removeEventListener('timeupdate', handleTimeUpdate);
      videoRef?.current?.removeEventListener('seeking', handleSeeking);
      videoRef?.current?.removeEventListener('seeked', handleSeeked);
      videoRef?.current?.removeEventListener('waiting', handleWaiting);
      videoRef?.current?.removeEventListener('canplay', handleCanPlay);
    };
  }, [currentVideo]);

  useEffect(() => {
    const handleMouseMove = () => {
      resetInactivityTimer();
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Inicializar el timer la primera vez
    resetInactivityTimer();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(inactivityTimeout.current);
    };
  }, [isHovering]);

  return (
    <div 
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className='relative bg-gray-900 h-full max-h-600px w-full'
      ref={containerRef}
    >
      {
        (!playing || (isHovering && !mouseInactive)) && videoLoaded && (
          <Controls 
            playing={playing} 
            videoRef={videoRef}
            currentTime={currentTime}
            playbackRate={currentRate}
            currentVolume={currentVolume}
            handlePlayVideo={handlePlay}
            handleFullScreen={handleFullScreen}
            playSecond={currentVideo?.playSecond}
            handleSpeedChange={handleSpeedChange}
            handleExpandedView={handleExpandedView}
            className="absolute bottom-0 left-0 z-4" 
            handleCurrentVolume={handleCurrentVolume}
            handleForwardTenSecs={handleForwardTenSecs}
            handleProgressChange={handleProgressChange}
            handleBackwardTenSecs={handleBackwardTenSecs}
            handleToggleCurrentVolume={handleToggleCurrentVolume}
          />
        )
      }
      { !playing && !loading && <PauseOverlay handlePlay={handlePlay} /> }
      { loading && <LoadingOverlay handlePlay={handlePlay} /> }
      <video
        className="w-full h-full z-2"
        width="100%"
        ref={videoRef}
        src={currentVideo?.videoLink}
        onClick={handlePlay}
        controls={false}
        poster={!alreadyPlayed && currentVideo?.poster}
      />
    </div>
  )
}


const PauseOverlay = ({ handlePlay }) => (
  <motion.div 
    className='z-3 absolute top-0 left-0 w-full flex justify-content-center align-items-center' 
    style={{ backgroundColor : 'rgba(0,0,0,0.3)', height : '100%' }}
    onClick={handlePlay}
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
  >
    <motion.div 
      className='border-circle p-5 bg-gray-600 hover:bg-gray-700 cursor-pointer relative shadow-4 play-button-player-transition-ease'
      whileHover={{ scale : 1.1 }}
    >
      <i className='pi pi-play text-7xl font-bold text-transparent' />
      <i className='pi pi-play text-7xl text-gray-200 font-bold centering-play-icon-video-player' />
    </motion.div>
  </motion.div>
)

const LoadingOverlay = ({ handlePlay }) => (
  <motion.div 
    className='z-3 absolute top-0 left-0 w-full h-full flex justify-content-center align-items-center' 
    style={{ backgroundColor : 'rgba(0,0,0,0.3)' }}
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    onClick={handlePlay}
  >
    <i className='pi pi-spin pi-spinner text-7xl text-gray-200 font-bold' />
    {/* <div 
      className='border-circle p-5 bg-gray-700 hover:bg-gray-800 cursor-pointer relative shadow-4 play-button-player-transition-ease'
    >
      <i className='pi pi-spin pi-spinner text-7xl font-bold text-transparent' />
    </div> */}
  </motion.div>
)