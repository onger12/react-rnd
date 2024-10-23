import { useEffect, useRef, useState } from "react";

import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { TabPanel, TabView } from "primereact/tabview";

import { useForm } from "../../../../hooks";
import { VideosTab } from "./videos-tab";
import { InfoGeneralTab } from "./info-general-tab";

export const NewCourseDialog = ({ visible, onHide, allVideos_, handleAddNewCourseInState }) => {

  const [videos, setVideos] = useState([]);
  const [allVideos, setAllVideos] = useState([]);

  // refs
  const toastRef = useRef(null);

  // hooks
  const formState = useForm({
    name : '',
    description : '',
  });

  // handlers
  const handleAddNewCourse = (data) => {
    handleAddNewCourseInState(data);
    handleHide();
  }
  const handleRemoveVideoFromState = (row) => setVideos(t => t?.filter(t => t?.videoId != row?.videoId));
  const handleAddVideosInState = (vds) => {
    const newVds = [...vds, ...videos];
    setVideos(newVds);
    setAllVideos(t => t?.map(v => {
      const vv = newVds.find(vs => vs?.videoId == v?.videoId);

      return ({
        ...v,
        disabled : !!vv,
        videoName : !vv ? v?.videoName : `${v?.videoName} [Ya agregado]`,
      })
    }))
  }
  const handleHide = () => {
    setVideos([]);
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
    setAllVideos(allVideos_);
  }, [allVideos_])

  useEffect(() => {
    formState?.handleValidateDisableButtonSave();
  }, [formState?.formState])
  

  return (
    <Dialog
      visible={visible}
      onHide={handleHide}
      className="w-8"
      header="Nuevo curso"
    >
      <TabView pt={{ panelContainer : { style : { padding : '8px 4px' }}}}>
        <TabPanel header="Info general">
          <InfoGeneralTab 
            {...formState} 
            toastRef={toastRef} 
            videos={videos}
            handleAddNewCourseInState={handleAddNewCourse}
          />
        </TabPanel>
        <TabPanel header={`Videos (${videos?.length})`}>
          <VideosTab 
            videos={videos}
            allVideos={allVideos} 
            handleAddVideosInState={handleAddVideosInState}
            handleRemoveVideoFromState={handleRemoveVideoFromState}
          />
        </TabPanel>
      </TabView>
      <Toast ref={toastRef} />
    </Dialog>
  )
}