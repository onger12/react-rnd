import { useContext, useEffect, useRef, useState } from 'react';

import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

import { useAdmin } from '../../hooks';
import { RootContext } from '../../App';
import { AdminWrapper } from '../../wrappers';

export const AdminCoursesScreen = () => {

  const { handleLoaders, loaders } = useContext(RootContext);

  // refs
  const toastRef = useRef(null);

  // hooks
  const { getCourses, courses } = useAdmin({ handleLoaders, toastRef });

  // handlers
  const handleInitScreen = () => {
    getCourses();
  }

  // bodys
  const BodyDescription = (row) => (
    <div className='overflow-hidden w-full p-0 m-0 flex gap-2 align-items-center justify-content-between'>
      <span className='text-overflow-ellipsis overflow-hidden w-full block white-space-nowrap'>
        {row?.courseDescription}
      </span>
      {
        row?.courseDescription?.length > 20 && (
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
  const BodyCursosEscuela = (row) => Math.floor(Math.random() * 40);
  const BodyInscritosEscuela = (row) => Math.floor(Math.random() * 200);
  const BodyAcciones = (row) => (
    <div className='w-full flex align-items-center justify-content-center gap-2'>
      <Button 
        icon="pi pi-pencil"
        text
        rounded
        severity='secondary'
        className='w-2rem h-2rem'
        pt={{ icon : { style : { fontSize : 12 } } }}
      />
      <Button 
        icon="pi pi-eye"
        text
        rounded
        severity='secondary'
        className='w-2rem h-2rem'
        pt={{ icon : { style : { fontSize : 12 } } }}
        tooltip='Ver cursos asignados'
        tooltipOptions={{ position : 'top', hideDelay : 150, showDelay : 250, style : { fontSize : 12 } }}
      />
    </div>
  )
  const BodyFooterTablaEscuela = () => {
    return (
      <div className='w-full h-full p-2 bg-gray-200 hover:bg-gray-300 transition-all transition-duration-200 transition-ease-out cursor-pointer'>
        <span className='font-bold text-sm'>Agregar nueva <i className='pi pi-plus text-gray-900 text-xs font-bold' /></span>
        {/* <Button 
          unstyled
          className='bg-gray-800 hover:bg-gray-700 text-white font-bold px-3 py-2 border-round-sm block m-0 transition-all transition-duration-200 transition-ease-out'
          label="Ver todo"
          style={{ outline : 'none' }}
        /> */}
      </div>
    )
  }

  useEffect(() => {
    handleInitScreen();
  }, []);

  return (
    <AdminWrapper toastRef={toastRef}>
      <section className='px-3 py-2'>
        <h1>Todas los Cursos</h1>
        <div className="flex w-full align-items-center gap-2">
          <DataTable
            rows={10} 
            // paginator
            scrollable
            size="small" 
            showGridlines
            removableSort
            footer={BodyFooterTablaEscuela}
            value={courses ?? []}
            scrollHeight='70vh'
            className='w-full'
            // header={BodyHeader}
            // rowsPerPageOptions={[10, 25, 50, 100]} 
            emptyMessage="No hay escuelas aún"
            pt={{ footer : { style : { padding : 0 } } }}
            // virtualScrollerOptions={{ itemSize: 46 }}
            loading={loaders?.inventoryHead || loaders?.consolidateLines}
            // currentPageReportTemplate="{first} de {last} - {totalRecords}"
            // paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
          >
            <Column 
              field="courseName"
              header="Nombre"
            />
            <Column 
              field="description"
              header="Descripción"
              style={{ widht : '12rem', maxWidth : '12rem' }}
              body={BodyDescription}
            />
            <Column 
              field="courses"
              align="right"
              body={BodyCursosEscuela}
              header="Cursos disponibles"
              />
            <Column 
              field="students"
              align="right"
              header="Estudiantes inscritos"
              body={BodyInscritosEscuela}
            />
            <Column 
              field=""
              align="center"
              header="Acciones"
              body={BodyAcciones}
            />
          </DataTable>
        </div>
      </section>

    </AdminWrapper>
  )
}
