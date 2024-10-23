import { useEffect, useRef, useState } from "react";

import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { TabPanel, TabView } from "primereact/tabview";

import { CursosTab } from "./cursos-tab";
import { useForm } from "../../../../hooks";
import { InfoGeneralTab } from "./info-general-tab";

export const EditSchoolDialog = ({ visible, onHide, allCourses, handleUpdateSchoolInMemory, handleRemoveCourseFromSchool }) => {

  const [courses, setCourses] = useState([]);

  // refs
  const toastRef = useRef(null);

  // hooks
  const formState = useForm({
    name : '',
    description : '',
  });

  // handlers
  const handleUpdateSchoolCourses = (ncrs) => handleUpdateSchoolInMemory({ ...visible, courses : [ ...ncrs, ...visible?.courses ], coursesCount : ncrs?.length }, true);
  const handleHide = () => {
    onHide && onHide();
  }

  useEffect(() => {
    if(!!visible) {
      formState.onChangeManual({
        name : visible?.schoolName,
        description : visible?.schoolDescription,
      })
    }
  }, [visible]);
  
  useEffect(() => {
    setCourses(allCourses?.map(t => {
      const found = visible?.courses?.find(s => s?.courseId == t?.courseId);

      return ({
        ...t, 
        courseName : !found ? t?.courseName : `${t?.courseName} [Ya agregado]`,
        disabled : !!found
      })
    }));
  }, [allCourses, visible]);

  return (
    <Dialog
      visible={visible}
      onHide={handleHide}
      className="w-8"
      header={visible?.schoolName}
    >
      <TabView pt={{ panelContainer : { style : { padding : '8px 4px' }}}}>
        <TabPanel header="Info general">
          <InfoGeneralTab 
            {...formState} 
            toastRef={toastRef} 
            handleHide={handleHide}
            schoolId={visible?.schoolId}
            disabled={visible?.inactive}
            handleUpdateSchool={handleUpdateSchoolInMemory}
          />
        </TabPanel>
        <TabPanel header={`Cursos (${visible?.courses?.length ?? 0})`}>
          <CursosTab 
            toastRef={toastRef}
            allCourses={courses} 
            courses={visible?.courses} 
            schoolId={visible?.schoolId} 
            disabled={visible?.inactive}
            handleUpdateSchoolCourses={handleUpdateSchoolCourses}
            handleRemoveCourseFromSchool={handleRemoveCourseFromSchool}
          />
        </TabPanel>
      </TabView>
      <Toast ref={toastRef} />
    </Dialog>
  )
}