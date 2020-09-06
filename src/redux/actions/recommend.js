import { getRecommend, getMoreRec } from '../../api/recomend'
import { SET_REOMMEND, SET_MORE_REOMMEND } from '../action-types'
import {
    createVideoByRecommend,
    createAnswerByRecommend,
} from '../../models'


export const getRecommendData = () => async dispatch => {

    const recommendData = await getRecommend().then(res => {
        const datas = res.data;
        //过滤广告类型及其他类型
        const recommendList = datas.map(data => {
            const targetData = data.target;

            if (targetData.type === 'zvideo') {
                return createVideoByRecommend(targetData)
            } else if (targetData.type === 'answer') {
                return createAnswerByRecommend(targetData)
            }
            return null
        }).filter(item => item !== null)

        const next = res.paging.next;
        const nextRecUrl = next;

        return { recommendList, nextRecUrl };

    })
    dispatch({
        type: SET_REOMMEND,
        payload: recommendData
    })
}

export const getNextPageRecData = (param) => async dispatch => {
    const recommendData = await getMoreRec(param).then(res => {

        const datas = res.data;
        //过滤广告类型及其他类型
        const recommendList = datas.map(data => {
            const targetData = data.target;

            if (targetData.type === 'zvideo') {
                return createVideoByRecommend(targetData)
            } else if (targetData.type === 'answer') {
                return createAnswerByRecommend(targetData)
            }
            return null
        }).filter(item => item !== null)

        const next = res.paging.next;
        const nextRecUrl = next;

        return { recommendList, nextRecUrl };

    })
    dispatch({
        type: SET_MORE_REOMMEND,
        payload: recommendData
    })
}


