/** 
 * 帮助我们快捷入口组件 右侧
 * 
*/
import './helpusfastentry.scss'
import React from 'react'
import { images, JINSHUJU } from "../../utils/contants"



export default function HelpUsFastEntry() {
    const entrys = [
        {
            name: '爱心捐款',
            icon: images.helpup_fastentry_love,
            link: JINSHUJU.DONATOR_FORM_LINK
        },
        {
            name: '求助',
            icon: images.helpup_fastentry_seek,
            link: "https://jinshuju.net/f/sIDktA"
        },
        {
            name: '加入',
            icon: images.helpup_fastentry_join,
            link: JINSHUJU.VOLUNTEER_FORM_LINK
        },
        {
            name: '参与开源',
            icon: images.helpup_fastentry_github,
            link: 'https://github.com/eleduck/maskhero'
        }
    ]


    return <div className="container-pc helpus-fastentry">
        {
            entrys.map((item, index) => (
                <div className="entry-item" key={index}>
                    <a href={item.link} target="_blank" type="button" rel="noopener noreferrer">
                        <div className="item-name">
                            {item.name}
                        </div>
                        <div className="item-icon">
                            <img src={item.icon} alt="" />
                        </div>
                    </a>
                </div>
            ))
        }
    </div>
}