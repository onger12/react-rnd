import { useContext, useEffect, useRef, useState } from 'react';

import { Button } from 'primereact/button';
import { Column } from 'primereact/column';

import { useAdmin } from '../../hooks';
import { RootContext } from '../../App';
import { AdminWrapper } from '../../wrappers';
import { ctc, dateFormat, DeleteUser } from '../../helpers';
import { EditColabDialog, NewColabDialog, Table } from '../../components';  

export const AdminColabsScreen = () => {

  const [addingNewColab, setAddingNewColab] = useState(false);
  const [currentColabToEdit, setCurrentColabToEdit] = useState(null);

  const { handleLoaders, loaders } = useContext(RootContext);

  // refs
  const toastRef = useRef(null);

  // hooks
  const { getUsers, users, getCourses, handleUsers, courses } = useAdmin({ handleLoaders, toastRef });

  // handlers
  const handleUpdateColabInState = (colab, updateCurrentEditing) => {
    const colabs = [...users];
    const index = colabs?.findIndex(t => t?.document == colab?.document);
    if(index >= 0) {
      colabs[index] = {...colabs[index],...colab};
      handleUsers(colabs);
      if(updateCurrentEditing) {
        setCurrentColabToEdit({...colabs[index], ...colab});
      }
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
        onClick={() => setCurrentColabToEdit(row)}
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
            entityType="Colaboradores"
            footer={BodyFooterTablaColab} 
            emptyMessage="No hay colaboradores aún" 
            loading={loaders?.inventoryHead || loaders?.consolidateLines} 
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
      <EditColabDialog
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
      />
    </AdminWrapper>
  )
}
