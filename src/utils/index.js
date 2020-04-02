/**
 * 
 * utility 函数模块
 * 
 */
/* eslint-disable */



// 是否微信内浏览器
export const isWXClient = () => {
    return /MicroMessenger/i.test(navigator.userAgent)
};


// 微信分享处理
export const WXShare = () => {
    if (!isWXClient()) return

    const url = location.href.split("#")[0];
    const shareData = {
        title: "与子同袍-海外华人援助计划",
        desc: "海外的亲们，是时候该我们陪你们打下半场了！",
        link: url,
        imgUrl: "https://eleduck.com/maskhero/logo512.png"
    };

    //获取分享参数
    fetch(`https://svc.eleduck.com/api/v1/wechat/signature?url=${url}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            wx.config({
                // debug: true,
                appId: "wxc7761b6c8088927e",
                timestamp: data.timestamp,
                nonceStr: data.noncestr,
                signature: data.signature,
                jsApiList: ["updateAppMessageShareData", "updateTimelineShareData"]
            });
        })
        .catch(error => {
            console.error("wx.config Error:", error);
        });

    //配置成功触发
    wx.ready(function () {
        console.log('wx.ready', shareData)
        wx.updateAppMessageShareData({
            title: shareData.title,
            desc: shareData.desc,
            link: shareData.link,
            imgUrl: shareData.imgUrl,
            success: (res) => {
                console.log('调用分享朋友成功', res)
            },
            fail: (err) => {
                console.log('调用分享朋友失败', err)
            }
        });

        wx.updateTimelineShareData({
            title: shareData.title,
            link: shareData.link,
            imgUrl: shareData.imgUrl,
            success: (res) => {
                console.log('调用分享朋友圈成功', res)
            },
            fail: (err) => {
                console.log('调用分享朋友圈失败', err)
            }
        });
    });

    //分享异常
    wx.error(function (res) {
        console.log('wx.error', res);
    });
}