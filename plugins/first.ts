export default defineNuxtPlugin((nuxtApp) => {
  handleCallFirstApi();
  async function handleCallFirstApi() {
    const auth = useAuth()
    const token = _keyLocalStorage({ type: 'GET', key: 'token' }) || '';
    if (!token) {
      auth.logout()
      return
    }
    auth.login()
  }
  return {
    provide: {}
  };
});
