import { useContext } from "react";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";

import { RootContext } from "../../../../App";
import { AddNewSchool, ctc } from "../../../../helpers";

export const InfoGeneralTab = ({ onChange, formState, toastRef, disabled, dataKeyId, handleUpdateCurrentData, handleHide, formData }) => {

  const { handleLoaders, loaders } = useContext(RootContext);

  // BD
  const handleSubmit = async (e) => {
    e?.preventDefault();
    if(disabled) return;

    handleLoaders({ save : true });
    try {
      switch(dataKeyId) {
        case 'schoolId':
          var res = await AddNewSchool(formState);
          break;
        case 'courseId':
          // await UpdateSchool(body);
          break;
        case 'userId':
          // await UpdateSchool(body);
          break;
        default:
          throw 'Method save not implemented yet';
      }

      handleUpdateCurrentData(res ?? {});
    } catch (e) {
      ctc(e, 'Hubo un error al guardar la información, intentelo de nuevo.', toastRef)
    } finally {
      handleLoaders({ save : false });
    }
  }

  return (
    <form className="w-full flex flex-column gap-2 align-items-center justify-content-between" style={{ minHeight : '50vh' }} onSubmit={handleSubmit}>
      {/* { formData?.length > 0 && <h1 className="w-full my-0">Información general</h1> } */}
      <div className="w-full">
        { formData?.map((d) => <LabelWInput key={d?.label} disabled={disabled} formState={formState} onChange={onChange} {...d}  />) }
      </div>
      {
        !disabled && (
          <div className="w-full flex gap-2 aling-items-center">
            <Button 
              text
              className='w-6'
              icon="pi pi-times"
              severity="secondary"
              type="button"
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
              loading={loaders?.save}
              disabled={loaders?.save || disabled}
            />
          </div>
        )
      }
    </form>
  )
}

const LabelWInput = ({ label, required, className, type, props = {}, inputKey, disabled, onChange, formState }) => (
  <label className="w-full">
    <span>{label}{ !!required && <span className="text-red-400 font-bold">*</span> }</span>
    {
      type == 'InputText'
        ? (
          <InputText 
            {...props} 
            name={inputKey} 
            onChange={onChange} 
            disabled={disabled} 
            value={formState[inputKey]} 
            className={`w-full ${className}`} 
          />
        )
        : type == 'InputTextarea'
          ? (
              <InputTextarea 
                rows={5} 
                {...props} 
                name={inputKey} 
                onChange={onChange} 
                disabled={disabled} 
                value={formState[inputKey]} 
                className={`w-full ${className}`} 
              />
          )
          : <></>
    }
  </label>
)