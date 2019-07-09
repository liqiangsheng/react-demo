//下拉加载的方法
/***
 * pages分页
 *api请求数据
 *_this= this
 *dataSource下拉刷新的实例
 *isLoading加载
 * refreshing下拉刷新
 * dataList数据
 * ***/
export function loadingMore(api,pages,_this,dataSource,isLoading,refreshing,dataList) {
    api(pages).then(res=>{
        if(res.pages>=pages.pageNum){
            pages.pageNum++;
            dataList = [...dataList,...res.list]
            _this.setState({
                dataList:dataList,
                dataSource: dataSource.cloneWithRows(dataList),
                isLoading: false,
                pages:pages,
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