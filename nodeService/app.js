var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
let fs = require("fs");

var userRouter = require('./api/user');
var postRouter = require('./api/posts')
var reviewRouter = require('./api/reviews')
var adminRouter = require('./api/admin')

var app = express();

var contentType = {
  "gif": "image/gif",
  "png": "image/png",
}
// 下面两项设置文件上传的大小限制为50m，不写的话可能会因为文件超过3m而报413
app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Access-Control-Allow-Headers', '*');
  if (req.method == 'OPTIONS') {
    res.status(200).end()
  } else {
    next();
  }
})

app.use('/user', userRouter);
app.use('/posts', postRouter)
app.use('/reviews', reviewRouter)
app.use('/admin', adminRouter)

//图片请求处理
app.use('/', function (req, res) {
  //设置请求的返回头type,content的type类型列表见上面
  res.setHeader("Content-Type", contentType);
  //格式必须为 binary 否则会出错
  let content = fs.readFileSync(url, "binary");
  res.writeHead(200, "Ok");
  res.write(content, "binary"); //格式必须为 binary，否则会出错
  res.end();
})
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
