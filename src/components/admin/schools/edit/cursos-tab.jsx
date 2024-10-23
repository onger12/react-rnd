import { useContext, useState } from "react";

import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { MultiSelect } from "primereact/multiselect";

import { RootContext } from "../../../../App";
import { AddCourseToSchool, ctc, RemoveCourseFromSchool } from "../../../../helpers";

export const CursosTab = ({ schoolId, disabled, courses, allCourses, handleUpdateSchoolCourses, handleRemoveCourseFromSchool, toastRef }) => {

  const [addingNewCourse, setAddingNewCourse] = useState(false);
  const [currentCoursesToAdd, setCurrentCoursesToAdd] = useState(null);

  const { loaders, handleLoaders } = useContext(RootContext);

  // BD
  const handleDoneAddNewCourse = async () => {
    handleLoaders({ addCourse : true });
    try {
      const body = {
        schoolId,
        coursesIds : currentCoursesToAdd?.map(t => t?.courseId),
      }
      
      await AddCourseToSchool(body);
      handleUpdateSchoolCourses(currentCoursesToAdd);
      setCurrentCoursesToAdd(null);
      setAddingNewCourse(false);
    } catch (e) {
      ctc(e, 'Hubo un error al agregar el curso a la escuela.', toastRef)
    } finally {
      handleLoaders({ addCourse : false });
    }
  }
  const handleRemoveCourse = async ({ courseId } = {}) => {
    if(!courseId) return;
    handleLoaders({ removeCourse : courseId });
    try {
      const body = {
        schoolId,
        courseId,
      }
      
      await RemoveCourseFromSchool(body);
      handleRemoveCourseFromSchool(body, true);
    } catch (e) {
      ctc(e, 'Hubo un error al eliminar el curso a la escuela.', toastRef)
    } finally {
      handleLoaders({ removeCourse : null });
    }
  }

  // bodys
  const BodyFooter = () => {
    if(addingNewCourse) {
      return (
        <div 
          className='w-full h-full flex align-items-center gap-2 p-2 bg-gray-200 transition-all transition-duration-200 transition-ease-out' 
        >
          <MultiSelect 
            filter 
            className="w-8" 
            options={allCourses} 
            optionLabel="courseName" 
            optionDisabled="disabled" 
            value={currentCoursesToAdd} 
            loading={loaders?.addCourse} 
            disabled={loaders?.addCourse} 
            placeholder="Selecciona un nuevo curso" 
            onChange={(e) => setCurrentCoursesToAdd(e.value)} 
          />
          <Button 
            label="Guardar"
            icon="pi pi-save"
            severity="secondary"
            className="w-4"
            disabled={!currentCoursesToAdd}
            onClick={handleDoneAddNewCourse}
          />
        </div>
      )
    }
    return (
      <div 
        className={`w-full h-full p-2 bg-gray-200 transition-all transition-duration-200 transition-ease-out ${disabled ? '' : 'cursor-pointer hover:bg-gray-300'}`} 
        onClick={() => {
          if(disabled) return;
          setAddingNewCourse(true)
        }}
      >
        <span className='font-bold text-sm select-none'>Asingar nuevos <i className='pi pi-plus text-gray-900 text-xs font-bold' /></span>
        {/* <Button 
          unstyled
          className='bg-gray-800 hover:bg-gray-700 text-white font-bold px-3 py-2 border-round-sm block m-0 transition-all transition-duration-200 transition-ease-out'
          label="Ver todo"
          style={{ outline : 'none' }}
        /> */}
      </div>
    )
  }
  const BodyDescription = (row) => (
    <div className='overflow-hidden w-full p-0 m-0 flex gap-2 align-items-center justify-content-between'>
      <span className='text-overflow-ellipsis overflow-hidden w-full block white-space-nowrap'>
        {row?.courseDescription}
      </span>
      {
        row?.courseDescription?.length > 110 && (
          <Button 
            text 
            rounded 
            unstyled 
            icon="pi pi-info-circle" 
            tooltip={row?.courseDescription} 
            className='button-unstyled text-gray-700 hover:text-gray-400' 
            tooltipOptions={{ position : 'top', hideDelay : 150, showDelay : 250, style : { maxWidth : 500 } }} 
          />
        )
      }
    </div>
  )
  const BodyAcciones = (row) => (
    <Button 
      text 
      rounded 
      severity='danger' 
      icon='pi pi-trash' 
      className='w-2rem h-2rem' 
      onClick={() => handleRemoveCourse(row)} 
      pt={{ icon : { style : { fontSize : 12 } } }} 
      loading={loaders?.removeCourse == row?.courseId} 
      disabled={loaders?.removeCourse || disabled} 
    />
  )

  return (
    <div className="w-full">
      <h1 className="mt-0 mb-2">Cursos asignados</h1>
        <div className="flex w-full align-items-center gap-2">
          <DataTable
            rows={10} 
            // paginator
            scrollable
            size="small" 
            showGridlines
            removableSort
            className='w-full'
            // tableClassName="h-full"
            scrollHeight='50vh'
            footer={BodyFooter}
            value={courses ?? []}
            emptyMessage={() => <div className="w-full flex h-full">No hay cursos aún</div>}
            virtualScrollerOptions={{ itemSize: 46 }}
            pt={{ footer : { style : { padding : 0 } } }}
          >
            <Column 
              field="courseName"
              header="Nombre"
              filter
              sortable
              style={{ widht : '12rem', maxWidth : '12rem' }}
            />
            <Column 
              field="description"
              header="Descripción"
              filter
              sortable
              body={BodyDescription}
            />
            <Column 
              field="usersCount"
              align="right"
              header="Estudiantes inscritos"
            />
            <Column 
              field=""
              align="center"
              header="Acciones"
              body={BodyAcciones}
            />
          </DataTable>
        </div>
    </div>
  )
}
