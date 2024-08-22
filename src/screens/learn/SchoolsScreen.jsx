import { useEffect, useState } from 'react';

import { InfoCard } from '../../components';
import { LearnWrapper } from '../../wrappers';
import { courses, getRamdonSchools } from '../../data';

export const SchoolsScreen = () => {

  const [currentSchools, setCurrentSchools] = useState([]);

  useEffect(() => {
    setCurrentSchools(getRamdonSchools(10));
  }, []);  

  return (
    <LearnWrapper>
      <h1>Escuelas</h1>
      <div className='w-full grid gap-2 p-2'>
        {
          currentSchools?.map(school => (
            <InfoCard key={school?.id} {...school} qtyDetail={`${courses?.filter(t => t.schoolId == school?.id)?.length} Cursos`} />
          ))
        }
      </div>
    </LearnWrapper>
  )
}
