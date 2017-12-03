/**
 * Created by SONG on 2017/10/4.
 */
let express = require('express');
let {Article} = require('../model');
let router = express.Router();
//当客户端通过GET请求的方式访问/路径的时候，会交由对应的函数来处理
// title:'首页',   user:req.session.user写在了路由中间件中
router.get('/',function (req,res) {
    // let {keyword,pageNum,pageSize} = req.query
        let keyword = req.query.keyword;//得到关键字
        //如果pageNum不是一个数字的话给一个值为1
       let pageNum = isNaN(req.query.pageNum)?1:parseInt(req.query.pageNum);//当前页码
       let  pageSize = isNaN(req.query.pageSize)?3:parseInt(req.query.pageSize);//每页的条数
        let query = {};
        if(keyword){
            // query.title = new RegExp(keyword);// keyword是搜索的标题中的关键字
            query['$or'] = [{
                title:new RegExp(keyword)
            },{
                content:new RegExp(keyword)
            }]
        }
    //populate可以把一个字段从字符串转成对象
    Article.find(query).populate('user').exec(function (err,articles) {
        console.log(articles);
        //路径是相对路径，相对于模板跟目录
        res.render('index',{title:'首页',articles,keyword})
        // res.render('index',{title:'首页',user:req.session.user})这样写的话点击登录会有问题，因为每个页面都渲染header而登录页面上没有User的值所有就在路由中间件中从会话对象中取出User属性赋给模板属性
    })


});
module.exports = router;