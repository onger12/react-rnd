import { useContext, useRef, useState } from 'react';

import { Rnd } from 'react-rnd';

import { Button } from 'primereact/button';

import { ContextMenuOverlay } from '..';
import { ElementContext } from '../../context';

export const PaperAreaWork = () => {
  const { elements, handleAddNewElement, handleRemoveElement, handleUpdateElement } = useContext(ElementContext);
  const [currentItemContextOpen, setCurrentItemContextOpen] = useState(null);

  const cmRef = useRef(null);

  // handlers
  const handleDragStart = (event, data) => {
    const classList_ = Array.from(data?.node?.classList);
    data.node.classList = [...classList_, 'shadow-4']
  }
  // const handleDragStop = ({ target }) => {
  //   let classList_ = Array.from(target.classList);
  //   if(classList_[0]?.includes(',')) {
  //     classList_ = classList_[0].split(',');
  //   }
  //   const id = classList_?.find(t => t?.includes('id_'));

  //   const element = document.querySelector(`.${id}`);
  //   if(element != null) {
  //     element.classList = classList_?.filter(t => t != 'shadow-4')
  //   }
  // }
  const handleUpdatePos = ({element, xPos, yPos, event}) => {
    // handleDragStop(event);
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
    <div className='flex-grow-1 flex align-items-center justify-content-center'>
      <div className='w-11 h-11 border-gray-200 border-2 relative overflow-hidden'>
        <Button icon="pi pi-plus" rounded onClick={handleAddNewElement} />
        {
          elements.map((element, index) => (
            <Rnd
              key={element?.id}
              className={`id_${element.id} ${element?.bgColor} ${element?.borderColor} ${element?.borderWidth} p-3`}
              style={{ zIndex : index + 5 }}
              size={{ width: element.width,  height: element.height }}
              position={{ x: element.xPos, y: element.yPos }}
              onDragStart={handleDragStart}
              // enableResizing={false}
              onDragStop={(e, d) => handleUpdatePos({ xPos: d.x, yPos: d.y, element, event : e })}
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
              {element.name}
            </Rnd>
          ))
        }

        <ContextMenuOverlay cmRef={cmRef} handleSetBack={handleSetBack} handleSetFront={handleSetFront} />
      </div>
    </div>
  )
}
