var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

/* GET users listing. */
router.get('/', function(req, res, next) {
    const UserSchema = mongoose.model('contentList');
    UserSchema.find({}, (err, docs) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log('all.js : success! -------------------------');
            console.log(docs)
            console.log('-------------------------------------------')
            // findで見つけた中身をresで返す
            res.send(docs);
        }
      });
});


module.exports = router;
  