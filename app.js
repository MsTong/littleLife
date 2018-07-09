const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');
const session = require('koa-session');
const cors = require('./app/middleware/cors.js');
const config = require('./config/config.default.js');
const littleLife = require('./app/router/littleLife.js');

// 实例化对象
const app = new Koa();
const router = new Router();

// 加载請求控制中间件（跨域）
app.use(cors());
app.keys = ['tongling'];
app.use(session(config.session, app));
app.use(koaBody(config.upload));

// 加载路由中间件
router.use('/api/littlelife', littleLife.routes(), littleLife.allowedMethods());
app.use(router.routes()).use(router.allowedMethods());

// 监听端口号
app.listen(config.port, () => {
    console.log(`-----------------------NODE已在${config.port}端口启动成功!-----------------------`);
});