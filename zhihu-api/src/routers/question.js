var express = require('express');
var router = express.Router();

const IndexController = require('../controller/index')

const question = IndexController.question;
/* GET questionInfo page. */
router.get('/question/question_info', question['getQuestionInfo']);
/* GET questionAnswers page. */
router.get('/question/question_answers', question['getQuestionAnswers']);

router.get('/question/answer', question['getSingleAnswer'])


module.exports = router;
