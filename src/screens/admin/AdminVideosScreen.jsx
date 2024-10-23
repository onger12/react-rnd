import { useContext, useEffect, useRef, useState } from 'react';

import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

import { useAdmin } from '../../hooks';
import { RootContext } from '../../App';
import { AdminWrapper } from '../../wrappers';
import { ctc, DeleteVideo, formatTimeHHMMSS } from '../../helpers';
import { EditVideoDialog, NewVideoDialog } from '../../components';

export const AdminVideosScreen = () => {

  const [addingNewCourse, setAddingNewCourse] = useState(false);
  const [currentCourseToEdit, setCurrentCourseToEdit] = useState(null);

  const { handleLoaders, loaders } = useContext(RootContext);

  // refs
  const toastRef = useRef(null);

  // hooks
  const { videos, getVideos, handleVideos, syncVideos } = useAdmin({ handleLoaders, toastRef });

  // handlers
  const handleSyncVideos = () => {
    if(loaders?.syncVideos) return;
    syncVideos();
  }
  const handleUpdateVideoInState = (video) => {
    const videos_ = [...videos];
    const index = videos_?.findIndex(t => t?.videoId == video?.videoId);
    if(index >= 0) {
      videos_[index] = {...videos_[index], ...video};
      handleVideos(videos_);
    }
  }
  const handleAddNewVideoInState = (video) => handleVideos([video, ...videos]);
  const handleRemoveVideoFromList = (c) => handleVideos(videos?.filter(t => t?.videoId != c?.videoId))
  const handleInitScreen = () => {
    getVideos({ inactive : false, take : 100000, skip : 0 });
  }

  // BD
  const handleRemoveCourse = async (row) => {
    try {
      handleLoaders({ deleteCourse : row });
      await DeleteVideo(row);
      handleRemoveVideoFromList(row);
    } catch (e) {
      ctc(e, 'Hubo un error al borrar el curso.', toastRef);
    } finally {
      handleLoaders({ deleteCourse : null });
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
        disabled={loaders?.removeVideo || row?.inactive} 
        loading={loaders?.removeVideo?.videoId != null && loaders?.removeVideo?.videoId == row?.videoId} 
      />
    </div>
  )
  const BodyFooterTablaCurso = () => {
    return (
      <div 
        className={`w-full h-full p-2 ${!loaders?.syncVideos ? 'hover:bg-gray-300 cursor-pointer bg-gray-200' : 'bg-gray-100'} transition-all transition-duration-200 transition-ease-out`}
        onClick={handleSyncVideos}
      >
        <span className='font-bold text-sm select-none'>Sincronizar <i className={`pi pi-${loaders?.syncVideos ? 'spinner pi-spin' : 'sync'} text-gray-900 text-xs font-bold`} /></span>
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
  const BodyDuracion = ({ duration }) => Number.isNaN(duration / 1) ? '00:00' :  formatTimeHHMMSS(duration / 1000);
  const BodyDescription = (row) => (
    <div className='overflow-hidden w-full p-0 m-0 flex gap-2 align-items-center justify-content-between'>
      <span className='text-overflow-ellipsis overflow-hidden w-full block white-space-nowrap'>
        {row?.videoDescription}
      </span>
      {
        row?.videoDescription?.length > 110 && (
          <Button 
            text 
            rounded 
            unstyled 
            icon="pi pi-info-circle" 
            tooltip={row?.videoDescription} 
            className='button-unstyled text-gray-700 hover:text-gray-400' 
            tooltipOptions={{ position : 'top', hideDelay : 150, showDelay : 250, style : { maxWidth : 500 } }} 
          />
        )
      }
    </div>
  )

  useEffect(() => {
    handleInitScreen();
  }, []);

  return (
    <AdminWrapper toastRef={toastRef}>
      <section className='px-3 py-2'>
        <h1>Todos los Videos</h1>
        <div className="flex w-full align-items-center gap-2">
          <DataTable
            rows={10} 
            // paginator
            scrollable
            size="small" 
            showGridlines
            removableSort
            footer={BodyFooterTablaCurso}
            value={videos ?? []}
            scrollHeight='70vh'
            className='w-full'
            // header={BodyHeader}
            // rowsPerPageOptions={[10, 25, 50, 100]} 
            emptyMessage="No hay videos aún"
            virtualScrollerOptions={{ itemSize: 46 }}
            pt={{ footer : { style : { padding : 0 } } }}
            // virtualScrollerOptions={{ itemSize: 46 }}
            loading={loaders?.inventoryHead || loaders?.consolidateLines}
            // currentPageReportTemplate="{first} de {last} - {totalRecords}"
            // paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
          >
            <Column 
              field="videoName"
              header="Nombre"
              filter
              sortable
              style={{ widht : '12rem', maxWidth : '12rem' }}
            />
            <Column 
              field="videoDescription"
              header="Descripción"
              filter
              sortable
              body={BodyDescription}
            />
            <Column 
              field="duration"
              align="center"
              header="Duración"
              body={BodyDuracion}
              style={{ width : '10rem', maxWidth : '10rem' }}
            />
            <Column 
              field="link"
              align="center"
              header="Enlace"
              body={BodyLink}
              style={{ widht : '10rem', maxWidth : '10rem' }}
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
      <EditVideoDialog
        visible={currentCourseToEdit}
        onHide={() => setCurrentCourseToEdit(null)}
        handleUpdateVideoInState={handleUpdateVideoInState}
      />
      <NewVideoDialog 
        visible={addingNewCourse}
        onHide={() => setAddingNewCourse(false)}
        handleAddNewVideoInState={handleAddNewVideoInState}
      />
    </AdminWrapper>
  )
}
