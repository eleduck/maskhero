export const AVAILABLE_COUNTIES = {
  Canada: {
    name: "Canada",
    nameCN: "加拿大",
  },
};

export const getCountryName = (name) => {
  const country = AVAILABLE_COUNTIES[name];
  if (country) {
    return country.nameCN;
  } else {
    return name;
  }
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

export const getCityName = (name) => {
  const city = AVAILABLE_CITIES[name];
  if (city) {
    return city.nameCN;
  } else {
    return name;
  }
};
