import fatch from '../commonJs/axios'
let host = 'http://192.168.0.167:6200';
/***
 * 经纪人登录账号密码
 *http://192.168.0.151:6200/micoUSC/agentInfo/loginAuth?loginPhone=123456789&loginPwd=admin
 * */
export function loginAuth(data) {
  return new Promise((resolve,reject)=>{
    fatch({
      method:'GET',
      url:`${host}/micoUSC/agentInfo/loginAuth?loginPhone=${data.loginPhone}&loginPwd=${data.loginPwd}`,
    }).then(res=>{
      if(res.data.status !==false){
        resolve(res.data.data)
      }
    })
  })
}