const log = require("mk-log");
const Helper = require("./lib/helper.js");

module.exports = function MkAdapterTestHelpers(cb) {
  helper = Helper();

  if (cb) {
    cb(helper);
  }

  return helper;
};
