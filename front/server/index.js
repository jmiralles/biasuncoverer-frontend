const Koa = require("koa");
const koaRouter = require("koa-router");
const bodyParser = require("koa-body");
const isProd = process.env.NODE_ENV === "production";
const mockApiUrl = "http://localhost:80";
const koaRequest = require("koa-http-request");
const apiKey = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1NjY0MTQwOTUsImV4cCI6MTU5Nzk3MTA0Nywicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoiZXVyZWNhdCJ9.o4SFGMlg_O_iRPfj0NpnQb5PTAar7Xmq_Ka_2MeREmygNM2y74e5rIL_XbecJ4IhTSEO9Yu1I_0wk4k3DcLumBo93xE_rtF13glqaNcL83C2fJtchZFSAVsUcSlTODEQ6VSqum9lzaZg2pBw1D3E-sDMnUMDaF2zlDjmt0BkxNNVL2RsDgEFycwkqETQkh52vYGdJM6SQfXuNsGK61vqDkoQ06spCk_oT4iMtWq4ZKzc8TL8SPohEBTo_2tIDgEbV_xl3NG2C1SZFZ268xrqQnpRrG2PukXVgMERkQgrYZ05Va68-uI6J4EKJCA5fBhJKoNuM4o5AegL3_rf5QjKOkLv_iFk5Jabldrmgrvii1_YZ2wWNHqSyaxUebinYHPaaF_8NdWYKMR5lAmbGbr2360cZ98r-znghIHcodiYa0ZANBmUtxufh0lrrsmA1yb-wFL_FttiuzAke7GzrC7wInAwlIdTNySQYLLmou2YNurMkrmEdRWVmwNOKUyApX6kdMVuYyzo4Me8yR6KZ23eilBbuTjV4kOS4waFbhOsXPZZ_BkgJeKS9hCSYFQwm9RR5nV4kTRDjUDuSWk_MAUHpOFQ9NSxi_SO1jSKtUiAOLKxoDYAL3V6vxYg8j6LPl5EhbLIxhlHtzdZk9pKBNjKIx3mqDY4YlwleEO-dGpF7iA";
const router = new koaRouter();
const app = new Koa();
const sendFile = require("./utils/sendFile.js");
const { createReadStream } = require('fs');
const { request } = require('http');

const FormData = require('form-data');

console.log("UP");

app.use(
  koaRequest({
    timeout: 3000,
    host: mockApiUrl
  })
);


router.post("/api/file2", async (ctx, next) => {

  const file = ctx.request.files.file_csv;

  
  const res = await sendFile({
    fileName: ctx.request.body.file_name,
    filePath: file.path,
    apiKey
  });
  
  ctx.body = res;
});

function handleUpload(file_name, file_path) {
  return new Promise((resolve, reject) => {

    const readStream = createReadStream(file_path); 
        const form = new FormData();
        form.append('file_csv', readStream);
        form.append('file_name', file_name);

        form.submit({
          path: '/api/file',
          headers : { 
            'Authorization': apiKey,
            'Content-Type': 'multipart/form-data'
           }
        }, (err, res) => {
          console.log("err-------->>>>", err)
          console.log("res-------->>>>", res)
          if(res.statusCode === 200) {
            resolve(res)
          } else {
            reject(err)
          }
        })
  });
}


router.post("/api/file", async (ctx, next) => {
  try {
    const file = ctx.request.files.file_csv;

    const data = await handleUpload(ctx.request.body.file_name,file.path)

    ctx.body = data;


  } catch (e) {
    console.log("ERROR FILE LOAD:", e);
    ctx.throw(404);
  }

});


router.get("/api/(.*)", async (ctx, next) => {
  try {
    const endpoint = ctx.request.url;

    const data = await ctx.get(endpoint, null, {
      "User-Agent": "koa-http-request",
      Authorization: apiKey
    });
    ctx.body = data;
  } catch (e) {
    console.log("ERROR:", e);
    ctx.throw(404);
  }
});

router.post("/api/(.*)", async (ctx) => {
  try {
    const endpoint = ctx.request.url;

    console.log("ctx.headers", ctx.headers['content-type'])

    const data = await ctx.post(endpoint, ctx.request.body, {
      "User-Agent": "koa-http-request",
      "Content-Type": ctx.headers['content-type'],
      Authorization: apiKey
    });

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
