import { useContext, useEffect, useRef } from "react";

import { useLocation, useParams } from "wouter";

import { useLearn } from "../../hooks";
import { RootContext } from "../../App";
import { CourseInfoCard } from "../../components";
import { LearnWrapper } from "../../wrappers";

export const CoursesScreen = () => {

  const { handleLoaders, loaders } = useContext(RootContext);

  // refs
  const toastRef = useRef(null);

  // hooks
  const { schoolId, dni } = useParams();
  const [l, setLocation] = useLocation();
  const { courses : coursesState } = history.state;
  const { currentSchool, getSchoolHeadByUser } = useLearn({ toastRef, handleLoaders });

  // handlers
  const handleClickSchoolName = () => setLocation(`/learn/${dni}/schools`);
  const handleInitScreen = () => getSchoolHeadByUser({ id : schoolId, headers : { document : dni } });
  const handleGetCourseProgress = (videos) => {
    if(!videos || !Array.isArray(videos) || videos?.length == 0) return 'Sin capítulos';

    const completed = videos?.filter(t => {
      const course = coursesState?.find(s => s?.courseId == t?.courseId);
      if(!course) return false;

      let done = true;
      for (const video of course?.videos) {
        if(video?.playPercent < 98) {
          done = false;
          break;
        }
      }

      return done;
    })?.length;
    const total = videos?.length;

    return `${completed}/${total} capítulos completados`;
  }

  useEffect(() => {
    handleInitScreen();
  }, []);

  return (
    <LearnWrapper>
      <h1 className="select-none">
        <span 
          className="text-gray-500 font-italic hover:text-gray-400 transition-all transition-duration-100 transition-linear"
          onClick={handleClickSchoolName}
        >
          {currentSchool?.schoolName}
        </span> / Cursos
      </h1>
      <div className='w-full grid gap-2 p-2'>
        {
          currentSchool?.courses?.filter(t => coursesState?.find(s => s?.courseId == t?.courseId))
            ?.map((course) => {
              const videos = coursesState?.find(s => s?.courseId == course?.courseId)?.videos;
                return (
                <CourseInfoCard 
                  id={course?.courseId}
                  key={course?.courseId} 
                  name={course?.courseName}
                  description={course?.courseDescription}
                  data={{...course, videos}}
                  qtyDetail={handleGetCourseProgress(videos)}
                />
              )
            })
        }
      </div>
    </LearnWrapper>
  )
}
