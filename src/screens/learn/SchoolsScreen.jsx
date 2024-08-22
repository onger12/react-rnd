import { useEffect, useState } from 'react';

import { SchoolCard } from '../../components';
import { LearnWrapper } from '../../wrappers';
import { getRamdonSchools } from '../../data';

export const SchoolsScreen = () => {

  const [currentSchools, setCurrentSchools] = useState([]);


  useEffect(() => {
    setCurrentSchools(getRamdonSchools(10));
  }, [])
  

  return (
    <LearnWrapper>
      <h1>Escuelas</h1>
      <div className='w-full grid gap-2 p-2'>
        {
          currentSchools?.map(school => (
            <SchoolCard key={school?.id} {...school} />
          ))
        }
      </div>
    </LearnWrapper>
  )
}
