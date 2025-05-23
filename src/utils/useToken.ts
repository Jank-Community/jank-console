export const getToken = () => {
  const token = localStorage.getItem('token')
  return token
}

export const setToken = (token: string) => {
  localStorage.setItem('token', token)
}

export const removeToken = () => {
  localStorage.removeItem('token')
}

export const clearToken = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('email')
}

export const getEmail = () => {
  const email = localStorage.getItem('email')
  return email
}
