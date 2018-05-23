var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// const mongodb = require('./db/mongo.js');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const allRouter = require('./routes/all');
const deleteRouter = require('./routes/delete')


// mongoDBモジュールの呼び出し
const mongoose = require('mongoose');
// 定義
const Schema = mongoose.Schema;
// mongooseを使って取得・設定したいフィールドを定義する
// 検索(index)で同じ名前で引っかからないようにする
const UserSchema = new Schema({
  content: {type: String}, 
  limit: { type: String },
  date: { type: String },
  time: { type: String },
  create: { type: String }, // { type: Date, default: Date.now }, 
  color: { type: String, default: 'pink' }
});
// 取得先のコレクション名と取得するスキーマを設定してモデル化する
mongoose.model('contentList', UserSchema);


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/all', allRouter);
app.use('/delete', deleteRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
