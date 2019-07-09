import fatch from '../commonJs/axios'
let http ='http://192.168.0.167:4002'
/***
 * 园区资讯列表
 * http://192.168.0.167:4002/woodInfoServer/gardenInfo/findPCGardenInfoById/2019052717380816d20b95225e44799928fa5759dc0f96
 * */
export function findPCGardenInfoById(id) {
    return new Promise((resolve,reject)=>{
        fatch({
            method:'GET',
            url:`${http}/woodInfoServer/gardenInfo/findPCGardenInfoById/${id}`,
        }).then(res=>{
            if(res.data.status !==false){
                resolve(res.data.data)
            }
        })
    })
}