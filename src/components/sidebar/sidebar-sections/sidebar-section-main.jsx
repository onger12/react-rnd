
export const SidebarSectionMain = ({ children, sidebarOpen }) => {
  return (
    <div className={`${sidebarOpen ? 'w-full' : 'w-0'} flex flex-column gap-2 p-2 transition-all transition-ease-out transition-duration-200`}>
      { children }
    </div>
  )
}
