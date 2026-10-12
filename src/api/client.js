import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('banking_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      localStorage.removeItem('banking_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  login: (payload) => apiClient.post('/auth/login', payload),
  register: (payload) => apiClient.post('/customers', payload)
};

export const customerApi = {
  getProfile: () => apiClient.get('/customers/me'),
  getDashboard: () => apiClient.get('/dashboard'),
  getAccounts: () => apiClient.get('/accounts'),
  getTransactions: (params) => apiClient.get('/transactions', { params }),
  createTransfer: (payload) => apiClient.post('/transfers', payload),
  createDeposit: (payload) => apiClient.post('/accounts/deposit', payload),
  createWithdrawal: (payload) => apiClient.post('/accounts/withdrawal', payload),
  getBeneficiaries: () => apiClient.get('/beneficiaries'),
  getScheduledPayments: () => apiClient.get('/scheduled-payments'),
  getStatements: () => apiClient.get('/statements'),
  getNotifications: () => apiClient.get('/notifications')
};
