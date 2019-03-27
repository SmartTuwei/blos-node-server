/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1553068442336_3153';

  // add your middleware config here
  config.middleware = [];
  config.mongoose = {
    url: 'mongodb://127.0.0.1/example',
    options: {},
  };
  config.security={
    csrf:false,
    domainWhiteList:["http://localhost:3000","http://192.168.0.167:3000"] // 允许访问的接口来源；
  };
  //配合客户端打开withCredentials;
  config.cors={
     credentials:true
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  return {
    ...config,
    ...userConfig,
  };
};
