
export const AdminPopularCard = ({ data, title }) => {
  return (
    <div className="border-1 border-gray-200 border-round-md p-3 h-full admin-chart-width">
      <h2 className="mt-0">{title}</h2>
      <div className="flex flex-column gap-2">
        {
          data?.map(t => (
            <Row key={t?.title} {...t} />
          ))
        }
      </div>
    </div>
  )
}

const Row = ({ title, students }) => (
  <div className="w-full gap-2 flex align-items-center select-none hover:bg-gray-100 transition-all transition-ease-out transition-duration-200 py-2 border-round-xl pl-3 pr-2">
    <span className="block w-8">{title}</span>
    <span className="w-4 bg-gray-800 hover:bg-gray-700 text-center transition-all transition-ease-out transition-duration-200 border-round-xl text-white py-2 px-3">{`${students} inscritos`}</span>
  </div>
)