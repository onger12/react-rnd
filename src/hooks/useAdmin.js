import { useState } from "react";

import { ctc, GetCourseHead, GetCourses, GetSchoolHead, GetSchools } from "../helpers";
import { getRamdonSchools } from "../data";

export const useAdmin = ({ toastRef, handleLoaders }) => {

  const [schools, setSchools] = useState([]);
  const [courses, setCourses] = useState([]);
  const [currentSchool, setCurrentSchool] = useState(null);
  const [currentCourse, setCurrentCourse] = useState(null);

  // handlers
  const handleSchools = (sch) => setSchools(sch);
  const handleCourses = (cors) => setCourses(cors);

  // BD
  const getSchools = async () => {
    try {
      handleLoaders({ schools : false });
      const schools = await GetSchools();
      handleSchools(schools);
    } catch (e) {
      ctc(e, 'Hubo un error al consultar las escuelas.', toastRef);
    } finally {
      handleLoaders({ schools : false });
    }
  }
  const getSchoolsHead = async (id) => {
    if(id == null) return;
    try {
      handleLoaders({ schools : false });
      return await GetSchoolHead(id);
    } catch (e) {
      ctc(e, 'Hubo un error al consultar la escuela.', toastRef);
    } finally {
      handleLoaders({ schools : false });
    }
  }

  const getCourses = async () => {
    try {
      handleLoaders({ courses : false });
      const courses = await GetCourses();
      handleCourses(courses);
    } catch (e) {
      ctc(e, 'Hubo un error al consultar los cursos.', toastRef);
    } finally {
      handleLoaders({ courses : false });
    }
  }

  const getCourseHead = async () => {
    try {
      handleLoaders({ courses : false });
      const courses = await GetCourseHead();
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
    currentCourse,
    currentSchool,
    getSchools,
    getCourses,
    getCourseHead,
    getSchoolsHead,
  })
}