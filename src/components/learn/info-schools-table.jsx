import { useLocation, useParams } from "wouter";

export const InfoSchoolsTable = ({ schools, width = 'w-full md:w-6' }) => {

  // hooks
  const { company, dni } = useParams();
  const [l, setLocation] = useLocation();

  // handlers
  const handleShowSchoolDetail = (id) => setLocation(`/${company}/learn/${dni}/schools/${id}`);

  return (
    <div className={`border-round-xl border-1 p-4 border-gray-100 ${width} h-full`}>
      <h2 className="mt-0 mb-3">Escuelas en las que tienes cursos</h2>
      {
        schools?.map(({ schoolName, schoolDescription, schoolId }) => (
          <div 
            key={schoolId} 
            onClick={() => handleShowSchoolDetail(schoolId)}
            className="border-round-sm mb-1 p-3 hover:bg-gray-200 select-none cursor-pointer" 
          >
            <h3 className="my-0 font-medium text-gray-800">{schoolName}</h3>
            <p className="mt-1 mb-0 font-light text-gray-500">{schoolDescription?.length > 35 ? `${schoolDescription?.slice(0,35)}...` : schoolDescription}</p>
          </div>
        ))
      }
    </div>
  )
}
