import axios from 'axios'
import store from '../store'

const request = axios.create({
    baseURL: 'https://athena-alpha.zaihuiyun.com/plutus/',
    //请求响应超时时间
    timeout: 5000
})

//请求拦截器
request.interceptors.request.use(config => {
    //请求头设置参数编码规范
    //config.headers['Context-type'] = 'application/json;charset=utf-8';
    //请求头设置token，请求网关用于鉴权
    config.headers['authorization'] = store.state.cookieKey;
    return config;
}, error => {
    Promise.reject(error);
})

//响应拦截器
request.interceptors.response.use(result => {
    //提取真正后台返回数据，后续可做统一异常处理
    return result.data
}, error => {
    Promise.reject(error)
})

export default request
