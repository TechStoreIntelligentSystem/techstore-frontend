import api from '../api/axiosConfig';

export const getCoupons = () => api.get('/coupons');
export const createCoupon = (data) => api.post('/coupons', data);
export const deleteCoupon = (id) => api.delete(`/coupons/${id}`);