/**
 * Created by SONG on 2017/10/4.
 */
let express = require('express');
let path  = require('path');
let bodyParse = require('body-parser');
let session = require('express-session');
//消息中间件 flash 闪光  一闪而过
let flash = require('connect-flash');

let app = express();
//在使用了此会话中间件之后，会请求对象上增加req.session属性
app.use(session({
    resave:true,//每次客户端请求到服务器都会保存session
    secret:'zf',//用来加密cookie
    saveUninitialized:true //保存未初始化的session
}));
//切记此中间件的使用要存放在session的后面，因此中间件是需要依赖session的 赋值：req.flash(type,msg) 取值：req.flash(type)
app.use(flash());
//解析客户端提交过了的请求体，并转成对象赋给req.body
app.use(bodyParse.urlencoded({extend:true}));
//设置模板引擎 HTML
app.set('view engine','html');
//指定模板的存放的跟目录
//resolve：从当前路径出发，用当前绝对路径+views路径变成另外一个绝对路径
app.set('views',path.resolve('views'));
//指定对于HTML类型的模板使用ejs方法来进行渲染
app.engine('html',require('ejs').__express);
//此静态文件中间件会拦截到客户端对于静态文件的请求如bootstrap.css，然后再当前目录的node_modules目录下寻找到文件，如果能找到则返回客户端并结束请求
app.use(express.static(path.resolve('node_modules')));
app.use(express.static(path.resolve('public')));
let index = require('./routes/index');
let user = require('./routes/user');
let article = require('./routes/article');
app.use(function (req,res,next) {
   // 真正渲染的模板是res.locals
   res.locals.user =  req.session.user;
   res.locals.keyword = '';
    //flash的功能是读完一次之后会立刻清空数据
    res.locals.error = req.flash('success').toString();
   res.locals.error = req.flash('error').toString();
next()
});
app.use('/',index);
//当客户端请求过来的路径时/user开头的话，会交由   user中间件来处理/user/signup /user/signin
app.use('/user',user);
app.use('/article',article);
app.listen(8080);
