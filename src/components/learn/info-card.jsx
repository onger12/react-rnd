import { useLocation } from 'wouter'

export const InfoCard = ({ name, description, id, qtyDetail }) => {
  
  const [location, setLocation] = useLocation();

  // handlers
  const handleShowDetail = () => setLocation(`${location}/${id}`);

  return (
    <div className='col cursor-pointer min-w-20rem border-round-xl flex flex-column justify-content-between p-3 h-auto border-1 border-gray-200 hover:border-gray-300' onClick={handleShowDetail}>
      <div className=''>
        <h2 className='mt-0 mb-2'>{name}</h2>
        <span className='font-light text-gray-400'>{description}</span>
      </div>
      <div className={`mt-3 w-full flex justify-content-${qtyDetail ? 'between' : 'end'} align-items-center`}>
        { qtyDetail && <p className='my-0 font-medium'>{qtyDetail}</p> }
        <i className='pi pi-arrow-right hover:text-gray-500 hover:bg-gray-200 border-circle transition-duration-100 transition-linear transition-all text-gray-900 p-2' />
      </div>
    </div>
  )
}
