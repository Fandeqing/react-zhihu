import { getHotNavList, putHotNavList, getHotItems } from '../../api/hot'
import { createQuestionByHot } from '../../models/index'
import { SET_HOT_LIST, PUT_HOT_LIST, SET_HOT_DATA } from '../action-types'


export const getHotNavData = () => async dispatch => {
    const hotNavList = await getHotNavList();
    //热榜视频api无数据，tag暂时过滤掉
    hotNavList.data = hotNavList.data.filter(item => item.identifier !== 'zvideo')
    hotNavList.rec_data = hotNavList.rec_data.filter(item => item.identifier !== 'zvideo')
    dispatch({
        type: SET_HOT_LIST,
        payload: hotNavList
    })
}

export const putHotNavData = data => async dispatch => {
    const putTag = await putHotNavList(data);
    dispatch({
        type: PUT_HOT_LIST,
        payload: putTag
    })
}

export const getHotListData = tag => async dispatch => {
    const hotData = await getHotItems({ hotTag: tag })
    const hotList = hotData.data.map(item => createQuestionByHot(item))
    dispatch({
        type: SET_HOT_DATA,
        payload: { hotList: hotList, currentTag: tag }
    })
}

