
import uuid from 'react-uuid';
import { Accordion, AccordionTab } from 'primereact/accordion';

import { SingleExamCard } from './single-exam-card';
import { SingleVideoCard } from './single-video-card';

const dummyExam = {
  examId : uuid(),
  title : 'dummy title',
  description : 'dummy desc',
  questionsLength : 12,
}

export const ScrolledPanel = ({ expandedView, currentItem, videos, handleExpandedView, handleCurrentItem, exam = dummyExam }) => {

  return (
    <div 
      className={`
        flex 
        flex-column 
        h-full 
        w-3
        scrolled-panel-max-height 
        transition-all 
        transition-duration-200 
        transition-ease-out overflow-hidden
        ${expandedView ? 'w-0' : 'flex-grow-1'} 
      `}
    >
      <div className='border-1 border-gray-200 flex justify-content-between align-items-center px-2 py-3'>
        <span className='text-xl font-bold'>Contenido del curso</span>
        <i
          className='pi pi-times cursor-pointer p-2 border-circle hover:bg-gray-200 transition-all transition-ease-out transition-duration-200'
          onClick={handleExpandedView}
        />
      </div>
      <div className='h-full overflow-y-auto border-right-1 border-bottom-1 border-gray-200'>
        <Accordion multiple activeIndex={[0]}>
          <AccordionTab key={1} header="Principal" contentClassName='mb-0' pt={{ content : { style : { border : '0px' } } }}>
            {
              // currentItem?.videos?.map((section, ii) => (
              //   <AccordionTab key={section?.name} header={section?.name} contentClassName='mb-0'>
              //     {
              //       section?.videos?.map((video, i) => (
              //         <SingleVideoCard 
              //           key={i} 
              //           {...video} 
              //           index={i + 1} 
              //           onClick={() => handleUpdateCurrentIndexes({ videoIndex : i, sectionIndex : ii })} 
              //           active={currentItem?.title == video?.title} 
              //         />
              //       ))
              //     }
              //   </AccordionTab>
              // ))
              videos?.map((video, i) => (
                <SingleVideoCard 
                  key={i} 
                  {...video} 
                  index={i + 1} 
                  active={currentItem?.id == video?.videoId} 
                  onClick={() => handleCurrentItem(video)} 
                />
              ))
            }
          </AccordionTab>
        </Accordion>
        {/* <hr className='w-full' /> */}
        <SingleExamCard 
          {...exam}
          onClick={() => handleCurrentItem(exam)} 
          active={currentItem?.id == exam?.examId} 
        />
      </div>
    </div>
  )
}
