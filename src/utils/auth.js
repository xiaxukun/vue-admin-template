import Cookies from 'js-cookie'

//当前雅典娜认证token的key为pigeon
const TokenKey = 'pigeon'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
