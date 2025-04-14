import axios from 'axios';

export default defineNuxtPlugin(async () => {
  const config = useRuntimeConfig();
  const auth = useAuth().value
  const baseUrl = config.public.BASE_API ? `${config.public.BASE_API}` : '';
  const token = _keyLocalStorage({ type: 'GET', key: 'token' });
  auth.isAuthenticated = token ? true : false;
  const api = axios.create({
    baseURL: baseUrl,
  });
  let isRefreshToken = false;

  api.interceptors.request.use(async (config) => {
    const token = _keyLocalStorage({ type: 'GET', key: 'token' });
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const { config } = error;
      const status = error.response?.status || '';
      if ((status === 401) && !isRefreshToken) {
        isRefreshToken = true;
        const refresh = _keyLocalStorage({ type: 'GET', key: 'refresh' });
        if (!refresh) {
          logout();
          isRefreshToken = false;
          return Promise.reject(error);
        }
        // Tạo instance axios riêng biệt cho việc refresh token
        const refreshApi = axios.create();
        try {
          const res = await refreshApi.get(`${baseUrl}/api/auth/refresh/${refresh}`);
          _keyLocalStorage({ type: 'SET', key: 'token', value: res.data.data.token });
          _keyLocalStorage({ type: 'SET', key: 'refresh', value: res.data.data.refresh });
          auth.isAuthenticated = true;
          config.headers.Authorization = `Bearer ${res.data.data.token}`;
          isRefreshToken = false;
          // Thực hiện lại yêu cầu ban đầu với token mới
          const response = await api(config);
          return response; // Trả về kết quả của API ban đầu
        } catch (e) {
          logout();
          isRefreshToken = false;
          return Promise.reject(e);
        }
      }
      return Promise.reject(error);
    }
  );

  async function logout() {
    _keyLocalStorage({ type: 'SET', key: 'token', value: '' });
    _keyLocalStorage({ type: 'SET', key: 'refresh', value: '' });
  }

  return {
    provide: {
      axios: api
    }
  };
});