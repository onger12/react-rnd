import { useContext, useEffect, useRef, useState } from 'react';

import { useLocation, useParams } from 'wouter';

import { OverlayPanel } from 'primereact/overlaypanel';

import { useLearn } from '../../hooks';
import { RootContext } from '../../App';
import { LearnWrapper } from '../../wrappers';
import { VideoPlayer } from '../../components';
import { ctc, UpdateVideoProgress } from '../../helpers';
import { ScrolledPanel } from '../../components/video-player/scrolled-panel';

export const CourseScreen = () => {

  // states
  const [currentVideo, setCurrentVideo] = useState(null);
  const [currentVideos, setCurrentVideos] = useState([]);
  const [expandedView, setExpandedView] = useState(false);

  // context
  const { handleLoaders } = useContext(RootContext);

  // refs
  const op = useRef(null);
  const toastRef = useRef(null);

  // hooks
  const { dni, courseId, company } = useParams();
  const [n, navigate] = useLocation();
  const { getCoursesByUser, courses } = useLearn({ toastRef, handleLoaders });

  // handlers
  const hanldeGoSchoolScreen = () => {
    if(courses[0]?.schoolId == null) return;
    navigate(`/${company}/learn/${dni}/schools/${courses[0]?.schoolId}`);
  }
  const handleUpdateVideoProgressInList = (body) => {
    const vds = [...currentVideos];
    const index = vds?.findIndex(t => t?.videoId == body?.videoId);
    if(index >= 0) {
      vds[index] = {...vds[index], playSecond : body?.playSecond};
      setCurrentVideos(vds);
      history.replaceState({...courses[0], videos : vds}, '');
    }
  }
  const handleInitScreen = async () => {
    if(!dni || !courseId) return;
    getCoursesByUser({ document : dni, courseId });
  }

  const handleExpandedView = () => setExpandedView(t => !t);
  const handleCurrentVideo = (cv) => setCurrentVideo(cv);

  // BD
  const handleSendLastProgress = async ({progress, videoId }) => {
    if(progress <= currentVideo?.playSecond) return;
    try {
      const body = {
        videoId,
        courseId,
        document : dni,
        playSecond : progress,
      }
      const headers = { document : dni };
      await UpdateVideoProgress({ body, headers });
      handleUpdateVideoProgressInList(body);
    } catch (e) {
      ctc(e, 'Hubo un error al actualizar el progreso del video', toastRef);
    }
  }

  useEffect(() => {
    handleInitScreen();
  }, [dni, courseId]);

  useEffect(() => {
    setCurrentVideo(courses[0]?.videos[0] ?? null);
  }, [courses]);

  return (
    <LearnWrapper toastRef={toastRef}>
      <div className="py-2">
        <div className='flex'>
          <div className={`${expandedView ? 'w-full' : 'w-9'}`}>
            <VideoPlayer 
              currentVideo={currentVideo}
              expandedView={expandedView}
              handleExpandedView={handleExpandedView}
              handleSendLastProgress={handleSendLastProgress}
            />
            <div className='py-3 px-2'>
              {
                courses?.length > 0 && (
                  <div className='flex flex-column gap-2'>
                    <span className='block mb-1 text-2xl font-bold'>{currentVideo?.videoName}</span>
                    <div className='flex gap-2 align-items-center'>
                      <span 
                        className={`
                          course-misc-profile-size 
                          flex 
                          align-items-center 
                          justify-content-center 
                          border-circle 
                          bg-gray-600 
                          text-white 
                          hover:bg-gray-700 
                          transition-all 
                          transition-ease-out 
                          transition-duration-200 
                          text-gray-100
                          ${courses[0]?.schoolId != null ? 'cursor-pointer' : ''}`
                        }
                        onClick={hanldeGoSchoolScreen}
                      >
                        {courses[0]?.courseName?.slice(0, 2)?.toUpperCase()}
                      </span>
                      <div className=''>
                        <span className='block font-semibold text-xl'>{courses[0]?.courseName}</span>
                        <span className='block font-light text-md text-gray-400'>{courses[0]?.schoolName}</span>
                      </div>
                    </div>
                  </div>
                )
              }
              {/* <div className='flex gap-5 align-items-center'>
                <div className=''>
                  <span className='font-bold text-sm block'>4.5 <i className='pi pi-star text-yellow-400' /></span>
                  <span className='text-xs block'>50 calificaciones</span>
                </div>
                <div className=''>
                  <span className='font-bold text-sm block'>820</span>
                  <span className='text-xs block'>Personas capacitadas</span>
                </div>
                <div className=''>
                  <span className='font-bold text-sm block'>23,4 horas</span>
                  <span className='text-xs block'>Total</span>
                </div>

              </div> */}
              {/* <TabMenu model={tabItems} className='mx-3' activeIndex={1} /> */}
            </div>
            {/* <div style={{ height : 500, width : '100%' }} /> */}
          </div>  
          <ScrolledPanel 
            currentVideo={currentVideo} 
            expandedView={expandedView} 
            videos={courses[0]?.videos} 
            handleExpandedView={handleExpandedView} 
            handleCurrentVideo={handleCurrentVideo} 
          />
        </div>

        <OverlayPanel ref={op} className='border-noround border-1 border-gray-300'>
          <div className='w-15rem'>
            <span className='block text-sm font-bold'>8 de 22 completados.</span>
            <span className='block mt-2 text-sm'>Acaba el curso para obtener tu certificado.</span>
          </div>
        </OverlayPanel>
      </div>
    </LearnWrapper>
  )
}
