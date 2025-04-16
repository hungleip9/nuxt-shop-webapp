export async function login(data: {phoneNumber: string, password: string}) {
  const axios = useNuxtApp().$axios
  return await axios.post(`/api/auth/login`, data)
}
export async function logout() {
  const axios = useNuxtApp().$axios
  const refresh = _keyLocalStorage({ type: 'GET', key: 'refresh'})
  if (!refresh) return
  await axios.get(`/api/auth/logout/${refresh}`)
}
export async function info() {
  const axios = useNuxtApp().$axios
  return await axios.get(`/api/auth/info`)
}
export const handleGetInfo = async () => {
  const auth = useAuth()
  await info().then(res => {
    const info = res?.data?.data?.info || null
    auth.login()
    auth.setInfo(info)
  }).catch(() => {
    auth.logout()
  })
}