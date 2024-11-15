
export const AdminCard = ({ title, icon, qty, qtyThisMonth }) => {
  return (
    <div className="border-1 admin-card-width border-gray-200 border-round-md shadow-1 p-3 select-none hover:shadow-3 transition-ease-out transition-all transition-duration-300">
      <div className="flex mb-5 w-full align-items-center justify-content-between">
        <h5 className="font-normal m-0">{title}</h5>
        <i className={`${icon} text-md`} />
      </div>
      <div className="">
        <span className="block font-bold text-gray-900 text-2xl">{qty}</span>
        <span className="block text-md text-gray-600">{`${qtyThisMonth ?? 0} este mes`}</span>
      </div>
    </div>
  )
}
