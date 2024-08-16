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
  const handleGenerateElementName = () => `elemento-${elements?.length + 1}`;
  const handleElements = (elements_) => setElements(elements_);
  const handleAddNewElement = ({
    width = 150, 
    height = 150, 
    borderWidth = 1, 
    initialXPos = 130, 
    initialYPos = 130, 
    bgColor = handleGetBgColor(), 
    borderColor = 'border-gray-500', 
  }) => {
    const id = uniqid();
    const name = handleGenerateElementName();
    setElements(t => (
      [
        ...t, 
        { 
          id, 
          name,
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
    handleElements,
    handleAddNewElement,
    handleRemoveElement,
    handleUpdateElement,
  })
}