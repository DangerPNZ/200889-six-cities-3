import axios from 'axios';

const ConfigParameter = {
  BASE_URL: `https://htmlacademy-react-3.appspot.com/six-cities`,
  TIMEOUT: 5000
};
const Error = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  INTERNAL_SERVER_ERROR: 500
};
const ErrorData = {
  BAD_REQUEST: {
    heading: `400. Bad request`,
    description: `Not all data transferred or syntax error. Сheck all fields.`
  },
  INTERNAL_SERVER_ERROR: {
    heading: `500. Internal server error`,
    description: `Try again later or contact tech support.`
  }
};
export const createApi = (onUnauthorized, onError) => {
  const api = axios.create({
    baseURL: ConfigParameter.BASE_URL,
    timeout: ConfigParameter.TIMEOUT,
    withCredentials: true
  });
  const onSuccess = (response) => response;
  const onFail = (err) => {
    const {response} = err;
    if (response.status === Error.UNAUTHORIZED) {
      onUnauthorized();
      throw response;
    } else if (response.status === Error.BAD_REQUEST) {
      onError(ErrorData.BAD_REQUEST);
    } else if (response.status === Error.INTERNAL_SERVER_ERROR) {
      onError(ErrorData.INTERNAL_SERVER_ERROR);
    }
    throw err;
  };
  api.interceptors.response.use(onSuccess, onFail);
  return api;
};

export const api = createApi();

