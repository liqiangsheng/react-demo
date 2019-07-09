
/*
   login 登录页
*/
import React, { Component } from 'react';
import { Button,InputItem,Toast } from 'antd-mobile';
import {loginAuth} from '../../api/login/login'
class Login extends Component {
   constructor(props){
       super(props)
       this.state = {
           loginPhone:'123456789',
           loginPwd:'1q2w3e4r'
       }
   }
    render() {
        return (
            <div style={LoginBox}>
                {/*---*/}
                <div style={loginBoxImg}>
                    <img style={loginImg} src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1562324602105&di=6edfa3811096f1600933250217236419&imgtype=0&src=http%3A%2F%2Fimg3.cache.netease.com%2Fphoto%2F0026%2F2014-01-20%2F9J08A41L4CJ80026.jpg" alt=""/>
                </div>
                {/*---*/}
                <div style={loginBoxList}>
                    <InputItem clear
                        placeholder="请输入账号" value={this.state.loginPhone} onChange={(e) =>{
                            console.log(e,"999999")
                            this.setState({
                                loginPhone:e
                            })
                        }}
                    >账号</InputItem>
                </div>
                {/*-----*/}
                <div style={loginBoxList}>
                    <InputItem clear
                               placeholder="请输入密码" value={this.state.loginPwd}
                               type="password"
                               onChange={(e) =>{
                                   this.setState({
                                       loginPwd:e
                                   })
                               }}
                    >密码</InputItem>
                </div>
                {/*---*/}
                <div style={loginBoxList} className='borderNone'>
                    <Button type='primary' onClick={()=>{
                        if(!this.state.loginPhone) return  Toast.fail('账号不能为空', 1);
                        if(!this.state.loginPwd) return  Toast.fail('密码不能为空', 1);
                        let obj= {
                            loginPhone:this.state.loginPhone,
                            loginPwd:this.state.loginPwd,
                        }
                        loginAuth(obj).then(res=>{
                            localStorage.setItem('userInfo',JSON.stringify(res));
                            localStorage.setItem('token',JSON.stringify(res.loginTokenStr));
                            this.props.history.push('/home')
                        })
                    }}>登录</Button>
                </div>

            </div>
        );
    }
}
const LoginBox ={
    width:'100vw',height:'100vh',
    background:'#ffffff',overflow:'hidden'
}
const loginBoxImg ={
    width:'100%',height:'1.5rem',
    display:'flex',alignItems:'center',justifyItems:'center',
}
const loginImg ={
    width:'0.8rem',height:'0.8rem',
    borderRadius:'50%',display:'block',
    margin:'0 auto',
}
const loginBoxList ={
    width:'100%',marginTop:'0.1rem',padding:'0.1rem',
    boxSizing:'border-box',borderBottom:'0.01rem solid #f2f2f2'
}

export default Login;