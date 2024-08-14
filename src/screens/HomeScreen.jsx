import { useRef, useState } from 'react';
import { Rnd } from 'react-rnd';
import { ContextMenuOverlay } from '../components';

export const HomeScreen = () => {

  const [size, setSize] = useState({ height : 50, width : 50 });
  const [position, setPosition] = useState({ x : 50, y : 50 });
  const [currentItemContextOpen, setCurrentItemContextOpen] = useState(null);

  const cmRef = useRef(null);

  // handlers
  const handleToggleRef = (e) => {
    cmRef?.current?.show(e);
    setCurrentItemContextOpen(e);
  }
  const handleSetBack = (e) => {
    console.log('back')
  };
  const handleSetFront = (e) => {
    console.log('front')
  };

  console.log(currentItemContextOpen);

  return (
    <div className='border-1 border-primary p-5 w-full h-full'>
      <Rnd
        default={{
          x: 0,
          y: 0,
          width: 320,
          height: 200,
        }}
        className='border-1 border-primary'
        onContextMenu={handleToggleRef}
      >
        Rnd
      </Rnd>
      <Rnd
        size={{ width: size.width,  height: size.height }}
        position={{ x: position.x, y: position.y }}
        onDragStop={(e, d) => setPosition({ x: d.x, y: d.y })}
        onResizeStop={(e, direction, ref, delta, position) => {
          setSize({
            width: ref.style.width,
            height: ref.style.height,
            ...position,
          });
        }}
        className='border-1 border-red-300 bg-blue-300'
        onContextMenu={handleToggleRef}
      >
        001
      </Rnd>

      <ContextMenuOverlay cmRef={cmRef} handleSetBack={handleSetBack} handleSetFront={handleSetFront} />
    </div>
    
  )
}
