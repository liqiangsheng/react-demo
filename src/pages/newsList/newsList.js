// 新闻列表
import React, { Component } from 'react';
import { NavBar, Icon ,Tabs , ListView , PullToRefresh } from 'antd-mobile';
import '../../pageCss/newsList/newsList.css'
import {findGardenInfoAll} from '../../api/newsList/newsListApi'

class News extends Component {
    constructor(props){
        super(props)
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.state={
            tabs:[
                { title: '全部', sub: '1' },
                { title: '园区动态', sub: '2' },
                { title: '木业资讯', sub: '3' }
                ],
            tabsIndex:0,//tab选择的
            newsList:[],//数据
            dataSource:dataSource, //列表的初始化
            refreshing: true, //下拉刷新
            isLoading: true, //文字显示
            pages:{
                pageNum:1,//第几页
                pageSize:10,//每页多少
                type:0,//列表的类型
            }

        }
    }
    query(pages){//数据请求
        let _this = this;
        findGardenInfoAll(pages).then(res=>{
            if(res.pages>=this.state.pages.pageNum){
                _this.state.pages.pageNum++;
                this.setState({
                    newsList:this.state.newsList,
                    dataSource: this.state.dataSource.cloneWithRows([...this.state.newsList,...res.list]),
                    isLoading: false,
                    pages:_this.state.pages,
                });
            }else {
                _this.setState({
                    isLoading: false
                })
            }
             _this.setState({
                 refreshing:false
             })
        })
    }

    onRefresh = () => {//下拉刷新
        let data = Object.assign({}, this.state.pages, { //复制对象 修改对象下的某个值
            pageNum: 1
        })
        this.setState({ refreshing: true, isLoading: true ,pages:data,newsList:[]});
        setTimeout(() => {
          this.query(this.state.pages)
        }, 600);
    }
    onEndReached = (event) => {//上拉加载
        if (this.state.isLoading) {
            return;
        }
        this.setState({ isLoading: true });
        setTimeout(() => {
            this.query(this.state.pages)
        }, 600);

    }
    goToDetail(v){//去列表详情
        console.log(`/newsDetail/${v.id}`,'this.state.newsList')
        this.props.history.push(`/newsDetail/${v.id}`)
    }
    render() {
        const row = (rowData, sectionID, rowID) => { //列表内的内容
            return (
                <div key={rowID} style={{ height:'1rem',borderBottom:'0.01rem solid #f2f2f2'}} className='newList' onClick={this.goToDetail.bind(this,rowData)}>
                    <div>
                       <p>{rowData.messageTitle}</p>
                        <span>{rowData.createdAt}</span>
                    </div>
                    <div>
                       <img src={rowData.messagePhoto} alt=""/>
                    </div>
                </div>
            );
        };
        return (
            <div id="news-container" className='boxContent'>
                 <div className='page'>
                     <NavBar mode="light"
                             icon={<Icon type="left" />}
                             onLeftClick={() =>  this.props.history.go(-1)}
                     >
                      新闻资讯
                     </NavBar>
                     {/*---*/}
                     <div className='newsBox'>
                         <Tabs tabs={this.state.tabs} onTabClick={(tab, index) => {
                             let data = Object.assign({}, this.state.pages, { //复制对象 修改对象下的某个值
                                 pageNum: 1,
                                 type: index
                             })
                             this.setState({ refreshing: true, isLoading: true ,pages:data,newsList:[]});
                             this.query(this.state.pages);
                         }}></Tabs>
                         {/*----*/}
                         <div className='newsBoxList'>
                             <ListView
                                 ref={el => this.lv = el}
                                 dataSource={this.state.dataSource}
                                 renderFooter={() => (<div style={{ textAlign: 'center' }}>
                                     {this.state.isLoading ? '加载中...' : '已加载全部'}
                                 </div>)}
                                 renderRow={row}
                                 style={{
                                     height: '100%',
                                     overflow: 'auto',
                                 }}
                                 pullToRefresh={<PullToRefresh
                                     refreshing={this.state.refreshing}
                                     onRefresh={this.onRefresh}
                                 />}
                                 scrollRenderAheadDistance={500}
                                 onEndReached={this.onEndReached}
                                 onEndReachedThreshold={10}
                             />
                         </div>
                     </div>
                 </div>
            </div>
        )
    }
  componentDidMount(){
      setTimeout(() => {
          this.query(this.state.pages)
      }, 600);
  }
}

export default News;