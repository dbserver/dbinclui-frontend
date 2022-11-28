import axios from 'axios';

export const handleAxiosError = (error: any) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      return new Error(error.response.data);
    } else if (error.request) {
      return new Error('Serviço não disponível');
    }
  } else {
    return new Error('Algo de errado ocorreu ao realizar a requisição');
  }
};

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || 'https://passarinhosembraco.onrender.com/',
});

export default api;
