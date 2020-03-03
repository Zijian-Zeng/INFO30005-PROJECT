var mongoose = require("mongoose"); //引入mongoose

mongoose.connect('mongodb://localhost:27017/first_express_db', 
{ useNewUrlParser: true, useUnifiedTopology: true}); //连接到mongoDB的todo数据库
//该地址格式：mongodb://[username:password@]host:port/database[?options]
//默认port为27017 

 var db = mongoose.connection;

//监听是否有异常
db.on('error', (error) => console.log("Connection error"));


//监听一次打开
//在这里创建你的模式和模型
db.once('open', () => console.log('connected!'));





/*
var UserSchema = new mongoose.Schema({
    user_name: String,
    password: String
});
mongoose.model('member', UserSchema);
*/

module.exports = mongoose;
