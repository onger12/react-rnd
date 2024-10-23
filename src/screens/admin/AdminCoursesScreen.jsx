import { useContext, useEffect, useRef, useState } from 'react';

import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

import { useAdmin } from '../../hooks';
import { RootContext } from '../../App';
import { AdminWrapper } from '../../wrappers';
import { ctc, DeleteCourse } from '../../helpers';
import { EditCourseDialog, NewCourseDialog } from '../../components';

export const AdminCoursesScreen = () => {

  const [addingNewCourse, setAddingNewCourse] = useState(false);
  const [currentCourseToEdit, setCurrentCourseToEdit] = useState(null);

  const { handleLoaders, loaders } = useContext(RootContext);

  // refs
  const toastRef = useRef(null);

  // hooks
  const { getVideos, getCourses, videos, courses, handleCourses } = useAdmin({ handleLoaders, toastRef });

  // handlers
  const handleUpdateCourseInState = (c, updateCurrentCourseEditing = false) => {
    const courses_ = [...courses];
    const index = courses_?.findIndex(t => t?.courseId == c?.courseId);
    if(index >= 0) {
      courses_[index] = {...courses_[index], ...c};
      handleCourses(courses_);
      if(updateCurrentCourseEditing) {
        setCurrentCourseToEdit({...c});
      }
    }
  }
  const handleAddNewCourseInState = (course) => handleCourses([course, ...courses]);
  const handleUpdateCoursesListInState = (course) => {
    const courses_ = [...courses];
  }
  // const handleRemoveCourseFromList = (c) => {
  //   const courses_ = [...courses];
  //   const index = courses_?.findIndex(t => t?.courseId == c?.courseId);
  //   if(index >= 0) {
  //     courses_[index] = {...courses_[index], inactive : true};
  //     handleCourses(courses_);
  //   }
  // }
  const handleRemoveCourseFromList = (c) => handleCourses(courses?.filter(t => t?.courseId != c?.courseId))
  const handleInitScreen = () => {
    getVideos({ inactive : false, take : 100000, skip : 0 });
    getCourses({ inactive : false });
  }

  // BD
  const handleRemoveCourse = async (row) => {
    try {
      handleLoaders({ deleteCourse : row });
      await DeleteCourse(row);
      handleRemoveCourseFromList(row);
    } catch (e) {
      ctc(e, 'Hubo un error al borrar el curso.', toastRef);
    } finally {
      handleLoaders({ deleteCourse : null });
    }
  }

  // bodys
  const BodyVideos = (row) => row?.videos?.length
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
    <div className='w-full flex align-items-center justify-content-center gap-2'>
      <Button 
        text
        rounded
        icon="pi pi-pencil"
        severity='secondary'
        className='w-2rem h-2rem'
        onClick={() => setCurrentCourseToEdit(row)}
        pt={{ icon : { style : { fontSize : 12 } } }}
      />
      <Button 
        text 
        rounded 
        severity="danger" 
        icon="pi pi-trash" 
        className="w-2rem h-2rem" 
        onClick={() => handleRemoveCourse(row)} 
        disabled={loaders?.deleteCourse || row?.inactive} 
        loading={loaders?.deleteCourse?.courseId == row?.courseId} 
      />
    </div>
  )
  const BodyFooterTablaCurso = () => {
    return (
      <div 
        className='w-full h-full p-2 bg-gray-200 hover:bg-gray-300 transition-all transition-duration-200 transition-ease-out cursor-pointer'
        onClick={() => setAddingNewCourse(true)}
      >
        <span className='font-bold text-sm select-none'>Agregar nuevo <i className='pi pi-plus text-gray-900 text-xs font-bold' /></span>
      </div>
    )
  }

  useEffect(() => {
    handleInitScreen();
  }, []);

  return (
    <AdminWrapper toastRef={toastRef}>
      <section className='px-3 py-2'>
        <h1>Todos los Cursos</h1>
        <div className="flex w-full align-items-center gap-2">
          <DataTable
            rows={10} 
            // paginator
            scrollable
            size="small" 
            showGridlines
            removableSort
            footer={BodyFooterTablaCurso}
            value={courses ?? []}
            scrollHeight='70vh'
            className='w-full'
            // header={BodyHeader}
            // rowsPerPageOptions={[10, 25, 50, 100]} 
            emptyMessage="No hay cursos aún"
            virtualScrollerOptions={{ itemSize: 46 }}
            pt={{ footer : { style : { padding : 0 } } }}
            // virtualScrollerOptions={{ itemSize: 46 }}
            loading={loaders?.inventoryHead || loaders?.consolidateLines}
            // currentPageReportTemplate="{first} de {last} - {totalRecords}"
            // paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
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
              align="right"
              field="videosCount"
              body={BodyVideos}
              header="Videos asignados"
            />
            <Column 
              field="usersCount"
              align="right"
              header="Estudiantes inscritos"
              // body={BodyInscritosEscuela}
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
      <EditCourseDialog 
        allVideos={videos}
        visible={currentCourseToEdit}
        onHide={() => setCurrentCourseToEdit(null)}
        handleUpdateCourseInState={handleUpdateCourseInState}
      />
      <NewCourseDialog 
        allVideos_={videos}
        visible={addingNewCourse}
        onHide={() => setAddingNewCourse(false)}
        handleAddNewCourseInState={handleAddNewCourseInState}
      />
    </AdminWrapper>
  )
}
