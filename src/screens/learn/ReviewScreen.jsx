import { useContext, useEffect, useRef, useState } from "react";

import { useParams } from "wouter";

import { useLearn } from "../../hooks";
import { RootContext } from "../../App";
import { LearnWrapper } from "../../wrappers";
import { InfoCoursesTable, InfoCourseTable, InfoSchoolsTable } from "../../components";
import { Toast } from "primereact/toast";

export const ReviewScreen = () => {
  const [currentCourseSelected, setCurrentCourseSelected] = useState(null);

  // context
  const { handleLoaders } = useContext(RootContext);
  
  // refs
  const toastRef = useRef(null);

  // hooks
  const { dni } = useParams();
  const { courses, schools, getSchoolsByUser, getCoursesByUser } = useLearn({ toastRef, handleLoaders });

  // handlers
  const handleSelectCourse = (course) => setCurrentCourseSelected(course);

  useEffect(() => {
    getCoursesByUser({ document : dni });
    getSchoolsByUser({ document : dni });
  }, []);

  return (
    <LearnWrapper>
      <div className="mt-3 flex gap-2 flex-wrap md:flex-nowrap">
        <InfoCoursesTable courses={courses} schools={schools} handleSelectCourse={handleSelectCourse} />
        <div className="w-full md:w-6 flex flex-column gap-2">
          <InfoSchoolsTable schools={schools} width="w-full" />
          { currentCourseSelected != null && <InfoCourseTable course={currentCourseSelected} /> }
        </div>
      </div>
      <Toast ref={toastRef} />
    </LearnWrapper>
  )
}
