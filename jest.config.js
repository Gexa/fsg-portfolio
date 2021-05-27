module.exports = {
    "testEnvironment": "node",
    "roots": [
      "<rootDir>/components",
      "<rootDir>/lib",
      "<rootDir>/pages",
      "<rootDir>/store",
    ],
    "preset": 'ts-jest',
    "setupFilesAfterEnv": ["<rootDir>/setupTests.tsx"],
    "transform": {
      "^.+\\.tsx?$": "ts-jest"
    },
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.(js|tsx?)$",
    "moduleFileExtensions": [
      "ts",
      "tsx",
      "js",
      "jsx",
      "json",
      "node"
    ],
    "moduleNameMapper":{
      "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
      "\\.(gif|ttf|eot|svg)$": "<rootDir>/__mocks__/fileMock.js"
    },
    "testPathIgnorePatterns": ["<rootDir>/.next/", "<rootDir>/node_modules/"],
    "snapshotSerializers": ["enzyme-to-json/serializer"],

    // https://github.com/zeit/next.js/issues/8663#issue-490553899
    "globals": {
      // we must specify a custom tsconfig for tests because we need the typescript transform
      // to transform jsx into js rather than leaving it jsx such as the next build requires. you
      // can see this setting in tsconfig.jest.json -> "jsx": "react"
      "ts-jest": {
        "tsconfig": "<rootDir>/tsconfig.jest.json"
      }
    }
  }