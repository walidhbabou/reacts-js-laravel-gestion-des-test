import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

// Configuration de base
axios.defaults.baseURL = '/api';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Intercepteur pour les requêtes
axios.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// Intercepteur pour les réponses
axios.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        
        // Gestion des erreurs de validation
        if (error.response?.status === 422) {
            const errors = error.response.data as { errors: Record<string, string[]> };
            if (errors.errors) {
                const firstError = Object.values(errors.errors)[0][0];
                throw new Error(firstError);
            }
        }

        // Gestion des erreurs serveur
        if (error.response?.status === 500) {
            throw new Error('Une erreur est survenue sur le serveur');
        }

        return Promise.reject(error);
    }
);

export default axios;
