import { useEffect, useRef, useState } from "react";

import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { TabPanel, TabView } from "primereact/tabview";

import { DataTab } from "./data-tab";
import { useForm } from "../../../../hooks";
import { InfoGeneralTab } from "./info-general-tab";

export const EditDialog = ({ 
  data, 
  dataId, 
  onHide, 
  visible, 
  formData, 
  disabled, 
  dataName, 
  relatedData, 
  dialogTitle, 
  allowReorder, 
  relatedDataId, 
  allRelatedData, 
  secondTabTitle, 
  handleUpdateData, 
  relatedDataFields, 
  relatedDataKeyName, 
  initialFormState = {}, 
  handleUpdateSingleData, 
  handleReorderRelatedData, 
  handleRemoveRelatedDataFromData, 
  handleUpdateRelatedDataFromData, 
  firstTabTitle = "Información general",
}) => {
  const [currentRelatedData, setCurrentRelatedData] = useState(relatedData);

  // refs
  const toastRef = useRef(null);

  // hooks
  const formState = useForm(initialFormState);

  // handlers
  const handleHide = () => {
    onHide && onHide();
  }

  useEffect(() => {
    if(!!visible) {
      formState.onChangeManual(initialFormState)
    }
  }, [visible]);
  
  useEffect(() => {
    setCurrentRelatedData(allRelatedData?.map(t => {
      const found = relatedData?.find(s => s[relatedDataId] == t[relatedDataId]);

      return ({
        ...t, 
        [relatedDataKeyName] : !found ? t[relatedDataKeyName] : `${t[relatedDataKeyName]} [Ya agregado]`,
        disabled : !!found
      })
    }));
  }, [allRelatedData, data, visible]);

  return (
    <Dialog
      className="w-10"
      visible={visible}
      onHide={handleHide}
      style={{ minHeight : '60vh' }}
      headerClassName="py-2 px-4 border-bottom-1 border-gray-100"
      contentClassName="pt-0 pb-2 px-4"
      header={dialogTitle || (data && `Editar ${data[dataName]}`)}
    >
      <TabView pt={{ panelContainer : { style : { padding : '8px 4px' }}}}>
        <TabPanel header={firstTabTitle}>
          <InfoGeneralTab 
            {...formState} 
            data={data}
            dataKeyId={dataId}
            formData={formData}
            toastRef={toastRef} 
            disabled={disabled}
            handleHide={handleHide}
            dataId={data ? data[dataId] : null}
            handleUpdateData={handleUpdateData}
          />
        </TabPanel>
        <TabPanel header={`${secondTabTitle} Asignados (${relatedData?.length ?? 0})`}>
          <DataTab 
            dataKeyId={dataId} 
            toastRef={toastRef} 
            disabled={disabled} 
            formData={formData} 
            entity={secondTabTitle} 
            relatedData={relatedData} 
            allowReorder={allowReorder} 
            allRelatedData={allRelatedData} 
            relatedDataKeyId={relatedDataId} 
            dataId={data ? data[dataId] : null} 
            relatedDataFields={relatedDataFields} 
            relatedDataKeyName={relatedDataKeyName} 
            currentRelatedData={currentRelatedData} 
            handleReorderRelatedData={handleReorderRelatedData} 
            handleUpdateRelatedDataFromData={handleUpdateRelatedDataFromData} 
            handleRemoveRelatedDataFromData={handleRemoveRelatedDataFromData} 
          />
        </TabPanel>
      </TabView>
      <Toast ref={toastRef} />
    </Dialog>
  )
}