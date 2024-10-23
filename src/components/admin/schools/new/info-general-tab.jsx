
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";

export const InfoGeneralTab = ({ onChange, formState, disabled }) => {

  return (
    <form className="w-full flex flex-column gap-2 align-items-center justify-content-center" onSubmit={e => e.preventDefault()}>
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
    </form>
  )
}