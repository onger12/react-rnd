import { useRef, useState } from 'react';
import { Rnd } from 'react-rnd';

import { Button } from 'primereact/button';

import { useElements } from '../hooks';
import { ContextMenuOverlay } from '../components';

export const HomeScreen = () => {

  const { elements, handleAddNewElement, handleRemoveElement, handleUpdateElement } = useElements();
  const [currentItemContextOpen, setCurrentItemContextOpen] = useState(null);

  const cmRef = useRef(null);

  // handlers
  const handleUpdatePos = ({element, xPos, yPos}) => {
    handleUpdateElement({...element, xPos, yPos});
  }
  const handleUpdateSize = ({element, width, height, xPos, yPos}) => {
    handleUpdateElement({...element, width, height, xPos, yPos});
  }
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

  return (
    <div className='border-1 border-primary p-5 w-full h-full'>
      <Button icon="pi pi-plus" rounded onClick={handleAddNewElement} />
      {
        elements.map((element) => {
          console.log(element)
            return (
              <Rnd
                key={element?.id}
                className={`${element?.bgColor} ${element?.borderColor} ${element?.borderWidth} p-3`}
                size={{ width: element.width,  height: element.height }}
                position={{ x: element.xPos, y: element.yPos }}
                onDragStop={(e, d) => handleUpdatePos({ xPos: d.x, yPos: d.y, element })}
                onResizeStop={(e, direction, ref, delta, position) => {
                  handleUpdateSize({
                    xPos : position.x,
                    yPos : position.y,
                    width: ref.style.width,
                    height: ref.style.height,
                    element,
                  });
                }}
              >
                001
              </Rnd>
            )
        })
      }

      <ContextMenuOverlay cmRef={cmRef} handleSetBack={handleSetBack} handleSetFront={handleSetFront} />
    </div>
    
  )
}
