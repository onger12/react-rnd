import { Accordion, AccordionTab } from 'primereact/accordion';
import { SingleVideoCard } from './single-video-card';

export const ScrolledPanel = ({ expandedView, currentVideo, videos, handleExpandedView, handleCurrentVideo }) => {

  return (
    <div className={`flex flex-column max-h-screen sticky top-0 ${expandedView ? 'w-0' : 'flex-grow-1'} transition-all transition-duration-200 transition-ease-out overflow-hidden`}>
      <div className='border-1 border-gray-200 flex justify-content-between align-items-center px-2 py-3'>
        <span className='text-xl font-bold'>Contenido del curso</span>
        <i
          className='pi pi-times'
          onClick={handleExpandedView}
        />
      </div>
      <div className='h-full overflow-y-auto'>
        <Accordion multiple activeIndex={[0]}>
          <AccordionTab key={1} header="Principal" contentClassName='mb-0'>
            {
              // currentVideo?.videos?.map((section, ii) => (
              //   <AccordionTab key={section?.name} header={section?.name} contentClassName='mb-0'>
              //     {
              //       section?.videos?.map((video, i) => (
              //         <SingleVideoCard 
              //           key={i} 
              //           {...video} 
              //           index={i + 1} 
              //           onClick={() => handleUpdateCurrentIndexes({ videoIndex : i, sectionIndex : ii })} 
              //           active={currentVideo?.title == video?.title} 
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
                  active={currentVideo?.videoId == video?.videoId} 
                  onClick={() => handleCurrentVideo(video)} 
                />
              ))
            }
          </AccordionTab>
        </Accordion>
      </div>
    </div>
  )
}
