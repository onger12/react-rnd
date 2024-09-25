const rows = [
  {
    title : 'Introducción a la Gestión de Proyectos',
    detail : '95 inscritos',
  },
  {
    title : 'Liderazgo efectivo',
    detail : '87 inscritos',
  },
  {
    title : 'Fundamentos de marketing digital',
    detail : '76 inscritos',
  },
]

export const AdminPopularCoursesCard = () => {
  return (
    <div className="border-1 border-gray-200 border-round-md p-3 h-30rem admin-chart-width">
      <h2 className="mt-0">Cursos populares</h2>
      <div className="flex flex-column gap-2">
        {
          rows?.map(t => (
            <Row key={t?.title} {...t} />
          ))
        }
      </div>
    </div>
  )
}

const Row = ({ title, detail }) => (
  <div className="w-full gap-2 flex align-items-center">
    <span className="block w-8">{title}</span>
    <span className="w-4 bg-gray-800 border-round-xl text-white py-2 px-3">{detail}</span>
  </div>
)