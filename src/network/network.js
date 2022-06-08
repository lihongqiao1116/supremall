import axios from 'axios'

export function request(config) {
    // 1.创建axios的实例对象
    const instance = axios.create({
      baseURL: 'http://152.136.185.210:7878/api/hy66',
      timeout: 5000
    })

    //拦截器
    instance.interceptors.response.use(res => {
      return res.data
    })

    // 通过实例发送网络请求
    return instance(config)
}

