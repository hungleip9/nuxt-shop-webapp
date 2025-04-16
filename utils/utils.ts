export function _useCookie(nameCookie = '') {
  if (!nameCookie) return
  return useCookie(nameCookie, {
    maxAge: 60 * 60 * 24 * 365,
  })
}
export function _keyLocalStorage(obj: any) {
  if (!obj.type || !obj.key || obj.key.length === 0 || obj.type.length === 0) {
    return false;
  } else {
    if (obj.type.toUpperCase() === "GET") {
      let data = localStorage.getItem(obj.key)
      if (!data) return false
      return JSON.parse(data);
    } else if (obj.type.toUpperCase() === "SET") {
      localStorage.setItem(obj.key, JSON.stringify(obj.value));
      return true;
    } else {
      return false;
    }
  }
}
export function _pushParamsRouter(type: string, data: any) {
  const router = useRouter()
  const route = useRoute()
  const currentQueryParams = { ...route.query, [type]: data };
  router.push({
    query: {
      ...currentQueryParams
    },
  })
}

export function _deleteParamsRouter(arrType: string[]) {
  const router = useRouter()
  const route = useRoute()
  let currentQueryParams = { ...route.query };
  arrType.forEach(type => {
    delete currentQueryParams[type];
  })
  router.push({
    query: {
      ...currentQueryParams,
    },
  });
}