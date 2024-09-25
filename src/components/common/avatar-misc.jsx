export const AvatarMisc = ({ height = "h-2rem", width = "w-2rem", userName, specific, textColor = 'text-white', bgColor = 'bg-primary', hoverBgColor = "bg-blue-600" }) => {

  const handleGetLetters = () => {
    if(!userName || !userName?.length) {
      return 'N/A';
    }

    const l = userName?.length;
    return (userName[0] + userName[l - 1]).toUpperCase();
  }


  return (
    <div className={`select-none hover:${hoverBgColor} transition-all transition-ease-in-out transition-duration-150 border-circle ${bgColor} p-3 ${textColor} text-sm flex align-items-center justify-content-center raleway ${height} ${width}`}>
      {
        !specific 
          ? handleGetLetters()
          : specific
      }
    </div>
  )
}
