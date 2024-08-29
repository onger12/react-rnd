import { useState } from "react";

import { Button } from "primereact/button";

import { sidebarSectionButtons } from "../../helpers";
import { SidebarSectionButton } from "./sidbear-section-button";
import { SidebarCapasSection, SidebarConfSection, SidebarElementsSection, SidebarSectionMain, SidebarSessionSection } from "./sidebar-sections";

export const SidebarMain = () => {

  // states
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // handlers
  const handleChangeSlide = (i) => {
    if(!sidebarOpen) {
      setSidebarOpen(true);
    }
    setCurrentSlide(i);
  }
  const handleToggleSidebar = () => setSidebarOpen(t => !t);

  return (
    <div className={`h-screen flex ${sidebarOpen ? 'w-20rem' : 'w-5rem'} overflow-hidden shadow-3 h-full bg-gray-200 transition-all transition-ease-out transition-duration-200`}>
      <div className='w-5rem shadow-3 bg-gray-400'>
        <div className="w-full flex justify-content-center align-items-center py-2 bg-gray-100 border-bottom-1 border-gray-200">
          <Button 
            icon={`pi pi-chevron-${sidebarOpen ? 'left' : 'right'}`}
            rounded
            className="w-2rem h-2rem transition-all transition-duration-100 transition-linear"
            onClick={handleToggleSidebar}
          />
        </div>
        {
          sidebarSectionButtons.map((t, i) => (
            <SidebarSectionButton key={i} {...t} active={currentSlide == i} handleClick={() => handleChangeSlide(i)} />
          ))
        }
      </div>
      { currentSlide == 0 && <SidebarCapasSection sidebarOpen={sidebarOpen} /> }
      { 
        currentSlide != 0 && (
          <SidebarSectionMain>
            {
              currentSlide == 1 
                ?  <SidebarElementsSection /> 
                : currentSlide == 2 
                    ? <SidebarConfSection  />
                    : currentSlide == 3 && <SidebarSessionSection />
            }
          </SidebarSectionMain>
        )
      }
    </div>
  )
}
