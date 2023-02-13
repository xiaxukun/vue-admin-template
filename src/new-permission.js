import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'
import getPageTitle from "@/utils/get-page-title"; // progress bar style
import {getKey} from "@/utils/new-auth";
import axios from 'axios';

router.beforeEach( async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  const ticket = getKey()

  if (ticket) {
    //当前cookie存在,说明用户已登录，则向网关雅典娜发送请求获取token并存入全局状态中
    if (!store.state.cookieKey) {
      axios({
        url: 'https://athena-alpha.zaihuiyun.com/login/kylin?ticket='+ticket,
        method: 'get',
        timeout: 5000,
      }).then(result => {
        //存储token到全局状态中
        const token = result.headers.x-zh-h-authorization;
        //指定模块param下的commit中定义的方法
        store.commit('param/SET_TOKEN', 'Bearer '+token);
        next();
        NProgress.done();
      }).catch(err => {
        alert("unknown error");
        window.location.replace("https://atlas-inter.kezaihui.com/#/login?" +
          "service=https://atlas-inter.zaihuiba.com/#/login?service=https%3A%2F%2Ffinance.zaihuiba.com%2F");
      })
    } else {
      next();
      NProgress.done();
    }
  } else {
    //当前cookie不存在，用户未登录，跳转至登录页面并且携带当前域名，登录跳转回到当前页面并且设置cookie
    window.location.replace("https://atlas-inter.kezaihui.com/#/login?" +
      "service=https://atlas-inter.zaihuiba.com/#/login?service=https%3A%2F%2Ffinance.zaihuiba.com%2F");
  }
})
