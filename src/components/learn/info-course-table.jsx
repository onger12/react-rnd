import { useRef } from "react";

import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

export const InfoCourseTable = ({ course }) => {
  
  // refs
  const tableChangeBgHover = useRef('hover:bg-gray-100 transition-all transition-duration-100 transition-ease-in').current;

  // bodys
  const BodyProgress = (row) => (
    <div className="flex align-items-center h-full">
      <div className="w-full h-05rem border-round-xl bg-gray-400">
        <div className="h-05rem border-round-xl bg-gray-900 z-3" style={{ width : `${row?.playPercent}%` }} />
      </div>
    </div>
  )

  return (
    <div className="border-round-xl border-1 p-4 border-gray-100 w-full h-full">
      <h2>Detalles de {course?.courseName}</h2>
      <DataTable 
        scrollable 
        size="small" 
        scrollHeight="50vh" 
        value={course?.videos ?? []} 
        rowClassName={tableChangeBgHover} 
        emptyMessage="No tienes cursos asignados aún" 
      >
        <Column 
          header="Video" 
          field="videoName" 
          headerClassName={`bg-white ${tableChangeBgHover}`} 
        />
        <Column 
          field="" 
          header="Progreso" 
          body={BodyProgress} 
          headerClassName={`bg-white w-10rem ${tableChangeBgHover}`} 
        />
      </DataTable>
    </div>
  )
}
