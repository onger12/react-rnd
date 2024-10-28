import { useEffect, useRef, useState } from 'react';

import { useLocation, useParams } from 'wouter';

import { OverlayPanel } from 'primereact/overlaypanel';

import { useLearn } from '../../hooks';
import { LearnWrapper } from '../../wrappers';
import { ResolveExam } from '../../components/learn/resolve-exam';
import { ctc, handleFormatSeconds, UpdateVideoProgress } from '../../helpers';
import { ScrolledPanel } from '../../components/video-player/scrolled-panel';
import { ErrorPlacing, LoadingPlacing, NoContentPlacing, VideoPlayer } from '../../components';

export const CourseScreen = () => {

  // state
  const [currentItem, setCurrentItem] = useState(null);
  const [currentVideos, setCurrentVideos] = useState([]);
  const [expandedView, setExpandedView] = useState(false);
  const [errorLoading, setErrorLoading] = useState(null);
  const [loaders, setLoaders] = useState({ courses : true });

  // refs
  const op = useRef(null);
  const toastRef = useRef(null);

  // manage loaders
  const handleLoaders = (value) => setLoaders(t => ({ ...t, ...value }));

  // hooks
  const { dni, courseId, company } = useParams();
  const [n, navigate] = useLocation();
  const { getCoursesByUser, courses } = useLearn({ toastRef, handleLoaders });

  // handlers
  const handleDoneExamIntent = () => {
    setCurrentItem(courses[0]?.videos[0]);
  }
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
    await getCoursesByUser({ document : dni, courseId }, () => setErrorLoading(true));
  }

  const handleExpandedView = () => setExpandedView(t => !t);
  const handleCurrentItem = (cv) => setCurrentItem(cv);

  // BD
  const handleSendLastProgress = async ({progress, videoId }) => {
    if(progress <= currentItem?.playSecond) return;
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
    setCurrentVideos(courses[0]?.videos ?? []);
    setCurrentItem(courses[0]?.videos[0] ?? null);
  }, [courses]);

  return (
    <LearnWrapper toastRef={toastRef}>
      <div className="py-2">
        {
          (currentItem?.videoId != null || currentItem?.examId != null) && (
            <div className='flex'>
              {
                currentItem?.videoId != null && (
                  <div className={`${expandedView ? 'w-full' : 'w-9'}`}>
                    <VideoPlayer 
                      currentItem={currentItem}
                      expandedView={expandedView}
                      handleExpandedView={handleExpandedView}
                      handleSendLastProgress={handleSendLastProgress}
                    />
                    <div className='py-3 px-2'>
                      {
                        courses?.length > 0 && (
                          <div className='flex flex-column gap-2'>
                            <span className='block mb-1 text-2xl font-bold'>{currentItem?.videoName || currentItem?.title}</span>
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
                      <div className='shadow-1 p-3 border-round-sm align-items-center mt-3 bg-gray-100'>
                        {/* <div className=''>
                          <span className='font-bold text-sm block'>4.5 <i className='pi pi-star text-yellow-400' /></span>
                          <span className='text-xs block'>50 calificaciones</span>
                        </div>
                        <div className=''>
                          <span className='font-bold text-sm block'>820</span>
                          <span className='text-xs block'>Personas capacitadas</span>
                        </div> */}
                        <div className='mb-3'>
                          <span className='block font-semibold text-xl'>Descripción del curso</span>
                          <span className='block font-light text-gray-600'>
                            {courses[0]?.courseDescription}
                          </span>
                        </div>
                        <div className=''>
                          <span className='block font-semibold text-md'>Estadísticas del curso</span>
                          <div className='flex align-items-center gap-2'>
                            <span className='font-light text-md p-2 border-round-sm'>{handleFormatSeconds({ secs : currentVideos?.map(t => t?.videoDuration ?? 0)?.reduce((total, curr) => (total + curr), 0), fullLabel : true })} totales</span>
                          </div>
                        </div>
                      </div>
                      {/* <TabMenu model={tabItems} className='mx-3' activeIndex={1} /> */}
                    </div>
                    {/* <div style={{ height : 500, width : '100%' }} /> */}
                  </div>
                )
              }
              {
                currentItem?.examId != null && (
                  <ResolveExam expandedView={expandedView} handleDoneIntent={handleDoneExamIntent} />
                )
              }
              <ScrolledPanel 
                videos={currentVideos} 
                expandedView={expandedView} 
                handleCurrentItem={handleCurrentItem} 
                handleExpandedView={handleExpandedView} 
                currentItem={{...currentItem, id : (currentItem?.videoId || currentItem?.examId)}} 
              />
            </div>
          )
        }
        {
          !!errorLoading 
            ? <ErrorPlacing hScreen />
            : loaders?.courses
              ? <LoadingPlacing hScreen />
              : currentItem?.videoId == null && currentItem?.examId == null && <NoContentPlacing hScreen text='No se encontraron datos para este curso con este usuario.' />
        }

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
