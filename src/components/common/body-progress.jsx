
export const BodyProgress = ({ row, field, width = "w-full" }) => {

  const limitValue = 41;
  const value = row[field] ?? 0;
  const textColor = value > limitValue ? 'text-white' : 'text-black';
  const allowBorder = value > 98;

  return (
    <div className={`${width} relative h-05rem py-2 border-round-xl overflow-hidden py-1 border-1 border-gray-900`}>
      <span className={`absolute-centering select-none z-5 ${textColor}`} style={{ fontSize : 12, mixBlendMode : value > limitValue ? 'difference' : null }}>{`${value}%`}</span>
      <div className="h-full border-0 absolute top-0 left-0 bg-gray-900 z-3" style={{ width : `${value ?? '0'}%`, borderBottomRightRadius : allowBorder ? '100%' : null, borderTopRightRadius : allowBorder ? '100%' : null, borderBottomLeftRadius : '500px', borderTopLeftRadius : '500px' }} />
    </div>
  )
}