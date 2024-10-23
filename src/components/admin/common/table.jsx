import { DataTable } from "primereact/datatable"

export const Table = ({ 
  children,
  rows = 10, 
  value = [],
  header = null,
  itemSize = 46,
  size = "small",
  loading = null,
  entityType = "",
  scrollable = true, 
  minHeight = "70vh",
  footer = BodyFooter,
  showGridlines = true, 
  removableSort = true, 
  scrollHeight = minHeight,
  tableClassName = 'border-0', 
  style = { minHeight : minHeight },
  virtualScrollerOptions = { itemSize },
  rowsPerPageOptions = [10, 25, 50, 100],
  emptyMessage = `No hay ${entityType} aún`,
  pt = { footer : { style : { padding : 0 } } },
  className = 'w-full border-right-1 border-left-1 p-0 border-gray-200',
} = {}) => {
  return (
    <DataTable 
      pt={pt} 
      rows={rows} 
      size={size} 
      style={style}
      footer={footer} 
      header={header}
      loading={loading} 
      value={value ?? []} 
      className={className}
      scrollable={scrollable} 
      emptyMessage={emptyMessage}
      scrollHeight={scrollHeight} 
      showGridlines={showGridlines}
      removableSort={removableSort}
      tableClassName={tableClassName}
      virtualScrollerOptions={virtualScrollerOptions} 
    >
      {children}
    </DataTable>
  )
}

const BodyFooter = ({ onClick = () => console.error('ON CLICK NOT IMPLEMENTED AT FOOTER TABLE BUTTON'), label = "Agregar nuevo", icon = "pi pi-plus" } = {}) => {
  return (
    <div 
      onClick={onClick} 
      className='w-full h-full p-2 bg-gray-200 hover:bg-gray-300 transition-all transition-duration-200 transition-ease-out cursor-pointer' 
    >
      <span className='font-bold text-sm select-none'>{label} <i className={`${icon} text-gray-900 text-xs font-bold`} /></span>
    </div>
  )
}