
export const useGlobal = defineStore('global', {
  state: () => ({
    loadingApp: true,
  }),
  actions: {
    setLoadingApp(value = false) {
      this.loadingApp = value
    }
  },
  getters: {
  },
})