var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


/* GET users listing. */
router.get('/', function(req, res, next) {
    // コレクション呼び出し
    const UserSchema = mongoose.model('contentList');
    const delContent = req.query.create
    // スキーマの削除
    UserSchema.remove({ create: delContent }, (err) => {
        if (err) {
            console.log('delete.js : remove failed');
        }
        else {
            console.log('delete.js : remove complete!')
            res.send('main.js : ajaxGET success!')
        }
    });

});

module.exports = router;
