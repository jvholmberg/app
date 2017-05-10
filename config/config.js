var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'app'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/app-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'app'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/app-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'app'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://admin_jhg:l01vgaogov1qk2u9vt3f6ttp6q@ds157500.mlab.com:57500/heroku_5w8c0q8x'
  }
};

module.exports = config[env];
