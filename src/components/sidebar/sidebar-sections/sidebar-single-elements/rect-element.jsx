
export const RectElement = () => {
  return (
    <div className='border-2 border-gray-500 border-round-xl flex justify-content-center align-items-center w-5rem h-5rem bg-red-300' draggable onDragStart={console.log}>
      Rect
    </div>
  )
}
