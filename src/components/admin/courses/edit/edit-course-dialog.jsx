import { useEffect, useRef, useState } from "react";

import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { TabPanel, TabView } from "primereact/tabview";

import { VideosTab } from "./videos-tab";
import { useForm } from "../../../../hooks";
import { InfoGeneralTab } from "./info-general-tab";

export const EditCourseDialog = ({ visible, onHide, allVideos, handleAddNewCourseInState, handleUpdateCourseInState }) => {

  const [videos, setVideos] = useState([]);

  // refs
  const toastRef = useRef(null);

  // hooks
  const formState = useForm({
    name : '',
    description : '',
  });

  // handlers
  const handleRemoveVideo = (vd) => handleUpdateCourseInState({...visible, videos : visible?.videos?.filter(t => t?.videoId != vd?.videoId)}, true)
  const handleUpdateCourseVideos = (vds) => handleUpdateCourseInState({...visible, videos : [...vds, ...(visible?.videos ?? [])]}, true);
  const handleUpdateCourse = () => {
    handleUpdateCourseInState({...visible, courseName : formState?.formState?.name, courseDescription : formState?.formState?.description});
    handleHide();
  }
  const handleHide = () => {
    onHide && onHide();
  }

  useEffect(() => {
    if(!!visible) {
      formState.onChangeManual({
        name : visible?.courseName, 
        description : visible?.courseDescription, 
      });
    }
  }, [visible]);

  useEffect(() => {
    formState?.handleValidateDisableButtonSave();
  }, [formState?.formState]);
  
  useEffect(() => {
    if(!visible) {
      setVideos([]);
      return;
    }
    setVideos(allVideos?.map(v => {
      const find = visible?.videos?.find(t => t?.videoId == v?.videoId);

      return ({
        ...v,
        disabled : !!find,
        videoName : !!find ? `${v?.videoName} [Ya agregado]` : v?.videoName,
      })
    }))
  }, [allVideos, visible]);

  return (
    <Dialog
      visible={visible}
      onHide={handleHide}
      className="w-8"
      header={visible?.courseName}
    >
      <TabView pt={{ panelContainer : { style : { padding : '8px 4px' }}}}>
        <TabPanel header="Info general">
          <InfoGeneralTab 
            {...formState} 
            videos={videos}
            toastRef={toastRef} 
            handleAddNewCourseInState={handleUpdateCourse}
          />
        </TabPanel>
        <TabPanel header={`Videos (${visible?.videos?.length ?? 0})`}>
          <VideosTab 
            {...visible}
            allVideos={videos} 
            toastRef={toastRef}
            handleRemoveVideoFromCourse={handleRemoveVideo}
            handleUpdateCoursesVideo={handleUpdateCourseVideos}
          />
        </TabPanel>
      </TabView>
      <Toast ref={toastRef} />
    </Dialog>
  )
}