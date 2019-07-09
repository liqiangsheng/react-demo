
/*
   Home 主页
*/
import React, { Component } from 'react';
import '../../pageCss/home/home.css'
import {findBannerList,findGardenInfoAll,notificationList} from '../../api/home/homeApi'
import { Carousel, WingBlank } from 'antd-mobile';
class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            bannerList:[],//轮播数据
            newsList:[],//文章列表
            notificationList:[],//通知通告
            tabList:[
                {name:'资讯',url:'/newList',img:require('../../assets/images/home/zixun.png')},
                {name:'公告',url:'',img:require('../../assets/images/home/icon(3).png')},
                {name:'活动',url:'',img:require('../../assets/images/home/icon(4).png')},
                {name:'预约停车',url:'',img:require('../../assets/images/home/stop.png')}
                ]
        }
    }
    render() {
        return (
            <div id="home-container" className='boxContent'>
                <div className='page'>
                    <div>
                        <WingBlank>
                            <Carousel
                                autoplay
                                autoplayInterval={3000}
                                infinite
                            >
                                {this.state.bannerList.map((val,index) => (
                                        <img
                                            key={index}
                                            src={val.bannerImage}
                                            alt=""
                                            style={{ width: '100%', verticalAlign: 'top',height:'2.42rem' }}
                                            onLoad={() => {
                                                // fire window resize event to change height
                                                window.dispatchEvent(new Event('resize'));
                                                this.setState({ imgHeight: 'auto' });
                                            }}
                                        />
                                ))}
                            </Carousel>
                        </WingBlank>
                    </div>
                    {/*--通知通告-*/}
                    <div className='homeNotice'>
                         <div className='homeNotice_left'>
                             <img src={require('../../assets/images/home/icon.png')} alt=""/>
                         </div>
                         <div className='homeNoticeUl'>
                             <ul>
                                 {this.state.notificationList.map((val,index) => (
                                     <li key={index} onClick={this.goToDetail.bind(this,val,'notice')}>
                                       <div>
                                           <p className='divBox'></p>
                                       </div>
                                       <div>
                                           <p>{val.title}</p>
                                       </div>
                                     </li>
                                 ))}
                             </ul>
                         </div>
                        <div className='homeNotice_right' onClick={this.goToMore.bind(this,'notice')}>
                            <img src={require('../../assets/images/home/gengduo.png')} alt=""/>
                        </div>
                    </div>
                    {/*tab*/}
                        <ul className='homeTab'>
                            {this.state.tabList.map((val,index)=>(
                                    <li key={index}  onClick={this.goToTab.bind(this)}>
                                        <img src={val.img} alt=""/>
                                        <p>{val.name}</p>
                                    </li>
                            ))}
                        </ul>
                    {/*新闻资讯*/}
                    <div className='homeNew'>
                        <div className='homeNewtitle'>
                            <h5>新闻资讯</h5>
                            <div onClick={this.goToMore.bind(this,'news')}><span>更多》</span></div>
                        </div>
                        <ul className='homeNewUl'>
                            {this.state.newsList.map((val,index) => (
                                <li key={index} onClick={this.goToDetail.bind(this,val,'news')}>
                                    <div className='newLeft'>
                                       <p>{val.messageTitle}</p>
                                        <span>{val.createdAt}</span>
                                    </div>
                                    <div className='newRight'>
                                        <img src={val.messagePhoto} alt=""/>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
    goToTab(){//点击列表
              // that.props.history.push('')
    }
    goToMore(val){
        let  that = this;
        if(val === 'notice'){

        }else{
            //去资讯列表
            that.props.history.push('/news')
        }
    }
    goToDetail(val){
        if(val === 'notice'){

        }else{
            //去资讯详情
            // that.props.history.push('/newDetail/id')
        }

    }
    componentDidMount(){
        findBannerList(1).then(res=>{
            this.setState({
                bannerList:res
            })
        });
        notificationList().then(res=>{
            this.setState({
                notificationList:res.list
            })
        });
        findGardenInfoAll().then(res=>{
            this.setState({
                newsList:res.list
            })
        });
    }
}
export default Home;