// console.logはターミナル出力

var express = require('express');
var router = express.Router();
// モジュール呼び出し
var mongoose = require('mongoose');
// mongoDBの起動
mongoose.connect('mongodb://localhost/todoList', (err) => {
  if (err) {
    console.log(`index.js : DB Connect Fail!! ${err}`);
  }
  else {
    console.log('index.js : DB Connect Success!!');
  }
});

  /* GET home page. */
// フロントからGETを投げてきた場合
router.get('/', function(req, res, next) {
  // titleに値を返す
  res.render('index', { title: 'ToDoList' });
  console.log('index.js : render success!')  
});

  // フロントからPOSTを投げてきた場合
  router.post('/', function(req,res,next) {
    // 現在時刻
    let now = new Date;
    let year = now.getFullYear(); // 年
    let month = ('0'+(now.getMonth() + 1)).slice(-2); // 月
    let date = ('0'+now.getDate()).slice(-2);
    let hour = now.getHours(); // 時
    let min = now.getMinutes(); // 分
    // スキーマ格納仕様にする
    let nowDate = `${year}-${month}-${date}`;
    let nowTime = `${hour}:${min}`
    let createTime = `${nowDate} ${nowTime}`;
    // mongoDBのcollectionを定義
    const UserSchema = mongoose.model('contentList');
    // スキーマの作成
    const humanData = new UserSchema();
    // スキーマの各データをbody(input要素のnameに合致するもの)からスキーマ内に格納
    humanData.content = req.body.content;
    humanData.limit = req.body.limit; 
    humanData.date = req.body.date; //yyyy-mm-dd
    humanData.time = req.body.time; //hh:mm
    humanData.create = createTime;

    // スキーマの保存
    humanData.save((err) => {
      if (err) {
        console.log(`index.js : Insert Fail!! ${err}`);
      }
      else {
        // collection内のdocumentを検索、呼び出し
        UserSchema.find({}, (err, docs) => {
          console.log('index.js : save & find success! -----------')
          console.log(docs);
          console.log('-------------------------------------------')
          res.send(docs);
        });
      }
    });

    // ステータスコード200と見なして、send
    // res.status(200).send({ msg: 'complete add' });
  });


module.exports = router;
