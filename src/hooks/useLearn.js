import { useState } from "react"
import { ctc, GetCourseHead, GetCoursesByUser, GetSchoolHead, GetSchoolsByUser, InitExam, SendAnswersExam } from "../helpers";

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
  const getCoursesByUser = async (params, onError, returnData = null) => {
    handleLoaders({ courses : true });
    try {
      const courses = await GetCoursesByUser({params, headers : params});
      
      if(returnData) {
        return courses;
      }

      handleCourses(courses);
    } catch (e) {
      ctc(e, 'Hubo un error al consultar los cursos.', toastRef);
      onError && onError();
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
  const initExam = async ({ body, headers }) => {
    handleLoaders({ initExam : true });
    try {
      return await InitExam({body, headers});
    } catch (e) {
      ctc(e, 'Hubo un error al iniciar el cuestionario.', toastRef);
    } finally {
      handleLoaders({ initExam : false });
    }
  }
  const finishExam = async ({ body, headers }) => {
    handleLoaders({ finishExam : true });
    try {
      return await SendAnswersExam({body, headers});
    } catch (e) {
      ctc(e, 'Hubo un error al enviar las respuestas del cuestionario.', toastRef);
    } finally {
      handleLoaders({ finishExam : false });
    }
  }

  return ({
    schools,
    courses,
    currentSchool,
    initExam,
    finishExam,
    getCoursesByUser,
    getSchoolsByUser,
    getSchoolHeadByUser,
    getCourseHeadByUser,
  })
}