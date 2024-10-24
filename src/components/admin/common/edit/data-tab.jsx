import { useContext, useState } from "react";

import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { MultiSelect } from "primereact/multiselect";

import { RootContext } from "../../../../App";
import { AddCoursesToUser, AddCourseToSchool, AddVideosToCourse, ctc, RemoveCourseFromSchool, RemoveUserFromColab, RemoveVideoFromCourse } from "../../../../helpers";
import { BodyDescription } from "../body-description";

export const CursosTab = ({ 
  data, 
  dataId, 
  entity, 
  disabled, 
  toastRef, 
  dataKeyId, 
  relatedData, 
  relatedDataKeyId, 
  relatedDataFields, 
  relatedDataKeyName, 
  currentRelatedData, 
  handleUpdateRelatedDataFromData,
  handleRemoveRelatedDataFromData, 
}) => {

  const [addingNewCourse, setAddingNewRelatedData] = useState(false);
  const [currentRelatedDataToAdd, setCurrentRelatedDataToAdd] = useState(null);

  const { loaders, handleLoaders } = useContext(RootContext);

  // BD
  const handleDoneAddNewRelatedData = async () => {
    handleLoaders({ addRelatedData : true });
    const [l] = relatedDataKeyId?.toLowerCase()?.trim()?.split('id');
    const key = `${l}sIds`;
    try {
      const body = {
        [dataKeyId] : dataId,
        [key] : currentRelatedDataToAdd?.map(t => t[relatedDataKeyId]),
      }
      
      switch(dataKeyId) {
        case 'schoolId':
          await AddCourseToSchool(body);
          break;
        case 'courseId':
          await AddVideosToCourse(body);
          break;
        case 'document':
          await AddCoursesToUser(body);
          break;
        default:
          throw 'Method save not implemented yet'
      }

      handleUpdateRelatedDataFromData({ body : currentRelatedDataToAdd, [dataKeyId] : dataId });
      setCurrentRelatedDataToAdd(null);
      setAddingNewRelatedData(false);
    } catch (e) {
      ctc(e, 'Hubo un error al agregar la relación.', toastRef)
    } finally {
      handleLoaders({ addRelatedData : false });
    }
  }
  const handleRemoveRelatedData = async (_) => {
    if(!_[relatedDataKeyId]) return;
    handleLoaders({ removeRelatedData : _[relatedDataKeyId] });
    try {
      const body = {
        [dataKeyId] : dataId,
        [relatedDataKeyId] : _[relatedDataKeyId],
      }
      
      switch(dataKeyId) {
        case 'schoolId':
          await RemoveCourseFromSchool(body);
          break;
        case 'courseId':
          await RemoveVideoFromCourse(body);
          break;
        case 'document':
          await RemoveUserFromColab(body);
          break;
        default:
          throw 'Method save not implemented yet'
      }

      handleRemoveRelatedDataFromData({ body });
    } catch (e) {
      ctc(e, 'Hubo un error al eliminar la relación.', toastRef)
    } finally {
      handleLoaders({ removeRelatedData : null });
    }
  }

  // bodys
  const BodyFooter = () => {
    if(addingNewCourse) {
      return (
        <div 
          className='w-full h-full flex align-items-center gap-2 p-2 bg-gray-200 transition-all transition-duration-200 transition-ease-out' 
        >
          <div className="w-10">
            <MultiSelect 
              filter 
              className="w-full" 
              optionDisabled="disabled" 
              options={currentRelatedData} 
              value={currentRelatedDataToAdd} 
              loading={loaders?.addRelatedData} 
              optionLabel={relatedDataKeyName} 
              disabled={loaders?.addRelatedData} 
              placeholder="Selecciona un nuevo curso" 
              onChange={(e) => setCurrentRelatedDataToAdd(e.value)} 
            />
          </div>
          <div className="w-2 flex align-items-center justify-content-center gap-2">
            <Button 
              // label="Agregar"
              icon="pi pi-save"
              severity="secondary"
              rounded
              disabled={!currentRelatedDataToAdd || currentRelatedDataToAdd?.length == 0}
              onClick={handleDoneAddNewRelatedData}
            />
            <Button 
              // label="Agregar"
              icon="pi pi-times"
              severity="secondary"
              rounded
              text
              disabled={!currentRelatedDataToAdd || currentRelatedDataToAdd?.length == 0}
              onClick={() => setAddingNewRelatedData(false)}
            />
          </div>
        </div>
      )
    }
    return (
      <div 
        className={`w-full h-full p-2 bg-gray-200 transition-all transition-duration-200 transition-ease-out ${disabled ? '' : 'cursor-pointer hover:bg-gray-300'}`} 
        onClick={() => {
          if(disabled) return;
          setAddingNewRelatedData(true)
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
  const BodyAcciones = ({row, include }) => {
    if(include?.includes('remove')) {
      return (
        <Button 
          text 
          rounded 
          severity='danger' 
          icon='pi pi-trash' 
          className='w-2rem h-2rem' 
          onClick={() => handleRemoveRelatedData(row)} 
          pt={{ icon : { style : { fontSize : 12 } } }} 
          disabled={loaders?.removeRelatedData != null || disabled} 
          loading={loaders?.removeRelatedData != null && loaders?.removeRelatedData == row[relatedDataKeyId]} 
        />
      )
    }
  }

  return (
    <div className="w-full" style={{ minHeight : '50vh' }}>
      {/* <h1 className="mt-0 mb-2">{entity} Asignados</h1> */}
        <div className="flex w-full align-items-center gap-2">
          <DataTable 
            rows={10} 
            size="small" 
            showGridlines 
            removableSort 
            footer={BodyFooter} 
            value={relatedData ?? []} 
            scrollable={relatedData?.length > 10} 
            emptyMessage={`No hay ${entity} aún`} 
            virtualScrollerOptions={{ itemSize: 46 }} 
            pt={{ footer : { style : { padding : 0 } } }} 
            scrollHeight={relatedData?.length > 10 ? '50vh' : null} 
            className='w-full border-right-1 border-left-1 p-0 border-gray-200' 
          >
            {
              relatedDataFields?.map(f => (
                f?.field == 'actions' 
                  ? (
                    <Column 
                      {...f}
                      key={f?.field}
                      body={(row) => BodyAcciones({ row, include : f?.include })}
                    />
                  ) 
                  : (
                    <Column 
                      {...f}
                      key={f?.field}
                      body={(row) => f?.body == 'description' ? <BodyDescription row={row} field={f?.field} /> : <>{row[f?.field]}</>}
                      style={{ widht : '12rem', maxWidth : '12rem' }}
                    />
                  )
              ))
            }
          </DataTable>
        </div>
    </div>
  )
}
