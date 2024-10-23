import { useEffect } from "react"
import { AdminCard, AdminChart, AdminPopularCoursesCard } from "../../components"
import { useAdmin } from "../../hooks"
import { AdminWrapper } from "../../wrappers"

const cards = [
  {
    id : 1,
    icon : 'pi pi-building',
    number : '25',
    title : 'Escuelas',
    description : '+2 este mes',
  },
  {
    id : 2,
    icon : 'pi pi-book',
    number : '145',
    title : 'cursos',
    description : '+15 este mes',
  },
  {
    id : 3,
    icon : 'pi pi-users',
    number : '1.234',
    title : 'Colaboradores',
    description : '+180 este mes',
  },
  {
    id : 4,
    icon : 'pi pi-users',
    number : '12',
    title : 'Administradores',
    description : 'Sin cambios',
  },
]

export const AdminScreen = () => {

  const {  } = useAdmin();

  useEffect(() => {
    
  }, []);  

  return (
    <AdminWrapper>
      <section className="px-3">
        <h1 className="">Panel de Administración</h1>
        <div className="flex flex-wrap align-items-center gap-2">
          {
            cards?.map(({ id, ...rest }) => (
              <AdminCard 
                key={id}
                {...rest}
              />
            ))
          }
          <AdminChart />
          <AdminPopularCoursesCard />
        </div>
      </section>
    </AdminWrapper>
  )
}
