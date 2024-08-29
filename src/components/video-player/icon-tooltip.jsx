import { Tooltip } from 'primereact/tooltip';

export const IconTooltip = ({ children, className, onClick, icon : Icon, tooltip, onMouseEnter, onMouseLeave, tooltipPos = 'top', textColor = "white", fontWeight = "light", fontSize = "xl" }) => {

  let classNameInherit = `font-${fontWeight} text-${fontSize} text-${textColor} ${className} cursor-pointer icon-tooltip-classname-target hover:text-gray-400`;

  return (
    <div 
      onClick={onClick}
    >
      {
        typeof Icon != 'string'
          ? (
            <Icon className={`${classNameInherit} text-5xl pt-1`} />
          )
          : (
            <i 
              className={`${Icon} ${classNameInherit}`} 
              data-pr-tooltip={tooltip}
              data-pr-position={tooltipPos}
              data-pr-at="left-20 top-20"
              data-pr-my="left center-2"
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            />
          )
      }

      {children}
      <Tooltip target=".icon-tooltip-classname-target" className='text-2xl' showDelay={1000} />
    </div>
  )
}