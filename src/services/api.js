import axios from "axios";

const api = axios.create({
    baseURL : 'http://localhost:3333',
    headers: {'Authorization':'71afde05'}
});

export default api;