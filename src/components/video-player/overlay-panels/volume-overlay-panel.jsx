import { useState } from 'react';

import { VerticalVolumeControl } from '../';

export const VolumeOverlayPanel = ({ button : Button, handleCurrentVolume, currentVolume, onClick }) => {

  // states
  const [showMenu, setShowMenu] = useState(false);

  // handlers
  const handleHideMenu = () => setShowMenu(false);
  const handleShowMenu = () => setShowMenu(true);

  if(Button) {
    return (
      <div 
        className={`relative ${!showMenu && 'overflow-hidden'}`} 
        onMouseEnter={handleShowMenu} 
        onMouseLeave={handleHideMenu}
        onClick={onClick}
      >
        <VerticalVolumeControl currentVolume={currentVolume} handleCurrentVolume={handleCurrentVolume} />
        <Button className="px-5 py-2 icon-volume-identifier" />
      </div>
    );
  }

  return <></>
};