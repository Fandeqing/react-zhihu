const axios = require('axios');
// const querystring = require("querystring");

const zhihu = axios.create({
    headers: {
        cookie: `q_c1=73e6dcc5da4b4f788843cc6b95d819eb|1595295976000|1595295976000; _xsrf=1lPX6g6teSWkBIofDz80PkPIkMMF3jky; tst=r; _zap=873a7184-29f2-45cc-8444-fcddea8a4bf1; d_c0="AMBQw7PXmxGPTpi446wlB87Io6bBX2mu0ME=|1595296195"; _ga=GA1.2.362385047.1595296202; _gid=GA1.2.975168052.1595296202; Hm_lvt_98beee57fd2ef70ccdd5ca52b9740c49=1595031991,1595052190,1595052720,1595054428; capsion_ticket="2|1:0|10:1595296213|14:capsion_ticket|44:ODVmMGY5NzYwNzUyNGExY2I3YTAzNDA5MTlmNzBiMzU=|c0e2d8c623eda0425decf29c5b6ca3212608b34fb3492371ddb0130590bb89c3"; l_n_c=1; r_cap_id="ZDA5MzQ0N2I4ZTkyNGY4MWI4OGY5NjYxNmI4OWFmNDQ=|1595296218|263769c46c6698143116f72f59d21df5ca54bae2"; cap_id="ODMyYmUzNGM4YmU1NGRiODllMTgzZDVhYTFhYWZmY2M=|1595296218|905811139a176364acd4a799594de1dff088a7cf"; l_cap_id="ZWU2MDZiYTRhYTZkNDg2YWJlMDM5N2Y2Mjk3ZTM0NjA=|1595296218|67732cd23330a56010f2f6674b45596a76e8ece7"; n_c=1; z_c0=Mi4xVVNubUdBQUFBQUFBd0ZERHM5ZWJFUmNBQUFCaEFsVk5MSmdEWUFCMUVDTmdodGU1RHZJc1NJaEJPY0hCRlpkeWxR|1595296300|7f33f66021e81141857f27794d80c36bd207f7da; Hm_lpvt_98beee57fd2ef70ccdd5ca52b9740c49=1595296320; unlock_ticket="ALBZ2AuswxAXAAAAYQJVTUlRFl98_dMFuv7GJzyVgsnGQN2kx5bgyg=="; KLBRSID=0a401b23e8a71b70de2f4b37f5b4e379|1595296691|1595295976`,
        "Content-Type": "application/json; charset=utf-8"
    }
})

//首页-推荐
const URL_RECOMMEND = "https://www.zhihu.com/api/v3/feed/topstory/recommend?limit=10&desktop=true"

//问题描述api未找到
const URL_QUESTION_INFO = "https://www.zhihu.com/api/v4/questions/{question_id}"

//问题的部分答案
const URL_QUESTION_ANSWERS = "https://www.zhihu.com/api/v4/questions/{question_id}/answers?include=data%5B%2A%5D.is_normal%2Cadmin_closed_comment%2Creward_info%2Cis_collapsed%2Cannotation_action%2Cannotation_detail%2Ccollapse_reason%2Cis_sticky%2Ccollapsed_by%2Csuggest_edit%2Ccomment_count%2Ccan_comment%2Ccontent%2Ceditable_content%2Cvoteup_count%2Creshipment_settings%2Ccomment_permission%2Ccreated_time%2Cupdated_time%2Creview_info%2Crelevant_info%2Cquestion%2Cexcerpt%2Crelationship.is_authorized%2Cis_author%2Cvoting%2Cis_thanked%2Cis_nothelp%2Cis_labeled%2Cis_recognized%2Cpaid_info%2Cpaid_info_content%3Bdata%5B%2A%5D.mark_infos%5B%2A%5D.url%3Bdata%5B%2A%5D.author.follower_count%2Cbadge%5B%2A%5D.topics&limit={limit}&offset={offset}&platform=desktop&sort_by=default"

//问题的单个回答
const URL_SINGLE_ANSWER = "https://www.zhihu.com/api/v4/answers/{answer_id}?include=data%5B%2A%5D.is_normal%2Cadmin_closed_comment%2Creward_info%2Cis_collapsed%2Cannotation_action%2Cannotation_detail%2Ccollapse_reason%2Cis_sticky%2Ccollapsed_by%2Csuggest_edit%2Ccomment_count%2Ccan_comment%2Ccontent%2Ceditable_content%2Cvoteup_count%2Creshipment_settings%2Ccomment_permission%2Ccreated_time%2Cupdated_time%2Creview_info%2Crelevant_info%2Cquestion%2Cexcerpt%2Crelationship.is_authorized%2Cis_author%2Cvoting%2Cis_thanked%2Cis_nothelp%2Cis_labeled%2Cis_recognized%2Cpaid_info%2Cpaid_info_content%3Bdata%5B%2A%5D.mark_infos%5B%2A%5D.url%3Bdata%5B%2A%5D.author.follower_count%2Cbadge%5B%2A%5D.topics&limit=5&offset=1&platform=desktop&sort_by=default"

