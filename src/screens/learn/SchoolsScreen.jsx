import { useContext, useEffect, useRef, useState } from 'react';

import { useLearn } from '../../hooks';
import { RootContext } from '../../App';
import { InfoCard } from '../../components';
import { LearnWrapper } from '../../wrappers';
import { useParams } from 'wouter';

export const SchoolsScreen = () => {

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
    <LearnWrapper toastRef={toastRef}>
      <h1 className='mt-2 select-none'>Escuelas</h1>
      <div className='w-full grid gap-2 p-2'>
        {
          schools?.map(school => (
            <InfoCard 
              key={school?.id} 
              {...school} 
              // qtyDetail={`${courses?.filter(t => t.schoolId == school?.id)?.length} Cursos`} 
              qtyDetail={`${(Math.floor(Math.random() * 10) + 1)} Cursos`} 
            />
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
      </div>
    </LearnWrapper>
  )
}
