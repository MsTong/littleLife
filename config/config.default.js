const path = require('path');

const config = {
    port: 3000,
    mysql: {
        port: 3306,
        host: '111.231.137.96',
        database: 'littleLife',
        user: 'root',
        password: 'Tong@1228',
    },
    upload: {
        multipart: true, // 支持文件上传
        formidable: {
            uploadDir: path.join(__dirname, '../app/upload/'), // 设置文件上传目录
            keepExtensions: true, // 保持文件的后缀
            maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小
            onFileBegin: (name, file) => { // 文件上传前的设置
              
            }
        }
    },
    session: {
        key: 'koa:sess', /** 默认 */
        maxAge: 10000,  /*  cookie的过期时间        【需要修改】  */
        overwrite: true, /** (boolean) can overwrite or not (default true)    没有效果，默认 */
        httpOnly: true, /**  true表示只有服务器端可以获取cookie */
        signed: true, /** 默认 签名 */
        rolling: true, /** 在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false） 【需要修改】 */
        renew: false, /** (boolean) renew session when session is nearly expired      【需要修改】*/
    }

}
module.exports = config;
