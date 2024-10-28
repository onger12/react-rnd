export const NoContentPlacing = ({ hScreen, text = "No hay nada por aquí." }) => (
  <section className={`${hScreen ? 'error-placing-height' : 'h-full'} w-full flex justify-content-center align-items-center`}>
    <div className="">
      <span className="select-none block my-0 text-center text-8xl text-red-400">Ummh!...</span>
      <span className="select-none text-2xl text-center">{text}</span>
    </div>
  </section> 
)