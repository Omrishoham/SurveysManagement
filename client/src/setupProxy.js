//when we on dev it will goes for localhost , only in dev mode we have proxy
//make proxy when someone wanna get to this routh
//proxy hallp us refer to localhost in port 5000 instead port 3000
const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    ["/api", "/auth/google"],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
};