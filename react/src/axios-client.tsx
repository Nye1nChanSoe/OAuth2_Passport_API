import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

export const axiosClient = axios.create({
  baseURL: `${import.meta.env['VITE_API_BASE_URL']}/api/${import.meta.env['VITE_API_VERSION']}`
});


/**
* Intercepts requests and responses before they are handled by 
* then() or catch()
*/
axiosClient.interceptors.request.use((config: InternalAxiosRequestConfig<void>) => {
  const access_token = localStorage.getItem(import.meta.env['VITE_API_TOKEN_KEY']);

  if(access_token)
    config.headers.Authorization = `Bearer ${access_token}`;

  return config;
})


axiosClient.interceptors.response.use((response: AxiosResponse<unknown, void>) => {
  return response;
}, (error: AxiosError<unknown, void>) => {
  try
  {
    const { response } = error;

    // if the user is unthorized, remove the access token
    if(response?.status === 401)
      localStorage.removeItem(import.meta.env['VITE_API_TOKEN_KEY']);
  }
  catch(err)
  {
    console.log('Axios Client Error: ', err);
  }

  // throw error after intercepting, so other handlers can catch it
  throw error;
});