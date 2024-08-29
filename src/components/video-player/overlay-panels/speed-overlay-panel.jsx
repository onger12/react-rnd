import { useState, useRef, useEffect } from 'react';

const dummyItems = [
  {
    item : '0.5x',
    value : .5,
  },
  {
    item : '0.75x',
    value : .75,
  },
  {
    item : '1x',
    value : 1,
  },
  {
    item : '1.25x',
    value : 1.25,
  },
  {
    item : '1.5x',
    value : 1.5,
  },
  {
    item : '1.75x',
    value : 1.75,
  },
  {
    item : '2x',
    value : 2,
  },
];

export const SpeedOverlayPanel = ({ items = dummyItems, button : Button, direction = "top", handleSpeedChange }) => {

  const [showMenu, setShowMenu] = useState(false);
  const dropdownRef = useRef(null);

  const handleButtonClick = () => {
    setShowMenu(prevShowMenu => !prevShowMenu);
  };

  const handleClickOutside = event => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowMenu(false);
    }
  };

  const handleItemClick = (rate) => {
    setShowMenu(false);
    handleSpeedChange(rate)
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if(Button) {
    return (
      <div ref={dropdownRef} className='relative inline-block'>
        <Button onClick={handleButtonClick} />
        <DropdownMenu direction={direction} show={showMenu}>
          {items.map(data => (
            <DropdownItem handleItemClick={handleItemClick} {...data} />
          ))}
        </DropdownMenu>
      </div>
    );
  }

  return (
    <div ref={dropdownRef} className='relative inline-block'>
      <div onClick={handleButtonClick} className='p-2 bg-primary border-round-xl cursor-pointer select-none'>Dropdown</div>
      <DropdownMenu direction={direction} show={showMenu}>
        {items.map(data => (
          <DropdownItem {...data} />
        ))}
      </DropdownMenu>
    </div>
  );
};

const DropdownMenu = ({ show, direction, children }) => (
  <div 
    className={`
      ${show ? 'block' : 'hidden'} 
      ${show ? 'opacity-100' : 'opacity-0'} 
      ${show ? 'max-h-30rem' : 'max-h-0'} 
      ${direction == 'bottom' ? 'top-100 mt-1' : 'bottom-100 mb-1'} 
      dropdown-menu-transition-ease
      overflow-hidden
      absolute 
      dropdown-button-centered 
      bg-gray-800
      shadow-2 
      z-5
    `}
  >
    {children}
  </div>
)

const DropdownItem = ({ item, value, handleItemClick }) => (
  <div key={value} onClick={() => handleItemClick(value)} className='p-3 text-white text-xl font-bold px-4 cursor-pointer hover:bg-gray-600 dropdown-item-transition-ease font-family-quicksand'>
    {item}
  </div>
)