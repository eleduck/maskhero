import React, { useState, useEffect } from "react";
import _ from "lodash";
import moment from "moment";

// 引入样式
import "./assets/styles/common.scss";
import "./assets/styles/app.scss";

// 引入页面组件
import Header from "./components/Header";
import Footer from "./components/Footer";
import Volunteer from "./components/Volunteer";
import Sponser from "./components/Sponser";
import HelpUs from "./components/HelpUs";
import Donators from "./components/Donators";
import Requesters from "./components/Requesters";

// 图片资源、金数据
import { images, JINSHUJU } from "./utils/contants";

// 接口请求
import * as request from "./request";

// utils
import { buildChart } from "./utils/chartUtils";
import { WXShare } from "./utils";

// 轮播插件
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// 预览插件
import Carousel, { Modal, ModalGateway } from "react-images";
// 地图插件
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

const App = () => {
  const [maskCount, setMaskCount] = useState(0);
  const [money, setMoney] = useState(0);
  const [volunteerCount, setVolunteerCount] = useState(0);
  const [domesticData, setDomesticData] = useState([]);
  const [foreignData, setForeignData] = useState([]);
  const [volunteerData, setVolunteerData] = useState([]);
  const [donatorData, setDonatorData] = useState([]);

  const [highlightData, setHighLightData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [filteredData, setFilteredData] = useState([]);
  const [defaultField1, setDefaultField1] = useState(0);
  const [defaultField2, setDefaultField2] = useState(0);
  // const [defaultField3, setDefaultField3] = useState(0);

  // Props to be passed to Donators
  const configDonatorsComponent = {
    domesticData,
    donatorData,
  };

  // Props to be passed to Requesters
  const configRequestersComponent = {
    filteredData,
  };

  const toggleModal = (index) => {
    setModalIsOpen(!modalIsOpen);
    setSelectedIndex(index);
  };

  const updateVolunteerData = (data) => {
    if (data && data.length > 0) {
      setVolunteerCount(data.length);
      setVolunteerData(data);
    }
  };

  const delta = 6;
  let startX;
  let startY;
  const handleTouchStart = (event) => {
    startX = event.pageX;
    startY = event.pageY;
  };

  const handleTouchMove = (event) => {};

  const handleTouchEnd = (event, index) => {
    const diffX = Math.abs(event.pageX - startX);
    const diffY = Math.abs(event.pageY - startY);
    if (diffX < delta && diffY < delta) {
      toggleModal(index);
    }
  };

  const carouselSettings = {
    dots: true,
    infinite: true,
    initialSlide: 0,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
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
    const getForeigns = (tmpData = [], next = "") => {
      request
        .getForeignData(next)
        .then((response) => {
          let { data, next } = response;
          let newData = tmpData.concat(data);
          if (next) {
            getForeigns(newData, next);
          } else {
            setForeignData(newData);
            setFilteredData(newData.filter((r) => !_.isEmpty(r.field_7)));
          }
        })
        .catch((error) => console.log(error));
    };
    getForeigns(foreignData);

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

    // 获取留声机
    request
      .getHighLightData()
      .then((response) => {
        let { data } = response;
        data = data.filter((d) => d["field_12"] === "已审核");
        setHighLightData(data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    let chart;
    if (
      domesticData.length > 0 &&
      foreignData.length > 0 &&
      volunteerData.length > 0
    ) {
      console.log("chart loading");
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

  const hightlightList = [];
  let imagesTemp = [];
  highlightData.forEach((data, index) => {
    if (index % 4 === 0) {
      imagesTemp = [
        <img style={{ opacity: 0 }} src="" alt="empty" />,
        <img style={{ opacity: 0 }} src="" alt="empty" />,
        <img style={{ opacity: 0 }} src="" alt="empty" />,
        <img style={{ opacity: 0 }} src="" alt="empty" />,
      ];
    }
    imagesTemp[index % 4] = (
      <div
        style={{
          backgroundImage: `url(${data["field_11"][0]})`,
          // width: "18vw",
          // height: "18vw",
          backgroundSize: "cover",
        }}
        className="carousel-img"
        src={data["field_11"][0]}
        alt="empty"
        onTouchStart={handleTouchStart}
        onMouseDown={handleTouchStart}
        onTouchMove={handleTouchMove}
        onMouseMove={handleTouchMove}
        onTouchEnd={(e) => {
          handleTouchEnd(e, index);
        }}
        onMouseUp={(e) => {
          handleTouchEnd(e, index);
        }}
      ></div>
    );
    if (index % 4 === 3 || index === highlightData.length - 1) {
      hightlightList.unshift(
        <div key={`hl-${index}`} className="carousel-images">
          {imagesTemp}
        </div>
      );
    }
  });

  const imageCa = highlightData.map((h) => {
    return { source: h["field_11"][0] };
  });

  return (
    <div className="app">
      <Header money={money} volunteerCount={volunteerCount} />
      <section className="support">
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
        <div className="info">
          <Donators {...configDonatorsComponent} />

          <Requesters {...configRequestersComponent} />
        </div>
      </section>

      <section className="highlights">
        <h1>爱的留声机</h1>
        <p className="text">这里，是我们随手记录的一些真实瞬间。</p>
        <Slider className="carousel-dt" {...carouselSettings}>
          {hightlightList}
        </Slider>
        <Slider className="carousel-mb" {...carouselSettings}>
          {highlightData.map((data, index) => (
            <div className="carousel-images">
              <div
                style={{
                  backgroundImage: `url(${data["field_11"][0]})`,
                  // width: "18vw",
                  // height: "18vw",
                  backgroundSize: "cover",
                }}
                className="carousel-img"
                src={data["field_11"][0]}
                alt="empty"
                onTouchStart={handleTouchStart}
                onMouseDown={handleTouchStart}
                onTouchMove={handleTouchMove}
                onMouseMove={handleTouchMove}
                onTouchEnd={(e) => {
                  handleTouchEnd(e, index);
                }}
                onMouseUp={(e) => {
                  handleTouchEnd(e, index);
                }}
              ></div>
            </div>
          ))}
        </Slider>
        <ModalGateway>
          {modalIsOpen ? (
            <Modal onClose={toggleModal}>
              <Carousel currentIndex={selectedIndex} views={imageCa} />
            </Modal>
          ) : null}
        </ModalGateway>

        <Volunteer updateVolunteerData={updateVolunteerData} />
      </section>

      <Sponser />

      <HelpUs />

      <Footer />
    </div>
  );
};

export default App;
