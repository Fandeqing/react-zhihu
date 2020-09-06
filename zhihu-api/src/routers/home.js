var express = require('express');
var router = express.Router();

const IndexController = require('../controller/index')

const home = IndexController.home;

/* GET home page. */
router.get('/', home.homeShow);

module.exports = router;
