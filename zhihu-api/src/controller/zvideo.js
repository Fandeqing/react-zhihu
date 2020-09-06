const { getZvideoById,
    getZvideoRecommendById,
    getMoreZvideoRecommendData
} = require('../api');


class ZvideoController {

    getZvideo = (req, res, next) => {
        const vId = req.query.vId;
        getZvideoById(vId).then((data) => {
            let resData = {
                code: "1",
                msg: "success",
            }
            if (data.status === 200) {
                resData.data = data.data
            } else {
                resData.code = '0';
                resData.msg = 'failed'

            }
            res.send(resData);

        }).catch(next);
    }

    getZvideoRecommend = (req, res, next) => {
        const vId = req.query.vId;
        getZvideoRecommendById(vId).then((data) => {
            let resData = {
                code: "1",
                msg: "success",
            }
            if (data.status === 200) {
                resData.data = data.data
            } else {
                resData.code = '0';
                resData.msg = 'failed'

            }
            res.send(resData);

        }).catch(next);
    }

    getMoreZvideoRecommend = (req, res, next) => {
        const { vId, limit, offset } = req.query;
        getMoreZvideoRecommendData({ vId, limit, offset }).then((data) => {
            let resData = {
                code: "1",
                msg: "success",
            }
            if (data.status === 200) {
                resData.data = data.data
            } else {
                resData.code = '0';
                resData.msg = 'failed'

            }
            res.send(resData);

        }).catch(next);
    }


}

module.exports = new ZvideoController();