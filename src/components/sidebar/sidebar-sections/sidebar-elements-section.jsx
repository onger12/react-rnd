import { InputText } from 'primereact/inputtext';

import { SidebarSectionsTitle } from '../sidebar-sections-title';
import { RectElement } from './sidebar-single-elements';

export const SidebarElementsSection = () => {
  return (
    <div>
      <SidebarSectionsTitle title="Elementos" />
      <InputText className='w-full p-2 my-3' placeholder='Buscar elementos...' /> 
      <RectElement />
    </div>
  )
}
