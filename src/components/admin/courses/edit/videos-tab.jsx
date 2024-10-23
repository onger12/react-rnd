import { useContext, useState } from "react";

import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { MultiSelect } from "primereact/multiselect";

import { RootContext } from "../../../../App";
import { AddVideosToCourse, ctc, formatTimeHHMMSS, RemoveVideoFromCourse } from "../../../../helpers";

export const VideosTab = ({ courseId, inactive : disabled, videos, allVideos, handleUpdateCoursesVideo, handleRemoveVideoFromCourse, toastRef }) => {

  const [addingNewVideo, setAddingNewVideo] = useState(false);
  const [currentVideosToAdd, setCurrentVideosToAdd] = useState(null);

  const { loaders, handleLoaders } = useContext(RootContext);

  // BD
  const handleDoneAddNewVideo = async () => {
    handleLoaders({ addVideos : true });
    try {
      const body = {
        courseId,
        videosIds : currentVideosToAdd?.map(t => t?.videoId),
      }
      
      await AddVideosToCourse(body);
      handleUpdateCoursesVideo(currentVideosToAdd);
      setCurrentVideosToAdd(null);
      setAddingNewVideo(false);
    } catch (e) {
      ctc(e, 'Hubo un error al agregar el video al curso.', toastRef)
    } finally {
      handleLoaders({ addVideos : false });
    }
  }
  const handleRemoveVideo = async ({ videoId } = {}) => {
    if(!videoId) return;
    handleLoaders({ removeVideo : videoId });
    try {
      const body = {
        courseId,
        videoId,
      }
      
      await RemoveVideoFromCourse(body);
      handleRemoveVideoFromCourse(body, true);
    } catch (e) {
      ctc(e, 'Hubo un error al eliminar el video del curso.', toastRef)
    } finally {
      handleLoaders({ removeVideo : null });
    }
  }

  // bodys
  const BodyFooter = () => {
    if(addingNewVideo) {
      return (
        <div 
          className='w-full h-full flex align-items-center gap-2 p-2 bg-gray-200 transition-all transition-duration-200 transition-ease-out' 
        >
          <MultiSelect 
            filter 
            className="w-8" 
            options={allVideos} 
            optionLabel="videoName" 
            optionDisabled="disabled" 
            value={currentVideosToAdd} 
            loading={loaders?.addVideos} 
            disabled={loaders?.addVideos} 
            placeholder="Selecciona un nuevo curso" 
            onChange={(e) => setCurrentVideosToAdd(e.value)} 
          />
          <Button 
            label="Guardar"
            icon="pi pi-save"
            severity="secondary"
            className="w-4"
            disabled={!currentVideosToAdd}
            onClick={handleDoneAddNewVideo}
          />
        </div>
      )
    }
    return (
      <div 
        className={`w-full h-full p-2 bg-gray-200 transition-all transition-duration-200 transition-ease-out ${disabled ? '' : 'cursor-pointer hover:bg-gray-300'}`} 
        onClick={() => {
          if(disabled) return;
          setAddingNewVideo(true)
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
  const BodyDuracion = ({ duration }) => Number.isNaN(duration / 1) ? 'N/A' :  formatTimeHHMMSS(duration / 1000);
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
  const BodyAcciones = (row) => (
    <Button 
      text 
      rounded 
      severity='danger' 
      icon='pi pi-trash' 
      className='w-2rem h-2rem' 
      onClick={() => handleRemoveVideo(row)} 
      disabled={loaders?.removeVideo || disabled} 
      pt={{ icon : { style : { fontSize : 12 } } }} 
      loading={loaders?.removeVideo == row?.videoId} 
    />
  )

  return (
    <div className="w-full">
      <h4 className="mt-0 mb-2 font-italic">Videos asignados</h4>
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
            value={videos ?? []}
            emptyMessage={() => <div className="w-full flex h-full">No hay videos aún</div>}
            virtualScrollerOptions={{ itemSize: 46 }}
            pt={{ footer : { style : { padding : 0 } } }}
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
    </div>
  )
}
