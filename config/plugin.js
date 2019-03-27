'use strict';

// /** @type Egg.EggPlugin */
// module.exports = {
//   // had enabled by egg
//   static: {
//     enable: true,
     
//   },
//   package:"egg-mongoose"
// };
exports.mongoose = {
  enabled :true,
  package:"egg-mongoose"
}

exports.cors = {
  enabled :true,
  package:"egg-cors"
}
//npm install egg-cors
// 配置plugin 