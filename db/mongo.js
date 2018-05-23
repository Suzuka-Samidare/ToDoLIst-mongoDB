// mongoDBモジュールの呼び出し
const mongoose = require('mongoose');
// 定義
const Schema = mongoose.Schema;

// mongooseを使って取得・設定したいフィールドを定義する
const humanSchema = new Schema({
  name: { type: String, index: { unique: true } }, // 検索(index)で同じ名前で引っかからないようにする
  age: { type: Number },
  createedAt: { type: Date, default: Date.now }
})

// 
mongoose.model('human', humanSchema);
// mongoDBにアクセス
const connect = mongoose.connect('mongodb://localhost/todoList');
