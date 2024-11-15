import { useContext, useEffect, useRef, useState } from "react";

import { Toast } from "primereact/toast";

import { useAdmin } from "../../hooks";
import { RootContext } from "../../App";
import { AdminWrapper } from "../../wrappers";
import { AdminCard, AdminPopularCard, LoadingPlacing } from "../../components";

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

  const [adminInfo, setAdminInfo] = useState(null);

  // refs
  const toastRef = useRef(null);

  // context
  const { handleLoaders, loaders } = useContext(RootContext);

  // hooks
  const { getAdminInfo } = useAdmin({ handleLoaders, toastRef });

  // handlers
  const handleGetAdminInfo = async () => {
    const ai = await getAdminInfo({ take : 3 });
    setAdminInfo(ai);
  }

  useEffect(() => {
    handleGetAdminInfo();
  }, []);

  return (
    <AdminWrapper>
      { loaders?.adminInfo && <LoadingPlacing hScreen /> }
      {
        !loaders?.adminInfo && (
          <section className="px-3">
            <h1 className="">Panel de Administración</h1>
            <div className="flex flex-wrap align-items-center gap-2">
              {
                adminInfo?.cards?.map(({ id, ...rest }) => (
                  <AdminCard 
                    key={id}
                    {...rest}
                  />
                ))
              }
              {/* <AdminChart /> */}
              <AdminPopularCard 
                data={adminInfo?.schoolsRows?.map(t => ({ ...t, title : t?.schoolName }))} 
                title="Escuelas populares"
              />
              <AdminPopularCard 
                data={adminInfo?.coursesRows?.map(t => ({ ...t, title : t?.courseName }))} 
                title="Cursos populares"
              />
            </div>
          </section>
        )
      }
      <Toast ref={toastRef} />
    </AdminWrapper>
  )
}
