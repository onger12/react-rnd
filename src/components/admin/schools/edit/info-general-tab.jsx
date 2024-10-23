import { useContext } from "react";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";

import { RootContext } from "../../../../App";
import { ctc, UpdateSchool } from "../../../../helpers";

export const InfoGeneralTab = ({ onChange, formState, toastRef, disabled, schoolId, handleUpdateSchool, handleHide, school }) => {

  const { handleLoaders, loaders } = useContext(RootContext);

  // BD
  const handleSubmit = async (e) => {
    e?.preventDefault();
    if(disabled) return;
    handleLoaders({ save : true });
    try {
      const body = {
        schoolId,
        schoolName : formState?.name,
        schoolDescription : formState?.description,
      }

      await UpdateSchool(body);
      handleUpdateSchool({...school, ...body});
      handleHide();
    } catch (e) {
      ctc(e, 'Hubo un error al guardar la información, intentelo de nuevo.', toastRef)
    } finally {
      handleLoaders({ save : false });
    }
  }

  return (
    <form className="w-full flex flex-column gap-2 align-items-center justify-content-center" onSubmit={handleSubmit}>
      <h1 className="w-full my-0">Información general</h1>
      <label className="w-full">
        <span>Nombre<span className="text-red-400 font-bold">*</span></span>
        <InputText 
          name="name"
          onChange={onChange}
          value={formState?.name}
          className="w-full"
          disabled={disabled}
        />
      </label>
      <label className="w-full">
        <span>Descripción<span className="text-red-400 font-bold">*</span></span>
        <InputTextarea 
          rows={6}
          className="w-full"
          name="description"
          onChange={onChange}
          disabled={disabled}
          value={formState?.description}
        />
      </label>
      {
        !disabled && (
          <div className="w-full flex gap-2 aling-items-center">
            <Button 
              text
              className='w-6'
              icon="pi pi-times"
              severity="secondary"
              onClick={handleHide}
              disabled={loaders?.save}
              label={disabled ? 'Cerrar' : 'Cancelar'}
            />
            <Button 
              type="submit"
              label="Guardar"
              className="w-6"
              icon="pi pi-save"
              severity="secondary"
              disabled={loaders?.save || disabled}
              loading={loaders?.save}
            />
          </div>
        )
      }
    </form>
  )
}