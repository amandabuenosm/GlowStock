import axios from 'axios';

// instância do Axios
const api = axios.create({
  baseURL: 'http://localhost:5000/',
  timeout: 10000, // tempo de espera para requisição (10 segundos)
});

export default api;
