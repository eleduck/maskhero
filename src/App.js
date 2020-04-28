import React, { useState, useEffect } from "react";
import _ from "lodash";

// 引入样式
import "./assets/styles/common.scss";
import "./assets/styles/app.scss";


// 引入组件
import Header from "./components/Header";
import Footer from "./components/Footer";
import SupportMap from './components/SupportMap'
import LoveSlider from './components/LoveSlider'
import Volunteer from "./components/Volunteer";
import Sponsor from "./components/Sponsor";
import HelpUs from "./components/HelpUs";
import Donators from "./components/Donators";
import Requesters from "./components/Requesters";

// 接口请求
import * as request from "./request";

// utils
import { WXShare } from "./utils";


const App = () => {
  const [maskCount, setMaskCount] = useState(0);
  const [money, setMoney] = useState(0);
  const [volunteerCount, setVolunteerCount] = useState(0);

  const [domesticData, setDomesticData] = useState([]);
  const [foreignData, setForeignData] = useState([]);
  const [volunteerData, setVolunteerData] = useState([]);
  const [donatorData, setDonatorData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  

  // Props to be passed to Donators
  const configDonatorsComponent = {
    domesticData,
    donatorData,
  };

  // Props to be passed to Requesters
  const configRequestersComponent = {
    filteredData,
  };

  // 更新自愿者数据
  const updateVolunteerData = (data) => {
    if (data && data.length > 0) {
      setVolunteerCount(data.length);
      setVolunteerData(data);
    }
  };

  useEffect(() => {
    //微信分享
    WXShare();

    // 获取国内物资援助数据
    request
      .getDomesticData()
      .then((response) => {
        let { data } = response;
        data = data.filter((d) => d["field_12"] === "已审核");
        setDomesticData(data);
        setMaskCount(
          data.reduce((total, currentValue) => {
            // field_10 means masks
            return total + currentValue["field_10"];
          }, 0)
        );
      })
      .catch((error) => console.log(error));

    // 获取国外反馈数据
    const getForeigns = () => {
      request
        .getForeignData()
        .then((response) => {
          setForeignData(response);
          setFilteredData(response.filter((r) => !_.isEmpty(r.field_7)));
        })
        .catch((error) => console.log(error));
    };
    getForeigns();

    // 获取捐赠者数据
    const getDonators = (tmpData = [], next = "") => {
      request
        .getDonatorData(next)
        .then((response) => {
          let { data, next } = response;
          const newData = tmpData
            .concat(data)
            .filter((d) => d["field_13"] === "已审核");
          if (next) {
            getDonators(newData, next);
          } else {
            setDonatorData(newData.reverse());
            setMoney(
              newData.reduce((total, currentValue) => {
                return total + currentValue["field_12"];
              }, 0)
            );
          }
        })
        .catch((error) => console.log(error));
    };
    getDonators(donatorData);
  }, []);


  // const supportInfoList = [];
  const list = [];
  donatorData.forEach((data) => {
    list.push({
      name: data["field_1"],
      content: `捐赠了 ${data["field_12"]} 人民币`,
      createdAt: data["created_at"],
    });
  });

  domesticData.forEach((data) => {
    list.push({
      name: data["field_1"],
      content: `捐赠了 ${data["field_5"][0]} ${data["field_10"]} 个`,
      createdAt: data["created_at"],
    });
  });

  list.sort(function (a, b) {
    a = new Date(a.createdAt);
    b = new Date(b.createdAt);
    return a > b ? -1 : a < b ? 1 : 0;
  });


  return (
    <div data-testid="rootComponent" className="app">
      <Header money={money} volunteerCount={volunteerCount} maskCount={maskCount} />

      <section className="support module-space">
        <SupportMap
          domesticData={domesticData}
          foreignData={foreignData}
          volunteerData={volunteerData}
         />

        <div className="info">
          <Donators {...configDonatorsComponent} />

          <Requesters {...configRequestersComponent} />
        </div>
      </section>

      <section className="highlights module-space">
        <h1>爱的留声机</h1>
        <LoveSlider />
        <Volunteer updateVolunteerData={updateVolunteerData} />
      </section>

      <Sponsor />

      <HelpUs />

      <Footer />
    </div>
  );
};

export default App;
