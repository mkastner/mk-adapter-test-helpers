const tape = require('tape');
const AdapterTestHelpers = require('../async-index.js');

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

    await AdapterTestHelpers(async (req, res) => {
      long = await delayedExecution('long', 500);
    });
    await AdapterTestHelpers(async (req, res) => {
      short = await delayedExecution('short', 100);
    });
    t.equal(long, 'long');
    t.equal(short, 'short');

    t.end();
  });
}

main();
