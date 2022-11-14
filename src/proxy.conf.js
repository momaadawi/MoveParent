const PROXY_CONFIG = {
  "/api/*": {
    target: "https://schoolsmobileservicemove.altairfms.com/",
    changeOrigin: true,
    secure: false,
    logLevel: "debug",
  },
};
module.exports = PROXY_CONFIG;
