
export const Button = ({ label, icon, iconPos = "left" }) => {
  return (
    <button 
      className='bg-gray-800 hover:bg-gray-700 hover:text-gray-100 text-xl text-white font-bold px-4 py-3 border-round-sm block m-0 transition-all transition-duration-200 transition-ease-out'
    >
      { iconPos == 'left' && <i className={`${icon}`} />}
      <span className='text-white'>{label}</span>
      { iconPos == 'right' && <i className={`${icon}`} />}      
    </button>
  )
}
