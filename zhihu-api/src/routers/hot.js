var express = require('express');
var router = express.Router();

const IndexController = require('../controller/index')

const hot = IndexController.hot;
/* GET hotList */
router.get('/hot/hot_list', hot['getHotNavList']);

/* POST hotList */
router.put('/hot/hot_list', hot['postHotNavList']);

/* GET hotItem */
router.get('/hot/hot_item', hot['getHotItems']);


module.exports = router;
