/** 
 * 页面底部组件
 * 
*/
import React from 'react'
import { images } from "../../utils/contants"


export default function Footer() {


    return <footer>
        <img src={images.footerImg} alt="footer" />
        <center>Eleduck.com With Love.</center>
    </footer>
}