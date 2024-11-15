import { useRef } from "react";

import { useLocation, useParams } from "wouter";

import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { BodyProgress } from "../common/body-progress";

export const InfoCoursesTable = ({ courses, schools, handleSelectCourse, resume }) => {
  
  // hooks
  const { dni, company } = useParams();
  const [l, setLocation] = useLocation();

  // refs
  const tableChangeBgHover = useRef(`hover:bg-gray-100 transition-all transition-duration-100 transition-ease-in ${handleSelectCourse != null ? 'cursor-pointer' : ''}`).current;

  // handlers
  const handleNavigateReviwe = () => setLocation(`/${company}/learn/${dni}/review`);

  // bodys
  const BodyCourse = (row) => (
    <div className="flex justify-content-between align-items-center">
      <div className={`flex flex-column justify-content-center h-full ${!resume ? 'w-9' : 'w-full'}`}>
        <p className="text-gray-900 font-bold mb-1">{row?.courseName}</p>
        <p className="text-gray-400 font-light mt-1">{schools?.find(t => t.id == row?.schoolId)?.schoolName}</p>
      </div>
      {
        !resume && (
          <div className="w-3 flex align-items-center text-gray-400 hover:text-gray-900 h-full transition-all transition-duration-200 transition-ease-out">
            <i className="pi pi-eye" />
          </div>
        )
      }
    </div>
  )
  const BodyGrade = (row, data) => (
    <div className={`select-none w-2rem h-2rem border-circle ${data?.rowIndex % 2 == 0? 'bg-gray-200' : 'bg-gray-100'} flex align-items-center justify-content-center mx-auto`}>
      <span className="text-gray-900 font-bold">{row?.grade}</span>
    </div>
  )

  return (
    <div className="border-round-xl shadow-1 p-4 w-full md:w-6">
      <h2 className="font-bold mb-1 mt-0">Tus cursos</h2>
      {resume && <p className="py-0 mt-1 mb-3 text-md">Aquí tienes un resumen de tus más recientes cursos.</p>}
      {!resume && <p className="py-0 mt-1 mb-3 text-md">Aquí tienes un resumen de tus cursos.</p>}
      <DataTable 
        scrollable 
        size="small" 
        scrollHeight="50vh" 
        value={courses ?? []} 
        rowClassName={tableChangeBgHover} 
        onRowClick={({ data }) => {handleSelectCourse && handleSelectCourse(data);}}
        emptyMessage="No tienes cursos asignados aún" 
      >
        <Column 
          header="Curso" 
          body={BodyCourse} 
          field="courseName" 
          headerClassName={`bg-white ${tableChangeBgHover}`} 
        />
        {
          window.innerWidth > 420 && (
            <Column  
              field="progress" 
              header="Progreso" 
              style={{ widht : '12rem', maxWidth : '12rem' }}
              headerClassName={`bg-white w-10rem ${tableChangeBgHover}`} 
              body={row => <BodyProgress field="videosWatchedPercent" row={row} />} 
            />
          )
        }
        {/* <Column  
          field="grade" 
          align="center" 
          body={BodyGrade} 
          header="Calificación" 
          headerClassName={`bg-white w-5rem ${tableChangeBgHover}`} 
        /> */}
        <Column  
          align="center" 
          header="Videos curso" 
          // body={BodyGrade} 
          field="videosCount" 
          headerClassName={`bg-white w-5rem ${tableChangeBgHover}`} 
        />
        <Column  
          align="center" 
          header="Videos vistos" 
          // body={BodyGrade} 
          field="videosWatchedCount" 
          headerClassName={`bg-white w-5rem ${tableChangeBgHover}`} 
        />
      </DataTable>

      {
        resume && (
          <div className="w-full mt-4 justify-content-end align-items-center flex">
            <Button 
              size="small"
              label="Más..." 
              iconPos="right" 
              severity="secondary" 
              icon="pi pi-arrow-right" 
              onClick={handleNavigateReviwe} 
            />
          </div>
        )
      }
    </div>
  )
}
