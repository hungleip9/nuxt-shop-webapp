export function _useCookie(nameCookie = '') {
  if (!nameCookie) return
  return useCookie(nameCookie, {
    maxAge: 60 * 60 * 24 * 365,
  })
}