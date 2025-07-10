import axios from 'axios';

const API_BASE_URL = 'https://wyh-backend.onrender.com/allycare/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('allycare_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export const authService = {
  register: async (userData: { name: string; email: string; password: string }) => {
    const response = await api.post('/user/register', userData);
    return response.data;
  },

  login: async (credentials: { email: string; password: string }) => {
    const response = await api.post('/user/login', credentials);
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/user/');
    return response.data;
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('allycare_token');
      localStorage.removeItem('allycare_user');
    }
  }
};

export const reportsService = {
  generateReport: async (sessionId: string) => {
    const response = await api.post('/reports/generate-report', {
      session_id: sessionId
    });
    return response.data;
  },

  previewReport: async (sessionId: string) => {
    const response = await api.post('/reports/preview-report', {
      session_id: sessionId
    });
    return response.data;
  },

  downloadReport: async (sessionId: string) => {
    const response = await api.get(`/reports/download-report?session_id=${sessionId}`, {
      responseType: 'blob'
    });
    return response;
  },

  getSessionIds: async () => {
    const response = await api.get('/reports/session-ids');
    return response.data;
  },

  getAssessmentTypes: async () => {
    const response = await api.get('/reports/assessment-types');
    return response.data;
  },

  healthCheck: async () => {
    const response = await api.get('/reports/health');
    return response.data;
  }
};
