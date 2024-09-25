
export const AdminCard = ({ title, icon, number, description }) => {
  return (
    <div className="border-1 admin-card-width border-gray-200 border-round-md shadow-1 p-3">
      <div className="flex mb-5 w-full align-items-center justify-content-between">
        <h5 className="font-normal m-0">{title}</h5>
        <i className={`${icon} text-md`} />
      </div>
      <div className="">
        <span className="block font-bold text-gray-900 text-2xl">{number}</span>
        <span className="block text-md text-gray-600">{description}</span>
      </div>
    </div>
  )
}
