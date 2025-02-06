
/// <reference types="vite/client" />
// The above needs to be used in the frontend to access the env related variables 
// This is the axios instance used for communicating with the backend
// It is created using the VITE_BACKEND environment variable .We store the sensitive info in the env files 
import axios from 'axios';
const url=import.meta.env.VITE_BACKEND;
const authorization=import.meta.env.VITE_AUTHORIZATION;
const base=axios.create({
    baseURL:url,
    headers:{
        'authorization':authorization,
    }
})

export default base;