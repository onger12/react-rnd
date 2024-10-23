import { useContext, useState } from 'react';

import { Button } from 'primereact/button';

import { ElementContext } from '../../context';

export const SidebarSingleElement = ({ name, element, draggableRef, draggableProps, dragHandleProps, isDragging }) => {
  
  const { handleUpdateElement, handleRemoveElement } = useContext(ElementContext);

  const [isEditable, setIsEditable] = useState(false);

  // handlers
  const handleDoubleClick = () => {
    setIsEditable(true);
  }
  const handleBlur = (e) => {
    handleUpdateElement({...element, name : e.target.innerHTML});
    setIsEditable(false);
  }
  const handleOpenOptions = () => {
  }

  return (
    <div 
      id={!isDragging ? 'non-draggable-item' : ''}
      className={`w-full flex gap-2 align-items-center justify-content-between border-1 border-transparent ${isDragging && 'max-w-max border-1 border-dashed border-primary'}`} 
      ref={draggableRef}
      {...draggableProps}
      {...dragHandleProps}
    >
      <span 
        contentEditable={isEditable}
        onDoubleClick={handleDoubleClick}
        onBlur={handleBlur}
        suppressContentEditableWarning={true}
        className='text-editable select-none text-xl text-gray-800' 
      >
        {name}
      </span>
      <div className='flex aling-items-center gap-2'>
        <Button 
          icon="pi pi-trash"
          rounded
          severity='danger'
          // text
          raised
          className='w-2rem h-2rem'
          onClick={() => handleRemoveElement(element)}
        /> 
        <Button 
          icon="pi pi-ellipsis-h"
          rounded
          text
          outlined
          className='w-2rem h-2rem'
          severity='secondary'
          onClick={handleOpenOptions}
        />
      </div>
    </div>
  )
}
