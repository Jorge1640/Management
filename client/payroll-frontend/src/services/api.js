import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const payrollService = {
  getAllPayrolls: () => api.get('/payroll'),
  getPayrollById: (id) => api.get(`/payroll/${id}`),
  createPayroll: (data) => api.post('/payroll', data),
  updatePayroll: (id, data) => api.put(`/payroll/${id}`, data),
  deletePayroll: (id) => api.delete(`/payroll/${id}`),
  searchByName: (name) => api.get(`/payroll/employee/firstname/${name}`),
  searchByDateRange: (startDate, endDate) => 
    api.get(`/payroll/date-range?startDate=${startDate}&endDate=${endDate}`),
};