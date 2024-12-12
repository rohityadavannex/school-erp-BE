var express = require('express');
var router = express.Router();

// /* GET home page. */
router.get('/', function(req, res, next) {
  try{
    res.send({status: 200, message: "Hello From ExpressJS"})
  }catch(err){
    console.log("line 9 ", err)
  }
  
});

module.exports = router;
