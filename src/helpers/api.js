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
      const { company : name } = JSON.parse(company);
      config.headers["Company"] = name;
    }

    if(session) {
      const { token } = JSON.parse(session);
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
      // localStorage.removeItem('session');
      // window.location.href = '/';
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
export function GetSchoolHead(id) {
  return client
    .get(`schools/${id}`)
    .then((response) => response);
}
export function GetCourses(params) {
  return client
    .get("cgh/courses", {params})
    .then((response) => response);
}
export function GetCourseHead(id) {
  return client
    .get(`cgh/courses/${id}`)
    .then((response) => response);
}

// learn
export function GetSchoolsByUser(params) {
  return client
    .get("cgh/users/schools", {params})
    .then((response) => response);
}