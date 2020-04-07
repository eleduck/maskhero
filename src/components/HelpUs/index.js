/** 
 * 帮助我们页面组件
 * 
*/
import React, {Fragment, useState} from 'react'
import { images, JINSHUJU } from "../../utils/contants"


export default function HelpUs(){
    const [shareModalIsOpen, setShareModalIsOpen] = useState(false);


    return <Fragment>
      <section className="helpus" id="helpus">
        <h1>希望您能这样帮助我们</h1>
        <p className="text">我们每个人的顺手贡献，都将漂洋过海，温暖人心</p>
        <div className="qrcodes">
          <div className="qrcode">
            <img src={images.icon1} alt="qrcode" />
            <p>不在多少，但求有心</p>
            <a
              className="btn"
              target="_blank"
              rel="noopener noreferrer"
              href={JINSHUJU.DONATOR_FORM_LINK}
              type="button"
            >
              爱心捐赠
            </a>
          </div>
          <div className="qrcode">
            <img src={images.icon2} alt="qrcode" />
            <p>不在多少，但求有心</p>
            <a
              className="btn"
              target="_blank"
              rel="noopener noreferrer"
              href={JINSHUJU.DOMESTIC_FORM_LINK}
              type="button"
            >
              爱心捐物
            </a>
          </div>
          <div className="qrcode">
            <img src={images.icon3} alt="qrcode" />
            <p>转发就是很好的支持</p>
            <button
              className="btn"
              onClick={() => {
                document.body.classList.add("modal-open");
                setShareModalIsOpen(true);
              }}
            >
              分享
            </button>
          </div>
          <div className="qrcode">
            <img src={images.icon4} alt="qrcode" />
            <p>如果你是开发者</p>
            <a
              className="btn"
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/eleduck/maskhero"
              type="button"
            >
              参与开源
            </a>
          </div>
        </div>
      </section>

      <div
        className={`shareModal ${shareModalIsOpen ? "open" : ""}`}
        onClick={(e) => {
          document.body.classList.remove("modal-open");
          setShareModalIsOpen(false);
        }}
      >
        <div className="sharethis-inline-share-buttons"></div>
        <div className="share-mb">
          <p>请点击右上角</p>
          <p>将它发送给指定朋友</p>
          <p>或分享到朋友圈</p>
        </div>
      </div>
    </Fragment>
}