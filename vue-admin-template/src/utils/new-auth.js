import Cookies from 'js-cookie'

//当前雅典娜认证token的key为pigeon
const cookieKey = 'pigeon'

export function getKey() {
  return Cookies.get(cookieKey)
}
