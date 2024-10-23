import { useState } from "react";

import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { MultiSelect } from "primereact/multiselect";

export const CoursesTab = ({ document, inactive : disabled, courses, allCourses, handleAddNewCourses, handleRemoveCourse }) => {

  const [addingNewCourse, setAddingNewCourse] = useState(false);
  const [currentCoursesToAdd, setCurrentCoursesToAdd] = useState(null);

  // handlers
  const handleDoneAddNewCourse = () => {
    handleAddNewCourses(currentCoursesToAdd);
    setAddingNewCourse(false);
    setCurrentCoursesToAdd(null);
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
        className={`w-full h-full p-2 bg-gray-200 transition-all transition-duration-200 transition-ease-out ${disabled || !document ? '' : 'cursor-pointer hover:bg-gray-300'}`} 
        onClick={() => {
          if(disabled || !document) return;
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
  const BodyLink = ({ link }) => (
    <div className="flex align-items-center justify-content-center w-full">
      <a 
        href={link}
        target="_blank"
        severity="secondary"
        className="underline-none flex align-items-center justify-content-center w-2 pi pi-external-link w-2rem h-2rem border-circle hover:bg-gray-100 text-gray-900 hover:text-black-700 transtion-duration-200 transition-all transition-ease-out"
      />
    </div>
  )
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
    />
  )

  return (
    <div className="w-full">
      <h4 className="mt-0 mb-2 font-italic">Cursos asignados</h4>
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
              field="progress"
              align="right"
              header="Progreso"
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
