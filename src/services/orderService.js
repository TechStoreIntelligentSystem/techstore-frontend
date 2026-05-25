import api from '../api/axiosConfig';

export const getOrders = () => api.get('/orders');
export const getOrderById = (id) => api.get(`/orders/${id}`);
export const createOrder = (data) => api.post('/orders', data);
export const deleteOrder = (id) => api.delete(`/orders/${id}`);