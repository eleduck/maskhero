/**
 * 页面头部组件
 * 
 * props:
 * money            {Number}    捐赠金额
 * volunteerCount   {Number}    自愿者数据
 * 
*/
import React, { Fragment } from "react";
import { images } from "../../utils/contants";
import HelpUsFastEntry from '../HelpUsFastEntry';

export default function Header(props) {
  const { money, volunteerCount } = props

  const maskCount = 2200;
  const familyCount = 200;
  const foreignCityCount = 4;

  return (
    <Fragment>
      <header className="header">
        <img src={images.logo} className="logo" alt="logo" />
        <img src={images.logomb} className="logo-mb" alt="logo" />
        <img src={images.title} className="title" alt="title" />
        <h1>海外的亲们，是时候让我们陪你们打下半场了！</h1>
        <div className="bar-mb"></div>
        <p>
          这场疫情，国内打上半场，国外打下半场，海外华人打全场。”这话于国内的我们而言是段子，于国外的你们是猝不及防的遭遇。
          在倾力支援国内之后，异国他乡的土地上的你们，除了对抗病毒本身，还要替我们承受“Chinese
          Virus”的污名乃至这背后的威胁、暴力。
        </p>
        <p className="second">
          这一切，国内的亲们，不会坐视。岂曰无衣，与子同袍！我们一起来打下半场。
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://eleduck.com/posts/6XNfOL"
          >
            点此查看我们正在做的>>>
          </a>
        </p>

        {/* pc端统计布局 */}
        <div className="wrapper">
          <div className="tile">
            <div className="name">援助口罩</div>
            <div className="data">
              {maskCount}
              <span className="unit">个</span>
            </div>
          </div>
          <div className="split"></div>
          <div className="tile">
            <div>收到捐款</div>
            <div className="data">
              <span>{money}</span>
              <span className="unit">元</span>
            </div>
          </div>
          <div className="split"></div>
          <div className="tile">
            <div>援助华人家庭</div>
            <div className="data">
              {familyCount}
              <span className="unit">个</span>
            </div>
          </div>
          <div className="split"></div>
          <div className="tile">
            <div>志愿者</div>
            <div className="data">
              {volunteerCount}
              <span className="unit">人</span>
            </div>
          </div>
          <div className="split"></div>
          <div className="tile">
            <div>援助海外城市</div>
            <div className="data">
              {foreignCityCount}
              <span className="unit">个</span>
            </div>
          </div>
        </div>
        <img className="arrow" src={images.vector} alt="arrow"></img>
     
        {/* 帮助我们快速入口 */}
        <HelpUsFastEntry />
      </header>

      {/* 移动端统计布局 */}
      <div className="wrapper-mb">
        <h1>截止目前为止，我们已经</h1>
        <div className="tile">
          <div className="name">援助口罩</div>
          <div className="data">
            {maskCount}
            <span className="unit">个</span>
          </div>
        </div>
        <div className="split"></div>
        <div className="tile">
          <div className="name">收到捐款</div>
          <div className="data">
            {money}
            <span className="unit">元</span>
          </div>
        </div>
        <div className="split"></div>
        <div className="tile">
          <div className="name">援助华人家庭</div>
          <div className="data">
            {familyCount}
            <span className="unit">个</span>
          </div>
        </div>
        <div className="split"></div>
        <div className="tile">
          <div className="name">志愿者</div>
          <div className="data">
            {volunteerCount}
            <span className="unit">人</span>
          </div>
        </div>
        <div className="split"></div>
        <div className="tile">
          <div className="name">援助海外城市</div>
          <div className="data">
            {foreignCityCount}
            <span className="unit">个</span>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
