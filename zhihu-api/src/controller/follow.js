const { getFollowData, getMoreFollowData } = require('../api');


class FollowController {

    getFollow = (req, res, next) => {
        getFollowData().then((data) => {

            let resData = {
                code: "1",
                msg: "success",
            }
            if (data.status === 200) {
                // resData.data = data.data.data
                resData.data = data.data
            } else {
                resData.code = '0';
                resData.msg = 'failed'

            }
            res.send(resData);

        }).catch(next);
    }

    getMoreFollow = (req, res, next) => {
        let { session_start_id, after_id, limit, action } = req.query;
        let param = { session_start_id, after_id, limit, action }
        getMoreFollowData(param).then((data) => {

            let resData = {
                code: "1",
                msg: "success",
            }
            if (data.status === 200) {
                // resData.data = data.data.data
                resData.data = data.data
            } else {
                resData.code = '0';
                resData.msg = 'failed'

            }
            res.send(resData);

        }).catch(next);
    }


}

module.exports = new FollowController();