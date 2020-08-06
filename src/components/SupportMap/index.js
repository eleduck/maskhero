/**
 * 援助地图组件
 *
 * props:
 * domesticData     {Array}  国内物资捐助数据
 * foreignData      {Array}  国外求助数据
 * volunteerData    {Array}  自愿者数据
 *
 */
import React, { Fragment, useState, useEffect } from "react";
// 地图插件
import "./supportmap.scss";
import { buildChart } from "../../utils/chartUtils";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

export default function SupportMap({
  domesticData = [],
  foreignData = [],
  volunteerData = [],
}) {
  const [defaultField1, setDefaultField1] = useState(0);
  const [defaultField2, setDefaultField2] = useState(0);

  useEffect(() => {
    let chart;
    if (
      domesticData.length > 0 &&
      foreignData.length > 0 &&
      volunteerData.length > 0
    ) {
      chart = am4core.create("chartdiv", am4maps.MapChart);
      buildChart(chart, domesticData, foreignData, volunteerData);
      // Brandon by default
      const filteredForeignData = foreignData.filter(
        (f) => f["field_15"] === "Brandon"
      );
      const maskDemandCount = filteredForeignData.reduce(
        (total, currentValue) => {
          return total + parseInt(currentValue["field_10"]);
        },
        0
      );
      setDefaultField1(maskDemandCount);
      const helpCount = filteredForeignData.length;
      setDefaultField2(helpCount);
    }

    return () => {
      chart && chart.dispose();
    };
  }, [domesticData, foreignData, volunteerData]);

  return (
    <Fragment>
      <h1>援助地图</h1>
      <p className="text">
        我们正在以城市为单位，接收海外华人的援助申请，同时在国内募集物资，实施援助。
      </p>

      <div id="chartdiv"></div>

      <div id="marker-info" className="marker-info clearfix">
        <div className="city-wrapper">
          <div className="city-en">
            <span className="city-en-text">Brandon</span> -{" "}
            <span className="country-en-text">Canada</span>
          </div>
          <div className="split"></div>
          <div className="city-cn">
            (<span className="country-cn-text">加拿大</span>{" "}
            <span className="city-cn-text">布兰登市</span>)
          </div>
        </div>
        <div className="fields">
          <span className="field-1">口罩需求: {defaultField1} 个</span>
          <span className="field-2">接到求助信息: {defaultField2} 条</span>
          {/* <span className="field-3">援助华人家庭: 10个</span> */}
        </div>
        <div className="apply-aid">
          <a
            className="btn"
            target="_blank"
            rel="noopener noreferrer"
            // href={JINSHUJU.FOREIGN_FORM_LINK}
            href={"https://jinshuju.net/f/sIDktA"}
            type="button"
          >
            申请援助
          </a>
        </div>
      </div>

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
  );
}
