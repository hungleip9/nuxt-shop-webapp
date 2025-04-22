export async function login(data: {phoneNumber: string, password: string}) {
  const axios = useNuxtApp().$axios
  return await axios.post(`/api/auth/login`, data)
}
export async function signup(data: {userName: string, phoneNumber: string, email: string, password: string}) {
  const axios = useNuxtApp().$axios
  return await axios.post(`/api/auth/register`, data)
}
export async function fotgot(data: {phoneNumber: string, password: string}) {
  const axios = useNuxtApp().$axios
  return await axios.post(`/api/auth/forgot`, data)
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
export async function updateInfo(data: {address: string, dateOfBirth: string, fullName: string, idNumber: string, imageFile: any}) {
  const axios = useNuxtApp().$axios
  return await axios.post(`/api/auth/info`, data)
}
export const handleGetInfo = async () => {
  const auth = useAuth()
  if (!auth.isAuthenticated) return
  await info().then(res => {
    const info = res?.data?.data?.info || null
    auth.login()
    auth.setInfo(info)
  }).catch(() => {
    auth.logout()
  })
}