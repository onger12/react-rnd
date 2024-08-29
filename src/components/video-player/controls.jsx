import { motion } from 'framer-motion';

import { formatTimeHHMMSS } from '../../helpers';
import { SpeedOverlayPanel, VolumeOverlayPanel, IconTooltip, ProgressBar } from './';

export const Controls = ({ 
  playing, 
  videoRef, 
  progress, 
  duration, 
  className, 
  maximized,
  currentTime,
  playbackRate, 
  currentVolume,
  handlePlayVideo, 
  handleFullScreen,
  handleSpeedChange, 
  handleExpandedView,
  handleCurrentVolume,
  handleForwardTenSecs,
  handleProgressChange, 
  handleBackwardTenSecs, 
  handleToggleCurrentVolume,
}) => {

  return (
    <motion.div 
      className={`bg-gray-transparent w-full px-3 pt-1 pb-3 ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
    >
      <ProgressBar progress={progress} handleProgressChange={handleProgressChange} videoRef={videoRef} />
      <div className='flex justify-content-between align-items-center px-2'>
        <div className='flex align-items-center gap-4'>
          <IconTooltip 
            onClick={handlePlayVideo} 
            tooltip={playing ? 'Pausar' : 'Reproducir'} 
            icon={`pi pi-${playing ? 'pause' : 'play'}`} 
          />
          <IconTooltip 
            icon="pi pi-replay" 
            tooltip="Retroceder 10 seg" 
            onClick={handleBackwardTenSecs}
          />
          <SpeedOverlayPanel 
            handleSpeedChange={handleSpeedChange}
            button={({ className, ...rest }) => (
              <div className={`select-none bg-white cursor-pointer px-4 py-1 text-center ${className}`} {...rest}>
                <span className='font-bold text-xl'>{playbackRate}x</span>
              </div>
            )} 
          />
          <IconTooltip 
            icon="pi pi-refresh" 
            tooltip="Adelantar 10 seg" 
            onClick={handleForwardTenSecs}
          />
          <span className="select-none text-xl font-bold text-white font-family-quicksand">
            {formatTimeHHMMSS(currentTime)} / {formatTimeHHMMSS(duration)}
          </span>
          <IconTooltip 
            icon="pi pi-comment" 
            tooltip="Agregar una nota" 
          />
        </div>
        <div className='flex gap-2 align-items-center'>
          <VolumeOverlayPanel 
            currentVolume={currentVolume}
            onClick={handleToggleCurrentVolume} 
            handleCurrentVolume={handleCurrentVolume}
            button={({className}) => (
              <IconTooltip 
                icon={currentVolume == 0 ? 'pi pi-volume-off' : (currentVolume <= 50 ? 'pi pi-volume-down' : 'pi pi-volume-up')} 
                className={`text-white text-xl ${className}` }
              />
            )}
          />
          <IconTooltip 
            icon={`pi ${maximized ? 'pi-arrow-down-left-and-arrow-up-right-to-center' : 'pi-arrow-up-right-and-arrow-down-left-from-center'}`} 
            tooltip="Maximizar" 
            onClick={handleFullScreen}
            className="pr-5"
          />
          <IconTooltip 
            icon="pi pi-arrows-h" 
            tooltip="Vista ampliada" 
            className="text-2xl font-light pr-1" 
            onClick={handleExpandedView}
          />
        </div>
      </div>
    </motion.div>
  )
}
