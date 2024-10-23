import { useState } from "react";

import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { MultiSelect } from "primereact/multiselect";

export const CursosTab = ({ courses, allCourses, handleAddCourses }) => {

  const [addingNewCourse, setAddingNewCourse] = useState(false);
  const [currentCoursesToAdd, setCurrentCoursesToAdd] = useState(null);

  const handleCoursesDone = () => {
    handleAddCourses(currentCoursesToAdd);
    setCurrentCoursesToAdd(null);
    setAddingNewCourse(false);
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
            placeholder="Selecciona nuevos cursos" 
            onChange={(e) => setCurrentCoursesToAdd(e.value)} 
          />
          <Button 
            className="w-4"
            label="Guardar"
            icon="pi pi-save"
            severity="secondary"
            onClick={handleCoursesDone}
            disabled={!currentCoursesToAdd}
          />
        </div>
      )
    }
    return (
      <div 
        className='w-full h-full p-2 bg-gray-200 transition-all transition-duration-200 transition-ease-out cursor-pointer hover:bg-gray-300'
        onClick={() => setAddingNewCourse(true)}
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
      icon="pi pi-trash"
      text
      rounded
      severity='danger'
      className='w-2rem h-2rem'
      pt={{ icon : { style : { fontSize : 12 } } }}
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
