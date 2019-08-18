const Koa = require("koa");
const koaRouter = require("koa-router");
const bodyParser = require("koa-body");
const isProd = process.env.NODE_ENV === "production";
const mockApiUrl = "http://localhost:3002";
const koaRequest = require("koa-http-request");
const apiKey = "NjYxYjBiZjE0ZjE4MDY1ODhlMjkzMGNiZmJkYmE5NTQ0OWM0MmVkYQ==";
const router = new koaRouter();
const app = new Koa();
const sendFile = require("./utils/sendFile.js");
console.log("UP");

app.use(
  koaRequest({
    json: true,
    timeout: 3000,
    host: mockApiUrl
  })
);


router.post("/api/upload", async (ctx, next) => {
  const file = ctx.request.files.file;

  const res = await sendFile({
    fileName: file.name,
    filePath: file.path,
    fileType: file.type,
    apiKey
  });
  
  ctx.body = res;
});

router.get("/api/(.*)", async (ctx, next) => {
  try {
    const endpoint = ctx.request.url;
    let data = await ctx.get(endpoint, null, {
      "User-Agent": "koa-http-request",
      apiKey
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
    console.log("ctx.body ===>", ctx);
    let data = await ctx.post(endpoint, ctx.request.body, {
      "User-Agent": "koa-http-request",
      "Content-Type": "application/json",
      apiKey
    });

    console.log("RESPONSE DATA", data)
    ctx.body = data;
  } catch (e) {
    console.log("ERROR POST:", e);
    ctx.throw(404);
  }
});

app.use(bodyParser({ multipart: true }));
app.use(router.routes());
app.use(router.allowedMethods());

if (isProd) {
  require("./utils/setup-prod.js")(app);
} else {
  require("./utils/setup-dev.js")(app);
}

app.listen(process.env.PORT || 3000);
