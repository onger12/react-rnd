import { Button } from "primereact/button";

export const NoContentPlacing = ({ hScreen, retry, text = "No hay nada por aquí.", buttonLabel = "Reintentar" }) => (
  <section className={`${hScreen ? 'error-placing-height' : 'h-full'} w-full flex justify-content-center align-items-center`}>
    <div className="flex flex-column justify-content-center align-items-center gap-3">
      <span className="select-none block my-0 text-center text-8xl text-red-400">Ummh!...</span>
      <span className="select-none my-0 text-2xl text-center">{text}</span>
      <Button 
        icon="pi pi-sync" 
        label={buttonLabel} 
        severity="secondary" 
        onClick={() => retry && retry()}
      />
    </div>
  </section> 
)