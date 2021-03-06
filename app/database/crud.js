const Pool = require('./db.js');

//MYSQL-增加操作封装
const Insert = (Table, DATA) => {
    return new Promise((resolve, reject) => {
        let sql = `INSERT INTO ${Table} ${inData(DATA)}`;
        console.log(sql);
        Pool.getConnection(function (err, connection) {
            if (err) {
                reject(err);
            } else {
                connection.query(sql, (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                    connection.release();
                })
            }
        })
    })

};


//MYSQL-删除操作封装
const Delete = (Table, Condition = {}) => {
    return new Promise((resolve, reject) => {
        let sql = `DELETE FROM ${Table}${condition(Condition)}`;
        console.log(sql);
        Pool.getConnection(function (err, connection) {
            if (err) {
                reject(err);
            } else {
                connection.query(sql, (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                    connection.release();
                })
            }
        })
    })
};

//MYSQL-修改操作封装
const Update = (Table, DATA, Condition = {}) => {
    return new Promise((resolve, reject) => {
        let sql = `UPDATE ${Table} SET ${setData(DATA)}${condition(Condition)}`;
        console.log(sql);
        Pool.getConnection(function (err, connection) {
            if (err) {
                reject(err);
            } else {
                connection.query(sql, (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                    connection.release();
                })
            }
        })
    })
};

//MYSQL-查询操作封装
const Query = {
    all(Table, Sort = {}) {
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM ${Table}${sort(Sort)}`;
            Pool.getConnection(function (err, connection) {
                if (err) {
                    reject(err);
                } else {
                    connection.query(sql, (error, results) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(results);
                        }
                        connection.release();
                    })
                }
            })
        })
    },
    where(Table, Condition = {}, Sort = {}) {
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM ${Table}${condition(Condition)}${sort(Sort)}`;
            console.log(sql);
            Pool.getConnection(function (err, connection) {
                if (err) {
                    reject(err);
                } else {
                    connection.query(sql, (error, results) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(results);
                        }
                        connection.release();
                    })
                }
            })
        })
    }
};


function isObject(obj) {
    return obj !== null &&
        typeof obj === 'object' &&
        !(obj instanceof Array) &&
        JSON.stringify(obj) !== '{}'
}

const sort = (obj) => {
    let tmp = ` ORDER BY`;
    if (isObject(obj)) {
        for (key in obj) {
            if (!obj[key]) {
                tmp += ` ${key} DESC,`
            } else {
                tmp += ` ${key} ASC,`
            }
        }
        return tmp.substring(0, tmp.length - 1) + ';';
    } else {
        return ';';
    }
};

const condition = (obj) => {
    let tmp = ` WHERE`;
    if (isObject(obj)) {
        for (key in obj) {
            tmp += ` ${key} = '${obj[key]}' AND`
        }
        return tmp.substring(0, tmp.length - 3);
    } else {
        return '';
    }
};

const inData = (obj) => {
    if (isObject(obj)) {
        let tmp1 = '(';
        let tmp2 = '(';
        for (key in obj) {
            tmp1 += ` ${key},`
            tmp2 += ` '${obj[key]}',`
        }
        return tmp1.substring(0, tmp1.length - 1) + ' ) values ' + tmp2.substring(0, tmp2.length - 1) + ' );';
    } else {
        return '';
    }
};

const setData = (obj) => {
    let tmp = '';
    if (isObject(obj)) {
        for (key in obj) {
            tmp += ` ${key} = '${obj[key]}',`
        }
        return tmp.substring(0, tmp.length - 1);
    } else {
        return '';
    }
};


module.exports = {
    Insert,
    Delete,
    Update,
    Query
}