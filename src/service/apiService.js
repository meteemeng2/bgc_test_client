// apiService.js

import axios from 'axios';

const baseURL = 'https://localhost:7274/api/orders'; // Replace with your API endpoint URL

const axiosInstance = axios.create({
  baseURL,
  timeout: 5000, // Set a timeout for requests (adjust as needed)
});

export default {
  // GET request
  getOrders(params) {
    return axiosInstance.get('/', { params });
  },

  // POST request
  createOrder(data) {
    return axiosInstance.post('/', data);
  },

  // PUT request
  updateOrder(id, data) {
    return axiosInstance.put(`/${id}`, data);
  },

  // DELETE request
  deleteOrder(id) {
    return axiosInstance.delete(`/${id}`);
  },
};
