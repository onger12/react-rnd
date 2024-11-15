import { useContext, useEffect, useRef, useState } from 'react';

import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

import { useAdmin } from '../../hooks';
import { RootContext } from '../../App';
import { AdminWrapper } from '../../wrappers';
import { ctc, DeleteCourse, handleToastDone } from '../../helpers';
import { EditDialog, NewDialog, NewExamDialog } from '../../components';

const formData = [
  { label : 'Nombre', required : true, type : 'InputText', inputKey : 'courseName' },
  { label : 'Descripción', required : true, type : 'InputTextarea', inputKey : 'courseDescription' },
]

const relatedDataFields = [
  { field : 'videoName', header : 'Nombre', sortable : true, filter : true, default : 'Datos no cargados' },
  { field : 'videoDescription', header : 'Descripción', sortable : true, filter : true, body : 'description', default : 'Datos no cargados' },
  { field : 'usersCount', header : 'Estudiantes inscritos', align : 'right', default : 'Datos no cargados' },
  { field : 'actions', header : 'Acciones', align : 'center', include : ['remove'], default : 'Datos no cargados' },
]

export const AdminCoursesScreen = () => {

  const [addingExam, setAddingExam] = useState(null);
  const [addingNewCourse, setAddingNewCourse] = useState(false);
  const [currentCourseToEdit, setCurrentCourseToEdit] = useState(null);

  const { handleLoaders, loaders } = useContext(RootContext);

  // refs
  const toastRef = useRef(null);

  // hooks
  const { getVideos, getCourses, videos, courses, handleCourses, reorderVideosCourse } = useAdmin({ handleLoaders, toastRef });

  // handlers
  const handleReorderVideosCourseInState = async ({ data }) => {
    const cs = [...courses];
    const index = cs?.findIndex(t => t?.courseId == currentCourseToEdit?.courseId);
    if(index >= 0) {
      const originalVideos = cs[index].videos;
      cs[index].videos = [...data];
      setCurrentCourseToEdit({...cs[index]});
      handleCourses(cs);
      
      await reorderVideosCourse({ body : { 
        courseId : cs[index]?.courseId,
        videosIds : data?.map(t => t?.videoId),
      }, onError : () => {
        cs[index].videos = [originalVideos];
        setCurrentCourseToEdit({...cs[index]});
        handleCourses(cs);
      }});
    }
  }
  const handleAddExamToCourseInState = ({ exam }) => {
    const cs = [...courses];
    const index = cs?.findIndex(t => t?.courseId == exam?.courseId);
    if(index >= 0) {
      cs[index].exams = [exam];
      handleCourses(cs);
      handleToastDone({ detail : `El cuestionario fue agregado con éxito al curso ${cs[index]?.courseName}`, ref : toastRef });
    }
  }
  const handleRemoveVideoFromCourse = ({ body }) => {
    if(!body?.courseId || !body?.videoId) return;
    const courses_ = [...courses];
    const index = courses_.findIndex(t => t?.courseId == body?.courseId);
    if(index >= 0) {
      const videos_ = courses_[index]?.videos?.filter(t => t?.videoId != body?.videoId);
      const usersCount = videos_?.length > 0 ? courses_[index]?.usersCount : 0;
      courses_[index] = {...courses_[index], videos : videos_, videosCount : videos_?.length, usersCount};

      handleCourses(courses_);
      setCurrentCourseToEdit(courses_[index]);
    }
  }
  const handleUpdateCourseFromSchool = ({ body, courseId }) => {
    if(!courseId) return;
    const courses_ = [...courses];
    const index = courses_.findIndex(t => t?.courseId == courseId);
    if(index >= 0) {
      const videos_ = [...body, ...courses_[index]?.videos];
      courses_[index] = { ...courses_[index], videos : videos_, videosCount : videos_?.length };

      handleCourses(courses_);
      setCurrentCourseToEdit(courses_[index]);
    }
  }
  const handleUpdateCourseInState = (c) => {
    const courses_ = [...courses];
    const index = courses_?.findIndex(t => t?.courseId == c?.courseId);
    if(index >= 0) {
      courses_[index] = {...courses_[index], ...c};
      handleCourses(courses_);
      setCurrentCourseToEdit({...c});
    }
  }
  const handleAddNewCourse = (course) => {
    const videosCount = course?.videos?.length ?? 0;
    const usersCount = course?.videos?.length > 0 ? course?.usersCount : 0;
    handleCourses([{...course, usersCount, videosCount }, ...courses]);
  }
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
        icon="pi pi-book"
        severity='secondary'
        className='w-2rem h-2rem'
        onClick={() => setAddingExam(row?.exams[0] ?? { courseId : row?.courseId, addingNew : true })}
        pt={{ icon : { style : { fontSize : 12 } } }}
        tooltip='Ver cuestionario'
        tooltipOptions={{ position : 'bottom' }}
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
            scrollable
            size="small" 
            showGridlines
            removableSort
            className='w-full'
            scrollHeight='70vh'
            value={courses ?? []}
            footer={BodyFooterTablaCurso}
            emptyMessage="No hay cursos aún"
            pt={{ footer : { style : { padding : 0 } } }}
            loading={loaders?.inventoryHead || loaders?.consolidateLines}
            virtualScrollerOptions={courses?.length > 30 ? { itemSize: 46 } : null}
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
      {/* <EditCourseDialog 
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
      /> */}
      
      <EditDialog 
        allowReorder
        dataId="courseId" 
        formData={formData} 
        dataName="courseName" 
        secondTabTitle="Videos" 
        relatedDataId="videoId" 
        allRelatedData={videos} 
        data={currentCourseToEdit} 
        relatedDataKeyName="videoName" 
        visible={!!currentCourseToEdit} 
        relatedDataFields={relatedDataFields} 
        relatedData={currentCourseToEdit?.videos} 
        onHide={() => setCurrentCourseToEdit(false)} 
        handleUpdateData={handleUpdateCourseInState} 
        relatedDataKeyDescription="courseDescription" 
        handleReorderRelatedData={handleReorderVideosCourseInState}
        handleRemoveRelatedDataFromData={handleRemoveVideoFromCourse} 
        handleUpdateRelatedDataFromData={handleUpdateCourseFromSchool} 
        initialFormState={{ courseName: currentCourseToEdit?.courseName, courseDescription : currentCourseToEdit?.courseDescription }} 
      />
      <NewDialog 
        allowReorder 
        dataId="courseId" 
        formData={formData} 
        dataName="courseName" 
        secondTabTitle="Videos" 
        relatedDataId="videoId" 
        allRelatedData={videos} 
        dialogTitle="Nuevo Curso" 
        visible={!!addingNewCourse} 
        relatedDataKeyName="videoName" 
        relatedDataFields={relatedDataFields} 
        handleAddNewEntity={handleAddNewCourse} 
        onHide={() => setAddingNewCourse(false)} 
        relatedDataKeyDescription="courseDescription" 
        handleReorderRelatedData={handleReorderVideosCourseInState} 
        initialFormState={{ courseName: '', courseDescription : '' }} 
      />

      <NewExamDialog 
        visible={addingExam}
        onHide={() => setAddingExam(null)}
        handleExamCourseInState={handleAddExamToCourseInState}
      />
    </AdminWrapper>
  )
}
