import { useContext, useEffect, useRef, useState } from "react";

import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { TabPanel, TabView } from "primereact/tabview";

import { CoursesTab } from "./courses-tab";
import { useForm } from "../../../../hooks";
import { RootContext } from "../../../../App";
import { InfoGeneralTab } from "./info-general-tab";
import { AddNewUser, ctc } from "../../../../helpers";

export const NewColabDialog = ({ visible, onHide, allCourses, handleAddNewColabInState }) => {

  const [courses, setCourses] = useState([]);

  const { loaders, handleLoaders } = useContext(RootContext);

  // refs
  const toastRef = useRef(null);

  // hooks
  const formState = useForm({
    name : '',
    document : '',
    courses : null,
  });

  // handlers
  const handleAddNewCourses = (vds) => {
    formState?.onChangeManual({
      courses : [...vds, ...(formState?.formState?.courses ?? [])],
    });

    setCourses(t => t?.map(s => {
      const find = [...(formState?.formState?.courses ?? []), ...vds]?.find(x => x?.courseId == s?.courseId);
        return ({
          ...s, 
          disabled : !!find,
          courseName : !!find ? `${s?.courseName} [Ya agregado]` : s?.courseName
        })
      }
    ))
  }
  const handleAddNewColab = (data) => {
    handleAddNewColabInState(data);
    handleHide();
  }
  const handleRemoveCourse = (vd) => {
    formState?.onChangeManual({
      courses : (formState?.formState?.courses ?? [])?.filter(t => t?.courseId != vd?.courseId),
    });

    setCourses(t => t?.map(s => {
        const find = s?.courseId == vd?.courseId;
        return ({
          ...s, 
          disabled : !!find ? false : s?.disabled,
          courseName : !!find ? s?.courseName?.includes('[Ya agregado]') ? s?.courseName?.split('[Ya agregado]')[0] : s?.courseName : s?.courseName
        })
      }
    ))
  }
  const handleHide = () => {
    formState.onChangeManual({
      document : "", 
      name : "", 
    });
    onHide && onHide();
  }

  // BD
  const handleSaveNewColab = async () => {
    try {
      handleLoaders({ saveColab : true });
      const body = {
        document : formState?.formState?.document,
        userName : formState?.formState?.name,
        coursesIds : formState?.formState?.courses?.map(t => t?.courseId),
      }

      const colab = await AddNewUser(body);
      handleAddNewColabInState({...colab, courses : formState?.formState?.courses});
      handleHide();
    } catch (e) {
      ctc(e, 'Hubo un error al agregar el colaborador.', toastRef);
    } finally {
      handleLoaders({ saveColab : false });
    }
  }

  // bodys
  const BodyFooter = () => (
    <div className="w-full flex gap-2 aling-items-center">
      <Button 
        text
        className="w-6"
        label="Cancelar"
        icon="pi pi-times"
        severity="secondary"
      />
      <Button 
        type="submit"
        label="Guardar"
        className="w-6"
        icon="pi pi-save"
        severity="secondary"
        onClick={handleSaveNewColab}
        disabled={loaders?.save || formState?.disabledButtonSave}
      />
    </div>
  )

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
      footer={BodyFooter}
      header="Nuevo colaborador"
    >
      <TabView pt={{ panelContainer : { style : { padding : '8px 4px' }}}}>
        <TabPanel header="Info general">
          <InfoGeneralTab 
            {...formState} 
            courses={courses}
            toastRef={toastRef} 
            document={visible?.document}
            handleAddNewColabInState={handleAddNewColab}
          />
        </TabPanel>
        <TabPanel header={`Cursos (${formState?.formState?.courses?.length ?? 0})`}>
          <CoursesTab 
            allCourses={courses} 
            courses={formState?.formState?.courses}
            handleRemoveCourse={handleRemoveCourse} 
            document={formState?.formState?.document}
            handleAddNewCourses={handleAddNewCourses}
          />
        </TabPanel>
      </TabView>
      <Toast ref={toastRef} />
    </Dialog>
  )
}