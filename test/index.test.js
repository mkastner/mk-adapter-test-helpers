const tape = require('tape');
const AdapterTestHelpers = require('../index.js');

tape('querystring', (t) => {
  const [req, res] = AdapterTestHelpers();
  req.query = 'a[]=1&a[]=2';

  t.ok(req.query.a, 'query parameter a exists');
  t.equals(
    req.query.a.length,
    2,
    'query parameter has two elements'
  );
  req.params.id = '3';
  t.equals(req.params.id, '3', 'query parameter a exists');

  req.body = { a: '1' };
  t.equals(req.body.a, '1', 'body property exists');

  req.path = '/';
  t.equals(req.path, '/', 'path property exists');

  // beware connection deprecated since node 13.0
  // use socket instead
  req.connection.remoteAddress = '0.0.0.0';
  t.equals(
    req.connection.remoteAddress,
    '0.0.0.0',
    'connection remoteAddress exists'
  );

  req.socket.remoteAddress = '0.0.0.0';
  t.equals(
    req.socket.remoteAddress,
    '0.0.0.0',
    'connection remoteAddress exists'
  );

  t.end();
});

tape('callback', (t) => {
  AdapterTestHelpers((req, res) => {
    req.params = {
      test: '1',
    };
    t.end();
  });
});
