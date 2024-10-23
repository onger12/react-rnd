import { InputText } from "primereact/inputtext";

export const InfoGeneralTab = ({ onChange, formState }) => {

  return (
    <form className="w-full flex flex-column gap-2 align-items-center justify-content-center" onSubmit={e => e.preventDefault()}>
      {/* <h4 className="mt-0 mb-2 font-italic w-full">Información general</h4> */}
      <label className="w-full">
        <span>Documento<span className="text-red-400 font-bold">*</span></span>
        <InputText 
          name="document"
          className="w-full"
          onChange={onChange}
          value={formState?.document}
        />
      </label>
      <label className="w-full">
        <span>Nombre<span className="text-red-400 font-bold">*</span></span>
        <InputText 
          name="name"
          onChange={onChange}
          value={formState?.name}
          className="w-full"
        />
      </label>
    </form>
  )
}