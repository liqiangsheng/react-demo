import fatch from '../commonJs/axios'
let http ='http://192.168.0.167:4002'
/***
 * 园区资讯列表
 * http://192.168.0.105:4888/woodInfoServer/gardenInfo/findGardenInfoAll?pageNum=1&pageSize=4&type=1
 * */
export function findGardenInfoAll(data) {
    return new Promise((resolve,reject)=>{
        fatch({
            method:'GET',
            url:`${http}/woodInfoServer/gardenInfo/findGardenInfoAll?pageNum=${data.pageNum}&pageSize=${data.pageSize}&type=${data.type}&searchName=${data.searchName?data.searchName:''}`,
        }).then(res=>{
            if(res.data.status !==false){
                resolve(res.data.data)
            }
        })
    })
}