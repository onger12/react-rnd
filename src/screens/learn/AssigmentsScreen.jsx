import { useEffect, useState } from 'react';
import { LearnWrapper } from '../../wrappers';
import { useParams } from 'wouter';
import { courses, getRamdonCourses, getRamdonSchools } from '../../data';
import { InfoCard } from '../../components';

export const AssigmentsScreen = () => {

  const [currentSchools, setCurrentSchools] = useState([]);
  const [currentCourses, setCurrentCourses] = useState([]);

  const { dni } = useParams();

  const handleGetRandom = (mod) => Math.floor(Math.random() * mod)

  console.log(currentCourses)

  useEffect(() => {
    const schools = getRamdonSchools(handleGetRandom(5) + 3);
    const coursesLimit = handleGetRandom(7) + 3;

    setCurrentSchools(schools);
    setCurrentCourses(getRamdonCourses(schools?.map(t => t.id), coursesLimit));
  }, []);

  return (
    <LearnWrapper>
      {
        currentSchools?.map(school => (
          <div key={school?.id} className='p-3 border-1 border-transparent hover:border-gray-200 border-round-md'>
            <h1 className='mb-1 mt-0 text-gray-300 font-italic select-none'>{school?.name}</h1>
            <div className='w-full grid gap-2 p-2 my-2'>
              {
                currentCourses?.filter(course => course.schoolId == school?.id)
                  ?.map(course => (
                    <InfoCard key={course?.id} {...course} qtyDetail={`${handleGetRandom(10)}/${handleGetRandom(15) + 10} capitulos completados`} />
                  ))
              }
            </div>
          </div>
        ))
      }
    </LearnWrapper>
  )
}
