/**
 * 赞助商页面组件
 *  */
import './sponsor.scss'
import React, { useState, useEffect } from 'react'
import * as request from '../../request'
import { JINSHUJU } from "../../utils/contants"


export default function Sponsor() {
    const [sponsorData, setSponsorData] = useState([]);

    useEffect(() => {
        // 获取赞助商
        request.getSponsorData()
            .then((response) => {
                let { data } = response;
                data = data.filter((d) => d["field_12"] === "已审核");
                setSponsorData(data);
            })
            .catch((error) => console.log(error));
    }, [])

    return <section className="sponsors module-space">
        <h1>值得尊敬的伙伴们</h1>
        <p className="text">
            与子偕行，共赴国殇！这次行动中，以下这些无私有爱的合作伙伴们，也在发光发热。
        </p>
        <div>
            {sponsorData.map((sponsor,index) => (
                sponsor["field_13"] !== "" ?
                <a target="_blank" rel="noopener noreferrer" href={sponsor["field_13"]}>
                  <img className="sponsor" key={index} src={sponsor["field_11"][0]} alt="sponsor" />
                </a>
                : <img className="sponsor" key={index} src={sponsor["field_11"][0]} alt="sponsor" />
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
                href={JINSHUJU.SPONSOR_FORM_LINK}
                type="button"
            >
                合作联系
        </a>
        </center>
    </section>
}