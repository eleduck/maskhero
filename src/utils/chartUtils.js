import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4geodata_data_countries2 from "@amcharts/amcharts4-geodata/data/countries2";
import { buildWorldMapData, buildCountryMapData } from "./dataHelper";

console.log("conuntry", am4geodata_data_countries2);

const countries = require("i18n-iso-countries");
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
countries.registerLocale(require("i18n-iso-countries/langs/zh.json"));
console.log(countries.getNames("zh"));

// temp function
export const buildChart = (chart, domesticData, foreignData, volunteerData) => {
  chart.responsive.enabled = true;
  chart.seriesContainer.draggable = false;
  chart.seriesContainer.resizable = false;
  chart.projection = new am4maps.projections.Miller();
  chart.seriesContainer.events.disableType("doublehit");
  chart.chartContainer.background.events.disableType("doublehit");
  // chart.chartContainer.wheelable = false;

  let worldSeries = chart.series.push(new am4maps.MapPolygonSeries());
  worldSeries.useGeodata = true;
  worldSeries.geodata = am4geodata_worldLow;
  worldSeries.exclude = ["AQ"];

  let worldPolygon = worldSeries.mapPolygons.template;
  worldPolygon.tooltipText =
    "{name}: \n 捐赠口罩: {maskCount} \n 求助信息：{helpCount} 需求口罩：{maskDemandCount}\n 志愿者：{volunteerCount} 个";
  worldPolygon.nonScalingStroke = true;
  worldPolygon.strokeOpacity = 0.5;
  worldPolygon.fill = chart.colors.getIndex(0);
  worldPolygon.fillOpacity = 1;
  worldPolygon.propertyFields.fill = "color";

  worldPolygon.adapter.add("tooltipText", function (text, target) {
    let data = target.tooltipDataItem.dataContext;
    let res = "{name}: \n";
    if (data.maskCount !== 0) {
      res += "捐赠口罩: {maskCount} 个\n";
    }

    if (data.helpCount !== 0) {
      res += "求助信息: {helpCount} 条\n";
    }

    if (data.maskDemandCount !== 0) {
      res += "口罩需求: {maskDemandCount} 个\n";
    }

    if (data.volunteerCount !== 0) {
      res += "志愿者: {volunteerCount} 名\n";
    }

    return res;
  });

  let hs = worldPolygon.states.create("hover");
  // hs.properties.fill = chart.colors.getIndex(4);
  hs.properties.fill = am4core.color("#F9BA48");

  // Create country specific series (but hide it for now)
  let countrySeries = chart.series.push(new am4maps.MapPolygonSeries());
  countrySeries.useGeodata = true;
  countrySeries.hide();
  countrySeries.geodataSource.events.on("done", function (ev) {
    worldSeries.hide();
    countrySeries.show();
  });

  let countryPolygon = countrySeries.mapPolygons.template;
  // countryPolygon.tooltipText = "{name}";
  countryPolygon.nonScalingStroke = true;
  countryPolygon.strokeOpacity = 0.5;
  countryPolygon.fill = am4core.color("#F9BA48");

  // let hsCountry = countryPolygon.states.create("hover");
  // hsCountry.properties.fill = chart.colors.getIndex(9);

  let disabledState = worldPolygon.states.create("disabled");
  disabledState.properties.fill = am4core.color("#000");
  disabledState.properties.fillOpacity = 0.1;
  disabledState.properties.shiftRadius = 0;
  disabledState.properties.scale = 1;
  disabledState.properties.hoverable = false;
  disabledState.properties.clickable = false;

  let zoomedState = worldPolygon.states.create("zoomed");
  zoomedState.properties.hoverable = false;
  zoomedState.properties.clickable = false;
  // Set up click events
  worldPolygon.events.on("hit", function (ev) {
    ev.target.series.chart.zoomToMapObject(ev.target);
    let map = ev.target.dataItem.dataContext.map;
    if (map) {
      ev.target.isHover = false;
      countrySeries.geodataSource.url =
        "https://www.amcharts.com/lib/4/geodata/json/" + map + ".json";
      countrySeries.geodataSource.load();
    }
  });

  const data = buildWorldMapData(
    chart,
    domesticData,
    foreignData,
    volunteerData
  );
  worldSeries.data = data;

  // Zoom control
  chart.zoomControl = new am4maps.ZoomControl();
  chart.zoomControl.dx = -20;
  chart.zoomControl.dy = 5;
  // chart.zoomControl.plusButton.visible = false;
  // chart.zoomControl.minusButton.visible = false;

  let homeButton = new am4core.Button();
  homeButton.events.on("hit", function () {
    worldSeries.show();
    countrySeries.hide();
    chart.goHome();
    setTimeout(() => {
      worldSeries.mapPolygons.values.forEach((mp) => {
        mp.setState("default");
      });
    }, 1000);
  });

  homeButton.icon = new am4core.Sprite();
  homeButton.padding(7, 5, 7, 5);
  homeButton.width = 30;
  homeButton.icon.path =
    "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8";
  homeButton.marginBottom = 10;
  homeButton.parent = chart.zoomControl;
  homeButton.insertBefore(chart.zoomControl.plusButton);

  // TODO: WIP
  const targetSVG =
    "M15.8752 10.4382C17.3193 10.4382 18.7042 11.0136 19.7253 12.0379C20.7465 13.0622 21.3201 14.4514 21.3201 15.9C21.3201 16.6172 21.1793 17.3274 20.9056 17.9901C20.632 18.6527 20.2309 19.2548 19.7253 19.762C19.2197 20.2692 18.6195 20.6715 17.9589 20.946C17.2983 21.2205 16.5902 21.3617 15.8752 21.3617C14.4311 21.3617 13.0462 20.7863 12.0251 19.762C11.004 18.7377 10.4303 17.3485 10.4303 15.9C10.4303 14.4514 11.004 13.0622 12.0251 12.0379C13.0462 11.0136 14.4311 10.4382 15.8752 10.4382ZM15.8752 0.606934C19.9186 0.606934 23.7964 2.21816 26.6556 5.08615C29.5147 7.95415 31.1209 11.844 31.1209 15.9C31.1209 27.3697 15.8752 44.3013 15.8752 44.3013C15.8752 44.3013 0.629517 27.3697 0.629517 15.9C0.629517 11.844 2.23575 7.95415 5.09488 5.08615C7.954 2.21816 11.8318 0.606934 15.8752 0.606934ZM15.8752 4.97637C12.9871 4.97637 10.2172 6.12724 8.17497 8.17581C6.13274 10.2244 4.98543 13.0028 4.98543 15.9C4.98543 18.0847 4.98543 22.4541 15.8752 37.1135C26.765 22.4541 26.765 18.0847 26.765 15.9C26.765 13.0028 25.6177 10.2244 23.5755 8.17581C21.5332 6.12724 18.7634 4.97637 15.8752 4.97637Z";

  var imageSeries = chart.series.push(new am4maps.MapImageSeries());
  imageSeries.id = "markers";
  imageSeries.dx = -6;
  imageSeries.dy = -12;
  imageSeries.cursorOverStyle = am4core.MouseCursorStyle.pointer;

  // define template
  var imageSeriesTemplate = imageSeries.mapImages.template;

  var circle = imageSeriesTemplate.createChild(am4core.Sprite);
  circle.scale = 0.7;
  circle.fill = chart.colors.getIndex(9);
  circle.path = targetSVG;

  imageSeriesTemplate.propertyFields.latitude = "latitude";
  imageSeriesTemplate.propertyFields.longitude = "longitude";
  imageSeriesTemplate.nonScaling = true;
  imageSeriesTemplate.horizontalCenter = "middle";
  imageSeriesTemplate.verticalCenter = "middle";
  imageSeriesTemplate.width = 8;
  imageSeriesTemplate.height = 8;
  imageSeriesTemplate.tooltipText = "{nameCN}";
  imageSeriesTemplate.fill = am4core.color("#000");

  imageSeriesTemplate.events.on("hit", (ev) => {
    const info = document.getElementById("marker-info");
    const cityEN = info.querySelector(".city-en-text");
    const cityCN = info.querySelector(".city-cn-text");
    const countryEN = info.querySelector(".country-en-text");
    const countryCN = info.querySelector(".country-cn-text");
    const link = info.querySelector(".btn");
    const field1 = info.querySelector(".field-1");
    const field2 = info.querySelector(".field-2");
    // TODO: backup for received mask count
    // const field3 = info.querySelector(".field-3");
    info.classList.add("hide");

    setTimeout(() => {
      const {
        name,
        nameCN,
        countryName,
        countryNameCN,
        maskDemandCount,
        helpCount,
        formUrl,
      } = ev.target.dataItem.dataContext;
      cityEN.innerHTML = name;
      cityCN.innerHTML = nameCN;
      countryEN.innerHTML = countryName;
      countryCN.innerHTML = countryNameCN;
      field1.innerHTML = `口罩需求: ${maskDemandCount} 个`;
      field2.innerHTML = `接到求助信息: ${helpCount} 条`;
      info.classList.remove("hide");
      link.href = formUrl;
    }, 300);
  });

  // set zoom events
  imageSeries.events.on("datavalidated", updateImageVisibility);
  chart.events.on("zoomlevelchanged", updateImageVisibility);

  function updateImageVisibility(ev) {
    var chart = ev.target.baseSprite;
    var series = chart.map.getKey("markers");
    series.mapImages.each(function (image) {
      if (image.dataItem.dataContext.minZoomLevel) {
        if (image.dataItem.dataContext.minZoomLevel >= chart.zoomLevel) {
          image.hide();
        } else {
          image.show();
        }
      }
    });
  }

  imageSeries.data = buildCountryMapData(foreignData, volunteerData);
};
