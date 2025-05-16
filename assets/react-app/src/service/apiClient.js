import axios from 'axios';

const apiClient = axios.create({
    baseURL: "/rest-api",
});

export default apiClient;
