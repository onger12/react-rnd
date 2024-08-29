import { createContext } from 'react';
import { useElements } from '../hooks';


export const ElementContext = createContext(null);

export const ElementProvider = ({ children }) => {

  const elementsHookValue = useElements();

  return (
    <ElementContext.Provider
      value={elementsHookValue}
    >
      {children}
    </ElementContext.Provider>
  )
}