/*
* 还有问题的，有接口才调试 这个页面不一定要
* **/
import axios from 'axios'
import { Toast} from 'antd-mobile';
// 创建axios实例
const service = axios.create({
    timeout: 60000 ,                 // 请求超时时间
});
// request拦截器
service.interceptors.request.use(config => {
    let token =JSON.parse(localStorage.getItem('token'))?JSON.parse(localStorage.getItem('token')):''; //token
    config.headers = { 'Content-Type':'application/json; charset=utf-8', 'Authorization':token};
    return config;
}, error => {
    Promise.reject(error);
});
// respone拦截器
service.interceptors.response.use(
    //response => response,
    /**
     * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
     * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
     */
    response =>{
        // const res = response.data;
        // console.log(response,"9999999999999")
        if(response.data.code !== 200){
            if(response.data.code===2016){
                Toast.fail('token已经失效，即将重新去登录', 1);
                setTimeout(()=>{
                    return {data:{status:false}}
                },500)

            }else if(response.data.code===2017){
                Toast.fail('token已经失效，即将重新去登录', 1);
                setTimeout(()=>{
                    return {data:{status:false}}
                },500)
            }else if(response.data.code===2018){
                Toast.fail('token已经失效，即将重新去登录', 1);
                setTimeout(()=>{
                    return {data:{status:false}}
                },500)

            }else{
                Toast.fail(response.data.msg?response.data.msg:"网络错误", 1);
                return {data:{status:false}}
            }

        }else{
            return response;
        }
    },
    error => {
        if(error&&error.response){ //有code不是200
            Toast.fail(error.response.data.status+'!'+ error.response.data.error, 1);
        } else{
            Toast.fail('网络异常，请联系管理员', 1);
        }

        return {data:{status:false}}
        // return Promise.reject(error);
    }
);
//service.defaults.headers.common['Authorization'] = "bearer "+ Cookies.get('ACCESS_TOKEN');
export default service;
