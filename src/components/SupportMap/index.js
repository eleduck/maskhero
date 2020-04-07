/** 
 * 援助地图组件
 * 
 * props:
 * domesticData     {Array}  国内物资捐助数据
 * foreignData      {Array}  国外求助数据     
 * volunteerData    {Array}  自愿者数据     
 * 
*/
import React, { Fragment,useEffect } from 'react'
// 地图插件
import { buildChart } from "../../utils/chartUtils";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);


export default function SupportMap({domesticData=[], foreignData=[], volunteerData=[]}) {

    useEffect(() => {
        let chart;
        if (
            domesticData.length > 0 &&
            foreignData.length > 0 &&
            volunteerData.length > 0
        ) {
            chart = am4core.create("chartdiv", am4maps.MapChart);
            buildChart(chart, domesticData, foreignData, volunteerData);
        }
        return () => {
            chart && chart.dispose();
        };
    }, [domesticData, foreignData, volunteerData]);



    return <Fragment>
        <h1>援助地图</h1>
        <p className="text">
            我们正在以城市为单位，接收海外华人的援助申请，同时在国内募集物资，实施援助。
        </p>

        <div id="chartdiv"></div>

        <div className="legend">
            <div className="marker">
                <div className="color color-1"></div>
                <div className="text">已援助</div>
            </div>
            <div className="marker">
                <div className="color color-2"></div>
                <div className="text">未援助</div>
            </div>
        </div>
    </Fragment>
}