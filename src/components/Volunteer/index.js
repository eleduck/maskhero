/**
 * 自愿者页面组件
 * 
 *  */

import React, { useState, useEffect } from 'react'
import * as request from '../../request'
import {images, JINSHUJU } from "../../utils/contants"


export default function Volunteer(props) {
    const {updateVolunteerData}=props
    const [volunteerData, setVolunteerData] = useState([]);

    useEffect(() => {
        // 获取自愿者数据
        request.getVolunteerData()
            .then((response) => {
                let { data } = response;
                data = data.filter((d) => d["field_18"] === "已通过");
                setVolunteerData(data);
                updateVolunteerData(data);
            })
            .catch((error) => console.log(error));
    }, [])

    
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
        <div className="column right">
            {
                volunteerData.map((data,index) => (
                    <div className="avatar" key={index}>
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