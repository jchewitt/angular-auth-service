const path = require('path');
const express = require('express');
const app = express();

// Serve static files
app.use(express.static('/dist/angular-auth-service'));

// Send all requests to index.html
app.get('/*', function(req, res) {
  res.sendFile(path.join('/dist/angular-auth-service/index.html'));
});

let env = process.env.NODE_ENV || 'development';

let forceSSL = (req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(['https://', req.get('Host'), req.url].join(''));
  }
  return next();
};

if (env === 'production') {
  app.use(forceSSL);
}

// default Heroku port
app.listen(process.env.PORT || 80, );
