import { useRef } from "react";

import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { BodyProgress } from "../common/body-progress";

export const InfoCourseTable = ({ course }) => {
  
  // refs
  const tableChangeBgHover = useRef('hover:bg-gray-100 transition-all transition-duration-100 transition-ease-in').current;

  return (
    <div className="border-round-xl p-4 shadow-1 w-full h-full">
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
          style={{ widht : '12rem', maxWidth : '12rem' }}
          headerClassName={`bg-white w-10rem ${tableChangeBgHover}`} 
          body={(row) => <BodyProgress field='playPercent' row={row} />} 
        />
      </DataTable>
    </div>
  )
}
