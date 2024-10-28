export const ErrorPlacing = ({ hScreen }) => (
  <section className={`${hScreen ? 'error-placing-height' : 'h-full'} w-full flex justify-content-center align-items-center`}>
    <div className="">
      <span className="select-none block my-0 text-center text-8xl text-red-400">500</span>
      <span className="select-none text-2xl text-center">No se pudo cargar el contenido que esperabas.</span>
    </div>
  </section> 
)