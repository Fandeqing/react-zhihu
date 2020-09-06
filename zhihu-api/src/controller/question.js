const { getQuestionInfoById, getQuestionAnswersByOffset
    , getSingleAnswerById
} = require('../api');


class QuestionController {

    getQuestionInfo = (req, res, next) => {
        const qId = req.query.qId;
        getQuestionInfoById(qId).then((data) => {
            //没有找到问题描述的接口，使用假数据。
            const fakeQuestionMsg = {
                "content": "<p>我同情抑郁症，但是我tm神烦那种稍微有一点抑郁情绪就给自己挂上一个抑郁症标签的人，包括一些明星通过说自己抑郁来洗地的，评论里不要再说什么“不愿意看就不看，抑郁症惹你了？抑郁症都是你这种人害得”这类话，我懒得回，如果抑郁症没有一个门槛，人人都可以说我是抑郁症，要医生干什么？</p><p>“今天考试没考好，爸妈要打我，对不起我抑郁”</p><p>“今天我妈没给三岁的我买玩具，对不起我抑郁”</p><p>真正的抑郁症患者谁来关心？如何判断谁是真正的患者？狼来了的故事没听过么？</p><p>也别再说这是软件特色，这种人人抑郁的网络评论早就该治理。</p><p>所以对于网易云评论中的抑郁：</p><p>“如果是真的，我希望是假的。</p><p> 如果是假的，我希望是真的。”</p><p>以下为原回答</p><hr/><p>我：“我来听歌”</p><p>网易云：“滚出去”</p><p>我：“我每天都在笑 你猜 我过得好不好。”</p><p>网易云：“vip来啦！”</p><hr/><p>我：“这唱的什么玩意？”</p><p>网易云：“滚出去”</p><p>我：“一个人有多不正经 就有多深情”</p><p>网易云：“坐！”</p><hr/><p>“生而为人，我很抱歉”</p><p>“抱抱”</p><p>“今年第一次自残 第一次彻夜地哭 第一次撕心裂肺地用剪刀砸门 第一次用刀对准自己的脖子 第一次认真地写完遗言 第一次和朋友认真地告别  第一次明白别人眼里的无病呻吟有多痛苦 海底是黑暗的 窒息是痛苦的 拉身边的人一把</p><p>他只想最后呼吸一次”</p><p>“永远保持热爱 奔赴山海”</p > <p>（热评都不会打标点只会空格）</p><hr /><p>下面给老铁们整理个网易云故事会</p><blockquote>14岁，初一，我遇到了她，我终于知道了什么叫做一眼万年，我开始疯狂的追她<br /><br />16岁，初三，她太难追了，我有点委屈，但没有放弃<br /><br />初三毕业季，我喝了很多酒，醉了，在她怀里大哭了一场，哭完以后我准备最后一次告白，没有抱太大的希望 她同意了<br /><br />中考，我疯了似的学，只是为了和她站在一起<br /><br />高一，我们考到了一起，她很漂亮，经常有人告白，我很生气，但她还是最爱我 拒绝了所有暧昧<br />高中，我这辈子最快乐的时光<br /><br />高三，高考，我整夜整夜的学，是为了她，我把志愿填到了她的家乡<br /><br />高考成绩出来了",
                // ，我654分，这成绩我可以去本市一本了可她还在哪里，我抛弃了一本和她去了三本<br /><br />大学，我去学了法，她去学了医，她笑着问我为什么学法，我说“因为啊，现在还不合法<br />我要用毕生所学来把他弄合法，我又问她，你为什么学医，她说“你身体不好，经常生病，我怕没人照顾你”，她把我的心说化了<br /><br />大二，父母发现我们俩，他们差点把我腿打折，我逃了出来，我并不害怕，因为有她<br /><br />毕业，噩梦来了，她的父母发现我们了，我并不知道发生了什么，你和我说了分手<br />分手后的晚上，我没哭没闹，坐了一晚上，看星星，抽了三包烟，猛然发现她经常不让我抽烟，但现在没人管我了，我笑了<br /><br />第二天，她搬出去了，没有一句告别，突然发现房间好空<br />",
                "comment_count": 56,
                "good_question_count": 128,
            }

            let resData = {
                code: "1",
                msg: "success",
            }
            if (data.status === 200) {
                resData.data = data.data;
                resData.data = {
                    ...resData.data,
                    ...fakeQuestionMsg
                }

            } else {
                resData.code = '0';
                resData.msg = 'failed'
            }

            res.send(resData);

        }).catch(next);
    }

    getQuestionAnswers = (req, res, next) => {
        const { offset, qId, limit } = req.query;
        getQuestionAnswersByOffset(qId, offset, limit).then((data) => {
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

    getSingleAnswer = (req, res, next) => {
        let aId = req.query.aId;
        getSingleAnswerById(aId).then((data) => {
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

module.exports = new QuestionController();





