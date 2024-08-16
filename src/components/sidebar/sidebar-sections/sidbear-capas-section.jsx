import { useContext } from 'react';

import { DragDropContext, Draggable } from 'react-beautiful-dnd';

import { ElementContext } from '../../../context';
import { CustomDroppable } from "../droppable-custom";
import { SidebarSingleElement } from "../sidebar-single-element";
import { SidebarSectionsTitle } from '../sidebar-sections-title';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export const SidebarCapasSection = ({ sidebarOpen }) => {

  const { elements, handleElements } = useContext(ElementContext);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const newElements = reorder(
      elements,
      result.source.index,
      result.destination.index
    );

    handleElements(newElements);
  };

  return (
    <div className='flex flex-column'>
      <SidebarSectionsTitle title="Capas" />
      <DragDropContext onDragEnd={onDragEnd}>
        <CustomDroppable droppableId="droppable">
          {(provided, snapshot) => (
              <div 
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`${sidebarOpen ? 'w-full' : 'w-0'} flex flex-column gap-2 p-2 transition-all transition-ease-out transition-duration-200`}
              >
                {
                  sidebarOpen && elements?.map((element, index) => (
                    <Draggable key={element.id} draggableId={element.id} index={index}>
                      {(provided) => (
                        <SidebarSingleElement 
                          {...element}
                          element={element}
                          key={element.id}
                          handleRemoveItem={() => {}}
                          draggableRef={provided.innerRef}
                          draggableProps={provided.draggableProps}
                          dragHandleProps={provided.dragHandleProps}
                          isDragging={snapshot?.isDraggingOver}
                        />
                      )}
                    </Draggable>
                  ))
                }
                {provided.placeholder}
              </div>
            )}
        </CustomDroppable>
      </DragDropContext>
    </div>
  )
}
