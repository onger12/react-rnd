import { useContext, useEffect, useRef, useState } from 'react';

import { useParams } from 'wouter';

import { TabMenu } from 'primereact/tabmenu';
import { OverlayPanel } from 'primereact/overlaypanel';

import { useLearn } from '../../hooks';
import { RootContext } from '../../App';
import { VideoPlayer } from '../../components';
import { LearnWrapper } from '../../wrappers';
import { ctc, UpdateVideoProgress } from '../../helpers';
import { ScrolledPanel } from '../../components/video-player/scrolled-panel';

const tabItems = [
  { label: '', icon: 'pi pi-search' },
  { label: 'Descripción general', icon: '' },
  { label: 'Preguntas', icon: '' },
];

export const CourseScreen = () => {

  // states
  const [currentVideo, setCurrentVideo] = useState(null);
  const [currentVideos, setCurrentVideos] = useState([]);
  const [expandedView, setExpandedView] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);

  // context
  const { handleLoaders } = useContext(RootContext);

  // refs
  const op = useRef(null);
  const toastRef = useRef(null);

  // hooks
  const { schoolId, dni, courseId } = useParams();
  const { schools, getSchoolsByUser, getCourseHeadByUser, getCoursesByUser, courses : allCourses } = useLearn({ toastRef, handleLoaders });

  // state
  // const currentCourse = history.state;

  // handlers
  const handleUpdateVideoProgressInList = (body) => {
    const vds = [...currentVideos];
    const index = vds?.findIndex(t => t?.videoId == body?.videoId);
    if(index >= 0) {
      vds[index] = {...vds[index], playSecond : body?.playSecond};
      setCurrentVideos(vds);
      history.replaceState({...currentCourse, videos : vds}, '');
    }
  }
  const handleInitScreen = async () => {
    if(!dni || !courseId) return;
    getCoursesByUser({ document : dni });
    // const course = await getCourseHeadByUser({ id : courseId, headers : { document : dni } });
    // setCurrentCourse(course);
    // setCurrentVideo(course?.videos[0])
    getSchoolsByUser({ document : dni });
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
    if(allCourses?.length > 0) {
      const cc = allCourses?.find(t => t?.courseId == courseId);
      setCurrentCourse(cc);
      setCurrentVideo(cc?.videos[0] ?? null);
    }
  }, [allCourses]);

  return (
    <LearnWrapper toastRef={toastRef}>
      <div className="min-h-screen">
        <div className='py-2'>
          <h1 className='my-0'>{currentCourse?.courseName}</h1>
          <span className='font-italic'>{schools?.find(t => t.schoolId == schoolId)?.schoolName}</span>
        </div>
        <div className='flex'>
          <div className={`${expandedView ? 'w-full' : 'w-9'}`}>
            <VideoPlayer 
              currentVideo={currentVideo}
              expandedView={expandedView}
              handleExpandedView={handleExpandedView}
              handleSendLastProgress={handleSendLastProgress}
            />
            <TabMenu model={tabItems} className='mx-3' activeIndex={1} />
            <div className='py-3 px-5'>
              <span className='block text-2xl pb-3'>{currentVideo?.videoName}</span>
              <div className='flex gap-5 align-items-center'>
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

              </div>
            </div>
            <div style={{ height : 500, width : '100%' }} />
          </div>  
          <ScrolledPanel 
            currentVideo={currentVideo} 
            expandedView={expandedView} 
            videos={currentCourse?.videos} 
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
