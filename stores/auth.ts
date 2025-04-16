interface userInfo {
  userName: string | null,
  fullName: string | null,
  email: string,
  address: string | null,
  id: number | null,
  status: string | null,
  photo: string | null,
  isLocked: boolean,
  idNumber: string | null,
  dateOfBirth: string | null
}
export const useAuth = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    infoUser: null as userInfo | null
  }),
  actions: {
    login() {
      this.isAuthenticated = true
    },
    logout() {
      this.isAuthenticated = false
    },
    setInfo(info: userInfo | null) {
      this.infoUser = info
    }
  },
  getters: {
    getAuthenticated: (state) => state.isAuthenticated,
  },
})