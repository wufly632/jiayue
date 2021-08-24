import axios from "axios";
import Qs from "qs";
import router from 'src/router'
import { MessageBox } from 'mint-ui'

const config = {
  //baseURL: '',
  timeout: 200000, //
  //`withCredentails` 选项表明了是否是跨域请求
  withCredentials: true,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "X-Requested-With": "XMLHttpRequest",
  },
  transformRequest: [
    function (data) {
      // 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，这里可以使用开头引入的Qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
      // if (window.localStorage.getItem('userToken') && data) {
      //   data['token'] = window.localStorage.getItem('userToken') ||　''
      // }
      // if (data) {
      //   data['currency_code'] = window.localStorage.getItem('currencyCode') || ''
      // }
      data = Qs.stringify(data)
      return data
    },
  ],
  //返回数据类型
  responseType: "json",
};
const AxiosInst = axios.create(config)
//请求拦截器
AxiosInst.interceptors.request.use(
  (config) => {
    // 过滤无效参数
    const { data } = config
    if (data) {
      for (let i in data) {
        if (data[i] === '' || data[i] === null ||  data[i] === undefined) {
          delete data[i]
        }
      }
    }

    // 登录的token
    config.headers.authorization = 'Bearer ' + JSON.parse(localStorage.getItem('jiayue_token') || JSON.stringify({ token: '' })).token
    
    return config
  },
  (err) => {
    return Promise.reject(err);
  }
)
//响应拦截器
AxiosInst.interceptors.response.use(
  (response) => {
    const { data, headers } = response

    if (data.code !== 20000) {
      let errorMessage = data.message
      
      if (data.code === 59999) {
        errorMessage = errorMessage + `，TraceId: ${headers['pb-request-id']}`
      }

      if (data.code === 40001) {
        // 清理token，返回登录页
        window.localStorage && localStorage.removeItem('jiayue_token')

        router.replace({
          path: '/my',
          query: {
            redirect: router.currentRoute.fullPath
          }
        })
        return response
      }

      MessageBox({
        title: '',
        message: errorMessage,
        confirmButtonText: 'OK',
      })

      return response
      // return Promise.reject(new Error(errorMessage))
    } else {
      return response
    }
  },
  (error) => {
    const { response } = error
    const { status, data, config, headers } = response

    const totalError = `；TraceId：` + (headers['pb-request-id'] || '')
    let message = ''

    if (status === 502 || status === 404) {
      message = 'The server is a little tired ⊙﹏⊙...' + totalError
    } else if (status === 403) {
      message = 'Insufficient permissions, please contact administrator!' + totalError
    } else {
      message = data.message + totalError
    }

    MessageBox({
      title: '',
      message,
      confirmButtonText: 'OK',
    })

    return response
  }
)
export default AxiosInst;
