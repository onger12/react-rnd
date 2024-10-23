import { useEffect, useRef, useState } from "react";

import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";

import { useForm } from "../../../../hooks";
import { InfoGeneralTab } from "./info-general-tab";

export const EditVideoDialog = ({ visible, onHide, handleUpdateVideoInState }) => {

  // refs
  const toastRef = useRef(null);

  // hooks
  const formState = useForm({
    name : '',
    description : '',
    link : '',
  });

  // handlers
  const handleUpdateVideo = () => {
    handleUpdateVideoInState({...visible, videoName : formState?.formState?.name, videoDescription : formState?.formState?.description, link : formState?.formState?.link});
    handleHide();
  }
  const handleHide = () => {
    onHide && onHide();
  }

  useEffect(() => {
    if(!!visible) {
      formState.onChangeManual({
        name : visible?.videoName,
        description : visible?.videoDescription,
        link : visible?.link,
      });
    }
  }, [visible]);

  useEffect(() => {
    formState?.handleValidateDisableButtonSave();
  }, [formState?.formState]);

  return (
    <Dialog
      className="w-8"
      visible={visible}
      onHide={handleHide}
      header={visible?.videoName}
    >
      <InfoGeneralTab 
        {...formState} 
        toastRef={toastRef} 
        videoId={visible?.videoId}
        handleEditVideoInState={handleUpdateVideo}
      />
      {/* <TabView pt={{ panelContainer : { style : { padding : '8px 4px' }}}}>
        <TabPanel header="Info general">
          <InfoGeneralTab 
            {...formState} 
            videos={videos}
            toastRef={toastRef} 
            handleAddNewCourseInState={handleUpdateVideo}
          />
        </TabPanel>
        <TabPanel header={`Cursos (${visible?.videos?.length ?? 0})`}>
          <CoursesTab 
            {...visible}
            allVideos={videos} 
            toastRef={toastRef}
            handleRemoveVideoFromCourse={handleRemoveVideo}
            handleUpdateVideosVideo={handleUpdateVideoVideos}
          />
        </TabPanel>
      </TabView> */}
      <Toast ref={toastRef} />
    </Dialog>
  )
}