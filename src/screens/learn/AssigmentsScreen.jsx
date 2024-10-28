import { useContext, useEffect, useRef } from 'react';

import { useParams } from 'wouter';

import { useLearn } from '../../hooks';
import { RootContext } from '../../App';
import { CourseInfoCard } from '../../components';
import { LearnWrapper } from '../../wrappers';

export const AssigmentsScreen = () => {

  const { handleLoaders, loaders } = useContext(RootContext);

  // refs
  const toastRef = useRef(null);

  // hooks
  const { dni } = useParams();
  const { courses, getCoursesByUser } = useLearn({ toastRef, handleLoaders });

  // handlers
  const handleGetCourseProgress = ({ videos }) => {
    if(!videos || !Array.isArray(videos) || videos?.length == 0) return 'Sin capítulos';
    
    const completed = videos?.filter(video => video?.playPercent >= 98)?.length;
    const total = videos?.length;
    return `${completed}/${total} capítulos completados`;
  }
  const handleInitScreen = () => {
    getCoursesByUser({ document : dni });
  }

  useEffect(() => {
    handleInitScreen();
  }, []);

  return (
    <LearnWrapper>
      <h1 className='mt-2 select-none'>Cursos en todas las escuelas</h1>
      <div className='w-full grid gap-2 p-2'>
        {
          courses?.map(course => (
            <CourseInfoCard 
              data={{...course }}
              id={course?.courseId}
              key={course?.courseId} 
              name={course?.courseName ?? 'NOMBRE'}
              description={course?.courseDescription ?? 'DESCRIPCION'}
              qtyDetail={handleGetCourseProgress(course)}
            />
          ))
        }
      </div>
      {
        courses?.length == 0 && !loaders?.courses && (
          <div className='w-full flex flex-column align-items-center justify-content-center' style={{ height : '60vh'}}>
            <i className='pi pi-graduation-cap text-7xl text-gray-700 hover:text-gray-900 transition-all transition-duration-200 transition-ease-out' />
            <span className='text-4xl font-gray-900 select-none'>No tienes cursos asignados aún :(</span>
          </div>
        )
      }
    </LearnWrapper>
  )
}
