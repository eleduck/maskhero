/**
 * 赞助商页面组件
 *  */
import React, { Fragment, useState, useEffect } from 'react'
import * as request from '../../request'
import { JINSHUJU } from "../../utils/contants"


export default function Sponser() {
    const [sponserData, setSponserData] = useState([]);

    useEffect(() => {
        // 获取赞助商
        request.getSponserData()
            .then((response) => {
                let { data } = response;
                data = data.filter((d) => d["field_12"] === "已审核");
                setSponserData(data);
            })
            .catch((error) => console.log(error));
    }, [])

    return <section className="sponsers">
        <h1>值得尊敬的伙伴们</h1>
        <p className="text">
            与子偕行，共赴国殇！这次行动中，以下这些无私有爱的合作伙伴们，也在发光发热。
        </p>
        <div>
            {sponserData.map((sponser,index) => (
                <img className="sponser" key={index} src={sponser["field_11"][0]} alt="icbc" />
            ))}
        </div>
        <center>
            <span>
                我们的力量总归有限，真心的邀请其他公司/组织/品牌/等合作共建，帮助到更多的海外华人。
        </span>
            <a
                className="btn"
                target="_blank"
                rel="noopener noreferrer"
                href={JINSHUJU.SPONSER_FORM_LINK}
                type="button"
            >
                合作联系
        </a>
        </center>
    </section>
}