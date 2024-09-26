import { useEffect, useState } from "react";

import { useLocation, useParams } from "wouter";

import { InfoCard } from "../../components";
import { courses, schools } from "../../data";
import { LearnWrapper } from "../../wrappers";

export const CoursesScreen = () => {
  
  const [currentCourses, setCurrentCourses] = useState([]);

  const { schoolId, dni } = useParams();
  const [l, setLocation] = useLocation();

  const handleGetRandom = (mod) => Math.floor(Math.random() * mod);
  const handleClickSchoolName = () => setLocation(`/learn/${dni}/schools`);

  useEffect(() => {
    setCurrentCourses(courses?.filter(t => t.schoolId == schoolId));
  }, []);

  return (
    <LearnWrapper>
      <h1 className="select-none">
        <span 
          className="text-gray-500 font-italic hover:text-gray-400 transition-all transition-duration-100 transition-linear"
          onClick={handleClickSchoolName}
        >
          {schools?.find(t => t?.id == schoolId)?.name}
        </span> / Cursos
      </h1>
      <div className='w-full grid gap-2 p-2'>
        {
          currentCourses?.map(course => (
            <InfoCard key={course?.id} {...course} qtyDetail={`${handleGetRandom(10)}/${handleGetRandom(15) + 10} capitulos completados`} />
          ))
        }
      </div>
    </LearnWrapper>
  )
}
