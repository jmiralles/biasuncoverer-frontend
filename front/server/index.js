const Koa = require("koa");
const koaRouter = require("koa-router");
const bodyParser = require("koa-body");
const isProd = process.env.NODE_ENV === "production";
const koaRequest = require("koa-http-request");
const router = new koaRouter();
const app = new Koa();
const proxy = require('koa-proxy');
const { apiKey, apiUrl } = require('../config.json')

app.use(
  koaRequest({
    timeout: 5000,
    host: apiUrl
  })
);

app.use(async (ctx, next) => {
  ctx.req.headers = Object.assign({},
     ctx.req.headers,
     {'Authorization': apiKey});
  await next();
});

app.use(proxy({
  match: /^\/api\/(.*)/,
  host: apiUrl
}))

app.use(bodyParser({ multipart: true }));
app.use(router.routes());
app.use(router.allowedMethods());

if (isProd) {
  require("./utils/setup-prod.js")(app);
} else {
  require("./utils/setup-dev.js")(app);
}

app.listen(process.env.PORT || 3000);
