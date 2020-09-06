const {
    getVideoCommentsById,
    getChildCommentsById,
    getAnswerCommentsById
} = require('../api');


class CommentsController {


    getVideoComments = (req, res, next) => {
        const { vId, order, offset } = req.query;
        getVideoCommentsById(vId, order, offset).then((data) => {
            let resData = {
                code: "1",
                msg: "success",
            }
            if (data.status === 200) {
                resData.data = data.data;

            } else {
                resData.code = '0';
                resData.msg = 'failed'
            }

            res.send(resData);

        }).catch(next);
    }

    getAnswerComments = (req, res, next) => {
        const { answerId, order, offset } = req.query;
        getAnswerCommentsById(answerId, order, offset).then((data) => {
            let resData = {
                code: "1",
                msg: "success",
            }
            if (data.status === 200) {
                resData.data = data.data;

            } else {
                resData.code = '0';
                resData.msg = 'failed'
            }

            res.send(resData);

        }).catch(next);
    }


    getChildComments = (req, res, next) => {
        let cId = req.query.cId;
        getChildCommentsById(cId).then((data) => {
            let resData = {
                code: "1",
                msg: "success",
            }
            if (data.status === 200) {
                resData.data = data.data;

            } else {
                resData.code = '0';
                resData.msg = 'failed'
            }

            res.send(resData);

        }).catch(next);
    }

}

module.exports = new CommentsController();





