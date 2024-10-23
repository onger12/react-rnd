import { useEffect, useRef } from "react";

import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";

import { useForm } from "../../../../hooks";
import { InfoGeneralTab } from "./info-general-tab";

export const NewVideoDialog = ({ visible, onHide, handleAddNewVideoInState }) => {

  // refs
  const toastRef = useRef(null);

  // hooks
  const formState = useForm({
    name : '',
    description : '',
    link : '',
  });

  // handlers
  const handleUpdateVideo = ({ videoId }) => {
    handleAddNewVideoInState({...visible, videoId, videoName : formState?.formState?.name, videoDescription : formState?.formState?.description, link : formState?.formState?.link});
    handleHide();
  }
  const handleHide = () => {
    formState.onChangeManual({
      name : '',
      description : '',
      link : '',
    });
    onHide && onHide();
  }

  useEffect(() => {
    formState?.handleValidateDisableButtonSave();
  }, [formState?.formState]);

  return (
    <Dialog
    className="w-8"
      visible={visible}
      onHide={handleHide}
      header="Nuevo video"
    >
      <InfoGeneralTab 
        {...formState} 
        toastRef={toastRef} 
        handleAddNewVideoInState={handleUpdateVideo}
      />
      <Toast ref={toastRef} />
    </Dialog>
  )
}