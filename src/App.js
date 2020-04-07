import React, { useState, useEffect, useLayoutEffect } from "react";
import _ from "lodash";
import moment from "moment";

// 引入样式
import "./assets/styles/common.scss";
import "./assets/styles/app.scss";


// 引入页面组件
import Header from './components/Header';
import Footer from './components/Footer';
import Volunteer from './components/Volunteer';
import Sponser from './components/Sponser';
import HelpUs from './components/HelpUs';
import Donators from './components/Donators';
import Requesters from './components/Requesters';

// 图片资源、金数据
import { images, JINSHUJU } from "./utils/contants"

// 接口请求
import * as request from './request'

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



// TODO: workaround
const TEMP_ENDPOINT = "/forms/Ukw1aQ/entries";

const App = () => {
  const [chart, setChart] = useState();
  const [maskCount, setMaskCount] = useState(0);
  const [money, setMoney] = useState(0);
  const [helpCount, setHelpCount] = useState(0);
  const [volunteerCount, setVolunteerCount] = useState(0);
  const [domesticData, setDomesticData] = useState([]);
  const [foreignData, setForeignData] = useState([]);
  const [volunteerData, setVolunteerData] = useState([]);
  const [donatorData, setDonatorData] = useState([]);
  
  const [highlightData, setHighLightData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [filteredData, setFilteredData] = useState([]);
  const [supportInfoList, setSupportInfoList] = useState([]);

  // Props to be passed to Donators
  const configDonatorsComponent = {
    domesticData,
    donatorData
  };

  // Props to be passed to Requesters
  const configRequestersComponent = {
    filteredData
  };

  const toggleModal = (index) => {
    setModalIsOpen(!modalIsOpen);
    setSelectedIndex(index);
  };

  const updateVolunteerData=(data)=>{
    if(data&&data.length>0){
      setVolunteerCount(data.length);
      setVolunteerData(data)
    }
  }

  const delta = 6;
  let startX;
  let startY;
  let drag = false;
  const handleTouchStart = (event) => {
    drag = false;
    startX = event.pageX;
    startY = event.pageY;
  };

  const handleTouchMove = (event) => {
    drag = true;
  };

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

  useLayoutEffect(() => {
    if (
      domesticData.length > 0 &&
      foreignData.length > 0 &&
      volunteerData.length > 0
    ) {
      const chart = am4core.create("chartdiv", am4maps.MapChart);
      buildChart(chart, domesticData, foreignData, volunteerData);
      setChart(chart);
    }
    return () => {
      chart && chart.dispose();
    };
  }, [domesticData, foreignData, volunteerData]);


  useEffect(() => {
    //微信分享
    WXShare();
    
    // 获取国内物资援助数据
    request.getDomesticData()
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
      request.getForeignData(next)
      .then(response=> {
        let { data, next } = response;
        let newData = tmpData.concat(data);
        setForeignData(newData);
        setHelpCount(newData.length);
        setFilteredData(newData.filter((r) => !_.isEmpty(r.field_7)));
        if (next) {
          getForeigns(newData, next);
        }
        // TODO: workaround to combine two api data into one
      })
      .catch((error) => console.log(error));
    };
    getForeigns(foreignData);


    // 获取捐赠者数据
    const getDonators = (tmpData = [], next = "") => {
      request.getDonatorData(next)
      .then((response) => {
          let { data, next } = response;
          const newData = tmpData.concat(data).filter((d) => d["field_13"] === "已审核");
          // console.log(newData);
          setDonatorData(newData.reverse());
          setMoney(
            newData.reduce((total, currentValue) => {
              return total + currentValue["field_12"];
            }, 0)
          );
          if (next) {
            getDonators(newData, next);
          }
        })
        .catch((error) => console.log(error));
    };
    getDonators(donatorData);


    // 获取留声机
    request.getHighLightData()
    .then((response) => {
      let { data } = response;
      data = data.filter((d) => d["field_12"] === "已审核");
      setHighLightData(data);
    })
    .catch((error) => console.log(error));
  }, []);

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
