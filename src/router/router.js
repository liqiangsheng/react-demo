
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import App from './../App'
import Home from './../pages/home/home'//首页
import Login from './../pages/login/login'//  登录
import News from './../pages/newsList/newsList' //新闻列表
import NewsDetail from  './../pages/newsList/newDetail' //新闻详情
const Root = () =>(
    <div>
        <Switch>
            <Route path='/'
                   render={props => (
                       <App>
                            <Switch>
                                <Route path='/' exact component={Login}/>
                                <Route path='/login/' exact component={Login}/>
                                <Route path='/home' exact component={Home}/>
                                <Route path='/news' exact component={News}/>
                                <Route path='/newsDetail/:id' exact component={NewsDetail}/>
                                {/*路由不正确时，默认跳回登录页面*/}
                                <Route render={() => <Redirect to="/" />} />
                            </Switch>
                       </App>
                   )}
            />

        </Switch>
    </div>
)

export default Root;