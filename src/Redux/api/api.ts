import  axios  from 'axios';


const API_URL = "localhost:5000/api"; // আপনার backend URL

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // cookie support
});