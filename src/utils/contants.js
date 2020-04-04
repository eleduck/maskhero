/**
 * 静态常量数据配置
 **/

// 区域数据
export const AVAILABLE_COUNTIES = {
  Canada: {
    name: "Canada",
    nameCN: "加拿大",
  },
};

export const AVAILABLE_PROVINCES = {
  Manitoba: {
    name: "Manitoba",
    nameCN: "曼尼托巴",
  },
};

export const AVAILABLE_CITIES = {
  Brandon: {
    name: "Brandon",
    nameCN: "布兰登",
  },
  Winnipeg: {
    name: "Winnipeg",
    nameCN: "温尼伯",
  },
  Ottawa: {
    name: "Ottawa",
    nameCN: "渥太华",
  },
};


// 图片资源管理
export const images = {
  logo: require("../assets/images/logo.png"),
  logomb: require("../assets/images/logomb.png"),
  avatar: require("../assets/images/avatar.png"),
  vector: require("../assets/images/vector.png"),
  icon1: require("../assets/images/icon1.png"),
  icon2: require("../assets/images/icon2.png"),
  icon3: require("../assets/images/icon3.png"),
  icon4: require("../assets/images/icon4.png"),
  footerImg: require("../assets/images/footer-img.png"),
  title: require("../assets/images/title.png"),
}



// 金数据相关
const API_BASE = "https://jinshuju.net/api/v1";
const {
  REACT_APP_JINSHUJU_API_KEY,
  REACT_APP_JINSHUJU_API_SECRET,
  REACT_APP_JINSHUJU_API_FOREIGN_KEY,
  REACT_APP_JINSHUJU_API_FOREIGN_SECRET,
  REACT_APP_DOMESTIC_TOKEN,
  REACT_APP_FOREIGN_TOKEN,
  REACT_APP_VOLUNTEER_TOKEN,
  REACT_APP_DONATOR_TOKEN,
  REACT_APP_SPONSER_TOKEN,
  REACT_APP_HIGHLIGHT_TOKEN,
} = process.env;

export const JINSHUJU = {
  // 请求的认证数据
  KEY: REACT_APP_JINSHUJU_API_KEY,
  SECRET: REACT_APP_JINSHUJU_API_SECRET,
  FOREIGN_KEY: REACT_APP_JINSHUJU_API_FOREIGN_KEY,
  FOREIGN_SECRET: REACT_APP_JINSHUJU_API_FOREIGN_SECRET,

  // 获取申请数据的API
  DOMESTIC_ENDPOINT: `${API_BASE}/forms/${REACT_APP_DOMESTIC_TOKEN}/entries`,
  FOREIGN_ENDPOINT: `${API_BASE}/forms/${REACT_APP_FOREIGN_TOKEN}/entries`,
  VOLUNTEER_ENDPOINT:`${API_BASE}/forms/${REACT_APP_VOLUNTEER_TOKEN}/entries`,
  DONATOR_ENDPOINT:`${API_BASE}/forms/${REACT_APP_DONATOR_TOKEN}/entries`,
  SPONSER_ENDPOINT: `${API_BASE}/forms/${REACT_APP_SPONSER_TOKEN}/entries`,
  HIGHLIGHT_ENDPOINT: `${API_BASE}/forms/${REACT_APP_HIGHLIGHT_TOKEN}/entries`,

  // 提交申请的链接
  DOMESTIC_FORM_LINK:`https://jinshuju.net/f/${REACT_APP_DOMESTIC_TOKEN}`,
  FOREIGN_FORM_LINK: `https://jinshuju.net/f/${REACT_APP_FOREIGN_TOKEN}`,
  VOLUNTEER_FORM_LINK:`https://jinshuju.net/f/${REACT_APP_VOLUNTEER_TOKEN}`,
  SPONSER_FORM_LINK:`https://jinshuju.net/f/${REACT_APP_SPONSER_TOKEN}`,
  DONATOR_FORM_LINK: `https://jinshuju.net/f/${REACT_APP_DONATOR_TOKEN}`,

}
