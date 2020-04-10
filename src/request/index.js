/**！
 * http请求底层类封装
 */


import http from './http'
import { JINSHUJU } from '../utils/contants'


const eleduckAPI = 'https://svc.eleduck.com/api';
const authObj = {
    auth: {
        username: JINSHUJU.KEY,
        password: JINSHUJU.SECRET,
    }
};


// 获取微信分享参数
export const getWXSignature = (url) => {
    const api = `${eleduckAPI}/v1/wechat/signature?url=${url}`;
    return http.get(api)
};


// 获取国内物资援助数据
export const getDomesticData = () => {
    return http.get(`${JINSHUJU.DOMESTIC_ENDPOINT}`, authObj)
};


// 获取国外反馈数据
export const getForeignData = (next) => {
    return http.get(`${JINSHUJU.FOREIGN_ENDPOINT}?next=${next}`, {
        auth: {
            username: JINSHUJU.FOREIGN_KEY,
            password: JINSHUJU.FOREIGN_SECRET,
        }
    })
};


// 获取自愿者数据
export const getVolunteerData=()=>{
    return http.get(`${JINSHUJU.VOLUNTEER_ENDPOINT}`, authObj)
};


// 获取捐赠者数据
export const getDonatorData=(next)=>{
    return http.get(`${JINSHUJU.DONATOR_ENDPOINT}?next=${next}`, authObj)
};

// 获取赞助商
export const getSponsorData=()=>{
    return http.get(`${JINSHUJU.SPONSOR_ENDPOINT}`, authObj)
};


// 获取爱的留声机
export const getHighLightData=()=>{
    return http.get(`${JINSHUJU.HIGHLIGHT_ENDPOINT}`, authObj)
};


