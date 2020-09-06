var express = require('express');
var router = express.Router();

const IndexController = require('../controller/index')

const comments = IndexController.comments;
/* GET video commnets. */
router.get('/zvideo/comments', comments['getVideoComments']);
/* GET answer commnets. */
router.get('/answer/comments', comments['getAnswerComments']);
/* GET child comments. */
router.get('/child/comments', comments['getChildComments']);

module.exports = router;
