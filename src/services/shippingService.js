import api from '../api/axiosConfig';

export const getShippings = () => api.get('/shipping');
export const getShippingById = (id) => api.get(`/shipping/${id}`);
export const createShipping = (data) => api.post('/shipping', data);
export const deleteShipping = (id) => api.delete(`/shipping/${id}`);