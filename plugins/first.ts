import { handleGetInfo } from '~~/services/header';
export default defineNuxtPlugin((nuxtApp) => {
  handleCallFirstApi();
  async function handleCallFirstApi() {
    const auth = useAuth()
    const global = useGlobal()
    global.setLoadingApp(true)
    const token = _keyLocalStorage({ type: 'GET', key: 'token' }) || '';
    if (!token) {
      auth.logout()
      global.setLoadingApp(false)
      return
    }
    auth.login()
    await handleGetInfo()
    global.setLoadingApp(false)
  }
  return {
    provide: {}
  };
});
