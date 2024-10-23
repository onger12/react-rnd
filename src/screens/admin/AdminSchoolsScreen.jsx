import { useContext, useEffect, useRef, useState } from 'react';

import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';

import { useAdmin } from '../../hooks';
import { RootContext } from '../../App';
import { EditDialog, NewDialog } from '../../components';
import { AdminWrapper } from '../../wrappers';

const formData = [
  { label : 'Nombre', required : true, type : 'InputText', inputKey : 'schoolName' },
  { label : 'Descripción', required : true, type : 'InputTextarea', inputKey : 'schoolDescription' },
]

const relatedDataFields = [
  { field : 'courseName', header : 'Nombre', sortable : true, filter : true },
  { field : 'courseDescription', header : 'Descripción', sortable : true, filter : true, body : 'description' },
  { field : 'usersCount', header : 'Estudiantes inscritos', align : 'right' },
  { field : 'actions', header : 'Acciones', align : 'center', include : ['remove'] },
]

export const AdminSchoolsScreen = () => {

  const [creatingNewSchool, setCreatingNewSchool] = useState(false);
  const [currentSchoolToEdit, setCurrentSchoolToEdit] = useState(null);

  const { handleLoaders, loaders } = useContext(RootContext);

  // refs
  const toastRef = useRef(null);

  // hooks
  const { schools, courses, getSchools, getCourses, handleSchools, deleteSchool } = useAdmin({ handleLoaders, toastRef });

  // confirms
  const confirmDeleteSchool = (event, sch) => {
    confirmPopup({
      target: event.currentTarget,
      message: '¿Está seguro que desea eliminar la escuela?',
      icon: 'pi pi-exclamation-triangle',
      defaultFocus: 'reject',
      acceptLabel : 'Si',
      accept : () => deleteSchool({schoolId : sch?.schoolId}, () => handleRemoveSchoolFromSchool(sch)),
    });
  }

  // handlers
  const handleUpdateRelatedDataFromData = ({ body, schoolId }) => {
    if(!schoolId) return;
    const schools_ = [...schools];
    const index = schools_.findIndex(t => t?.schoolId == schoolId);
    if(index >= 0) {
      const courses_ = [...body, ...schools_[index]?.courses];
      schools_[index] = { ...schools_[index], courses : courses_, coursesCount : courses_?.length };

      handleSchools(schools_);
      setCurrentSchoolToEdit(schools_[index]);
    }
  }
  const handleAddNewSchool = (sch) => {
    const coursesCount = sch?.courses?.length ?? 0;
    const usersCount = sch?.courses?.length > 0 ? sch?.usersCount : 0;
    handleSchools([{...sch, coursesCount, usersCount }, ...schools]);
  }
  const handleRemoveSchoolFromSchool = (sch) => handleSchools(schools?.filter(t => t?.schoolId != sch?.schoolId));
  const handleRemoveCourseFromSchool = ({ body }) => {
    if(!body?.schoolId || !body?.courseId) return;
    const schools_ = [...schools];
    const index = schools_.findIndex(t => t?.schoolId == body?.schoolId);
    if(index >= 0) {
      const courses_ = schools_[index]?.courses?.filter(t => t?.courseId != body?.courseId);
      const usersCount = courses_?.length > 0 ? schools_[index]?.usersCount : 0;
      schools_[index] = {...schools_[index], courses : courses_, coursesCount : courses_?.length, usersCount};

      handleSchools(schools_);
      setCurrentSchoolToEdit(schools_[index]);
    }
  }
  const handleUpdateSchoolInMemory = (school) => {
    const schools_ = [...schools];
    const index = schools_.findIndex(t => t?.schoolId == school?.schoolId);
    if(index >= 0) {
      schools_[index] = {...schools_[index], ...school };
      handleSchools(schools_);
      setCurrentSchoolToEdit(schools_[index]);
    }
  }
  const handleInitScreen = () => {
    getSchools({ inactive : false });
    getCourses({ inactive : false });
  }

  // bodys
  const BodyDescription = (row) => (
    <div className='overflow-hidden w-full p-0 m-0 flex gap-2 align-items-center justify-content-between'>
      <span className='text-overflow-ellipsis overflow-hidden w-full block white-space-nowrap'>
        {row?.schoolDescription}
      </span>
      {
        row?.schoolDescription?.length > 20 && (
          <Button 
            text 
            rounded 
            unstyled 
            icon="pi pi-info-circle" 
            tooltip={row?.schoolDescription} 
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
        icon={`pi pi-${row?.inactive ? 'eye' : 'pencil'}`}
        text
        rounded
        severity='secondary'
        className='w-2rem h-2rem'
        onClick={() => setCurrentSchoolToEdit(row)}
        pt={{ icon : { style : { fontSize : 12 } } }}
      />
      <Button 
        text
        rounded
        severity='danger'
        icon='pi pi-trash'
        className='w-2rem h-2rem'
        tooltip={row?.inactive ? 'Ya está eliminada' : ''}
        onClick={e => confirmDeleteSchool(e, row)}
        disabled={loaders?.deleteSchool || row?.inactive}
        loading={loaders?.deleteSchool?.schoolId == row?.schoolId}
        tooltipOptions={{ position : 'top', showOnDisabled : true }}
      />
    </div>
  )
  const BodyFooterTablaEscuela = () => {
    return (
      <div 
        className='w-full h-full p-2 bg-gray-200 hover:bg-gray-300 transition-all transition-duration-200 transition-ease-out cursor-pointer'
        onClick={() => setCreatingNewSchool(true)}
      >
        <span className='font-bold text-sm select-none'>Agregar nueva <i className='pi pi-plus text-gray-900 text-xs font-bold' /></span>
        {/* <Button 
          unstyled
          className='bg-gray-800 hover:bg-gray-700 text-white font-bold px-3 py-2 border-round-sm block m-0 transition-all transition-duration-200 transition-ease-out'
          label="Ver todo"
          style={{ outline : 'none' }}
          onClick={() => setCompressedSchoolDataTable(t => !t)}
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
        <h1>Todas las Escuelas</h1>
        <div className="flex w-full align-items-center gap-2">
          <DataTable
            rows={10} 
            // paginator
            scrollable
            size="small" 
            showGridlines
            removableSort
            footer={BodyFooterTablaEscuela}
            value={schools ?? []}
            scrollHeight='70vh'
            className='w-full'
            // header={BodyHeader}
            // rowsPerPageOptions={[10, 25, 50, 100]} 
            emptyMessage="No hay escuelas aún"
            pt={{ footer : { style : { padding : 0 } } }}
            // virtualScrollerOptions={{ itemSize: 46 }}
            loading={loaders?.schools}
            // currentPageReportTemplate="{first} de {last} - {totalRecords}"
            // paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
          >
            <Column 
              field="schoolName"
              header="Nombre"
              />
            <Column 
              field="description"
              header="Descripción"
              body={BodyDescription}
              style={{ widht : '24rem', maxWidth : '24rem' }}
            />
            <Column 
              field="coursesCount"
              align="right"
              // body={BodyCursosEscuela}
              header="Cursos disponibles"
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
        <EditDialog 
          dataId="schoolId" 
          formData={formData} 
          dataName="schoolName" 
          secondTabTitle="Cursos" 
          relatedDataId="courseId" 
          allRelatedData={courses} 
          data={currentSchoolToEdit} 
          relatedDataKeyName="courseName" 
          visible={!!currentSchoolToEdit} 
          relatedDataFields={relatedDataFields}
          relatedData={currentSchoolToEdit?.courses} 
          onHide={() => setCurrentSchoolToEdit(false)} 
          relatedDataKeyDescription="schoolDescription"
          handleUpdateData={handleUpdateSchoolInMemory} 
          handleRemoveRelatedDataFromData={handleRemoveCourseFromSchool} 
          handleUpdateRelatedDataFromData={handleUpdateRelatedDataFromData}
          initialFormState={{ schoolName: currentSchoolToEdit?.schoolName, schoolDescription : currentSchoolToEdit?.schoolDescription }} 
        />
        <NewDialog 
          dataId="schoolId" 
          formData={formData} 
          dataName="schoolName" 
          secondTabTitle="Cursos" 
          relatedDataId="courseId" 
          allRelatedData={courses} 
          dialogTitle="Nueva Escuela"
          visible={!!creatingNewSchool} 
          relatedDataKeyName="courseName" 
          relatedDataFields={relatedDataFields}
          handleAddNewEntity={handleAddNewSchool} 
          onHide={() => setCreatingNewSchool(false)} 
          relatedDataKeyDescription="schoolDescription"
          initialFormState={{ schoolName: '', schoolDescription : '' }} 
        />
      </section>

      <ConfirmPopup />
    </AdminWrapper>
  )
}
