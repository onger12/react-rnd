import { useEffect, useState } from "react";

import { useParams } from "wouter";

import { courses } from "../../data";
import { InfoCard } from "../../components";
import { LearnWrapper } from "../../wrappers";

export const CoursesScreen = () => {
  
  const [currentCourses, setCurrentCourses] = useState([]);

  const { schoolId } = useParams();

  const handleGetRandom = (mod) => Math.floor(Math.random() * mod)

  useEffect(() => {
    setCurrentCourses(courses?.filter(t => t.schoolId == schoolId));
  }, []);

  return (
    <LearnWrapper>
      <h1>Cursos</h1>
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
