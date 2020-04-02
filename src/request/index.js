/**！
 * http请求底层类封装
 */
import http from './http'


const eleduckAPI='https://svc.eleduck.com/api'



// 获取微信分享参数
export const getWXSignature=(url)=> {
    const api=`${eleduckAPI}/v1/wechat/signature?url=${url}`
    return http.get(api)
}
