
export const SidebarSectionButton = ({ title, icon, handleClick, active }) => {
  
  return (
    <div 
      className={`p-2 ${active ? 'bg-gray-200' : 'bg-gray-100'} flex flex-column justify-content-center align-items-center hover:bg-gray-300 cursor-pointer transition-ease-in transition-all transition-duration-200`}
      onClick={handleClick}
    >
      <i className={`${icon} text-3xl text-primary hover:text-blue-600`} />
      <span className="overflow-hidden block py-1 text-center text-xs block w-full" style={{ textOverflow: 'ellipsis' }}>{title}</span>
    </div>
  )
}
