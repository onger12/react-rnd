import { useState } from "react"
import { ctc, GetCourseHead, GetCoursesByUser, GetSchoolHead, GetSchoolsByUser } from "../helpers";

export const useLearn = ({ toastRef, handleLoaders }) => {
  const [currentSchool, setCurrentSchool] = useState(null);
  const [schools, setSchools] = useState([]);
  const [courses, setCourses] = useState([]);

  // handlers
  const handleSchools = (sch) => setSchools(sch);
  const handleCourses = (crs) => setCourses(crs);
  const handleCurrentSchool = (cs) => setCurrentSchool(cs);
  
  // BD
  const getSchoolsByUser = async (params) => {
    handleLoaders({ schools : true });
    try {
      const schools = await GetSchoolsByUser({params, headers : params});
      handleSchools(schools);
    } catch (e) {
      ctc(e, 'Hubo un error al consultar las escuelas.', toastRef);
    } finally {
      handleLoaders({ schools : false });
    }
  }
  const getSchoolHeadByUser = async ({id, headers}) => {
    handleLoaders({ currentSchool : true });
    try {
      const school = await GetSchoolHead({ id, headers });
      handleCurrentSchool(school);
    } catch (e) {
      ctc(e, 'Hubo un error al consultar la escuela actual.', toastRef);
    } finally {
      handleLoaders({ currentSchool : false });
    }
  }
  const getCoursesByUser = async (params) => {
    handleLoaders({ courses : true });
    try {
      const courses = await GetCoursesByUser({params, headers : params});
      handleCourses(courses);
    } catch (e) {
      ctc(e, 'Hubo un error al consultar los cursos.', toastRef);
    } finally {
      handleLoaders({ courses : false });
    }
  }
  const getCourseHeadByUser = async ({ id, headers }) => {
    handleLoaders({ courseHead : true });
    try {
      return await GetCourseHead({id, headers});
    } catch (e) {
      ctc(e, 'Hubo un error al consultar el curso.', toastRef);
    } finally {
      handleLoaders({ courseHead : false });
    }
  }

  return ({
    schools,
    courses,
    currentSchool,
    getCoursesByUser,
    getSchoolsByUser,
    getSchoolHeadByUser,
    getCourseHeadByUser,
  })
}