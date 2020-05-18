/**
 * 自愿者页面组件
 * 
 *  */

import "./volunteer.scss"
import React, { useState, useEffect } from 'react'
import * as request from '../../request'
import {images, JINSHUJU } from "../../utils/contants"


export default function Volunteer(props) {
    const { updateVolunteerData }=props;
    const [volunteerData, setVolunteerData] = useState([]);
    const [activeIndex, setActiveIndex]= useState(0)
    const [groupName,setGroupName]=useState('海外志愿组')

    useEffect(() => {
        // 获取自愿者数据
        request.getVolunteerData()
            .then((response) => {
                let { data } = response;
                data = data.filter((d) => d["field_18"] === "已通过");
                setVolunteerData(data);
                updateVolunteerData(data);
                // 随机激活
                let len=data.length
                let index=Math.floor(Math.random()*len)
                setActiveIndex(index)
            })
            .catch((error) => console.log(error));
    }, []);


    
    return <div className="volunteers">
        <div className="column left">
            <h2>默默付出着的志愿者们</h2>
            <p>
                坦诚的讲，做这样的公益太累了。如果没有这帮志愿者的陆续加入，我和@Char根本坚持不下来。
            </p>
            <p>要感谢的人太多，但我更想对这些同志们说——辛苦了！</p>
            <p>Respect!</p>
            <a
                className="btn"
                target="_blank"
                rel="noopener noreferrer"
                href={JINSHUJU.VOLUNTEER_FORM_LINK}
                type="button"
            >
                加入我们
            </a>
        </div>
        <div className="column right volunteer-members">
            {
                volunteerData.length>0&&(
                    <div className="members-info">
                        <div className="info-avatar">
                            <img
                                src={
                                    volunteerData[activeIndex]["x_field_weixin_headimgurl"].replace("http://", "https://") ||
                                    images.avatar
                                }
                                alt="avatar"
                                />
                        </div>
                        <div className="info-right">
                            <div>
                                <span className="info-name">{volunteerData[activeIndex]["field_1"]}</span>
                                <span className="info-position">{volunteerData[activeIndex]["field_11"]}</span>
                            </div>
                            <div className="info-desc">{volunteerData[activeIndex]["field_7"]}</div>
                        </div>
                    </div>
                )
            }
            <div className="members-list members-list-pc">
            {
                volunteerData.map((data,index) => (
                    data["field_11"]===groupName?
                    <div 
                    className={`avatar ${index===activeIndex?'active':''}`} 
                    key={index} 
                    onClick={()=>setActiveIndex(index)}>
                        <img
                        src={
                            data["x_field_weixin_headimgurl"].replace("http://", "https://") ||
                            images.avatar
                        }
                        alt="avatar"
                        />
                        <div className="overlay">
                            <div className="text">{data["field_1"]}</div>
                        </div>
                    </div>:''
                ))
            }
            </div>
            <div className="members-group">
                <div 
                    onClick={()=>setGroupName('海外志愿组')}
                    className={`group ${groupName==="海外志愿组"?'active':''}`}>海外志愿组</div>
                <div 
                    onClick={()=>setGroupName('国内开发组')}
                    className={`group ${groupName==="国内开发组"?'active':''}`}>国内开发组</div>
                <div 
                    onClick={()=>setGroupName('物资信息组')}
                    className={`group ${groupName==="物资信息组"?'active':''}`}>物资信息组</div>
            </div>
            <div className="members-list members-list-mb">
            {
                volunteerData.map((data,index) => (
                    <div 
                    className={`avatar ${index===activeIndex?'active':''}`} 
                    key={index} 
                    onClick={()=>setActiveIndex(index)}>
                        <img
                        src={
                            data["x_field_weixin_headimgurl"].replace("http://", "https://") ||
                            images.avatar
                        }
                        alt="avatar"
                        />
                        <div className="overlay">
                            <div className="text">{data["field_1"]}</div>
                        </div>
                    </div>
                ))
            }
            </div>
        </div>
        <a
        className="btn-mb"
        target="_blank"
        rel="noopener noreferrer"
        href={JINSHUJU.VOLUNTEER_FORM_LINK}
        type="button"
        >
        加入我们
        </a>
    </div>

}