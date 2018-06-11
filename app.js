const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();
const config = require('./config/config.default.js');
const page = require('./app/router/xiaozhulaoda.js');
const user = require('./app/database/crud.js');


router.use('/admin/xiaozhulaoda', page.routes(), page.allowedMethods());

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods());

// app.use(timerWare());

app.listen(config.port, () => {
    console.log(`-----------------------NODE已在${config.port}端口启动成功!-----------------------`);
});