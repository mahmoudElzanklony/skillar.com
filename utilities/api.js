import axios from "axios";
// Create an instance of axios with a custom config
const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Replace with your base URL
});


api.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    // For example, you can add an authorization token to headers if needed
    // config.headers['Authorization'] = 'Bearer your-token';
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    // Do something with response data
    return response;
  },
  (error) => {
    // Do something with response error
    if (error.response && error.response.status === 401) {
      // Handle unauthorized error, e.g., redirect to login
    }
    return Promise.reject(error);
  }
);

export default api;
