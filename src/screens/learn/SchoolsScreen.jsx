import { useContext, useEffect, useRef } from 'react';

import { useParams } from 'wouter';

import { useLearn } from '../../hooks';
import { RootContext } from '../../App';
import { InfoCard } from '../../components';
import { LearnWrapper } from '../../wrappers';

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
          schools?.map((sch) => (
            <InfoCard 
              data={sch}
              id={sch?.schoolId}
              key={sch?.schoolId} 
              name={sch?.schoolName}
              description={sch?.schoolDescription}
              qtyDetail={`${sch?.courses?.length} Cursos`} 
              // qtyDetail={`${courses?.filter(t => t.schoolId == school?.id)?.length} Cursos`} 
            />
          ))
        }
        {
          schools?.length == 0 && !loaders?.schools && (
            <div className='w-full flex flex-column align-items-center justify-content-center gap-4' style={{ height : '80vh'}}>
              <i className='pi pi-graduation-cap text-8xl text-gray-700 hover:text-gray-900 transition-all transition-duration-200 transition-ease-out' />
              <span className='text-4xl font-gray-900 select-none'>No tienes cursos asignados aún :(</span>
            </div>
          )
        }
      </div>
    </LearnWrapper>
  )
}
