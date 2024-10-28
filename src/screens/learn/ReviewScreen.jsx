import { DataTable } from "primereact/datatable"
import { LearnWrapper } from "../../wrappers"
import { Column } from "primereact/column"

export const ReviewScreen = () => {
  return (
    <LearnWrapper>
      <div className="border-round-xl border-1 p-4 border-gray-100 w-full md:w-8">
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
      </div>
    </LearnWrapper>
  )
}
