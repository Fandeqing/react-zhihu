var express = require('express');
var router = express.Router();

const IndexController = require('../controller/index')

const recommend = IndexController.recommend;
/* GET recommend page. */
router.get('/recommend', recommend['getRecommned']);
/* GET moreRecommend page. */
router.get('/recommend/more', recommend['getMoreRecommned']);


module.exports = router;
