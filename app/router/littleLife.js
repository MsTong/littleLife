const Router = require('koa-router');
const mysql = require('../database/crud.js')
const QcloudSms = require("qcloudsms_js");
const appid = 1400104210;
const appkey = "64f8dd3eb3d56270745078b9349148b7";
const sender = QcloudSms(appid, appkey).SmsSingleSender();

let router = new Router()
    .post('/getphonecode', async (ctx) => {
        let data = ctx.request.body.fields;
        console.log(data)
        let phoneNumber = data.phone;
        let templId = 145219;
        let phoneCode = Math.floor(Math.random() * 1000000);

        const codeNumber = () => {
            return new Promise((res, rej) => {
                sender.sendWithParam(86, phoneNumber, templId, [phoneCode, 3], "", "", "", (err, temp, data) => {
                    if (err) {
                        rej(err)
                    } else {
                        res(data)
                    }
                })
            })
        }

        try {
            const json = await codeNumber();
            if (json.result === 0) {
                ctx.session.loginCode = phoneCode;
                ctx.session.loginCodeTime = new Date().getTime();
                ctx.body = {
                    code: 0,
                    msg: '短信验证码发送成功！',
                    data: {}
                };
            } else {
                ctx.body = {
                    code: json.result,
                    msg: json.errmsg,
                    data: {}
                };
            }
        } catch (error) {
            ctx.body = {
                code: -1,
                msg: error,
                data: {}
            };
        }





    })
    .post('/register', async (ctx) => {
        let data = ctx.request.body;
        let isHaveUser = await mysql.Query.where('user', {
            username: data.username
        })
        if (!isHaveUser.length) {
            let isRegister = await mysql.Insert('user', {
                username: data.username,
                password: data.password,
                email: data.email,
                phone: data.phone
            })
            if (isRegister.affectedRows === 1) {
                ctx.body = {
                    code: 0,
                    msg: '恭喜你，注册成功！',
                    data: {}
                };
            } else {
                ctx.body = {
                    code: -1,
                    msg: '注册失败，请稍后重试！',
                    data: {}
                };
            }
        } else {
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

        if (isHaveUser.length === 1) {
            if (isHaveUser[0].password === data.password) {
                ctx.body = {
                    code: 0,
                    msg: '恭喜你，登录成功！',
                    data: {}
                };
            } else {
                ctx.body = {
                    code: -1,
                    msg: '密码错误，请重试！',
                    data: {}
                };
            }
        } else {
            ctx.body = {
                code: -2,
                msg: '用户名不存在，请重试！',
                data: {}
            };
        }
    })


module.exports = router;