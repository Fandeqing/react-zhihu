var express = require('express');
var router = express.Router();

const IndexController = require('../controller/index')

const recommend = IndexController.follow;
/* GET follow page. */
router.get('/follow', recommend['getFollow']);
/* GET morefollow page. */
router.get('/follow/more', recommend['getMoreFollow']);

module.exports = router;
