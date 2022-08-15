const log = require('mk-log');
const tape = require('tape');
const AsyncAdapterTestHelpers = require('../async-index.js');
const AdapterTestHelpers = require('../index.js');

function delayedExecution(name, ms = 500) {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve(name);
    }, ms);
  });
}

async function main() {
  await tape('async in right order', async (t) => {
    let long = '';
    let short = '';

    await AsyncAdapterTestHelpers(async (req, res) => {
      long = await delayedExecution('long', 500);
    });
    await AsyncAdapterTestHelpers(async (req, res) => {
      short = await delayedExecution('short', 100);
    });
    t.equal(long, 'long');
    t.equal(short, 'short');

    t.end();
  });
  await tape('async querystring', async (t) => {
    await AdapterTestHelpers(async(req, res) => {
      req.query = 'search[given_name]=Mike&search[family_name]=Kastner';
      await delayedExecution('short', 100);

      t.ok(req.query.search.given_name);
    });
    await AsyncAdapterTestHelpers(async (req, res) => {

      req.query='search[given_name]=Mike&search[family_name]=Kastner';
      t.ok(req.query.search.given_name);
    });
    t.end();
  });
}

main();
