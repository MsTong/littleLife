const formidable = require('formidable');
function dateFormat() {
    let myDate = new Date();
    let QQ = "Q" + Math.ceil((myDate.getMonth() + 1) / 3); //季度 
    let YY = myDate.getFullYear();
    let MM = (myDate.getMonth() + 1 + '').padStart(2, '0');
    let DD = (myDate.getDate() + '').padStart(2, '0');
    let hh = (myDate.getHours() + '').padStart(2, '0');
    let mm = (myDate.getMinutes() + '').padStart(2, '0');
    let ss = (myDate.getSeconds() + '').padStart(2, '0');
    let ms = (myDate.getMilliseconds() + '').padStart(3, '0');
    return `[${YY}-${MM}-${DD} ${QQ} ${hh}:${mm}:${ss}.${ms}]`;
}
module.exports = () => {
    return async (ctx, next) => {
        const startTime = Date.now();
        await next();
        const timeDiff = Date.now() - startTime;
        // ctx.user-agent
        let time = dateFormat() + ' ';
        let ip = ctx.ip + ' '
        let url = ctx.method + ctx.url + ' ';
        // console.log(ctx.res)
        let log = time + ip + url;

        // var form = new formidable.IncomingForm();
        // form.parse(ctx.req, function (err, fields, files) {
        //     console.log(files.name)
        // });

        console.log(log)
    }
}