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
    }
}
module.exports = config;
