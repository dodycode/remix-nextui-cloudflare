import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

const AUTH_TOKEN_KEY = "authToken";

function setAuthToken(token: string | null) {
  if (token) {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  } else {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }
}

function getAuthToken(): string | null {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

function removeAuthToken() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

type RequestData = Record<string, any>;

interface HttpRequest {
  (method: string, url: string, request?: RequestData, context?: any): Promise<
    AxiosResponse<any>
  >;
}

//note: you can use this function to make http request in loader functions or action functions
const httpRequest: HttpRequest = async (method, url, request = {}, context) => {
  const baseURL = context.env.API_BASE_URL as string;

  const config: AxiosRequestConfig = {
    method: method as AxiosRequestConfig["method"],
    url: `https://cors.prasetyodody17.workers.dev/?${baseURL}${url}`,
    ...(method === "get" || method === "delete"
      ? { params: request }
      : { data: request }),
  };

  const authToken = getAuthToken();
  if (authToken) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${authToken}`,
    };
  }

  try {
    const response = await axiosInstance(config);
    if (response.data && response.data.data) {
      response.data = response.data.data;
    }
    return Promise.resolve(response);
  } catch (error) {
    //@ts-ignore
    if (error.response.status === 401) {
      removeAuthToken();
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
};

const apiClient = {
  setAuthToken,
  removeAuthToken,
  getAuthToken,

  get(url: string, params?: RequestData): Promise<AxiosResponse<any>> {
    return httpRequest("get", url, params);
  },

  delete(url: string, params?: RequestData): Promise<AxiosResponse<any>> {
    return httpRequest("delete", url, params);
  },

  post(url: string, data?: RequestData): Promise<AxiosResponse<any>> {
    return httpRequest("post", url, data);
  },

  put(url: string, data?: RequestData): Promise<AxiosResponse<any>> {
    return httpRequest("put", url, data);
  },

  patch(url: string, data?: RequestData): Promise<AxiosResponse<any>> {
    return httpRequest("patch", url, data);
  },
};

export default apiClient;
