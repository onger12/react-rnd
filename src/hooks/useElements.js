import { useState } from 'react';
import uniqid from 'uniqid';
import { bgColors } from '../helpers';

export const useElements = ({ initialElements = [] } = {}) => {
  const [elements, setElements] = useState(initialElements);

  // handlers
  const handleGetBgColor = () => {
    const rand = Math.floor(Math.random() * bgColors.length);
    return bgColors[rand];
  }
  const handleAddNewElement = ({
    width = 50, 
    height = 50, 
    borderWidth = 1, 
    initialXPos = 30, 
    initialYPos = 30, 
    bgColor = handleGetBgColor(), 
    borderColor = 'border-gray-500', 
  }) => {
    const id = uniqid();
    setElements(t => (
      [
        ...t, 
        { 
          id, 
          width, 
          height, 
          bgColor, 
          borderColor, 
          borderWidth,
          xPos : initialXPos, 
          yPos : initialYPos, 
        }, 
      ]
    ));
  }
  const handleRemoveElement = (element) => {
    const elements_ = [...elements];
    const index = elements_?.findIndex(t => element.id == t?.id);
    const left = elements_?.slice(0, index);
    const right = elements_?.slice(index + 1);    
    setElements([...left, ...right]);
  }
  const handleUpdateElement = (element) => {
    const elements_ = [...elements];
    const index = elements_?.findIndex(t => element?.id == t?.id);
    if(index != null) {
      elements_[index] = {...element};
      setElements(elements_);
    } else {
      throw 'Error, el elemento no se econtró [VALIDAR ERROR]';
    }
  }

  return ({
    elements,
    handleAddNewElement,
    handleRemoveElement,
    handleUpdateElement,
  })
}