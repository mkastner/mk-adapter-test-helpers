const log = require("mk-log");
const Helper = require("./lib/helper.js");

module.exports = async function MkAdapterTestHelpers(cb) {
  helper = Helper();

  if (cb) {
    await cb(helper.req, helper.res);
  }

  return [helper.req, helper.res];
};

