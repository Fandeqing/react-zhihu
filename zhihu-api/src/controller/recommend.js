const { getRecommendData, getMoreRecommendData } = require('../api');


class RecommendController {

    getRecommned = (req, res, next) => {
        getRecommendData().then((data) => {

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

    getMoreRecommned = (req, res, next) => {
        let { page_number, after_id, limit, action } = req.query;
        const param = {
            page_number, after_id, limit, action
        }
        getMoreRecommendData(param).then((data) => {

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

module.exports = new RecommendController();