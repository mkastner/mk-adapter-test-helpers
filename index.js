const qs = require('qs');
const fs = require('fs');
const log = require('mk-log');

module.exports = function MkAdapterTestHelpers(cb) {

  const req = {};
  let querystring = '';

  Object.defineProperties(req, {
    body: {
      value: {},
      configurable: true,
      enumerable: true,
      writable: true 
    },
    headers: {
      value: {},
      configurable: true,
      enumerable: true,
      writable: true 
    },
    params: {
      value: {},
      configurable: true,
      enumerable: true
    },
    query: {
      set(newQuerystring) {
        querystring = newQuerystring; 
      },
      get() {
        return qs.parse(querystring); 
      },
      enumerable: true,
      configurable: true
    },
    path: {
      value: '',
      configurable: true,
      enumerable: true, 
      writable: true
    } 
  }); 

  const helper = {
    req,
    res: {
      setHeader(headerKey, headerValue) {
        this.header[headerKey] = headerValue; 
      },
      header: {},
      status(val) {
        this._status = val;
        return this;
      },
      viewName: '',
      data: {
      },
      render(view, viewData) {
        let viewName = view;
        let data = viewData;
      },
      json(jsonObj) {
        this.data = jsonObj; 
      },
      send(str) {
        this._send = str; 
      },
      sendFile(filePath) {
        let data = fs.readFileSync(filePath);
        // Encode to base64
        let encodedImage = new Buffer(data, 'binary').toString('base64'); 
        // Just to keep in mind how to decode: decode to base64 
        // let decodedImage = new Buffer(encodedImage, 'base64').toString('binary'); 
        return encodedImage;     
      }
    }
  };

  if (cb) {
    cb(helper.req, helper.res);
  }

  return helper;

};
