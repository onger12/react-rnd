import { useEffect, useRef, useState } from "react";

import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { TabPanel, TabView } from "primereact/tabview";

import { CursosTab } from "./data-tab";
import { useForm } from "../../../../hooks";
import { InfoGeneralTab } from "./info-general-tab";
import { handleGetRelatedDataKeyPlural } from "../../../../helpers";

export const NewDialog = ({ 
  dataId,
  onHide,
  visible, 
  formData,
  disabled,
  dataName,
  relatedDataId,
  allRelatedData,
  secondTabTitle,
  relatedDataFields,
  handleAddNewEntity,
  relatedDataKeyName,
  dialogTitle = 'Nuevo',
  initialFormState = {},
  relatedDataKeyDescription,
  firstTabTitle = "Información general",
}) => {
  const [currentData, setCurrentData] = useState(null);
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [currentRelatedData, setCurrentRelatedData] = useState([]);

  // refs
  const toastRef = useRef(null);

  // hooks
  const formState = useForm(initialFormState);

  // handlers
  const handleHide = () => {
    if(currentData) {
      handleAddNewEntity(currentData);
      setCurrentData(null);
    }

    onHide && onHide();
    setCurrentTabIndex(0);
  }
  const handleUpdateCurrentData = (value) => {
    setCurrentData(t => ({...(t ?? {}), ...value}));
    setCurrentTabIndex(1);
  }
  const handleUpdateRelatedDataFromData = (add) => {
    const key = handleGetRelatedDataKeyPlural({ relatedDataId });
    const relatedData = [...currentData[key], ...add];
    handleUpdateCurrentData({ [key] : relatedData});
  }
  const handleRemoveRelatedDataFromData = (remove) => {
    if(!remove[relatedDataId]) return;
    
    const key = handleGetRelatedDataKeyPlural({ relatedDataId });
    const relatedData = [...currentData[key]];
    const index = relatedData?.findIndex(t => t[relatedDataId] == remove[relatedDataId]);
    if(index >= 0) {
      const l = relatedData.slice(0, index);
      const r = relatedData.slice(index + 1);
      handleUpdateCurrentData({ [key] : [...l, ...r] });
    }
  }

  useEffect(() => {
    if(!!visible) {
      formState.onChangeManual(initialFormState)
    }
  }, [visible]);

  useEffect(() => {
    setCurrentRelatedData(allRelatedData?.map(t => {
      const found = ((currentData && currentData[handleGetRelatedDataKeyPlural({ relatedDataId })]) ?? [])?.find(s => s[relatedDataId] == t[relatedDataId]);

      return ({
        ...t, 
        [relatedDataKeyName] : !found ? t[relatedDataKeyName] : `${t[relatedDataKeyName]} [Ya agregado]`,
        disabled : !!found
      })
    }));
  }, [allRelatedData, visible, currentData]);

  return (
    <Dialog
      className="w-8"
      visible={visible}
      onHide={handleHide}
      style={{ minHeight : '60vh' }}
      contentClassName="pt-0 pb-2 px-4"
      header={currentData ? currentData[dataName] : dialogTitle}
      headerClassName="py-2 px-4 border-bottom-1 border-gray-100"
    >
      <TabView pt={{ panelContainer : { style : { padding : '8px 4px' }}}} activeIndex={currentTabIndex} onTabChange={e => setCurrentTabIndex(e.index)}>
        <TabPanel header={firstTabTitle}>
          <InfoGeneralTab 
            {...formState} 
            dataKeyId={dataId} 
            formData={formData} 
            toastRef={toastRef} 
            disabled={disabled} 
            handleHide={handleHide} 
            handleUpdateCurrentData={handleUpdateCurrentData} 
          />
        </TabPanel>
        <TabPanel header={`${secondTabTitle} Asignados (${(currentData && currentData[handleGetRelatedDataKeyPlural({ relatedDataId })]?.length) ?? 0})`} disabled={!currentData}>
          <CursosTab 
            dataKeyId={dataId} 
            toastRef={toastRef} 
            disabled={disabled} 
            formData={formData} 
            entity={secondTabTitle} 
            allRelatedData={allRelatedData} 
            relatedDataKeyId={relatedDataId} 
            relatedDataKeyName={relatedDataKeyName} 
            relatedDataFields={relatedDataFields} 
            currentRelatedData={currentRelatedData} 
            dataId={currentData ? currentData[dataId] : null} 
            relatedDataKeyDescription={relatedDataKeyDescription} 
            handleUpdateRelatedDataFromData={handleUpdateRelatedDataFromData} 
            handleRemoveRelatedDataFromData={handleRemoveRelatedDataFromData} 
            relatedData={currentData ? currentData[handleGetRelatedDataKeyPlural({ relatedDataId })] : null} 
          />
        </TabPanel>
      </TabView>
      <Toast ref={toastRef} />
    </Dialog>
  )
}