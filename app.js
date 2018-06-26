const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();
const koaBody = require('koa-body');
const cors = require('./app/middleware/cors.js');
const config = require('./config/config.default.js');
const littleLife = require('./app/router/littleLife.js');

// 加载請求控制中间件（跨域）
app.use(cors());
app.use(koaBody(config.upload));
router.use('/api/littlelife', littleLife.routes(), littleLife.allowedMethods());

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods());

app.listen(config.port, () => {
    console.log(`-----------------------NODE已在${config.port}端口启动成功!-----------------------`);
});