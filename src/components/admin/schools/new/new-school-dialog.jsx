import { useContext, useEffect, useRef, useState } from "react";

import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { TabPanel, TabView } from "primereact/tabview";

import { CursosTab } from "./cursos-tab";
import { useForm } from "../../../../hooks";
import { InfoGeneralTab } from "./info-general-tab";
import { Button } from "primereact/button";
import { AddNewSchool, ctc } from "../../../../helpers";
import { RootContext } from "../../../../App";

export const NewSchoolDialog = ({ visible, onHide, allCourses, handleAddSchool }) => {

  const [courses, setCourses] = useState([]);

  const { handleLoaders, loaders } = useContext(RootContext);

  // refs
  const toastRef = useRef(null);

  // hooks
  const formStateState = useForm({
    name : '',
    description : '',
  });

  const { formState, handleValidateDisableButtonSave, disabledButtonSave } = formStateState ?? {};

  // handlers
  const handleAddCourses = (courses) => setCourses(t => [...courses, ...t]);
  const handleHide = () => {
    onHide && onHide();
  }

  // bodys
  const BodyFooter = () => {
    return (
      <div className="w-full flex gap-2 aling-items-center">
        <Button 
          text
          className='w-6'
          icon="pi pi-times"
          severity="secondary"
          onClick={handleHide}
          disabled={loaders?.save}
          label='Cancelar'
        />
        <Button 
          label="Guardar"
          className="w-6"
          icon="pi pi-save"
          severity="secondary"
          loading={loaders?.save}
          onClick={handleSave}
          disabled={loaders?.save || disabledButtonSave}
        />
      </div>
    )
  }

  // BD
  const handleSave = async () => {
    handleLoaders({ save : true });
    try {
      const body = {
        schoolName : formState?.name,
        schoolDescription : formState?.description,
        courses : courses?.map(t => ({courseId : t?.courseId})),
      }

      const school = await AddNewSchool(body);
      handleAddSchool({...school, coursesCount : courses?.length});
      handleHide();
    } catch (e) {
      ctc(e, 'Hubo un error al guardar la escuela, intentelo de nuevo.', toastRef)
    } finally {
      handleLoaders({ save : false });
    }
  }

  useEffect(() => {
    handleValidateDisableButtonSave();
  }, [formState]);  

  return (
    <Dialog
      visible={visible}
      onHide={handleHide}
      className="w-8"
      header="Nueva escuela"
      footer={BodyFooter}
    >
      <TabView pt={{ panelContainer : { style : { padding : '8px 4px' }}}}>
        <TabPanel header="Info general">
          <InfoGeneralTab 
            {...formStateState} 
            toastRef={toastRef} 
            handleHide={handleHide}
          />
        </TabPanel>
        <TabPanel header={`Cursos (${courses?.length})`}>
          <CursosTab 
            courses={courses} 
            toastRef={toastRef} 
            allCourses={allCourses} 
            handleAddCourses={handleAddCourses} 
          />
        </TabPanel>
      </TabView>
      <Toast ref={toastRef} />
    </Dialog>
  )
}