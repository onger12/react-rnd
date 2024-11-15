import { useLocation, useParams } from 'wouter'

export const CourseInfoCard = ({ name, description, id, qtyDetail, data }) => {
  
  const [location, setLocation] = useLocation();

  const { dni, company } = useParams();

  // handlers
  const handleShowDetail = () => setLocation(`/${company}/learn/${dni}/courses/${id}`, { state : data });

  return (
    <div className='col cursor-pointer min-w-20rem border-round-xl flex flex-column justify-content-between p-3 h-auto shadow-1 hover:shadow-3 transition-all transition-ease-out transition-duration-200' onClick={handleShowDetail}>
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