//相关问题
//https://www.zhihu.com/api/v4/questions/407759621/similar-questions?include=data[*].answer_count,author,follower_count&limit=5

//首页-关注
const URL_FOLLOW = "https://www.zhihu.com/api/v3/moments?limit=10&desktop=true"

//热榜-全站
const URL_HOT_ITEM = "https://www.zhihu.com/api/v3/feed/topstory/hot-lists/{hot_tag}?limit=50&desktop=true"

//热榜-榜单
const URL_HOT_LIST = "https://www.zhihu.com/api/v3/feed/topstory/hot-lists?desktop=true"

//zvideo
const URL_ZVIDEO = "https://lens.zhihu.com/api/v4/videos/{zvideo_id}"

//zvideo评论
const URL_VIDEO_COMMENTS = "https://www.zhihu.com/api/v4/zvideos/{vId}/root_comments?order={order}&limit=20&offset={offset}&status=open"

const URL_ANSWER_COMMENTS = "https://www.zhihu.com/api/v4/answers/{answerId}/root_comments?order={order}&limit=20&offset={offset}&status=open"

//子评论
const URL_CHILD_COMMENTS = "https://www.zhihu.com/api/v4/comments/{comment_id}/child_comments"

//相关zvideo推荐
const URL_ZVIDEO_RECOMMEND = "https://lens.zhihu.com/api/zvideos/{zvideo_id}/recommendations?limit=10&offset={offset}"

const getRecommendData = () => {
    return zhihu.get(URL_RECOMMEND)
        .then(res => res)
}

const getMoreRecommendData = ({ page_number, after_id, limit, action }) => {
    let param = [`page_number=${page_number}`, `after_id=${after_id}`
        , `limit=${limit}`, `action=${action}`].join('&')
    return zhihu.get(`${URL_RECOMMEND}&${param}`)
        .then(res => res)
}

const getQuestionInfoById = (qId) => {
    return zhihu.get(URL_QUESTION_INFO.replace("{question_id}", qId))
        .then(res => res)
}

const getQuestionAnswersByOffset = (qId, offset, limit) => {
    return zhihu.get(URL_QUESTION_ANSWERS.replace("{limit}", limit).replace("{question_id}", qId).replace("{offset}", offset))
        .then(res => res)
}

const getSingleAnswerById = (aId) => {
    return zhihu.get(URL_SINGLE_ANSWER.replace("{answer_id}", aId))
        .then(res => res)
}

const getFollowData = () => {
    return zhihu.get(URL_FOLLOW)
        .then(res => res)
}


const getMoreFollowData = ({ session_start_id, after_id, limit, action }) => {
    let param = [`session_start_id=${session_start_id}`, `after_id=${after_id}`
        , `limit=${limit}`, `action=${action}`].join('&')
    console.log('test url follow', `${URL_FOLLOW}&${param}`)
    return zhihu.get(`${URL_FOLLOW}&${param}`)
        .then(res => res)
}

const getHotNavListData = () => {
    return zhihu.get(URL_HOT_LIST)
        .then(res => res)
}

const postHotNavListData = param => {
    param = {
        data: param.data,
        rec_data: param.rec_data
    }

    return zhihu(URL_HOT_LIST, {
        method: "put",
        data: JSON.stringify(param),
        headers: {
            "Content-Type": "application/json",
        }
    }).then(res => res)
}


const getHotData = (hotTag) => {
    return zhihu.get(URL_HOT_ITEM.replace("{hot_tag}", hotTag))
        .then(res => res)
}

const getZvideoById = (vId) => {
    return zhihu.get(URL_ZVIDEO.replace("{zvideo_id}", vId))
        .then(res => res)
}

const getVideoCommentsById = (vId, order, offset) => {
    return zhihu.get(URL_VIDEO_COMMENTS.replace("{vId}", vId).replace("{order}", order).replace("{offset}", offset))
        .then(res => res)
}

const getAnswerCommentsById = (answerId, order, offset) => {
    return zhihu.get(URL_ANSWER_COMMENTS.replace("{answerId}", answerId).replace("{order}", order).replace("{offset}", offset))
        .then(res => res)
}

const getChildCommentsById = (cId) => {
    return zhihu.get(URL_CHILD_COMMENTS.replace("{comment_id}", cId))
        .then(res => res)
}


const getZvideoRecommendById = (vId) => {
    return zhihu.get(URL_ZVIDEO_RECOMMEND.replace("{zvideo_id}", vId).replace("{offset}", 10))
        .then(res => res)
}

const getMoreZvideoRecommendData = ({ vId, limit, offset }) => {
    return zhihu.get(URL_ZVIDEO_RECOMMEND.replace("{zvideo_id}", vId).replace("{offset}", offset))
        .then(res => res)
}


module.exports = {
    getRecommendData,
    getMoreRecommendData,
    getQuestionInfoById,
    getQuestionAnswersByOffset,
    getSingleAnswerById,
    getFollowData,
    getMoreFollowData,
    getHotNavListData,
    postHotNavListData,
    getHotData,
    getZvideoById,
    getVideoCommentsById,
    getChildCommentsById,
    getZvideoRecommendById,
    getMoreZvideoRecommendData,
    getAnswerCommentsById
}