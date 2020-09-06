var express = require('express');
var router = express.Router();

const IndexController = require('../controller/index')

const zvideo = IndexController.zvideo;
/* GET zvideo page. */
router.get('/zvideo', zvideo['getZvideo']);

router.get('/zvideo/recommend', zvideo['getZvideoRecommend'])

router.get('/zvideo/recommend/more', zvideo['getMoreZvideoRecommend'])


module.exports = router;
