const PROXY_CONFIG = [
  {
    context: ['/api'],
    target: 'https://localhost:44372/',
    secure: true,
    logLevel: 'debug',
    changeOrigin: true,
    pathRewrite: {'^/':''}
  }
]

module.exports = PROXY_CONFIG;
