import { useEffect, useRef, useState } from "react";

import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { TabPanel, TabView } from "primereact/tabview";

import { CoursesTab } from "./courses-tab";
import { useForm } from "../../../../hooks";
import { InfoGeneralTab } from "./info-general-tab";

export const EditColabDialog = ({ visible, onHide, allCourses, handleUpdateColabInState }) => {

  const [courses, setCourses] = useState([]);

  // refs
  const toastRef = useRef(null);

  // hooks
  const formState = useForm({
    document : '',
    name : '',
  });

  // handlers
  const handleRemoveCourse = (vd) => handleUpdateColabInState({...visible, courses : visible?.courses?.filter(t => t?.videoId != vd?.videoId)}, true)
  const handleUpdateColabCourses = (vds) => handleUpdateColabInState({...visible, courses : [...vds, ...(visible?.courses ?? [])]}, true);
  const handleUpdateColab = () => {
    handleUpdateColabInState({...visible, userName : formState?.formState?.name});
    handleHide();
  }
  const handleHide = () => {
    onHide && onHide();
  }

  useEffect(() => {
    if(!!visible) {
      formState.onChangeManual({
        document : visible?.document, 
        name : visible?.userName, 
      });
    }
  }, [visible]);

  useEffect(() => {
    formState?.handleValidateDisableButtonSave();
  }, [formState?.formState]);
  
  useEffect(() => {
    if(!visible) {
      setCourses([]);
      return;
    }
    setCourses(allCourses?.map(v => {
      const find = visible?.courses?.find(t => t?.courseId == v?.courseId);

      return ({
        ...v,
        disabled : !!find,
        courseName : !!find ? `${v?.courseName} [Ya agregado]` : v?.courseName,
      })
    }))
  }, [allCourses, visible]);

  return (
    <Dialog
      className="w-8"
      visible={visible}
      onHide={handleHide}
      header={visible?.document}
    >
      <TabView pt={{ panelContainer : { style : { padding : '8px 4px' }}}}>
        <TabPanel header="Info general">
          <InfoGeneralTab 
            {...formState} 
            courses={courses}
            toastRef={toastRef} 
            document={visible?.document}
            handleEditColabInState={handleUpdateColab}
          />
        </TabPanel>
        <TabPanel header={`Cursos (${visible?.courses?.length ?? 0})`}>
          <CoursesTab 
            {...visible}
            toastRef={toastRef}
            allCourses={courses} 
            document={visible?.document}
            handleRemoveCourseFromColab={handleRemoveCourse}
            handleUpdateUserCourses={handleUpdateColabCourses}

          />
        </TabPanel>
      </TabView>
      <Toast ref={toastRef} />
    </Dialog>
  )
}