import { useContext, useEffect, useRef } from 'react';

import { useParams } from 'wouter';

import { useLearn } from '../../hooks';
import { RootContext } from '../../App';
import { InfoCard } from '../../components';
import { LearnWrapper } from '../../wrappers';

export const AssigmentsScreen = () => {

  const { handleLoaders, loaders } = useContext(RootContext);

  // refs
  const toastRef = useRef(null);

  // hooks
  const { dni } = useParams();
  const { schools, getSchoolsByUser } = useLearn({ toastRef, handleLoaders });

  // handlers
  const handleInitScreen = () => {
    getSchoolsByUser({ document : dni });
  }

  useEffect(() => {
    handleInitScreen();
  }, []);

  return (
    <LearnWrapper>
      {
        schools?.map(school => (
          <div key={school?.id} className='p-1 px-3 border-1 border-transparent hover:border-gray-200 border-round-md'>
            <h1 className='my-0 text-gray-500 font-italic select-none'>{school?.name}</h1>
            <div className='w-full grid gap-2 p-2 my-2'>
              {
                schools?.courses?.map(course => (
                    <InfoCard key={course?.courseId} {...course} qtyDetail={`${handleGetRandom(10)}/${handleGetRandom(15) + 10} capitulos completados`} />
                  ))
              }
            </div>
          </div>
        ))
      }
      {
        schools?.length == 0 && !loaders?.schools && (
          <div className='w-full flex flex-column align-items-center justify-content-center' style={{ height : '60vh'}}>
            <i className='pi pi-graduation-cap text-7xl text-gray-700 hover:text-gray-900 transition-all transition-duration-200 transition-ease-out' />
            <span className='text-4xl font-gray-900 select-none'>No tienes cursos asignados aún :(</span>
          </div>
        )
      }
    </LearnWrapper>
  )
}
