import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add token to requests if available
api.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('adminToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Auth API
export const authAPI = {
    verifySecurityKey: (securityKey) => 
        api.post('/auth/verify', { securityKey })
};

// Home API
export const homeAPI = {
    get: () => api.get('/home'),
    update: (data) => api.put('/home', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })
};

// Projects API
export const projectsAPI = {
    getAll: () => api.get('/projects'),
    getById: (id) => api.get(`/projects/${id}`),
    create: (data) => api.post('/projects', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    update: (id, data) => api.put(`/projects/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    delete: (id) => api.delete(`/projects/${id}`)
};

// Education API
export const educationAPI = {
    getAll: () => api.get('/education'),
    getById: (id) => api.get(`/education/${id}`),
    create: (data) => api.post('/education', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    update: (id, data) => api.put(`/education/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    delete: (id) => api.delete(`/education/${id}`)
};

// Achievements API
export const achievementsAPI = {
    getAll: () => api.get('/achievements'),
    getById: (id) => api.get(`/achievements/${id}`),
    create: (data) => api.post('/achievements', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    update: (id, data) => api.put(`/achievements/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    delete: (id) => api.delete(`/achievements/${id}`)
};

// Certifications API
export const certificationsAPI = {
    getAll: () => api.get('/certifications'),
    getById: (id) => api.get(`/certifications/${id}`),
    create: (data) => api.post('/certifications', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    update: (id, data) => api.put(`/certifications/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    delete: (id) => api.delete(`/certifications/${id}`)
};

// Skills API
export const skillsAPI = {
    getAll: () => api.get('/skills'),
    getByCategory: (category) => api.get(`/skills/category/${category}`),
    getById: (id) => api.get(`/skills/${id}`),
    create: (data) => api.post('/skills', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    update: (id, data) => api.put(`/skills/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    delete: (id) => api.delete(`/skills/${id}`)
};

// Resume API
export const resumeAPI = {
    get: () => api.get('/resume'),
    createOrUpdate: (data) => api.post('/resume', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    delete: () => api.delete('/resume')
};

export default api;
