/**
 * Created by SONG on 2017/10/4.
 */
let express = require('express');
let {Article} = require('../model');
let {checkLogin} = require('../auth');
let router = express.Router();
router.get('/add',checkLogin,function (req,res) {
    res.render('article/add',{title:'发布文章',article:{}})
});
router.post('/add',checkLogin,function (req,res) {
    let article = req.body;
    //这篇文章的作者是当前的登录用户
    article.user = req.session.user._id;
    Article.create(article,function (err,doc) {
        if(err){
            req.flash('error',err);
            res.redirect('back')
        }else {
            req.flash('success','文章发表成功')
            res.redirect('/')
        }
    })

});
router.get('/detail/:id',function (req,res) {
    let _id = req.params._id;
    Article.findById(_id,function (err,article) {
        if(err){
            req.flash('error',err);
            res.redirect('back')
        }else {
            res.render('article/detail',{title:'文章详情',article})
        }
    })
});
router.get('/delete/:id',function (req,res) {
    let _id = req.params._id;
    Article.remove({id},function (err,result) {
        if(err){
            req.flash('error',err);
            res.redirect('back')
        }else {
            req.flash('success','删除成功！');
            res.redirect('/')
        }
    })
});
//当点击更新按钮的时候会请求此路由路径
router.get('/update/:id',function (req,res) {
    let _id = req.params._id;//先获得路径里的文章ID
    Article.findById(_id,function (err,article) {
        //增加和更新可以复用一个模块
        res.render('article/add',{title:'更新文章',article})
    })
});
router.post('/update/:_id',function (req,res) {
    let _id = req.params._id;
    Article.update({_id},req.body,function (err,resulet) {
        if(err){
            req.flash('error',err);
            res.redirect('back')
        }else {
            req.flash('success','文章更新成功');
            res.redirect('/article/detail/'+_id)
        }
    })
})
module.exports = router;