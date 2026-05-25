import api from '../api/axiosConfig';

export const getPayments = () => api.get('/payments');
export const getPaymentById = (id) => api.get(`/payments/${id}`);
export const createPayment = (data) => api.post('/payments', data);
export const deletePayment = (id) => api.delete(`/payments/${id}`);