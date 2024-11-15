import { useContext, useEffect, useRef, useState } from 'react';

import { Button } from 'primereact/button';
import { Column } from 'primereact/column';

import { useAdmin, useLearn } from '../../hooks';
import { RootContext } from '../../App';
import { AdminWrapper } from '../../wrappers';
import { ctc, dateFormat, DeleteUser } from '../../helpers';
import { EditDialog, NewDialog, Table } from '../../components';

const formData = [
  { label : 'Documento', required : true, type : 'InputText', inputKey : 'document', inputDisabled : { new : false, edit : true } },
  { label : 'Nombre', required : true, type : 'InputText', inputKey : 'userName' },
]

const relatedDataFields = [
  { field : 'courseName', header : 'Nombre', sortable : true, filter : true, default : 'Datos no cargados' },
  { field : 'courseDescription', header : 'Descripción', sortable : true, filter : true, body : 'description', default : 'Datos no cargados' },
  { field : 'videosCount', header : 'Total videos', align : 'right', default : 'Datos no cargados' },
  { field : 'videosWatchedCount', header : 'Videos vistos', align : 'right', default : 'Datos no cargados' },
  { field : 'videosWatchedPercent', header : '% Completado', align : 'center', body : 'progress', default : 'Datos no cargados' },
  { field : 'actions', header : 'Acciones', align : 'center', include : ['remove'], default : 'Datos no cargados' },
]

