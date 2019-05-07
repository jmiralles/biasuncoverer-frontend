const Koa = require("koa");
const koaRouter = require("koa-router");
const bodyParser = require("koa-body");
const isProd = process.env.NODE_ENV === "production";
const mockApiUrl = "http://localhost:3002";
const koaRequest = require("koa-http-request");
const apiKey = "NjYxYjBiZjE0ZjE4MDY1ODhlMjkzMGNiZmJkYmE5NTQ0OWM0MmVkYQ==";
const router = new koaRouter();
const app = new Koa();

app.use(
  koaRequest({
    json: true,
    timeout: 3000,
    host: mockApiUrl
  })
);

router.get("/api/(.*)", async (ctx, next) => {
  try {
    const endpoint = ctx.request.url;
    let data = await ctx.get(endpoint, null, {
      "User-Agent": "koa-http-request",
      apiKey: apiKey
    });
    ctx.body = data;
  } catch (e) {
    console.log("ERROR:", e);
    ctx.throw(404);
  }
});

router.post("/api/(.*)", async (ctx, next) => {
  try {
    const endpoint = ctx.request.url;
    console.log("ctx.post", ctx);
    let data = await ctx.post(endpoint, ctx.request.body, {
      "User-Agent": "koa-http-request",
      "Content-Type": "application/json",
      apiKey
    });
    ctx.body = data;
  } catch (e) {
    console.log("ERROR:", e);
    ctx.throw(404);
  }
});

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

if (isProd) {
  require("./utils/setup-prod.js")(app);
} else {
  require("./utils/setup-dev.js")(app);
}

app.listen(process.env.PORT || 3000);
