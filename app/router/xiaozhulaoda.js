const Router = require('koa-router');

let router = new Router()
    .get('/404', async (ctx) => {
        ctx.body = '404 page!'
    })
    .get('/helloworld', async (ctx) => {
        ctx.body = 'helloworld page!'
    })

module.exports = router;