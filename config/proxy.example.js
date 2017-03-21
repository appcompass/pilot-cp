// Rename this file to proxy.js and set the target and host.
module.exports = {
  '/api': {
    // where your Pilot.io API lives.
    target: 'https://mypilot-io-api.com',
    secure: false,
    changeOrigin: true,
    headers: {
      // this CP website's host name.
      Host: 'my.cp.com'
    },
    pathRewrite: {
      '^/api': ''
    }
  }
}
