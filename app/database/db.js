const mysql = require('mysql2');
const config = require('../../config/config.default.js');

//创建一个有效连接池
const Pool = mysql.createPool({
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
    port: config.mysql.port
});

//从连接池取出一个连接检验连接池是都连接成功
Pool.getConnection(function(err,connection){
    if (err) {
        console.log('----------------------很遗憾,MYSQL数据库连接失败!----------------------');
        console.error(err);
    } else {
        console.log('----------------------恭喜你,MYSQL数据库连接成功!----------------------');
    }
    //把该连接放回连接池
    connection.release();
});

module.exports = Pool;
