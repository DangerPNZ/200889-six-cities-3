import axios from 'axios';

const ConfigParameter = {
  BASE_URL: `https://htmlacademy-react-3.appspot.com/six-cities`,
  TIMEOUT: 5000
};
const Error = {
  UNAUTHORIZED: 401,
  INTERNAL_SERVER_ERROR: 500
};
const createApi = () => {
  const api = axios.create({
    baseURL: ConfigParameter.BASE_URL,
    timeout: ConfigParameter.TIMEOUT,
    withCredentials: true
  });
  const onSuccess = (response) => response;
  const onFail = (error) => {
    if (error.response.status === Error.UNAUTHORIZED) {
      // В случае неавторизованной сессии
    } else if (error.response.status === Error.INTERNAL_SERVER_ERROR) {
      // Сообщение в случае недоступности сервера. Оформление на усмотрение разработчика
    }
    // разобраться с видом возвращааемой сущности
    return [];
  };
  api.interceptors.response.use(onSuccess, onFail);
  return api;
};

export const api = createApi();

