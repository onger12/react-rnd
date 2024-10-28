import { useEffect, useRef, useState } from "react";

import { useLocation, useParams } from "wouter";

import { Column } from "primereact/column";
import { DataTable } from 'primereact/datatable';

import { LearnWrapper } from "../../wrappers";
import { getRamdonCourses, getRamdonSchools, schools } from "../../data";
import { Button } from "primereact/button";

export const LearnScreen = () => {

  const [currentSchools, setCurrentSchools] = useState([]);
  const [currentCourses, setCurrentCourses] = useState([]);

  const { dni, company } = useParams();
  const [location, setLocation] = useLocation();

  // refs
  const tableChangeBgHover = useRef('hover:bg-gray-100 transition-all transition-duration-100 transition-ease-in').current;

  // handlers
  const handleNavigateReviwe = () => setLocation(`/${company}/learn/${dni}/review`);
  const handleShowSchoolDetail = (id) => setLocation(`${location}/schools/${id}`);

  // bodys
  const BodyProgress = (row) => (
    <div className="flex align-items-center h-full">
      <div className="w-full h-05rem border-round-xl bg-gray-400">
        <div className="h-05rem border-round-xl bg-gray-900 z-3" style={{ width : `${row?.progress}%` }} />
      </div>
    </div>
  )
  const BodyGrade = (row, data) => (
    <div className={`select-none w-2rem h-2rem border-circle ${data?.rowIndex % 2 == 0? 'bg-gray-200' : 'bg-gray-100'} flex align-items-center justify-content-center mx-auto`}>
      <span className="text-gray-900 font-bold">{row?.grade}</span>
    </div>
  )
  const BodyCourse = (row) => (
    <div className="flex flex-column justify-content-center h-full">
      <p className="text-gray-900 font-bold mb-1">{row?.name}</p>
      <p className="text-gray-400 font-light mt-1">{schools?.find(t => t.id == row?.schoolId)?.name}</p>
    </div>
  )

  useEffect(() => {
    const schools = getRamdonSchools();
    const courses = getRamdonCourses(schools?.map(t => t.id));

    setCurrentCourses(courses);
    setCurrentSchools(schools);
  }, []);  

  return (
    <LearnWrapper>
      <section className="flex flex-wrap md:flex-nowrap align-items-start gap-2 pt-3">
        <div className="border-round-xl border-1 p-4 pb-3 border-gray-100 w-full md:w-8">
          <h1 className="font-bold mb-1 mt-0">Tus cursos</h1>
          <p className="py-0 mt-1 mb-3">Aquí tienes un resumen de tus más recientes cursos.</p>
          <DataTable
            value={currentCourses.slice(0,3)}
            rowClassName={tableChangeBgHover}
            size="small"
            emptyMessage="No tienes cursos asignados aún"
            // showGridlines
          >
            <Column  
              header="Curso"
              field="name"
              headerClassName={`bg-white ${tableChangeBgHover}`}
              body={BodyCourse}
            />
            {
              window.innerWidth > 420 && (
                <Column  
                  header="Progreso"
                  field="progress"
                  headerClassName={`bg-white min-w-12rem w-4rem ${tableChangeBgHover}`}
                  body={BodyProgress}
                />
              )
            }
            <Column  
              header="Calificación"
              field="grade"
              headerClassName={`bg-white w-5rem ${tableChangeBgHover}`}
              body={BodyGrade}
              align="center"
            />
          </DataTable>
          <div className="w-full flex align-items-center justify-content-end mt-3 mb-0">
            <Button label="Más..." icon="pi pi-arrow-right" iconPos="right" onClick={handleNavigateReviwe} size="small" severity="secondary" text />
          </div>
        </div>
        <div className="border-round-xl border-1 p-4 border-gray-100 w-full md:w-4">
          <h2 className="mt-0 mb-3">Escuelas en las que tienes cursos</h2>
          {
            currentSchools?.map(({ name, description, id }) => (
              <div 
                key={id} 
                onClick={() => handleShowSchoolDetail(id)}
                className="border-round-sm mb-1 p-3 hover:bg-gray-200 select-none cursor-pointer" 
              >
                <h3 className="my-0 font-medium text-gray-800">{name}</h3>
                <p className="mt-1 mb-0 font-light text-gray-500">{description?.length > 35 ? `${description?.slice(0,35)}...` : description}</p>
              </div>
            ))
          }
        </div>
      </section>
    </LearnWrapper>
  )
}
