import { useState } from "react";

import { ctc, DeleteSchool, GetCourseHead, GetCourses, GetSchoolHead, GetSchools, GetUsers, GetVideos, SyncVideos } from "../helpers";

export const useAdmin = ({ toastRef, handleLoaders } = {}) => {

  const [users, setUsers] = useState([]);
  const [videos, setVideos] = useState([]);
  const [schools, setSchools] = useState([]);
  const [courses, setCourses] = useState([]);
  const [currentSchool, setCurrentSchool] = useState(null);
  const [currentCourse, setCurrentCourse] = useState(null);

  // handlers
  const handleUsers = (usrs) => setUsers(usrs);
  const handleVideos = (vids) => setVideos(vids);
  const handleSchools = (sch) => setSchools(sch);
  const handleCourses = (cors) => setCourses(cors);

  // BD
  const getSchools = async (params) => {
    try {
      handleLoaders({ schools : true });
      const schools = await GetSchools(params);
      handleSchools(schools);
    } catch (e) {
      ctc(e, 'Hubo un error al consultar las escuelas.', toastRef);
    } finally {
      handleLoaders({ schools : false });
    }
  }
  const deleteSchool = async (sch, onDone) => {
    try {
      handleLoaders({ deleteSchool : sch });
      const s = await DeleteSchool(sch);
      onDone && onDone();
      return s;
    } catch (e) {
      ctc(e, 'Hubo un error al eliminar la escuela.', toastRef);
    } finally {
      handleLoaders({ deleteSchool : false });
    }
  }
  const getSchoolsHead = async (id) => {
    if(id == null) return;
    try {
      handleLoaders({ schoolHead : true });
      return await GetSchoolHead(id);
    } catch (e) {
      ctc(e, 'Hubo un error al consultar la escuela.', toastRef);
    } finally {
      handleLoaders({ schoolHead : false });
    }
  }
  const getCourses = async (params) => {
    try {
      handleLoaders({ courses : true });
      const courses = await GetCourses(params);
      handleCourses(courses);
    } catch (e) {
      ctc(e, 'Hubo un error al consultar los cursos.', toastRef);
    } finally {
      handleLoaders({ courses : false });
    }
  }
  const getCourseHead = async () => {
    try {
      handleLoaders({ courseHead : true });
      const courses = await GetCourseHead();
      handleCourses(courses);
    } catch (e) {
      ctc(e, 'Hubo un error al consultar los cursos.', toastRef);
    } finally {
      handleLoaders({ courseHead : false });
    }
  }
  const getVideos = async (params) => {
    try {
      handleLoaders({ videos : true });
      const videos = await GetVideos(params);
      handleVideos(videos);
    } catch (e) {
      ctc(e, 'Hubo un error al consultar los videos.', toastRef);
    } finally {
      handleLoaders({ videos : false });
    }
  }
  const getUsers = async (params) => {
    try {
      handleLoaders({ users : true });
      const users = await GetUsers(params);
      handleUsers(users);
    } catch (e) {
      ctc(e, 'Hubo un error al consultar los usuarios.', toastRef);
    } finally {
      handleLoaders({ users : false });
    }
  }
  const syncVideos = async (params) => {
    try {
      handleLoaders({ syncVideos : true });
      const videos = await SyncVideos(params);
      handleVideos([videos, ...videos]);
    } catch (e) {
      ctc(e, 'Hubo un error al sincronizar los videos.', toastRef);
    } finally {
      handleLoaders({ syncVideos : false });
    }
  }

  return ({
    users,
    videos,
    schools,
    courses,
    currentCourse,
    currentSchool,
    getUsers,
    getVideos,
    getSchools,
    getCourses,
    syncVideos,
    handleUsers,
    deleteSchool,
    handleVideos,
    handleSchools,
    handleCourses,
    getCourseHead,
    getSchoolsHead,
  })
}