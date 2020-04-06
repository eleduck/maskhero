import * as am4core from "@amcharts/amcharts4/core";
import am4geodata_data_countries2 from "@amcharts/amcharts4-geodata/data/countries2";
import { AVAILABLE_COUNTIES, AVAILABLE_CITIES } from "./contants";

const countries = require("i18n-iso-countries");
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
countries.registerLocale(require("i18n-iso-countries/langs/zh.json"));

const targetSVG =
  "M15.8752 10.4382C17.3193 10.4382 18.7042 11.0136 19.7253 12.0379C20.7465 13.0622 21.3201 14.4514 21.3201 15.9C21.3201 16.6172 21.1793 17.3274 20.9056 17.9901C20.632 18.6527 20.2309 19.2548 19.7253 19.762C19.2197 20.2692 18.6195 20.6715 17.9589 20.946C17.2983 21.2205 16.5902 21.3617 15.8752 21.3617C14.4311 21.3617 13.0462 20.7863 12.0251 19.762C11.004 18.7377 10.4303 17.3485 10.4303 15.9C10.4303 14.4514 11.004 13.0622 12.0251 12.0379C13.0462 11.0136 14.4311 10.4382 15.8752 10.4382ZM15.8752 0.606934C19.9186 0.606934 23.7964 2.21816 26.6556 5.08615C29.5147 7.95415 31.1209 11.844 31.1209 15.9C31.1209 27.3697 15.8752 44.3013 15.8752 44.3013C15.8752 44.3013 0.629517 27.3697 0.629517 15.9C0.629517 11.844 2.23575 7.95415 5.09488 5.08615C7.954 2.21816 11.8318 0.606934 15.8752 0.606934ZM15.8752 4.97637C12.9871 4.97637 10.2172 6.12724 8.17497 8.17581C6.13274 10.2244 4.98543 13.0028 4.98543 15.9C4.98543 18.0847 4.98543 22.4541 15.8752 37.1135C26.765 22.4541 26.765 18.0847 26.765 15.9C26.765 13.0028 25.6177 10.2244 23.5755 8.17581C21.5332 6.12724 18.7634 4.97637 15.8752 4.97637Z";

export const buildCountryMapData = (foreignData) => {
  const res = [];
  for (let [key] of Object.entries(AVAILABLE_CITIES)) {
    const city = AVAILABLE_CITIES[key];

    const filteredForeignData = foreignData.filter(
      (d) => d["field_15"] === key
    );
    const helpCount = filteredForeignData.length;

    const maskDemandCount = filteredForeignData.reduce(
      (total, currentValue) => {
        // console.log(currentValue["field_10"]);
        return total + parseInt(currentValue["field_10"]);
      },
      0
    );
    res.push({
      ...city,
      minZoomLevel: 2,
      svgPath: targetSVG,
      maskDemandCount,
      helpCount,
    });
  }
  return res;
};

export const buildWorldMapData = (
  chart,
  domesticData,
  foreignData,
  volunteerData
) => {
  // Set up data for countries
  let data = [];
  for (let id in am4geodata_data_countries2) {
    if (am4geodata_data_countries2.hasOwnProperty(id)) {
      let country = am4geodata_data_countries2[id];
      let maskCount = 0;
      let maskDemandCount = 0;
      let helpCount = 0;
      let volunteerCount = 0;
      if (domesticData.length > 0) {
        const list = domesticData.filter(
          (data) =>
            countries.getNames("zh")[id] === data["x_field_weixin_country"]
          // () => countries.getNames("zh")[id] === "中国"
        );
        maskCount = list.reduce((total, currentValue) => {
          // field_10 means masks
          return total + currentValue["field_10"];
        }, 0);
      }

      if (foreignData.length > 0) {
        const filteredForeignData = foreignData.filter(
          (data) =>
            countries.getNames("zh")[id] ===
            AVAILABLE_COUNTIES[data["field_13"]].nameCN
        );
        helpCount = filteredForeignData.length;

        maskDemandCount = filteredForeignData.reduce((total, currentValue) => {
          // console.log(currentValue["field_10"]);
          return total + parseInt(currentValue["field_10"]);
        }, 0);
      }

      if (volunteerData.length > 0) {
        volunteerCount = volunteerData.filter(
          (data) => countries.getNames("zh")[id] === data["field_14"]
        ).length;
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
          maskDemandCount,
          volunteerCount,
          map: country.maps[0],
        });
      } else if (id === "TW") {
        data.push({
          id: id,
          color: am4core.color("#F9BA48"),
          maskCount: 0,
          helpCount: 0,
          maskDemandCount: 0,
          volunteerCount: 0,
        });
      }
    }
  }
  return data;
};
