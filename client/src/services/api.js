import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Dodaj token u request header ako postoji
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const login = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
    }
    return response.data;
};

export const register = async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
};

export const getInteractions = async () => {
    const response = await api.get('/interactions');
    return response.data;
};

export const getUsers = async () => {
    const response = await api.get('/users');
    return response.data;
};

export const updateUserRole = async (id, roleName) => {
    const response = await api.put(`/users/${id}/role`, { roleName });
    return response.data;
};

export const deleteUser = async (id) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
};

export const getClients = async () => {
    const response = await api.get('/clients');
    return response.data;
};

export const createClient = async (clientData) => {
    const response = await api.post('/clients', clientData);
    return response.data;
};

export const updateClient = async (id, clientData) => {
    const response = await api.put(`/clients/${id}`, clientData);
    return response.data;
};

export const deleteClient = async (id) => {
    const response = await api.delete(`/clients/${id}`);
    return response.data;
};

export const getProperties = async () => {
    const response = await api.get('/properties');
    return response.data;
};

export const getPropertyById = async (id) => {
    const response = await api.get(`/properties/${id}`);
    return response.data;
};

export const createProperty = async (propertyData) => {
    const response = await api.post('/properties', propertyData);
    return response.data;
};

export const updateProperty = async (id, propertyData) => {
    const response = await api.put(`/properties/${id}`, propertyData);
    return response.data;
};

export const deleteProperty = async (id) => {
    const response = await api.delete(`/properties/${id}`);
    return response.data;
};

export const getDashboardStats = async () => {
    const response = await api.get('/stats');
    return response.data;
};

export const getExchangeRates = async () => {
    const response = await api.get('/external/rates');
    return response.data;
};

export const getUnsplashImage = async (query) => {
    const response = await api.get(`/external/unsplash?query=${query || 'house'}`);
    return response.data;
};

export const createInteraction = async (interactionData) => {
    const response = await api.post('/interactions', interactionData);
    return response.data;
};

export default api;
