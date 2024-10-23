import { useContext } from "react";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

import { AddVideo, ctc } from "../../../../helpers";
import { RootContext } from "../../../../App";
import { InputTextarea } from "primereact/inputtextarea";

export const InfoGeneralTab = ({ onChange, disabledButtonSave, handleAddNewVideoInState, formState, toastRef }) => {

  const { loaders, handleLoaders } = useContext(RootContext);

  // BD
  const handleSubmit = async (e) => {
    e?.preventDefault();
    try {
      handleLoaders({ save : true });
      const body = {
        videoName : formState?.name,
        videoDescription : formState?.description,
        link : formState?.link,
      }

      const video = await AddVideo(body);
      handleAddNewVideoInState(video);
    } catch (e) {
      ctc(e, 'Hubo un error al guardar el video.', toastRef)
    } finally {
      handleLoaders({ save : false });
    }
  }

  return (
    <form className="w-full flex flex-column gap-2 align-items-center justify-content-center" onSubmit={handleSubmit}>
      {/* <h4 className="mt-0 mb-2 font-italic w-full">Información general</h4> */}
      <label className="w-full">
        <span>Name<span className="text-red-400 font-bold">*</span></span>
        <InputText 
          name="name"
          onChange={onChange}
          value={formState?.name}
          className="w-full"
        />
      </label>
      <label className="w-full">
        <span>Descripción<span className="text-red-400 font-bold">*</span></span>
        <InputTextarea 
          rows={4}
          name="description"
          onChange={onChange}
          value={formState?.description}
          className="w-full"
        />
      </label>
      <label className="w-full">
        <span>Link<span className="text-red-400 font-bold">*</span></span>
        <InputTextarea 
          rows={4}
          name="link" 
          className="w-full" 
          onChange={onChange} 
          value={formState?.link} 
        />
      </label>
      <div className="w-full flex gap-2 aling-items-center">
        <Button 
          text
          className="w-6"
          label="Cancelar"
          icon="pi pi-times"
          severity="secondary"
        />
        <Button 
          type="submit"
          label="Guardar"
          className="w-6"
          icon="pi pi-save"
          severity="secondary"
          disabled={loaders?.save || disabledButtonSave}
        />
      </div>
    </form>
  )
}