export const LoadingPlacing = ({ hScreen }) => (
  <section className={`${hScreen ? 'error-placing-height' : 'h-full'} w-full flex justify-content-center align-items-center`}>
    <i className="pi pi-cog pi-spin text-2xl text-gray-700" />
  </section> 
)