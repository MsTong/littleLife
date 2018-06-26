const Router = require('koa-router');
const mysql = require('../database/crud.js')

let router = new Router()
   .post('/register', async (ctx) => {
        let data = ctx.request.body;
        let isHaveUser = await mysql.Query.where('user', {
            username: data.username
        })
        if (!isHaveUser.length){
            let isRegister = await mysql.Insert('user', {
                username: data.username,
                password: data.password,
                email: data.email,
                phone: data.phone
            })
            if(isRegister.affectedRows === 1){
                ctx.body = {
                    code: 0,
                    msg: '恭喜你，注册成功！',
                    data: {}
                };
            }else{
                ctx.body = {
                    code: -1,
                    msg: '注册失败，请稍后重试！',
                    data: {}
                };
            }
        }else{
            ctx.body = {
                code: -2,
                msg: '该用户名已经被占用，请重试！',
                data: {}
            };
        }
    })
    .post('/login', async (ctx) => {
        let data = ctx.request.body;
        let isHaveUser = await mysql.Query.where('user', {
            username: data.username
        })
      
        if (isHaveUser.length===1){
            if(isHaveUser[0].password === data.password){
                ctx.body = {
                    code: 0,
                    msg: '恭喜你，登录成功！',
                    data: {}
                };
            }else{
                ctx.body = {
                    code: -1,
                    msg: '密码错误，请重试！',
                    data: {}
                };
            }
        }else{
            ctx.body = {
                code: -2,
                msg: '用户名不存在，请重试！',
                data: {}
            };
        }
    })
    

module.exports = router;
