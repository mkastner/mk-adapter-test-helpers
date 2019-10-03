const tape = require('tape');
const AdapterTestHelpers = require('../index.js');

tape('querystring', (t) => {

 
  let adapterTestHelpers = AdapterTestHelpers();
  adapterTestHelpers.req.query = 'a[]=1&a[]=2'; 


  t.ok(adapterTestHelpers.req.query.a, 'query parameter a exists');
  t.equals(adapterTestHelpers.req.query.a.length, 2, 'query parameter has two elements');
  adapterTestHelpers.req.params.id = '3'; 
  t.equals(adapterTestHelpers.req.params.id, '3', 'query parameter a exists');

  adapterTestHelpers.req.body = {a:'1'};
  t.equals(adapterTestHelpers.req.body.a, '1', 'body property exists');

  adapterTestHelpers.req.path = '/';
  t.equals(adapterTestHelpers.req.path, '/', 'path property exists');


  t.end();

});
