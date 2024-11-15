import axios from "axios";
import { convertKeysToLowerCase } from "./convertKeysToLowerCase";

const client = axios.create();

client.defaults.timeout = 300000;
client.defaults.headers['Content-Type'] = 'application/json';
client.defaults.baseURL = import.meta.env.VITE_ATLAS_API_URL;

client.interceptors.request.use(
  (config) => {
    const session = localStorage.getItem('session');
    const company = localStorage.getItem('company');
    if(company) {
      const { company : name } = JSON.parse(company) ?? {};
      config.headers["Company"] = name;
    }

    if(session) {
      const { token } = JSON.parse(session) ?? {};
      config.headers["X-Api-key"] = token;
    }

    return config;
  }, 
  (error) => {
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  (response) => {
    const res = convertKeysToLowerCase(response?.data);
    return res;
  }, 
  (error) => {
    if (error.response && error.response.status == 401) {
      const base = 'Capacitaciones-APP/';
      const company = window.location.href?.split(base)[1]?.split('/')[0];
      if(location.href?.includes('/learn')) {
        window.location.href = `/${base}${company}/auth/colab`;
      } else {
        localStorage.removeItem('session');
        window.location.href = `/${base}${company}`;
      }
    } else if (error.response && error.response.status == 403) {
      error = 'La cédula proporcionada no existe en los usuarios registrados.'
    }

    return Promise.reject(error);
  }
);

// auth
export function Login(body) {
  return client
    .post("user/login", body)
    .then((response) => response);
}

// admin
export function GetSchools(params) {
  return client
    .get("cgh/schools", {params})
    .then((response) => response);
}
export function AddNewSchool(body) {
  return client
    .post("cgh/schools", body)
    .then((response) => response);
}
export function UpdateSchool(body) {
  return client
    .put("cgh/schools", body)
    .then((response) => response);
}
export function DeleteSchool(body) {
  return client
    .delete("cgh/schools", { data : body })
    .then((response) => response);
}
export function GetSchoolHead({id, headers}) {
  return client
    .get(`cgh/schools/${id}`, { headers })
    .then((response) => response);
}
export function GetCourses(params, headers) {
  return client
  .get("cgh/courses", {params, headers })
  .then((response) => response);
}
export function GetCourseHead({id, headers}) {
  return client
    .get(`cgh/courses/${id}`, { headers })
    .then((response) => response);
}
export function AddCourse(body) {
  return client
    .post("cgh/courses", body)
    .then((response) => response);
}
export function EditCourse(body) {
  return client
    .put("cgh/courses", body)
    .then((response) => response);
}
export function DeleteCourse(body) {
  return client
    .delete("cgh/courses", { data : body })
    .then((response) => response);
}
export function AddVideosToCourse(body) {
  return client
    .post("cgh/courses/videos", body)
    .then((response) => response);
}
export function RemoveVideoFromCourse(body) {
  return client
    .delete("cgh/courses/videos", { data : body })
    .then((response) => response);
}
export function AddCourseToSchool(body) {
  return client
    .post('cgh/schools/courses', body)
    .then((response) => response);
}
export function RemoveCourseFromSchool(body) {
  return client
    .delete('cgh/schools/courses', { data : body })
    .then((response) => response);
}
export function GetVideos(params) {
  return client
    .get('cgh/videos', {params})
    .then((response) => response);
}
export function AddVideo(body) {
  return client
    .post('cgh/videos', body)
    .then((response) => response);
}
export function EditVideo(body) {
  return client
    .put('cgh/videos', body)
    .then((response) => response);
}
export function DeleteVideo(body) {
  return client
    .delete('cgh/videos', { data : body})
    .then((response) => response);
}
export function GetUsers(params) {
  return client
    .get('cgh/users', {params})
    .then((response) => response);
}
export function GetAdminInfo(params) {
  return client
    .get('cgh/admin/info', {params})
    .then((response) => response);
}
export function EditUsers(body) {
  return client
    .put('cgh/users', body)
    .then((response) => response);
}
export function ReorderVideosCourse(body) {
  return client
    .put('cgh/courses/videos', body)
    .then((response) => response);
}
export function AddNewUser(body) {
  return client
    .post('cgh/users', body)
    .then((response) => response);
}
export function DeleteUser(body) {
  return client
    .delete('cgh/users', { data : body})
    .then((response) => response);
}
export function AddCoursesToUser(body) {
  return client
    .post("cgh/courses/users", body)
    .then((response) => response);
}
export function RemoveUserFromColab(body) {
  return client
    .delete("cgh/courses/users", { data : body })
    .then((response) => response);
}
export function SyncVideos(body) {
  return client
    .post("cgh/videos/sync/sharepoint", body)
    .then((response) => response);
}
export function AddExam(body) {
  return client
    .post("cgh/exams", body)
    .then((response) => response);
}
export function EditExam(body) {
  return client
    .put("cgh/exams", body)
    .then((response) => response);
}

// learn
export function GetSchoolsByUser({params, headers}) {
  return client
    .get("cgh/users/schools", {params, headers})
    .then((response) => response);
}
export function GetCoursesByUser({params, headers}) {
  return client
    .get("cgh/users/courses", {params, headers})
    .then((response) => response);
}
export function UpdateVideoProgress({body, headers}) {
  return client
    .put("cgh/users/videos/progress", body, {headers})
    .then((response) => response);
}
export function InitExam({body, headers}) {
  return client
    .post("cgh/exams/users/start", body, {headers})
    .then((response) => response);
}
export function SendAnswersExam({body, headers}) {
  return client
    .post("cgh/exams/users/answer", body, {headers})
    .then((response) => response);
}