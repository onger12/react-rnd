import { useState } from "react"
import { ctc, GetCourses, GetSchools, GetSchoolsByUser } from "../helpers";

export const useLearn = ({ toastRef, handleLoaders }) => {
  const [schools, setSchools] = useState([]);
  const [courses, setCourses] = useState([]);

  // handlers
  const handleSchools = (sch) => setSchools(sch);
  const handleCourses = (crs) => setCourses(crs);
  
  // BD
  const getSchoolsByUser = async (params) => {
    handleLoaders({ schools : true });
    try {
      const schools = await GetSchoolsByUser(params);
      handleSchools(schools);
    } catch (e) {
      ctc(e, 'Hubo un error al consultar las escuelas.', toastRef);
    } finally {
      handleLoaders({ schools : false });
    }
  }
  const getCourses = async (params) => {
    handleLoaders({ courses : true });
    try {
      const courses = await GetCourses(params);
      handleCourses(courses);
    } catch (e) {
      ctc(e, 'Hubo un error al consultar los cursos.', toastRef);
    } finally {
      handleLoaders({ courses : false });
    }
  }

  return ({
    schools,
    courses,
    getCourses,
    getSchoolsByUser,
  })
}