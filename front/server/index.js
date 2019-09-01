const Koa = require("koa");
const koaRouter = require("koa-router");
const bodyParser = require("koa-body");
const isProd = process.env.NODE_ENV === "production";
//const apiUrl = "http://localhost:80";
const koaRequest = require("koa-http-request");
//const apiKey = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1NjY0MTQwOTUsImV4cCI6MTU5Nzk3MTA0Nywicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoiZXVyZWNhdCJ9.o4SFGMlg_O_iRPfj0NpnQb5PTAar7Xmq_Ka_2MeREmygNM2y74e5rIL_XbecJ4IhTSEO9Yu1I_0wk4k3DcLumBo93xE_rtF13glqaNcL83C2fJtchZFSAVsUcSlTODEQ6VSqum9lzaZg2pBw1D3E-sDMnUMDaF2zlDjmt0BkxNNVL2RsDgEFycwkqETQkh52vYGdJM6SQfXuNsGK61vqDkoQ06spCk_oT4iMtWq4ZKzc8TL8SPohEBTo_2tIDgEbV_xl3NG2C1SZFZ268xrqQnpRrG2PukXVgMERkQgrYZ05Va68-uI6J4EKJCA5fBhJKoNuM4o5AegL3_rf5QjKOkLv_iFk5Jabldrmgrvii1_YZ2wWNHqSyaxUebinYHPaaF_8NdWYKMR5lAmbGbr2360cZ98r-znghIHcodiYa0ZANBmUtxufh0lrrsmA1yb-wFL_FttiuzAke7GzrC7wInAwlIdTNySQYLLmou2YNurMkrmEdRWVmwNOKUyApX6kdMVuYyzo4Me8yR6KZ23eilBbuTjV4kOS4waFbhOsXPZZ_BkgJeKS9hCSYFQwm9RR5nV4kTRDjUDuSWk_MAUHpOFQ9NSxi_SO1jSKtUiAOLKxoDYAL3V6vxYg8j6LPl5EhbLIxhlHtzdZk9pKBNjKIx3mqDY4YlwleEO-dGpF7iA";
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
