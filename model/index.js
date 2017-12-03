/**
 * Created by SONG on 2017/10/5.
 */
let mongoose = require('mongoose');
mongoose.Promise = Promise;//为了把User从字符串转化成对象，用populate，但是已经废弃
let ObjectId = mongoose.Schema.Types.ObjectId;
//连接数据库
mongoose.connect('mongodb:127.0.0.1/201701blog');
//配置user集合的文档属性的类型和名字
//定义用户集合的骨架模型，规定了用户集合中文档的属性和类型
let UserSchema = new mongoose.Schema({
    username:String,
    password:String,
    email:String,
    avatar:String
});
//定义用户模型
let User = mongoose.model('User',UserSchema);
//把用户模型挂载到导出对象上
exports.User = User;
let ArticleSchema = new mongoose.Schema({
    title:String,
    content:String,
    createAt:{type:Date,default:Date.now},
    //user是一个外键，引用的是另一个集合的主键
    user:{type:ObjectId,ref:'User'}
});
let Article = mongoose.model('Article',ArticleSchema);
exports.Article = Article;