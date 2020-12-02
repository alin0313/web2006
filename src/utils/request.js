import axios from 'axios'
import qs from 'querystring'

// 响应状态码：
//     2xx:成功
//     3xx:缓存
//     4xx:客户端错误
//     5xx:后台错误

const errorHandle = (status, info) => {
    switch (status) {
        case 400:
            console.log('请求报文中存在语法错误');
            break;
        case 401:
            console.log("未经许可，需要通过HTTP认证");
            break;
        case 403:
            console.log("服务器拒绝访问");
            break;
        case 404:
            console.log("访问资源不存在");
            break;
        case 500:
            console.log("服务器在执行请求时发生了错误");
            break;
        case 503:
            console.log("服务器暂时处于超负载或正在进行停机维护");
            break;
        default:
            console.log(info);
    }
}

//创建实例对象
var instance = axios.create({
    timeout: 5000
})

//配置公共信息
// instance.defaults.baseURL = 'https://api.example.com';
// instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


//请求拦截
instance.interceptors.request.use(
    config => {
        //判断请求数据方式是否为post请求
        if (config.method === "post") {
            //处理请求传递参数 post请求参数： age=iwen&page=10   ->  { age:'iwen',page:10 }
            config.data = qs.stringify(config.data)
        }
        //返回处理后的参数
        return config;
    },
    error => Promise.reject(error)
);


//响应拦截
instance.interceptors.response.use(
    //判断请求状态（200为成功）是否成功，成功返回成功的参数，失败返回失败的参数
    response => response.status === 200 ? Promise.resolve(response) : Promise.reject(response),
    error => {
        const { response } = error;//
        if (response) {
            errorHandle(response.status, response.info);
            return Promise.reject(response);
        } else {
            console.log('请求中断');
        }
    }
);

export default instance
