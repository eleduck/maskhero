import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4geodata_data_countries2 from "@amcharts/amcharts4-geodata/data/countries2";
import {
  AVAILABLE_PROVINCES,
  AVAILABLE_COUNTIES,
  AVAILABLE_CITIES
} from "../common/contants";

console.log("conuntry", am4geodata_data_countries2);

const countries = require("i18n-iso-countries");
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
countries.registerLocale(require("i18n-iso-countries/langs/zh.json"));
console.log(countries.getNames("zh"));

// temp function
export const buildChart = (chart, domesticData, foreignData, volunteerData) => {
  chart.responsive.enabled = true;

  chart.projection = new am4maps.projections.Miller();
  chart.seriesContainer.draggable = false;
  chart.seriesContainer.resizable = false;
  chart.maxZoomLevel = 1;
  chart.seriesContainer.events.disableType("doublehit");
  chart.chartContainer.background.events.disableType("doublehit");
  // Create map polygon series for world map
  let worldSeries = chart.series.push(new am4maps.MapPolygonSeries());
  worldSeries.useGeodata = true;
  worldSeries.geodata = am4geodata_worldLow;
  worldSeries.exclude = ["AQ"];

  let worldPolygon = worldSeries.mapPolygons.template;
  worldPolygon.tooltipText =
    "{name}: \n 捐赠口罩: {maskCount} \n 求助信息：{helpCount} 需求口罩：{maskRequiredCount}\n 志愿者：{volunteerCount} 个";
  worldPolygon.nonScalingStroke = true;
  worldPolygon.strokeOpacity = 0.5;
  worldPolygon.fill = chart.colors.getIndex(0);
  worldPolygon.propertyFields.fill = "color";

  worldPolygon.adapter.add("tooltipText", function(text, target) {
    let data = target.tooltipDataItem.dataContext;
    let res = "{name}: \n";
    if (data.maskCount !== 0) {
      res += "捐赠口罩: {maskCount} 个\n";
    }

    if (data.helpCount !== 0) {
      res += "求助信息: {helpCount} 条\n";
    }

    if (data.maskRequiredCount !== 0) {
      res += "口罩需求: {maskRequiredCount} 个\n";
    }

    if (data.volunteerCount !== 0) {
      res += "志愿者: {volunteerCount} 名\n";
    }

    return res;
  });

  let hs = worldPolygon.states.create("hover");
  hs.properties.fill = chart.colors.getIndex(9);

  // Create country specific series (but hide it for now)
  let countrySeries = chart.series.push(new am4maps.MapPolygonSeries());
  countrySeries.useGeodata = true;
  countrySeries.hide();
  countrySeries.geodataSource.events.on("done", function(ev) {
    worldSeries.hide();
    countrySeries.show();
  });

  let countryPolygon = countrySeries.mapPolygons.template;
  // countryPolygon.tooltipText =
  //   "{name}: \n 捐赠口罩: {maskCount} \n 求助信息：{helpCount} \n 志愿者：{volunteerCount} 个";
  countryPolygon.nonScalingStroke = true;
  countryPolygon.strokeOpacity = 0.5;
  countryPolygon.fill = chart.colors.getIndex(0);

  hs = countryPolygon.states.create("hover");
  hs.properties.fill = chart.colors.getIndex(9);

  // countryPolygon.adapter.add("tooltipText", function(text, target) {
  //   var data = target.tooltipDataItem.dataContext;
  //   console.log("data", data);
  //   return "aaa";
  // });

  // This auto-generates a legend according to each series' name and fill
  // chart.legend = new am4maps.Legend();

  // Legend styles
  // chart.legend.paddingLeft = 27;
  // chart.legend.paddingRight = 27;
  // chart.legend.marginBottom = 15;
  // chart.legend.width = am4core.percent(90);
  // chart.legend.valign = "bottom";
  // chart.legend.contentAlign = "left";

  // Legend items
  // chart.legend.itemContainers.template.interactionsEnabled = false;

  // Set up click events
  // worldPolygon.events.on("hit", function(ev) {
  //   ev.target.series.chart.zoomToMapObject(ev.target);
  //   let map = ev.target.dataItem.dataContext.map;
  //   if (map) {
  //     ev.target.isHover = false;
  //     countrySeries.geodataSource.url =
  //       "https://www.amcharts.com/lib/4/geodata/json/" + map + ".json";
  //     countrySeries.geodataSource.load();
  //     // wrong event
  //     countrySeries.geodataSource.events.on("done", ev => {
  //       console.log("done");
  //       // console.log(countrySeries);
  //       // console.log(ev);
  //       // TODO: Workaround
  //       setTimeout(() => {
  //         console.log("data", countrySeries.data);
  //       }, 500);
  //       for (let id in countrySeries.data) {
  //         console.log("id", id);
  //         // console.log("data", countrySeries.data[id]);
  //         // countrySeries.data[id].maskCount = Math.round(Math.random() * 10);
  //       }
  //     });
  //     // TODO: Workaround. need to find out data loaded event or callback to inject custom data;
  //     // setTimeout(() => {
  //     //   for (let id in countrySeries.data) {
  //     //     console.log("id", countrySeries.data[id]);
  //     //     console.log("data", countrySeries.data);
  //     //     countrySeries.data[id].maskCount = Math.round(Math.random() * 10);
  //     //     console.log(countrySeries.data);
  //     //   }
  //     // }, 2000);
  //   }
  // });

  // Set up data for countries
  let data = [];
  for (let id in am4geodata_data_countries2) {
    if (am4geodata_data_countries2.hasOwnProperty(id)) {
      let country = am4geodata_data_countries2[id];
      let maskCount = 0;
      let maskRequiredCount = 0;
      let helpCount = 0;
      let volunteerCount = 0;
      if (domesticData.length > 0) {
        const list = domesticData.filter(
          data =>
            countries.getNames("zh")[id] === data["x_field_weixin_country"]
          // () => countries.getNames("zh")[id] === "中国"
        );
        maskCount = list.reduce((total, currentValue) => {
          // field_10 means masks
          return total + currentValue["field_10"];
        }, 0);
        // TODO: Workaround
        if (maskCount !== 0) maskCount += 1500;
      }

      if (foreignData.length > 0) {
        const filteredForeignData = foreignData.filter(
          data =>
            countries.getNames("zh")[id] ===
            AVAILABLE_COUNTIES[data["field_13"]].nameCN
        );
        helpCount = filteredForeignData.length;

        maskRequiredCount = filteredForeignData.reduce(
          (total, currentValue) => {
            // console.log(currentValue["field_10"]);
            return total + parseInt(currentValue["field_10"]);
          },
          0
        );
      }

      if (volunteerData.length > 0) {
        // console.log(volunteerData);
        volunteerCount = volunteerData.filter(
          data => countries.getNames("zh")[id] === data["field_14"]
        ).length;
        // TODO: volunteer
        // if (volunteerCount > 0) volunteerCount = 18;
      }

      if (country.maps.length) {
        data.push({
          id: id,
          color:
            // TODO: Maybe need a color strategy
            maskCount > 0 || helpCount > 0 || volunteerCount > 0 || id === "TW"
              ? am4core.color("#F9BA48")
              : chart.colors.getIndex(0),
          maskCount,
          helpCount,
          maskRequiredCount,
          volunteerCount,
          map: country.maps[0]
        });
      } else if (id === "TW") {
        data.push({
          id: id,
          color: am4core.color("#F9BA48"),
          maskCount: 0,
          helpCount: 0,
          maskRequiredCount: 0,
          volunteerCount: 0
        });
      }
    }
  }
  worldSeries.data = data;

  // Zoom control
  // chart.zoomControl = new am4maps.ZoomControl();

  // let homeButton = new am4core.Button();
  // homeButton.events.on("hit", function() {
  //   worldSeries.show();
  //   countrySeries.hide();
  //   chart.goHome();
  // });

  // homeButton.icon = new am4core.Sprite();
  // homeButton.padding(7, 5, 7, 5);
  // homeButton.width = 30;
  // homeButton.icon.path =
  //   "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8";
  // homeButton.marginBottom = 10;
  // homeButton.parent = chart.zoomControl;
  // homeButton.insertBefore(chart.zoomControl.plusButton);
};
