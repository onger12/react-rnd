
export const BodyDescription = ({ row, field }) => (
  <div className='overflow-hidden w-full p-0 m-0 flex gap-2 align-items-center justify-content-between'>
    <span className='text-overflow-ellipsis overflow-hidden w-full block white-space-nowrap'>
      {row[field]}
    </span>
    {
      row[field]?.length > 110 && (
        <Button 
          text 
          rounded 
          unstyled 
          icon="pi pi-info-circle" 
          tooltip={row[field]} 
          className='button-unstyled text-gray-700 hover:text-gray-400' 
          tooltipOptions={{ position : 'top', hideDelay : 150, showDelay : 250, style : { maxWidth : 500 } }} 
        />
      )
    }
  </div>
)