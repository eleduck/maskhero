/**
 * 静态常量数据配置
 **/

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
  helpup_fastentry_github:require('../assets/images/helpup_fastentry_github.png'),
  helpup_fastentry_seek:require('../assets/images/helpup_fastentry_seek.png'),
  helpup_fastentry_join:require('../assets/images/helpup_fastentry_join.png'),
  helpup_fastentry_love:require('../assets/images/helpup_fastentry_love.png'),
};

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
  REACT_APP_SPONSOR_TOKEN,
  REACT_APP_SPONSER_TOKEN,
  REACT_APP_HIGHLIGHT_TOKEN,
} = process.env;

// For the typo 'sponser' of backward compatibility
const SPONSOR_TOKEN = REACT_APP_SPONSOR_TOKEN || REACT_APP_SPONSER_TOKEN;

export const JINSHUJU = {
  // 请求的认证数据
  KEY: REACT_APP_JINSHUJU_API_KEY,
  SECRET: REACT_APP_JINSHUJU_API_SECRET,
  FOREIGN_KEY: REACT_APP_JINSHUJU_API_FOREIGN_KEY,
  FOREIGN_SECRET: REACT_APP_JINSHUJU_API_FOREIGN_SECRET,

  // 获取申请数据的API
  DOMESTIC_ENDPOINT: `${API_BASE}/forms/${REACT_APP_DOMESTIC_TOKEN}/entries`,
  FOREIGN_ENDPOINT: `${API_BASE}/forms/${REACT_APP_FOREIGN_TOKEN}/entries`,
  VOLUNTEER_ENDPOINT: `${API_BASE}/forms/${REACT_APP_VOLUNTEER_TOKEN}/entries`,
  DONATOR_ENDPOINT: `${API_BASE}/forms/${REACT_APP_DONATOR_TOKEN}/entries`,
  SPONSOR_ENDPOINT: `${API_BASE}/forms/${SPONSOR_TOKEN}/entries`,
  HIGHLIGHT_ENDPOINT: `${API_BASE}/forms/${REACT_APP_HIGHLIGHT_TOKEN}/entries`,

  // 提交申请的链接
  DOMESTIC_FORM_LINK: `https://jinshuju.net/f/${REACT_APP_DOMESTIC_TOKEN}`,
  FOREIGN_FORM_LINK: `https://jinshuju.net/f/${REACT_APP_FOREIGN_TOKEN}`,
  VOLUNTEER_FORM_LINK: `https://jinshuju.net/f/${REACT_APP_VOLUNTEER_TOKEN}`,
  SPONSOR_FORM_LINK: `https://jinshuju.net/f/${SPONSOR_TOKEN}`,
  DONATOR_FORM_LINK: `https://jinshuju.net/f/${REACT_APP_DONATOR_TOKEN}`,
};

// 区域数据
export const AVAILABLE_COUNTIES = {
  Canada: {
    name: "Canada",
    nameCN: "加拿大",
  },
  China: {
    name: "China",
    nameCN: "中国",
  },
  Australia: {
    name: "Australia",
    nameCN: "澳大利亚",
  },
  Ireland: {
    name: "Ireland",
    nameCN: "爱尔兰",
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
    countryName: "Canada",
    countryNameCN: "加拿大",
    name: "Brandon",
    nameCN: "布兰登",
    latitude: 49.8636213,
    longitude: -99.9767503,
    formUrl: "https://jinshuju.net/f/con81f",
  },
  Winnipeg: {
    countryName: "Canada",
    countryNameCN: "加拿大",
    name: "Winnipeg",
    nameCN: "温尼伯",
    latitude: 49.8537377,
    longitude: -97.2923086,
    formUrl: "https://jinshuju.net/f/Ukw1aQ",
  },
  Ottawa: {
    countryName: "Canada",
    countryNameCN: "加拿大",
    name: "Ottawa",
    nameCN: "渥太华",
    latitude: 45.249814,
    longitude: -76.080442,
    formUrl: "https://jinshuju.net/f/lOg5eU",
  },
  Canberra: {
    countryName: "Australia",
    countryNameCN: "澳大利亚",
    name: "Canberra",
    nameCN: "堪培拉",
    latitude: -35.2813043,
    longitude: 149.1204446,
    formUrl: "https://jinshuju.net/f/RQlAnN",
  },
  Dublin: {
    countryName: "Ireland",
    countryNameCN: "爱尔兰",
    name: "Dublin",
    nameCN: "都柏林",
    latitude: 53.3244431,
    longitude: 6.3857887,
    formUrl: "https://jinshuju.net/f/RQlAnN",
  },
  Vancouver: {
    countryName: "Canada",
    countryNameCN: "加拿大",
    name: "Vancouver",
    nameCN: "温哥华",
    latitude: 49.2578263,
    longitude: -123.1939443,
    formUrl: "https://jinshuju.net/f/RQlAnN",
  },
};