export const AdminColabsScreen = () => {

  const [addingNewColab, setAddingNewColab] = useState(false);
  const [currentColabToEdit, setCurrentColabToEdit] = useState(null);

  const { handleLoaders, loaders } = useContext(RootContext);

  // refs
  const toastRef = useRef(null);

  // hooks
  const { getCoursesByUser } = useLearn({ handleLoaders, toastRef });
  const { getUsers, users, getCourses, handleUsers, courses } = useAdmin({ handleLoaders, toastRef });

  // handlers
  const handleCurrentUserEdit = async (user) => {
    const courses = await getCoursesByUser({ document : user?.document }, null, true);
    setCurrentColabToEdit({ ...user, courses });
  }
  const handleUpdateColabInState = (colab) => {
    const colabs = [...users];
    const index = colabs?.findIndex(t => t?.document == colab?.document);
    if(index >= 0) {
      colabs[index] = {...colabs[index],...colab};
      handleUsers(colabs);
      setCurrentColabToEdit({...colabs[index], ...colab});
    }
  }
  const handleUpdateCourseFromColab = ({ body, document }) => {
    if(!document) return;
    const colabs_ = [...users];
    const index = colabs_.findIndex(t => t?.document == document);
    if(index >= 0) {
      const courses_ = [...body, ...colabs_[index]?.courses];
      colabs_[index] = { ...colabs_[index], courses : courses_, coursesCount : courses_?.length };

      handleUsers(colabs_);
      setCurrentColabToEdit(colabs_[index]);
    }
  }
  const handleRemoveCourseFromColab = ({ body }) => {
    if(!body?.document || !body?.courseId) return;
    const colabs_ = [...users];
    const index = colabs_.findIndex(t => t?.document == body?.document);
    if(index >= 0) {
      const courses_ = colabs_[index]?.courses?.filter(t => t?.courseId != body?.courseId);
      const usersCount = courses_?.length > 0 ? colabs_[index]?.usersCount : 0;
      colabs_[index] = {...colabs_[index], courses : courses_, coursesCount : courses_?.length, usersCount};

      handleUsers(colabs_);
      setCurrentColabToEdit(colabs_[index]);
    }
  }
  const handleAddNewColabInState = (user) => handleUsers([user, ...users]);
  const handleRemoveColabFromList = (c) => handleUsers(users?.filter(t => t?.document != c?.document))
  const handleInitScreen = () => {
    getCourses({ inactive : false });
    getUsers({ inactive : false });
  }

  // BD
  const handleRemoveColab = async (row) => {
    try {
      handleLoaders({ deleteColab : row });
      await DeleteUser(row);
      handleRemoveColabFromList(row);
    } catch (e) {
      ctc(e, 'Hubo un error al borrar el colaborador.', toastRef);
    } finally {
      handleLoaders({ deleteColab : null });
    }
  }

  // bodys
  const BodyAcciones = (row) => (
    <div className='w-full flex align-items-center justify-content-center gap-2'>
      <Button 
        text
        rounded
        icon="pi pi-pencil"
        severity='secondary'
        className='w-2rem h-2rem'
        onClick={() => handleCurrentUserEdit(row)}
        pt={{ icon : { style : { fontSize : 12 } } }}
      />
      <Button 
        text 
        rounded 
        severity="danger" 
        icon="pi pi-trash" 
        className="w-2rem h-2rem" 
        onClick={() => handleRemoveColab(row)} 
        disabled={loaders?.removeColab || row?.inactive} 
        loading={loaders?.removeColab?.document && loaders?.removeColab?.document == row?.document} 
      />
    </div>
  )
  const BodyFooterTablaColab = () => {
    return (
      <div 
        onClick={() => setAddingNewColab(true)} 
        className='w-full h-full p-2 bg-gray-200 hover:bg-gray-300 transition-all transition-duration-200 transition-ease-out cursor-pointer' 
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
        <h1>Todos los Usuarios</h1>
        <div className="flex w-full align-items-center gap-2">
          <Table
            value={users ?? []} 
            footer={BodyFooterTablaColab} 
            emptyMessage="No hay colaboradores aún" 
            loading={loaders?.inventoryHead || loaders?.consolidateLines} 
            virtualScrollerOptions={users?.length > 30 ? { itemSize: 46 } : null}
          >
            <Column 
              field="document"
              header="Documento"
              filter
              sortable
              style={{ widht : '12rem', maxWidth : '12rem' }}
            />
            <Column 
              filter
              sortable
              header="Nombre"
              field="userName"
              // body={BodyDescription}
            />
            <Column 
              align="right"
              field="insertBy"
              header="Creado Por"
              // body={BodyCursosEscuela}
            />
            <Column 
              align="right"
              field="insertOn"
              header="Fecha de creación"
              // body={BodyCursosEscuela}
              body={t => dateFormat({ date : t?.insertOn, specialDayOfWeekOnly : true })}
            />
            <Column 
              field=""
              align="center"
              header="Acciones"
              body={BodyAcciones}
            />
          </Table>
        </div>
      </section>
      {/* <EditColabDialog
        allCourses={courses}
        visible={currentColabToEdit}
        onHide={() => setCurrentColabToEdit(null)}
        handleUpdateColabInState={handleUpdateColabInState}
      />
      <NewColabDialog
        allCourses={courses}
        visible={addingNewColab}
        onHide={() => setAddingNewColab(false)}
        handleAddNewColabInState={handleAddNewColabInState}
      /> */}
      
      <EditDialog 
        dataId="document" 
        formData={formData} 
        dataName="userName" 
        secondTabTitle="Cursos" 
        relatedDataId="courseId" 
        allRelatedData={courses} 
        data={currentColabToEdit} 
        visible={!!currentColabToEdit} 
        relatedDataKeyName="courseName" 
        relatedDataFields={relatedDataFields} 
        relatedData={currentColabToEdit?.courses} 
        onHide={() => setCurrentColabToEdit(false)} 
        handleUpdateData={handleUpdateColabInState} 
        relatedDataKeyDescription="schoolDescription" 
        handleRemoveRelatedDataFromData={handleRemoveCourseFromColab} 
        handleUpdateRelatedDataFromData={handleUpdateCourseFromColab} 
        initialFormState={{ document: currentColabToEdit?.document, userName : currentColabToEdit?.userName }} 
      />
      <NewDialog 
        dataId="document" 
        formData={formData} 
        dataName="userName" 
        secondTabTitle="Cursos" 
        relatedDataId="courseId" 
        allRelatedData={courses} 
        visible={!!addingNewColab} 
        dialogTitle="Nuevo Colaborador"
        relatedDataKeyName="courseName" 
        relatedDataFields={relatedDataFields}
        onHide={() => setAddingNewColab(false)} 
        handleAddNewEntity={handleAddNewColabInState} 
        relatedDataKeyDescription="courseDescription"
        initialFormState={{ document: '', userName : '' }} 
      />
    </AdminWrapper>
  )
}
