import { useContext, useEffect, useRef } from "react";
import { useParams } from "wouter";

import { Toast } from "primereact/toast";

import { useLearn } from "../../hooks";
import { RootContext } from "../../App";
import { LearnWrapper } from "../../wrappers";
import { InfoCoursesTable, InfoSchoolsTable } from "../../components";

export const LearnScreen = () => {
  
  const { handleLoaders } = useContext(RootContext);

  // refs
  const toastRef = useRef(null);

  // hooks
  const { dni } = useParams();
  const { courses, schools, getSchoolsByUser, getCoursesByUser } = useLearn({ toastRef, handleLoaders });

  useEffect(() => {
    getCoursesByUser({ document : dni });
    getSchoolsByUser({ document : dni });
  }, []);

  return (
    <LearnWrapper>
      <section className="w-full flex gap-2 pt-3 flex-wrap md:flex-nowrap">
        <InfoCoursesTable courses={courses} schools={schools} resume />
        <InfoSchoolsTable schools={schools} />
      </section>

      <Toast ref={toastRef} />
    </LearnWrapper>
  )
}
