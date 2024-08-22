
export const SingleVideoCard = ({ title, active, duration, index, onClick }) => {
  return (
    <div className={`flex flex-column gap-2 ${active ? 'bg-gray-200' : 'bg-white'} hover:bg-gray-200 py-2 px-3 cursor-pointer`} onClick={onClick}>
      <div className="flex gap-2 aign-items-center">
        <span>{index}.</span>
        <span>{title}</span>
      </div>
      <div className="flex gap-2 aign-items-center">
        <i className="pi pi-play-circle" />
        <span>{duration} min</span>
      </div>
    </div>
  )
}
