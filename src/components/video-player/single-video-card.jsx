import { handleFormatSeconds } from "../../helpers"

export const SingleVideoCard = ({ videoName : title, active, videoDuration : duration, index, onClick }) => {
  return (
    <div className={`flex flex-column gap-2 ${active ? 'bg-gray-200' : 'bg-white'} hover:bg-gray-200 py-2 px-3 cursor-pointer`} onClick={onClick}>
      <div className="flex gap-2 aign-items-center">
        <span className="font-normal text-gray-700">{index}.</span>
        <span className="font-normal text-gray-700">{title}</span>
      </div>
      <div className="flex gap-2 aign-items-center">
        <i className="pi pi-play-circle text-gray-500" />
        <span className="font-normal text-gray-500">{handleFormatSeconds({ secs : duration })}</span>
      </div>
    </div>
  )
}
