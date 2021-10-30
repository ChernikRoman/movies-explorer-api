// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const allowedOrigins = [
    'http://localhost:3001',
  ];
  const allowedHeaders = req.headers['access-control-request-headers'];
  const allowedMethods = 'GET,PUT,HEAD,PATCH,DELETE,POST';
  const { origin } = req.headers;

  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
  }

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', allowedMethods);
    res.header('Access-Control-Allow-Headers', allowedHeaders);
    return res.end();
  }

  next();
};
