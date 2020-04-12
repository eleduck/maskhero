module.exports = {
  "roots": [
  "<rootDir>/src"
  ],
  "collectCoverageFrom": [
  "src/**/*.{js,jsx,ts,tsx}",
  "!src/**/*.d.ts"
  ],
  "setupFiles": [
  "react-app-polyfill/jsdom"
  ],
  "setupFilesAfterEnv": [
  "<rootDir>/src/setupTests.js"
  ],
  "testMatch": [
  "<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}"
  ],
  "testEnvironment": "jsdom",
  "transform": {
  "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "<rootDir>/node_modules/jest-transform-stub",
    "^(?!.*\\.(js|jsx|ts|tsx|css|json)$)": "<rootDir>/config/jest/fileTransform.js"
  },
  "transformIgnorePatterns": [
  "node_modules/(?!(@amcharts|slick-carousel/slick)/)"
  ],
  "modulePaths": [],
  "moduleNameMapper": {
  "^react-native$": "react-native-web",
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy"
  },
  "moduleFileExtensions": [
  "web.js",
  "js",
  "web.ts",
  "ts",
  "web.tsx",
  "tsx",
  "json",
  "web.jsx",
  "jsx",
  "node"
  ],
  "watchPlugins": [
  "jest-watch-typeahead/filename",
  "jest-watch-typeahead/testname"
  ]
};