'use strict';

const https = require('https');
const url = require('url');
const path = require('path');
const fs = require('fs');
const os = require('os');
const shortid = require('shortid');

exports = module.exports = function urls2files(options, callback) {
  options = Object.assign({
    urls: [],
    https: {},
    dir: os.tmpdir(),
    errorHandler: error => {
      console.error(error.stack || error);
      callback(error);
    }
  }, options);
  const paths = {};
  let finishCount = 0;
  for (const urlString of options.urls) {
    const u = url.parse(urlString);
    const httpsOpts = options.https;
    // httpsOpts.method = 'GET';
    httpsOpts.path = u.pathname;
    httpsOpts.hostname = u.hostname;
    const req = https.request(httpsOpts, (res) => {
      if (res.statusCode !== 200) {
        return callback(new Error(
          'Bad status code: ' + res.statusCode + ' for url: ' + urlString));
      }
      const filePath = path.join(options.dir, shortid.generate() + '.csv');
      paths[urlString] = filePath;
      // console.error(filePath);
      res.pipe(fs.createWriteStream(filePath))
        .on('error', options.errorHandler)
        .on('finish', () => {
          // console.error('finct', finishCount, options.urls.length);
          if (++finishCount === options.urls.length) {
            const files = [];
            options.urls.forEach(u => {
              files.push(paths[u]);
            });
            callback(null, files);
          }
        });
    });
    req.on('error', options.errorHandler);
    req.end();
  }
};