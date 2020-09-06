const {
    getHotNavListData,
    getHotData,
    postHotNavListData
} = require('../api');


class HotController {

    getHotNavList = (req, res, next) => {
        getHotNavListData().then((data) => {
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

    postHotNavList = (req, res, next) => {
        const param = {
            data: req.body.data,
            rec_data: req.body.rec_data
        }

        postHotNavListData(param).then(data => {
            let resData = {
                code: "1",
                msg: "success",
            }
            if (data.status === 200 || data.status === 202) {
                resData.data = data.data
            } else {
                resData.code = '0';
                resData.msg = 'failed'

            }
            res.send(resData);

        }).catch(next);
    }


    getHotItems = (req, res, next) => {
        const hotTag = req.query.hotTag
        getHotData(hotTag).then((data) => {
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

module.exports = new HotController();