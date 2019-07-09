// 新闻详情
import React, { Component } from 'react';
import {findPCGardenInfoById} from '../../api/newsList/newDetailApi'
import { NavBar,Icon } from 'antd-mobile';
import '../../pageCss/newsList/newsDetail.css'
export default class newsDetail extends Component{
    constructor(props){
        super(props)
        this.state ={
            detailData:{},//数据
        }
    }
    render(){
        return (
            <div id='newsDetail' className='boxContent'>
                <div className='page'>
                    <NavBar mode="light"
                            icon={<Icon type="left" />}
                            onLeftClick={() =>  this.props.history.go(-1)}
                    >
                        资讯详情
                    </NavBar>
                    <div className='newsDetailBox'>
                         <div className='newsDetailTitle'>
                             {this.state.detailData.messageTitle}
                         </div>
                          <p className='newsDetailTime'>  {this.state.detailData.createdAt}</p>
                          <div className='newsDetailContent'>
                              <p dangerouslySetInnerHTML={{__html:this.state.detailData.messageContent}}></p>
                          </div>
                    </div>
                </div>
            </div>
        )
    }
    componentDidMount(){
     this.query(this.props.match.params.id);
    }
    query(id){
        findPCGardenInfoById(id).then(res=>{
            this.setState({
                detailData:res
            })
        })
    }
}