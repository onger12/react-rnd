import { useEffect, useRef, useState } from "react";

import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { TabPanel, TabView } from "primereact/tabview";

import { CursosTab } from "./data-tab";
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
  relatedDataId,
  allRelatedData,
  secondTabTitle,
  relatedDataKeyName,
  handleUpdateData,
  relatedDataFields,
  initialFormState = {},
  handleUpdateSingleData,
  relatedDataKeyDescription,
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
  }, [allRelatedData, visible]);

  return (
    <Dialog
      className="w-8"
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
          <CursosTab 
            dataKeyId={dataId} 
            toastRef={toastRef} 
            disabled={disabled} 
            formData={formData} 
            entity={secondTabTitle}
            relatedData={relatedData}
            allRelatedData={allRelatedData}
            relatedDataKeyId={relatedDataId}
            relatedDataKeyName={relatedDataKeyName}
            dataId={data ? data[dataId] : null} 
            relatedDataFields={relatedDataFields}
            currentRelatedData={currentRelatedData}
            relatedDataKeyDescription={relatedDataKeyDescription}
            handleUpdateRelatedDataFromData={handleUpdateRelatedDataFromData}
            handleRemoveRelatedDataFromData={handleRemoveRelatedDataFromData}
          />
        </TabPanel>
      </TabView>
      <Toast ref={toastRef} />
    </Dialog>
  )
}