import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://api.clarifai.com',
    headers:{
        "Authorization": "key 9c6f350648a940baa3137bca647dbb49"
    }
})

export default api;

// Essa Key é em settings que pega